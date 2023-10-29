"use client";

import React from "react";
import type * as T from "./NookProvider.types";

const Context = React.createContext({
  components: {},
} as T.Context);

export const useNook = () => React.useContext(Context);

export const NookProvider = (props: T.Props) => {
  const { children } = props;
  const [components, setComponents] = React.useState<T.Context["components"]>(
    {},
  );

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
    <Context.Provider value={{ components, register, unregister }}>
      {children}
    </Context.Provider>
  );
};

export default NookProvider;
