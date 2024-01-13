import type { BuildtimeComponentMetadata } from "nook-types";
import type * as Controls from "../types/controls";

export const convertProperties = (
  props: BuildtimeComponentMetadata["props"],
) => {
  if (!props) return [];

  const result: Controls.Props[] = [];

  Object.entries(props).forEach(([name, data]) => {
    if (data.tsType?.name === "number") {
      result.push({
        name,
        type: "number",
      });

      return;
    }

    if (data.tsType?.name === "string") {
      result.push({
        name,
        type: "string",
      });

      return;
    }

    if (data.tsType?.name === "boolean") {
      result.push({
        name,
        type: "boolean",
      });

      return;
    }

    if (data.tsType?.name === "union" && "elements" in data.tsType) {
      const options = data.tsType.elements;

      result.push({
        name,
        type: "enum",
        // @ts-ignore
        options: options.map((option) => option.value.replace(/\"/g, "")),
      });

      return;
    }
  });

  return result;
};
