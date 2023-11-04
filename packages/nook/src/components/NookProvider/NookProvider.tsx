"use client";

import React, { useEffect } from "react";
import Widget from "../Widget";
import type * as T from "./NookProvider.types";
import mitt from "mitt";

type Events = {
  update: any;
}

export const eventBus = mitt<Events>();

const Context = React.createContext({
  components: {},
} as T.Context);

export const useNook = () => React.useContext(Context);

const useNookAgent = () => {
  useEffect(() => {
    // Create WebSocket connection.
    const socket = new WebSocket("ws://localhost:51311");

    // Connection opened
    socket.addEventListener("open", (event) => {
      socket.send("Hello Server!");
    });

    // Listen for messages
    socket.addEventListener("message", (event) => {
      eventBus.emit("update", JSON.parse(event.data));
    });
  }, []);
}

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

  useNookAgent();

  return (
    <Context.Provider value={{ components, register, unregister }}>
      {children}
      <Widget />
    </Context.Provider>
  );
};

export default NookProvider;
