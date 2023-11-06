"use client";

import React from "react";
import Widget from "../Widget";
import type * as T from "./NookProvider.types";

const Context = React.createContext({
  components: {},
} as T.Context);

export const useNook = () => React.useContext(Context);

export const NookProvider = (props: T.Props) => {
  const { children } = props;
  const [mode, setMode] = React.useState<T.Mode>("idle");
  const [components, setComponents] = React.useState<T.Context["components"]>(
    {},
  );
  const [selectedComponent, setSelectedComponent] =
    React.useState<T.SelectedComponent | null>(null);

  const register: T.Context["register"] = React.useCallback((id, data) => {
    setComponents((prev) => ({ ...prev, [id]: data }));
  }, []);

  const unregister: T.Context["unregister"] = React.useCallback((id) => {
    setComponents((prev) => {
      const next = { ...prev };
      delete next[id];

      return next;
    });
  }, []);

  return (
    <Context.Provider
      value={{
        components,
        register,
        unregister,
        mode,
        setMode,
        selectedComponent,
        setSelectedComponent,
      }}
    >
      {children}
      <Widget />
    </Context.Provider>
  );
};

export default NookProvider;
