import { View, Text } from "reshaped";
import type * as T from "../PropControl.types";

const PropControlBase = (
  props: T.BaseControlProps & {
    children: React.ReactNode;
  },
) => {
  const { name, children, level = 0 } = props;
  // Level is calculated separately from parents since Array control works different from other controls
  // Instead of allowing its child control to handle the parent – it adds its name + child index and ignores the item name field
  const width = 100 - 8 * level;

  return (
    <Text variant="caption-1">
      <View as="label" direction="row" gap={2} align="center">
        <View width={`${width}px`}>
          <Text maxLines={1}>{name}</Text>
        </View>
        <View grow justify="center">
          {children}
        </View>
      </View>
    </Text>
  );
};

export default PropControlBase;
