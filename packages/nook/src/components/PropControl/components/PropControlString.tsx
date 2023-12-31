"use client";

import React from "react";
import PropControlBase from "./PropControlBase";
import type * as T from "../PropControl.types";
import s from "../PropControl.module.css";

const PropControlString = (props: T.StringControlProps) => {
  const { name, value, onChange, parents, level } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.({ name, value: e.target.value, parents });
  };

  return (
    <PropControlBase name={name} level={level}>
      <input
        type="text"
        className={s.input}
        name={name}
        value={value || ""}
        onChange={handleChange}
      />
    </PropControlBase>
  );
};

export default PropControlString;
