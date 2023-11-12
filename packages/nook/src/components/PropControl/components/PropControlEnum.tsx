"use client";

import React from "react";
import PropControlBase from "./PropControlBase";
import type * as T from "../PropControl.types";
import s from "../PropControl.module.css";

const PropControlEnum = (props: T.EnumControlProps) => {
  const { name, value, onChange, options, parents, level } = props;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.({ name, value: e.target.value, parents });
  };

  return (
    <PropControlBase name={name} level={level}>
      <select onChange={handleChange} value={value} className={s.input}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </PropControlBase>
  );
};

export default PropControlEnum;
