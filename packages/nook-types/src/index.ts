import type { Documentation } from "react-docgen";

// Data saved to the file during the build
export type BuildtimeComponentMetadata = {
  name: string;
  props: Documentation["props"];
};

export type BuildtimeMetadata = {
  components: Record<
    BuildtimeComponentMetadata["name"],
    BuildtimeComponentMetadata
  >;
};

// Data used in the global React context
export type RuntimeComponentMetadata = {
  id: string;
  name: string;
  props: Record<string, unknown>;
  overrides: Record<string, unknown>;
};

export type RuntimeMetadata = {
  // Saving data per rendered component instance
  components: Record<RuntimeComponentMetadata["id"], RuntimeComponentMetadata>;
};
