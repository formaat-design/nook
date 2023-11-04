import React from "react";

export type Mode = "idle" | "inspect" | "active";

export type Props = {
  children: React.ReactNode;
};

export type ComponentData = { name: string };
export type Context = {
  components: Record<string, ComponentData>;
  register: (id: string, data: ComponentData) => void;
  unregister: (id: string) => void;
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
};
