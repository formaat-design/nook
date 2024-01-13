"use client";

import React from "react";
import InspectedComponent from "../components/InspectedComponent";
import { useNook } from "../components/NookProvider";

const nook = <C extends React.ComponentType<any>>(Component: C) => {
  const NookInspector = (props: any) => {
    const id = React.useId();
    const { setSelectedComponentId, components, register, unregister } =
      useNook();
    const name = Component.displayName || Component.name;
    const resolvedProps = {
      ...props,
      ...components[id]?.overrides,
    };
    const handleClick = React.useCallback(() => {
      setSelectedComponentId(id);
    }, [id, setSelectedComponentId]);

    React.useEffect(() => {
      register({ id, name, props });
      return () => unregister(id);
    }, [id, register, unregister, name]);

    return (
      <InspectedComponent name={name} id={id} onClick={handleClick}>
        <Component {...resolvedProps} />
      </InspectedComponent>
    );
  };

  return NookInspector;
};

export default nook;
