import { NOOK_FUNCTION_NAME } from "../consts";
import { default as astTraverse } from '@babel/traverse';
import type { CallExpression, Node } from "@babel/types";

const isNookFunctionCall = (node: CallExpression) => {
  return node.callee.type === 'Identifier' && node.callee.name === NOOK_FUNCTION_NAME;
}

export const findAllNookWrappedComponents = (ast: Node) => {
  const components = new Set<string>();

  astTraverse(ast, {
    CallExpression: (p) => {
      const { node } = p;

      if (isNookFunctionCall(node)) {
        for (const arg of node.arguments) {
          if (arg.type === 'Identifier') {
            components.add(arg.name);
          }
        }
      }
    },
  });

  return components;
};
