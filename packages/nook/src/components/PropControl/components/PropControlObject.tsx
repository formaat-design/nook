"use client";

// import React from "react";
import { View, Accordion, Text, useToggle, Actionable } from "reshaped";
import PropControlBase from "./PropControlBase";
import PropControl from "../PropControl";
import type * as T from "../PropControl.types";
import s from "../PropControl.module.css";

const PropControlObject = (props: T.ObjectControlProps) => {
  const { name, value, onChange, fields, parents = [], level = 0 } = props;
  const activeToggle = useToggle();
  // const objRef = React.useRef(value ?? {});
  const childParents = [...parents, name];

  const handleClick = () => {
    activeToggle.toggle();
    // onChange?.({ name, value: value ? undefined : objRef.current, parents });
  };

  const handleChildChange = ({ name, value }: any) => {
    onChange?.({
      name,
      value,
      parents: childParents,
    });
  };

  return (
    <Accordion active={activeToggle.active}>
      <PropControlBase name={name} level={level}>
        <Actionable onClick={handleClick}>
          <Text color="disabled" maxLines={1}>
            {`{ ${fields.map((field) => field.name).join(", ")} }`}
          </Text>
        </Actionable>
      </PropControlBase>
      <Accordion.Content>
        <View className={s.objectFields} gap={2} paddingTop={2}>
          {fields.map((field) => (
            <PropControl
              {...field}
              key={field.name}
              parents={childParents}
              level={level + 1}
              value={value?.[field.name] as any}
              onChange={handleChildChange}
            />
          ))}
        </View>
      </Accordion.Content>
    </Accordion>
  );
};

export default PropControlObject;
