"use client";

import React from "react";
import InspectedComponent from "../components/InspectedComponent";
import { useNook } from "../components/NookProvider";

const nook = <C extends React.ComponentType<any>>(Component: C) => {
  const NookInspector = (props: any) => {
    const id = React.useId();
    const { setSelectedComponent } = useNook();

    const handleClick = React.useCallback(() => {
      setSelectedComponent({ id, props });
    }, [id]);

    return (
      <InspectedComponent
        name={Component.displayName || Component.name}
        id={id}
        onClick={handleClick}
      >
        <Component {...props} />
      </InspectedComponent>
    );
  };

  return NookInspector;
};

export default nook;
