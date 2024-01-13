import type { RuntimeComponentMetadata } from "nook-types";
import type { PropControlProps } from "../PropControl";

export type Props = {
  id: RuntimeComponentMetadata["id"];
  controls: PropControlProps[];
  values: RuntimeComponentMetadata["overrides"];
};
