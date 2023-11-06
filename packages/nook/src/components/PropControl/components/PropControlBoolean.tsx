"use client";

import React from "react";
import { Actionable } from "reshaped";
import PropControlBase from "./PropControlBase";
import type * as T from "../PropControl.types";
import s from "../PropControl.module.css";

const PropControlBoolean = (props: T.BooleanControlProps) => {
  const { name, value, onChange } = props;

  const handleClick = () => {
    onChange({ name, value: !value });
  };

  return (
    <PropControlBase name={name}>
      <Actionable onClick={handleClick} className={s.boolean}>
        {value ? "true" : "false"}
      </Actionable>
    </PropControlBase>
  );
};

export default PropControlBoolean;
