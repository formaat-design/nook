"use client";

import React from "react";
import PropControl from "../PropControl";
import type * as T from "./PropControls.types";

const PropControls = (props: T.Props) => {
  const { controls, values } = props;
  const [renderedValues, setRenderedValues] = React.useState(values);

  const handleControlChange = ({
    name,
    value,
    parents,
  }: {
    name: string;
    value?: any;
    parents?: string[];
  }) => {
    setRenderedValues((prev) => {
      const next = { ...prev };
      let targetParent = next;

      parents?.forEach((parentKey) => {
        console.log(parentKey);
        targetParent = targetParent[parentKey];
      });

      targetParent[name] = value;

      console.log(next);

      return next;
    });
  };

  return controls.map((control) => (
    <PropControl
      key={control.name}
      {...control}
      value={renderedValues[control.name]}
      onChange={handleControlChange}
    />
  ));
};

export default PropControls;
