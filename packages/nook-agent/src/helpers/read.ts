import fs from "fs";
import { analyzeJSXFile } from "../modules/analyse/analyse";

export const readComponentsFile = (componentsFile: string) => {
  return JSON.parse(fs.readFileSync(componentsFile, 'utf8')) as NonNullable<ReturnType<typeof analyzeJSXFile>>;
};
