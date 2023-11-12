import fs from "node:fs";
import babelParser from "@babel/parser";
import findNookInAstNode from "./findNookInAstNode.js";

const findNookInFile = (filePath: string) => {
  const sourceCode = fs.readFileSync(filePath, "utf8");
  const ast = babelParser.parse(sourceCode, {
    allowReturnOutsideFunction: true,
    sourceType: "unambiguous",
    plugins: ["jsx", "exportDefaultFrom", "typescript"],
  });

  return findNookInAstNode(ast);
};

export default findNookInFile;
