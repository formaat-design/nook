import path from 'path';
import { getComponentDocumentation, getFileSourceCode, getNookComponentsInFile } from '../../helpers/get';
import { getRelativeTime } from '../../helpers/time';

export const analyzeJSXFile = (appFolder: string, fileName: string) => {
  try {
    const start = performance.now();

    const file = path.resolve(appFolder, fileName);
    const sourceCode = getFileSourceCode(file);
    const documentation = getComponentDocumentation(appFolder, sourceCode);
    const nookComponents = getNookComponentsInFile(sourceCode);

    const result = {
      [fileName]: {
        nookComponents,
        documentation,
        executionTime: getRelativeTime(performance.now(), start),
      },
    };

    return result
  } catch (error) {
    console.error(error);
  }
};