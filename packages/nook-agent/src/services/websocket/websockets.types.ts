import { ComponentDoc } from "react-docgen-typescript";

export type NookAgentParams = {
  initialComponents: {
    [x: string]: {
      nookComponents: string[];
      documentation: ComponentDoc[];
      executionTime: string;
    }
  }
}