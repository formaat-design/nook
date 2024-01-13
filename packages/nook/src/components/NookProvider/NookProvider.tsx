"use client";

import React from "react";
import type { RuntimeMetadata, RuntimeComponentMetadata } from "nook-types";
import Widget from "../Widget";
import type * as T from "./NookProvider.types";

const Context = React.createContext({
  components: {},
} as T.Context);

export const useNook = () => React.useContext(Context);

export const NookProvider = (props: T.Props) => {
  const { children } = props;
  const [mode, setMode] = React.useState<T.Mode>("active");
  const [components, setComponents] = React.useState<
    RuntimeMetadata["components"]
  >({});
  const [selectedComponentId, setSelectedComponentId] = React.useState<
    RuntimeComponentMetadata["id"] | null
  >(null);

  const register: T.Context["register"] = React.useCallback((data) => {
    setComponents((prev) => ({
      ...prev,
      [data.id]: { ...data, overrides: {} },
    }));
  }, []);

  const unregister: T.Context["unregister"] = React.useCallback((id) => {
    setComponents((prev) => {
      const next = { ...prev };
      delete next[id];

      return next;
    });
  }, []);

  const updateOverrides: T.Context["updateOverrides"] = (id, overrides) => {
    setComponents((prev) => {
      const next = { ...prev };

      if (!next[id]) return next;

      next[id].overrides = { ...next[id].overrides, ...overrides };
      return next;
    });
  };

  return (
    <Context.Provider
      value={{
        components,
        register,
        unregister,
        mode,
        setMode,
        selectedComponentId,
        setSelectedComponentId,
        updateOverrides,
      }}
    >
      {children}
      <Widget />
    </Context.Provider>
  );
};

export default NookProvider;
