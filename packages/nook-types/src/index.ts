import type { Documentation } from "react-docgen";

export type ComponentData = {
  name: string;
  properties?: Documentation["props"];
};
