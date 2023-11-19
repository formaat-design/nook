import path from "node:path";
import fs from "node:fs";
import { glob } from "glob";
import getComponentMeta from "./utilities/getComponentMeta.js";
import getCurrentDirectory from "./utilities/getCurrentDirectory.js";
import { NOOK_META_FILE_NAME, NOOK_META_FILE_DIR } from "./constants.js";

const processDir = process.cwd();
const currentDir = getCurrentDirectory(import.meta.url);
const packageRootDir = path.resolve(currentDir, "..");
const scannedFiles = await glob(`${processDir}/**/*.{js,jsx,ts,tsx}`, {
  ignore: "node_modules/**",
});

const meta = scannedFiles.reduce((meta, filePath) => {
  const fileMeta = getComponentMeta(filePath);
  return fileMeta ? { ...meta, ...fileMeta } : meta;
}, {});

const metaFilePath = path.resolve(
  packageRootDir,
  NOOK_META_FILE_DIR,
  NOOK_META_FILE_NAME,
);

fs.writeFileSync(metaFilePath, JSON.stringify({ components: meta }), "utf-8");
