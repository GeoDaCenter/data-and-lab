import { SpatialWeightsComponent } from '@openassistant/tables';
import {
  dataClassify,
  DataClassifyTool,
  spatialWeights,
  SpatialWeightsTool,
  GetGeometries,
  globalMoran,
  GlobalMoranTool,
  spatialRegression,
  SpatialRegressionTool,
  lisa,
  LisaTool,
  spatialJoin,
  SpatialJoinTool,
  buffer,
  BufferTool,
  spatialFilter,
  CentroidTool,
  centroid,
  DissolveTool,
  dissolve,
  AreaTool,
  area,
  length,
  perimeter,
  GetValues,
} from '@openassistant/geoda';
import {
  geocoding,
  routing,
  getUsStateGeojson,
  getUsZipcodeGeojson,
  getUsCountyGeojson,
  RoutingTool,
  roads,
  RoadsTool,
  IsochroneTool,
  isochrone,
  queryUSZipcodes,
} from '@openassistant/osm';
import {
  GetDataset,
  keplergl,
  KeplerglTool,
  downloadMapData,
} from '@openassistant/map';
import {
  histogram,
  HistogramTool,
  pcp,
  PCPTool,
  boxplot,
  BubbleChartTool,
  bubbleChart,
  scatterplot,
  ScatterplotTool,
} from '@openassistant/plots';
import {
  HistogramPlotComponent,
  BoxplotComponent,
  ParallelCoordinateComponent,
  ScatterplotComponent,
  BubbleChartComponent,
  MoranScatterComponent,
} from '@openassistant/echarts';
import { KeplerGlComponent } from '@openassistant/keplergl';

export interface ToolDependencies {
  getValues: GetValues;
  getGeometries: GetGeometries;
  getDataset: GetDataset;
  getMapboxToken: () => string;
  onToolCompleted: (toolCallId: string, additionalData: unknown) => void;
}

export function createTools(deps: ToolDependencies) {
  const {
    getValues,
    getGeometries,
    getDataset,
    getMapboxToken,
    onToolCompleted,
  } = deps;

  // Configure the dataClassify tool
  const classifyTool: DataClassifyTool = {
    ...dataClassify,
    context: {
      ...dataClassify.context,
      getValues,
    },
  };

  const weightsTool: SpatialWeightsTool = {
    ...spatialWeights,
    context: {
      ...spatialWeights.context,
      getGeometries,
    },
    component: SpatialWeightsComponent,
  };

  const globalMoranTool: GlobalMoranTool = {
    ...globalMoran,
    context: {
      ...globalMoran.context,
      getValues,
    },
    component: MoranScatterComponent,
  };

  const regressionTool: SpatialRegressionTool = {
    ...spatialRegression,
    context: {
      ...spatialRegression.context,
      getValues,
    },
  };

  const lisaTool: LisaTool = {
    ...lisa,
    context: {
      ...lisa.context,
      getValues,
      getGeometries,
    },
    onToolCompleted,
  };

  const spatialJoinTool: SpatialJoinTool = {
    ...spatialJoin,
    context: {
      ...spatialJoin.context,
      getValues,
      getGeometries,
    },
    onToolCompleted,
  };

  const spatialFilterTool = {
    ...spatialFilter,
    context: {
      ...spatialFilter.context,
      getValues,
      getGeometries,
    },
    onToolCompleted,
  };

  const getUsStateGeojsonTool = {
    ...getUsStateGeojson,
    onToolCompleted,
  };

  const getUsZipcodeGeojsonTool = {
    ...getUsZipcodeGeojson,
    onToolCompleted,
  };

  const getUsCountyGeojsonTool = {
    ...getUsCountyGeojson,
    onToolCompleted,
  };

  const keplerglTool: KeplerglTool = {
    ...keplergl,
    context: {
      ...keplergl.context,
      getDataset,
    },
    component: KeplerGlComponent,
  };

  const routingTool: RoutingTool = {
    ...routing,
    context: {
      ...routing.context,
      getMapboxToken,
    },
    onToolCompleted,
  };

  const isochroneTool: IsochroneTool = {
    ...isochrone,
    context: {
      ...isochrone.context,
      getMapboxToken,
    },
  };

  const bufferTool: BufferTool = {
    ...buffer,
    context: {
      ...buffer.context,
      getGeometries,
    },
    onToolCompleted,
  };

  const centroidTool: CentroidTool = {
    ...centroid,
    context: {
      ...centroid.context,
      getGeometries,
    },
    onToolCompleted,
  };

  const dissolveTool: DissolveTool = {
    ...dissolve,
    context: {
      ...dissolve.context,
      getGeometries,
    },
    onToolCompleted,
  };

  const lengthTool = {
    ...length,
    context: {
      ...length.context,
      getGeometries,
    },
  };

  const areaTool: AreaTool = {
    ...area,
    context: {
      ...area.context,
      getGeometries,
    },
  };

  const perimeterTool = {
    ...perimeter,
    context: {
      ...perimeter.context,
      getGeometries,
    },
  };

  const roadsTool: RoadsTool = {
    ...roads,
    context: {
      ...roads.context,
      getGeometries,
    },
    onToolCompleted,
  };

  const downloadMapDataTool = {
    ...downloadMapData,
    context: {},
    onToolCompleted,
  };

  const boxplotTool = {
    ...boxplot,
    context: {
      ...boxplot.context,
      getValues,
    },
    component: BoxplotComponent,
  };

  const bubbleChartTool: BubbleChartTool = {
    ...bubbleChart,
    context: {
      ...bubbleChart.context,
      // @ts-expect-error FIX type
      getValues,
    },
    component: BubbleChartComponent,
  };

  const histogramTool: HistogramTool = {
    ...histogram,
    context: {
      ...histogram.context,
      // @ts-expect-error FIX type
      getValues,
    },
    component: HistogramPlotComponent,
  };

  const pcpTool: PCPTool = {
    ...pcp,
    context: {
      ...pcp.context,
      // @ts-expect-error FIX type
      getValues,
    },
    component: ParallelCoordinateComponent,
  };

  const scatterplotTool: ScatterplotTool = {
    ...scatterplot,
    context: {
      ...scatterplot.context,
      // @ts-expect-error FIX type
      getValues,
    },
    component: ScatterplotComponent,
  };

  return {
    downloadMapData: downloadMapDataTool,
    dataClassify: classifyTool,
    spatialWeights: weightsTool,
    globalMoran: globalMoranTool,
    spatialRegression: regressionTool,
    lisa: lisaTool,
    spatialJoin: spatialJoinTool,
    spatialFilter: spatialFilterTool,
    getUsStateGeojson: getUsStateGeojsonTool,
    getUsZipcodeGeojson: getUsZipcodeGeojsonTool,
    getUsCountyGeojson: getUsCountyGeojsonTool,
    queryUSZipcodes,
    geocoding,
    buffer: bufferTool,
    centroid: centroidTool,
    dissolve: dissolveTool,
    length: lengthTool,
    area: areaTool,
    perimeter: perimeterTool,
    keplergl: keplerglTool,
    routing: routingTool,
    roads: roadsTool,
    isochrone: isochroneTool,
    boxplot: boxplotTool,
    bubbleChart: bubbleChartTool,
    histogram: histogramTool,
    pcp: pcpTool,
    scatterplot: scatterplotTool,
  };
} 