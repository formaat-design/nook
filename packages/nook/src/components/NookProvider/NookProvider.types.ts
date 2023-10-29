import React from "react";

export type Props = {
  children: React.ReactNode;
};

export type ComponentData = { name: string };
export type Context = {
  components: Record<string, ComponentData>;
  register: (id: string, data: ComponentData) => void;
  unregister: (id: string) => void;
};
