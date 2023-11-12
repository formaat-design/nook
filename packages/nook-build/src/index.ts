import path from "node:path";
import fs from "node:fs";
import findNookInFile from "./utilities/findNookInFile.js";
import getCurrentDirectory from "./utilities/getCurrentDirectory.js";
import { NOOK_META_FILE_NAME, NOOK_META_FILE_DIR } from "./constants.js";

const currentDir = getCurrentDirectory(import.meta.url);
const rootDir = path.resolve(currentDir, "..");
const target = path.resolve(rootDir, "../app/src/components/Button.tsx");

const meta = findNookInFile(target);
const metaFilePath = path.resolve(
  rootDir,
  NOOK_META_FILE_DIR,
  NOOK_META_FILE_NAME,
);

fs.writeFileSync(metaFilePath, JSON.stringify({ components: meta }), "utf-8");
