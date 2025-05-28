import { processFileData, ProcessFileDataContent } from '@kepler.gl/processors';

export async function createWelcomeMessage(
  datasetName: string,
  geojson: GeoJSON.FeatureCollection
) {
  const processDataContent: ProcessFileDataContent = {
    data: geojson,
    fileName: datasetName,
  };

  const datasetForKepler = await processFileData({
    content: processDataContent,
    fileCache: [],
  });

  // change the datasetId to the datasetName
  datasetForKepler[0].info.id = datasetName;

  return {
    datasetForKepler,
    layerId: `layer_${datasetName}`,
  };
}
