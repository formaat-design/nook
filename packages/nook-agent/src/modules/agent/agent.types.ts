import { Glob } from "picomatch";

export type NookAgentOptions = {
  root?: string;
  include?: Glob;
  ignore?: Glob;
}
