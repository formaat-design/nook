"use client";

import React, { useEffect } from "react";
import Widget from "../Widget";
import type * as T from "./NookProvider.types";
import { NookComponentsResults } from "../../utilities/emitter/emitter.types";
import { eventsEmitter } from "../../utilities/emitter/emitter";

const Context = React.createContext({
  components: {},
} as T.Context);

export const useNook = () => React.useContext(Context);

const useNookAgent = () => {
  const [libraryComponents, setLibraryComponents] = React.useState<NookComponentsResults>({});

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:51311"); // not sure how we will know this port...

    socket.addEventListener("open", (event) => {
      socket.send("Hello Server!");
    });

    socket.addEventListener("message", (event) => {
      eventsEmitter.emit("update", JSON.parse(event.data).payload as NookComponentsResults);
    });
  }, []);


  React.useEffect(() => {
    const data = sessionStorage.getItem("nook");

    if (data) {
      try {
        setLibraryComponents(JSON.parse(data));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  React.useEffect(() => {
    const update = (data: NookComponentsResults) => {
      setLibraryComponents(data);
      sessionStorage.setItem("nook", JSON.stringify(data));
    };

    eventsEmitter.on("update", update);

    return () => {
      eventsEmitter.off("update", update);
    };
  }, []);

  return libraryComponents;
}

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

  // ideally we would create a new context for the library view, but for now we will just use the same one
  const libraryComponents = useNookAgent();

  return (
    <Context.Provider
      value={{
        components,
        libraryComponents,
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
