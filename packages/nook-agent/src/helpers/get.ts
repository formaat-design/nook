import path from "path";
import fs from 'fs';
import docgen from "react-docgen-typescript";
import babelParser from '@babel/parser';
import { findAllNookComponents } from "../workers/ast/ast";

import { simpleIdGenerator } from "./idGenerator";

const docgenRunId = simpleIdGenerator('nook');

// Returns the path to the .nook folder in the root of the project
// If the folder doesn't exist, it creates it
export const getNookAgentFolder = (root: string) => {
  const nookFolder = path.resolve(root, '.nook');

  if (!fs.existsSync(nookFolder)) {
    fs.mkdirSync(nookFolder);
  }

  return nookFolder;
};

// Returns the path to the components.json file in the .nook folder
// If the file doesn't exist, it creates it
export const getComponentsFile = (nookFolder: string) => {
  const componentsFile = path.resolve(nookFolder, 'components.json');

  if (!fs.existsSync(componentsFile)) {
    fs.writeFileSync(componentsFile, JSON.stringify({}, null, 2));
  }

  return componentsFile;
};

export const getComponentDocumentation = (appFolder: string, sourceCode: string) => {
  // We need to create a temp file because react-docgen-typescript
  // doesn't parse components wrapped in nook() function correctly
  const tempFile = path.resolve(appFolder, '.nook', `tempNookDocgen${docgenRunId.next().value}.tsx`);

  // therefore, we need to remove nook() function from the source code, so it can be parsed correctly
  // TODO: catch other ways of using nook() function
  const docgenValidSourceCode = sourceCode.replace(/export default nook\((.+)\)/, 'export default $1');
  fs.writeFileSync(tempFile, docgenValidSourceCode, 'utf8');

  const documentation = docgen.parse(tempFile, {
    savePropValueAsString: true,
    skipChildrenPropWithoutDoc: false,
  });

  // cleanup
  if (fs.existsSync(tempFile)) {
    fs.unlinkSync(tempFile);
  }

  return documentation;
}

export const getNookComponentsInFile = (sourceCode: string) => {
  const ast = babelParser.parse(
    sourceCode,
    {
      allowReturnOutsideFunction: true,
      sourceType: 'unambiguous',
      plugins: ['jsx', 'exportDefaultFrom', 'typescript'],
    },
  );

  const componentUsageByLib = findAllNookComponents(ast);

  const nookComponentsInFile = [...componentUsageByLib.values()];

  if (nookComponentsInFile.length === 0) {
    return [];
  }

  return nookComponentsInFile;
}

export const getFileSourceCode = (file: string) => {
  const sourceCode = fs.readFileSync(file, 'utf8');
  return sourceCode;
}
