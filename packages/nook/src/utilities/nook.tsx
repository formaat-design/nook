"use client";

import React from "react";
import InspectedComponent from "../components/InspectedComponent";

const nook = <C extends React.ComponentType<any>>(Component: C) => {
  const NookInspector = (props: any) => {
    const id = React.useId();

    return (
      <InspectedComponent
        name={Component.displayName || Component.name}
        id={id}
      >
        <Component {...props} />
      </InspectedComponent>
    );
  };

  return NookInspector;
};

export default nook;
