// Dataset page map: deck.gl features over a maplibre basemap.
//
// Everything is imported from a CDN so the site keeps working without a build
// step. esm.sh serves both deck.gl packages against the same @deck.gl/core
// module instance, which is required for the overlay to recognise the layers.
import maplibregl from 'https://esm.sh/maplibre-gl@4.7.1';
import { GeoJsonLayer } from 'https://esm.sh/@deck.gl/layers@9.4.0';
import { MapboxOverlay } from 'https://esm.sh/@deck.gl/mapbox@9.4.0';

// CARTO Dark Matter: no API token needed.
const BASEMAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

// ColorBrewer YlOrRd. Every step stays bright enough to read on a dark basemap.
const RAMP = [
  [255, 255, 204],
  [255, 237, 160],
  [254, 217, 118],
  [254, 178, 76],
  [253, 141, 60],
  [227, 26, 28],
];

const DECK_LAYER_ID = 'dataset';
const HIT_LAYER_ID = 'dataset-hit';

const container = document.getElementById('root');

if (container) {
  init(container);
}

async function init(el) {
  const url = el.getAttribute('data-geojson');
  if (!url) return;

  el.innerHTML = '<div class="geoda-map-message">Loading map&hellip;</div>';

  let geojson;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    geojson = JSON.parse(await response.text());
  } catch (error) {
    console.error('Could not load map data', error);
    el.innerHTML = unavailable();
    return;
  }

  const features = Array.isArray(geojson && geojson.features) ? geojson.features : [];
  const fields = numericFields(features);

  if (!features.length || !fields.length) {
    el.innerHTML = unavailable();
    return;
  }

  el.innerHTML = '';

  const map = new maplibregl.Map({
    container: el,
    style: BASEMAP_STYLE,
    attributionControl: { compact: true },
    // Wheel scrolling belongs to the page: require the platform modifier
    // (Cmd on macOS, Ctrl elsewhere) before the map zooms.
    cooperativeGestures: true,
  });

  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-left');
  fitToFeatures(map, features);

  // deck.gl renders the map, but it cannot do its own hover picking here, so an
  // invisible copy of the data is left in the style for maplibre to hit-test.
  map.on('load', () => {
    const type = hitLayerType(features);
    map.addSource(HIT_LAYER_ID, { type: 'geojson', data: geojson });
    map.addLayer({ id: HIT_LAYER_ID, type, source: HIT_LAYER_ID, paint: hitPaint(type) });
  });

  // interleaved keeps the basemap's labels above the polygons.
  const overlay = new MapboxOverlay({ interleaved: true, layers: [] });
  map.addControl(overlay);

  const picker = buildPicker(el, fields);
  const legend = buildLegend(el);
  const tooltip = createTooltip(el, map);

  function render(field) {
    const scale = quantileScale(features, field);
    legend.update(scale, field);
    tooltip.setField(field);
    overlay.setProps({
      layers: [
        new GeoJsonLayer({
          id: DECK_LAYER_ID,
          data: geojson,
          filled: true,
          stroked: true,
          opacity: 0.85,
          lineWidthMinPixels: 1,
          getFillColor: (f) => scale.colorFor(f.properties[field]),
          getLineColor: [255, 255, 255, 90],
          updateTriggers: { getFillColor: [field] },
        }),
      ],
    });
  }

  picker.addEventListener('change', () => render(picker.value));
  picker.value = defaultVariable(fields, features);
  render(picker.value);
}

function unavailable() {
  return (
    '<div class="geoda-map-message">No map preview for this dataset. ' +
    'Use the download link above to get the data.</div>'
  );
}

function hitLayerType(features) {
  const type = (features.find((feature) => feature.geometry) || {}).geometry;
  if (!type) return 'circle';
  if (/Polygon/.test(type.type)) return 'fill';
  if (/LineString/.test(type.type)) return 'line';
  return 'circle';
}

