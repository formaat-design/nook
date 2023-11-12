import url from "node:url";
import path from "node:path";

const getCurrentDirectory = (moduleUrl: string) => {
  const currentModulePath = url.fileURLToPath(moduleUrl);

  return path.dirname(currentModulePath);
};

export default getCurrentDirectory;
