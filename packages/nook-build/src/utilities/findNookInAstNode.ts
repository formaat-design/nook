import type { BuildtimeMetadata } from "nook-types";
import traverse from "@babel/traverse";
import type { CallExpression, Node } from "@babel/types";
import { NOOK_FUNCTION_NAME } from "../constants.js";

const isNookFunctionCall = (node: CallExpression) => {
  return (
    node.callee.type === "Identifier" && node.callee.name === NOOK_FUNCTION_NAME
  );
};

const findNookInAstNode = (astNode: Node) => {
  const components: BuildtimeMetadata["components"] = {};

  traverse.default(astNode, {
    CallExpression: (p) => {
      const { node } = p;

      if (isNookFunctionCall(node)) {
        for (const arg of node.arguments) {
          if (arg.type === "Identifier") {
            components[arg.name] = { name: arg.name, props: {} };
          }
        }
      }
    },
  });

  return components;
};

export default findNookInAstNode;