function hitPaint(type) {
  if (type === 'fill') return { 'fill-opacity': 0 };
  if (type === 'line') return { 'line-opacity': 0 };
  return { 'circle-opacity': 0, 'circle-radius': 6 };
}

// Follows the pointer and reports the hovered feature's value for the variable
// the map is currently shaded by.
function createTooltip(el, map) {
  const box = document.createElement('div');
  box.className = 'geoda-map-tooltip';
  box.hidden = true;
  el.append(box);

  let field = null;
  let hovered = null;
  let point = null;

  function draw() {
    if (!hovered || !field) return;
    box.innerHTML = tooltipHtml(hovered, field);
    if (!box.innerHTML) {
      box.hidden = true;
      return;
    }
    box.hidden = false;
    // Keep the tooltip inside the map box.
    const x = Math.max(8, Math.min(point.x + 14, el.clientWidth - box.offsetWidth - 8));
    const y = Math.max(8, Math.min(point.y + 14, el.clientHeight - box.offsetHeight - 8));
    box.style.transform = `translate(${x}px, ${y}px)`;
  }

  map.on('mousemove', (event) => {
    const feature = map.getLayer(HIT_LAYER_ID)
      ? map.queryRenderedFeatures(event.point, { layers: [HIT_LAYER_ID] })[0]
      : null;

    hovered = feature ? feature.properties : null;
    if (!hovered) {
      box.hidden = true;
      map.getCanvas().style.cursor = '';
      return;
    }
    point = event.point;
    map.getCanvas().style.cursor = 'crosshair';
    draw();
  });

  map.on('mouseout', () => {
    hovered = null;
    box.hidden = true;
  });

  return {
    // Redraw for the new variable when the pointer is already on a feature.
    setField(next) {
      field = next;
      if (hovered) draw();
    },
  };
}

// Properties present and numeric on every feature, in the order the data lists them.
function numericFields(features) {
  const stats = new Map();
  for (const feature of features) {
    for (const [key, value] of Object.entries(feature.properties || {})) {
      const entry = stats.get(key) || { total: 0, numeric: 0 };
      entry.total += 1;
      if (typeof value === 'number' && Number.isFinite(value)) entry.numeric += 1;
      stats.set(key, entry);
    }
  }
  return [...stats]
    .filter(([, entry]) => entry.numeric === features.length)
    .map(([key]) => key);
}

// Identifiers and raw geometry make poor first impressions, so skip them when
// choosing what the page opens with. All of them stay available in the picker.
function defaultVariable(fields, features) {
  const geometryField =
    /^(x|y|z|lat|latitude|lon|lng|longitude|easting|northing|st_x|st_y|coord_x|coord_y|coords_x|coords_y|x_coord|y_coord|xcoord|ycoord|area|perimeter|shape_leng|shape_area|shape_length)$/i;

  const candidates = fields.filter(
    (key) => !geometryField.test(key) && !isIdentifier(key, features)
  );

  // Percentages and rates are floats, while codes and counts are integers, so
  // the first float column is usually the more informative thing to open with.
  const rate = candidates.find((key) => !isIntegerColumn(key, features));
  return rate || candidates[0] || fields[0];
}

function isIntegerColumn(key, features) {
  return features.every((feature) => Number.isInteger(feature.properties[key]));
}

// A column of distinct integers is almost always an ID (OBJECTID, POLYID, ...).
function isIdentifier(key, features) {
  if (features.length < 8) return false;
  const values = features.map((feature) => feature.properties[key]);
  if (!values.every(Number.isInteger)) return false;
  return new Set(values).size === values.length;
}

