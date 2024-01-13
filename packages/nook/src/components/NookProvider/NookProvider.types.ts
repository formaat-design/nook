import type React from "react";
import type { RuntimeMetadata, RuntimeComponentMetadata } from "nook-types";

export type Mode = "idle" | "inspect" | "active" | "library";

export type Props = {
  children: React.ReactNode;
};

export type Context = {
  components: RuntimeMetadata["components"];
  register: (data: Omit<RuntimeComponentMetadata, "overrides">) => void;
  unregister: (id: RuntimeComponentMetadata["id"]) => void;
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  selectedComponentId: RuntimeComponentMetadata["id"] | null;
  setSelectedComponentId: React.Dispatch<
    React.SetStateAction<RuntimeComponentMetadata["id"] | null>
  >;
  updateOverrides: (
    id: RuntimeComponentMetadata["id"],
    overrides: RuntimeComponentMetadata["overrides"],
  ) => void;
};
