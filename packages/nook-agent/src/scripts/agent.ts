import fs from 'fs';
import path from 'path';
import babelParser from '@babel/parser';

import { findAllNookWrappedComponents } from '../workers/ast';

const analyzeJSXFile = (appFolder: string , fileName: string, usage: any) => {
  const filePath = path.resolve(appFolder, fileName);

  const sourceCode = fs.readFileSync(filePath, 'utf8');

  const ast = babelParser.parse(
    sourceCode,
    {
      allowReturnOutsideFunction: true,
      sourceType: 'unambiguous',
      plugins: ['jsx', 'exportDefaultFrom', 'typescript'],
    },
  );

  const componentUsageByLib = findAllNookWrappedComponents(ast);

  const nookComponentsInFile = [...componentUsageByLib.values()];

  if (nookComponentsInFile.length === 0) {
    return;
  }

  const result = {
    [path.relative(appFolder, filePath)]: [...componentUsageByLib.values()],
  };

  return result
};

export const analyzeByFile = (appFolder: string, fileName: string) => {
  const x = analyzeJSXFile(appFolder, fileName, {});
  return x;
}