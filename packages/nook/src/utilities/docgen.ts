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
    }
  });

  return result;
};
