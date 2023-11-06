import PropControlBase from "./PropControlBase";
import type * as T from "../PropControl.types";
("use client");

import React from "react";
import s from "../PropControl.module.css";

const PropControlNumber = (props: T.NumberControlProps) => {
  const { name, value, onChange } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ name, value: +e.target.value });
  };

  return (
    <PropControlBase name={name}>
      <input
        type="number"
        className={s.input}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </PropControlBase>
  );
};

export default PropControlNumber;
