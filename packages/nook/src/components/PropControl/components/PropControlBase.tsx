import { View, Text } from "reshaped";
import type * as T from "../PropControl.types";

const PropControlBase = (
  props: T.BaseControlProps & { children: React.ReactNode },
) => {
  const { name, children } = props;

  return (
    <Text variant="caption-1">
      <View as="label" direction="row" gap={2} align="center">
        <View width="80px">
          <Text maxLines={1}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Text>
        </View>
        <View.Item grow>{children}</View.Item>
      </View>
    </Text>
  );
};

export default PropControlBase;
