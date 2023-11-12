"use client";

import React from "react";
import { Actionable, Placeholder } from "reshaped";
import PropControlBase from "./PropControlBase";
import type * as T from "../PropControl.types";
import s from "../PropControl.module.css";

const PropControlSlot = (props: T.SlotControlProps) => {
  const { name, value, onChange, parents, level } = props;
  const [enabled, setEnabled] = React.useState(!!value);
  const slotRef = React.useRef(value ?? <Placeholder />);

  const handleClick = () => {
    onChange?.({ name, value: enabled ? undefined : slotRef.current, parents });
  };

  React.useEffect(() => {
    setEnabled(!!value);
  }, [value]);

  return (
    <PropControlBase name={name} level={level}>
      <Actionable onClick={handleClick} className={s.boolean}>
        {enabled ? "shown" : "hidden"}
      </Actionable>
    </PropControlBase>
  );
};

export default PropControlSlot;
