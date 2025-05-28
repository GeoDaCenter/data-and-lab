import { AiAssistant, AiAssistantConfig, ConfigPanel } from '@openassistant/ui';
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
import { KeplerGlComponent } from '@openassistant/keplergl';
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
import { useAssistant, useToolCache } from '@openassistant/core';
import { getValuesFromGeoJSON } from '@openassistant/utils';

import { useEffect, useState } from 'react';
import { createWelcomeMessage } from './initial-messages';
import { INSTRUCTIONS, PROMPT_IDEAS } from './constants';

function isGeoJson(obj: unknown): obj is GeoJSON.FeatureCollection {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'type' in obj &&
    obj.type === 'FeatureCollection'
  );
}

export function AiChat({ geojsonUrl }: { geojsonUrl?: string | null }) {
  const [geojson, setGeojson] = useState<GeoJSON.FeatureCollection | null>(
    null
  );

  const [geojsonName, setGeojsonName] = useState<string>('');

  const [additionalInstructions, setAdditionalInstructions] =
    useState<string>('');

  const [welcomeMessage, setWelcomeMessage] = useState<React.ReactNode | null>(
    null
  );

  const [aiConfig, setAiConfig] = useState<AiAssistantConfig>({
    isReady: false,
    provider: 'openai',
    model: 'gpt-4.1',
    apiKey: process.env.OPENAI_API_KEY || '',
    temperature: 0.0,
    topP: 1.0,
    mapBoxToken: process.env.MAPBOX_TOKEN || '',
  });
  const onAiConfigChange = (config: AiAssistantConfig) => {
    setAiConfig(config);
  };

  const [ideas, setIdeas] = useState<{ title: string; description: string }[]>(
    []
  );

  // use dataset meta data in LLM instructions
  const instructions = `${INSTRUCTIONS}\n\n${additionalInstructions}`;

  // generate ideas from LLM
  const { temporaryPrompt } = useAssistant({
    name: 'GeoDa Assistant',
    modelProvider: aiConfig.provider,
    model: aiConfig.model,
    apiKey: aiConfig.apiKey,
    temperature: aiConfig.temperature,
    topP: aiConfig.topP,
    instructions,
  });

  const generateIdeas = async () => {
    try {
      const response = await temporaryPrompt({
        prompt: PROMPT_IDEAS,
        temperature: 1.0,
      });
      // find [{},{}...] in the text and parse it as json, handling whitespace
      const match = response?.match(/\[\s*\{.*\}\s*\]/s);
      if (match) {
        const json = JSON.parse(match[0]);
        setIdeas(json);
      }
    } catch (error) {
      console.error('Error generating ideas', error);
    }
  };

  useEffect(() => {
    // get ideas UI component
    if (
      ideas.length === 0 &&
      additionalInstructions.length > 0 &&
      aiConfig.apiKey.length > 0
    ) {
      generateIdeas();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [additionalInstructions, aiConfig]);

  // when component is mounted, fetch the geojson data
  useEffect(() => {
    async function initWithGeojson() {
      if (geojsonUrl) {
        const res = await fetch(geojsonUrl);
        const data = await res.json();
        setGeojson(data);
        // update the instructions by getting the dataset name and variable names from the geojson
        const datasetName = geojsonUrl.split('/').pop()?.split('.')[0];
        const variableNames = Object.keys(data.features[0].properties);
        const instructions = `Please remember the following datasets that you can use for data analysis:
          - datasetName: ${datasetName}
          - variables: ${variableNames.join(', ')}
          `;
        if (datasetName) {
          const { datasetForKepler, layerId } = await createWelcomeMessage(
            datasetName,
            data
          );
          setWelcomeMessage(
            <div className="flex flex-col gap-4">
              <span>
                Hello! I am your GeoDa AI assistant. Here is the map of the "
                {datasetName}" dataset. I can help applying spatial analysis to
                this dataset.{' '}
              </span>
              <div className="w-full h-[180px]">
                <KeplerGlComponent
                  datasetId={datasetName}
                  datasetForKepler={datasetForKepler}
                  layerId={layerId}
                />
              </div>
              <span>
                Please select your prefered LLM model and use your API key to
                start asking questions.
              </span>
              <ConfigPanel
                initialConfig={aiConfig}
                onConfigChange={onAiConfigChange}
                showMapBoxToken={true}
              />
            </div>
          );
          setGeojsonName(datasetName || '');
          setAdditionalInstructions(instructions);
        }
      }
    }
    initWithGeojson();
  }, []);

  // cache tool results
  const { toolCache, updateToolCache } = useToolCache();

  // use onToolCompleted to cache datasets from some tools
  const onToolCompleted = (toolCallId: string, additionalData: unknown) => {
    // find the dataset from the tool results and cache it
    updateToolCache(toolCallId, additionalData);
  };

  const getValues: GetValues = async (
    datasetName: string,
    variableName: string
  ) => {
    if (datasetName === geojsonName && geojson) {
      return getValuesFromGeoJSON(geojson, variableName);
    }
    // get cached values from other tools
    if (toolCache[datasetName]) {
      const data = toolCache[datasetName];
      if (isGeoJson(data)) {
        return getValuesFromGeoJSON(data, variableName);
      }
    }
    throw new Error(`Dataset ${datasetName} not found`);
  };

  const getGeometries: GetGeometries = async (datasetName: string) => {
    // user provided geometries
    if (datasetName === geojsonName && geojson) {
      return geojson.features;
    }
    // get cached geometries from other tools
    if (toolCache[datasetName]) {
      const data = toolCache[datasetName];
      if (isGeoJson(data)) {
        return data.features;
      }
    }

    throw new Error(`Dataset ${datasetName} not found`);
  };

  const getDataset: GetDataset = async (datasetName: string) => {
    if (datasetName === geojsonName && geojson) {
      return geojson;
    }
    // get cached geometries from other tools
    if (toolCache[datasetName]) {
      const data = toolCache[datasetName];
      if (data) {
        return data;
      }
    }
    throw new Error(`Dataset ${datasetName} not found`);
  };

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
      getMapboxToken: () => aiConfig.mapBoxToken || '',
    },
    onToolCompleted,
  };

  const isochroneTool: IsochroneTool = {
    ...isochrone,
    context: {
      ...isochrone.context,
      getMapboxToken: () => aiConfig.mapBoxToken || '',
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

  const tools = {
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

  return (
    <div className="px-4 py-8">
      <div className="bg-white h-[calc(100vh-200px)] w-full">
        {welcomeMessage ? (
          <AiAssistant
            name="GeoDa Assistant"
            modelProvider="openai"
            model="gpt-4o"
            apiKey={process.env.OPENAI_API_KEY || ''}
            tools={tools}
            welcomeMessage={welcomeMessage}
            instructions={`${instructions}\n${additionalInstructions}`}
            ideas={ideas}
            onRefreshIdeas={generateIdeas}
            // onMessagesUpdated={setMessages}
            // initialMessages={initialMapMessage}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">Loading...</div>
          </div>
        )}
      </div>
    </div>
  );
}
