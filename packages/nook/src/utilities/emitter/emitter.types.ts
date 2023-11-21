import type { ComponentDoc } from "react-docgen-typescript";

export type NookComponentsResults = {
  [x: string]: {
    nookComponents: string[];
    documentation: ComponentDoc[];
    executionTime: string;
  };
}

export type NookEmitterEvents = {
  update: NookComponentsResults;
}


