import fs from "node:fs";
import babelParser from "@babel/parser";
import findNookInAstNode from "./findNookInAstNode.js";
import getComponentProps from "./getComponentProps.js";

const findNookInFile = (filePath: string) => {
  const sourceCode = fs.readFileSync(filePath, "utf8");
  const ast = babelParser.parse(sourceCode, {
    allowReturnOutsideFunction: true,
    sourceType: "unambiguous",
    plugins: ["jsx", "exportDefaultFrom", "typescript"],
  });

  const nookMeta = findNookInAstNode(ast);
  const nookComponentNames = Object.keys(nookMeta);

  if (!nookComponentNames.length) return;

  const [data] = getComponentProps(filePath);

  if (data.displayName) {
    nookMeta[data.displayName].props = data.props || {};
  }

  return nookMeta;
};

export default findNookInFile;
