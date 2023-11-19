import fs from "node:fs";
import { parse } from "react-docgen";

const getComponentProps = (filePath: string) => {
  const sourceCode = fs.readFileSync(filePath, "utf8");
  const props = parse(sourceCode, {
    filename: filePath,
  });

  return props;
};

export default getComponentProps;
