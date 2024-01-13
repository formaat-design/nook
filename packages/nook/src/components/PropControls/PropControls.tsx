"use client";

// import React from "react";
import { useNook } from "../NookProvider";
import PropControl from "../PropControl";
import type * as T from "./PropControls.types";

const PropControls = (props: T.Props) => {
  const { id, controls, values } = props;
  const { updateOverrides, components } = useNook();
  const selectedComponent = components[id];

  const handleControlChange = ({
    name,
    value,
    parents,
  }: {
    name: string;
    value?: any;
    parents?: string[];
  }) => {
    const next = { ...values };

    // Find a referrence to the deeply nested property value in case objects or arrays are used
    let nestedTarget = next;
    parents?.forEach((parentKey) => {
      nestedTarget = nestedTarget[parentKey] as Record<string, unknown>;
    });
    nestedTarget[name] = value;

    updateOverrides(id, next);
  };

  return controls.map((control) => {
    const value: any =
      selectedComponent.overrides[control.name] ||
      selectedComponent.props[control.name];

    return (
      <PropControl
        key={control.name}
        {...control}
        value={value}
        onChange={handleControlChange}
      />
    );
  });
};

export default PropControls;
