"use client";

import { View, Accordion, Text, useToggle, Actionable } from "reshaped";
import PropControlBase from "./PropControlBase";
import PropControl from "../PropControl";
import type * as T from "../PropControl.types";
import s from "../PropControl.module.css";

const PropControlArray = (props: T.ArrayControlProps) => {
  const { name, value, onChange, item, parents = [], level = 0 } = props;
  const activeToggle = useToggle();

  const handleClick = () => {
    if (!value?.length) return;
    activeToggle.toggle();
  };

  return (
    <Accordion active={activeToggle.active}>
      <PropControlBase name={name} level={level}>
        <Actionable onClick={handleClick}>
          <Text color="disabled" maxLines={1}>
            {`[ ${value?.length || "0"} ]`}
          </Text>
        </Actionable>
      </PropControlBase>
      {value?.length && (
        <Accordion.Content>
          <View className={s.objectFields} gap={2} paddingTop={2}>
            {value.map((itemValue, index) => {
              const itemName = index.toString();
              const childParents = [...parents, name, itemName];

              const handleChildChange = ({ name, value }: any) => {
                onChange?.({
                  name,
                  value,
                  parents: childParents,
                });
              };

              return (
                <PropControl
                  {...item}
                  name={itemName}
                  key={index}
                  parents={childParents}
                  level={level + 1}
                  onChange={handleChildChange}
                  value={itemValue as any}
                />
              );
            })}
          </View>
        </Accordion.Content>
      )}
    </Accordion>
  );
};

export default PropControlArray;
