import { AiAssistant, AiAssistantConfig, ConfigPanel } from '@openassistant/ui';
import { KeplerGlComponent } from '@openassistant/keplergl';
import { MessageModel, useAssistant, useToolCache } from '@openassistant/core';
import { getValuesFromGeoJSON } from '@openassistant/utils';
import { GetValues, GetGeometries } from '@openassistant/geoda';
import { GetDataset } from '@openassistant/map';

import { useEffect, useState } from 'react';
import { createWelcomeMessage } from './initial-messages';
import { INSTRUCTIONS, PROMPT_IDEAS } from './constants';
import { createTools } from './tools';

function isGeoJson(obj: unknown): obj is GeoJSON.FeatureCollection {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'type' in obj &&
    obj.type === 'FeatureCollection'
  );
}

export function AiChat({
  geojsonUrl,
  messages,
  setMessages,
  ideas,
  setIdeas,
}: {
  geojsonUrl?: string | null;
  messages: MessageModel[];
  setMessages: React.Dispatch<React.SetStateAction<MessageModel[]>>;
  ideas: { title: string; description: string }[];
  setIdeas: React.Dispatch<React.SetStateAction<{ title: string; description: string }[]>>;
}) {
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
    apiKey: '',
    temperature: 0.0,
    topP: 1.0,
    mapBoxToken: '',
  });
  const onAiConfigChange = (config: AiAssistantConfig) => {
    setAiConfig(config);
  };

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
            <div className="flex flex-col gap-2">
              <div className="w-full">
                <KeplerGlComponent
                  datasetId={datasetName}
                  datasetForKepler={datasetForKepler}
                  layerId={layerId}
                />
              </div>
              <span>
                Hello! I am your GeoDa AI assistant. Here is the map of the "
                {datasetName}" dataset. I can help applying spatial analysis to
                this dataset. Please select your prefered LLM model and use your
                API key to start asking questions.
              </span>
              <ConfigPanel
                initialConfig={aiConfig}
                onConfigChange={onAiConfigChange}
                showMapBoxToken={true}
                showCheckConnectionButton={true}
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

  const tools = createTools({
    getValues,
    getGeometries,
    getDataset,
    getMapboxToken: () => aiConfig.mapBoxToken || '',
    onToolCompleted,
  });

  return (
    <div className="w-full h-full mb-3">
      <div className="bg-white h-[70vh] w-full">
        {welcomeMessage ? (
          <AiAssistant
            name="GeoDa Assistant"
            modelProvider={aiConfig.provider}
            model={aiConfig.model}
            apiKey={aiConfig.apiKey}
            temperature={aiConfig.temperature}
            topP={aiConfig.topP}
            tools={tools}
            welcomeMessage={welcomeMessage}
            instructions={`${instructions}\n${additionalInstructions}`}
            ideas={ideas}
            onRefreshIdeas={generateIdeas}
            onMessagesUpdated={setMessages}
            initialMessages={messages}
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
