"use client";

import React from "react";
import { Actionable } from "reshaped";
import PropControlBase from "./PropControlBase";
import type * as T from "../PropControl.types";
import s from "../PropControl.module.css";

const PropControlFunction = (props: T.FunctionControlProps) => {
  const { name, value, onChange, parents, level } = props;
  const [enabled, setEnabled] = React.useState(!!value);
  const funcRef = React.useRef(
    value ??
      (() => {
        console.log(`${name} triggered`);
      }),
  );

  const handleClick = () => {
    onChange?.({ name, value: enabled ? undefined : funcRef.current, parents });
  };

  React.useEffect(() => {
    setEnabled(!!value);
  }, [value]);

  return (
    <PropControlBase name={name} level={level}>
      <Actionable onClick={handleClick} className={s.boolean}>
        {enabled ? "enabled" : "disabled"}
      </Actionable>
    </PropControlBase>
  );
};

export default PropControlFunction;