// Equal-count classes, so skewed variables still show their spread.
function quantileScale(features, field) {
  const values = features
    .map((feature) => feature.properties[field])
    .filter((value) => typeof value === 'number' && Number.isFinite(value))
    .sort((a, b) => a - b);

  const breaks = [];
  for (let i = 1; i < RAMP.length; i += 1) {
    breaks.push(values[Math.floor((i * values.length) / RAMP.length)]);
  }

  const classes = breaks.map((upper, index) => ({
    lower: index === 0 ? values[0] : breaks[index - 1],
    upper,
    color: RAMP[index],
  }));
  classes.push({
    lower: breaks[breaks.length - 1],
    upper: values[values.length - 1],
    color: RAMP[RAMP.length - 1],
  });

  return {
    classes,
    colorFor(value) {
      if (typeof value !== 'number' || !Number.isFinite(value)) return [110, 110, 120, 120];
      let index = 0;
      while (index < breaks.length && value >= breaks[index]) index += 1;
      return [...RAMP[index], 210];
    },
  };
}

function buildPicker(el, fields) {
  const wrapper = document.createElement('div');
  wrapper.className = 'geoda-map-variable';

  const label = document.createElement('label');
  label.textContent = 'Variable';
  label.htmlFor = 'geoda-map-variable-select';

  const select = document.createElement('select');
  select.id = 'geoda-map-variable-select';
  for (const field of fields) {
    const option = document.createElement('option');
    option.value = field;
    option.textContent = field;
    select.append(option);
  }

  wrapper.append(label, select);
  el.append(wrapper);
  return select;
}

// divs and spans, not ul/li/h4: the site styles bare list and heading elements
// inside .post-content, which would blow the legend up to full article width.
function buildLegend(el) {
  const legend = document.createElement('div');
  legend.className = 'geoda-map-legend';
  el.append(legend);

  return {
    update(scale, field) {
      const rows = scale.classes
        .slice()
        .reverse()
        .map((entry) => {
          const range =
            entry.lower === entry.upper
              ? format(entry.lower)
              : `${format(entry.lower)}&ndash;${format(entry.upper)}`;
          return (
            '<div class="geoda-map-legend-row">' +
            `<span class="geoda-map-swatch" style="background:rgb(${entry.color.join(',')})"></span>` +
            `<span>${range}</span></div>`
          );
        })
        .join('');
      legend.innerHTML =
        `<div class="geoda-map-legend-title">${escapeHtml(field)}</div>` + rows;
    },
  };
}

// Just the variable the map is shaded by: name and value, nothing else.
function tooltipHtml(properties, field) {
  const value = (properties || {})[field];
  if (value === null || value === undefined || value === '') return '';

  return (
    '<div class="geoda-map-tip-head">' +
    `<span class="geoda-map-tip-field">${escapeHtml(field)}</span>` +
    `<span class="geoda-map-tip-value">${escapeHtml(display(value))}</span>` +
    '</div>'
  );
}

function display(value) {
  return typeof value === 'number' ? format(value) : String(value);
}

function fitToFeatures(map, features) {
  const bounds = new maplibregl.LngLatBounds();
  let found = false;

  const visit = (node) => {
    if (typeof node[0] === 'number') {
      bounds.extend(node);
      found = true;
    } else {
      node.forEach(visit);
    }
  };

  for (const feature of features) {
    if (feature.geometry && feature.geometry.coordinates) visit(feature.geometry.coordinates);
  }
  if (!found) return;

  // A single point (or a single location) gives a zero-area box that fitBounds
  // would zoom to the moon; widen it a touch first.
  const [west, south] = bounds.getSouthWest().toArray();
  const [east, north] = bounds.getNorthEast().toArray();
  if (east - west < 1e-4 && north - south < 1e-4) {
    bounds.extend([west - 0.01, south - 0.01]);
    bounds.extend([east + 0.01, north + 0.01]);
  }

  map.fitBounds(bounds, { padding: 24, duration: 0 });
}

function format(value) {
  const magnitude = Math.abs(value);
  const digits = magnitude >= 1000 ? 0 : magnitude >= 1 ? 1 : 2;
  return value.toLocaleString(undefined, { maximumFractionDigits: digits });
}

function escapeHtml(value) {
  return value.replace(
    /[&<>"']/g,
    (char) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]
  );
}
