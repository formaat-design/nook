"use client";

import s from "./Widget.module.css";
import {
  View,
  Text,
  Badge,
  Actionable,
  Icon,
  useToggle,
  useHotkeys,
  classNames,
} from "reshaped";
import { useNook } from "../NookProvider";
import IconCrosshair from "../../icons/Crosshair";

const Widget = () => {
  const nook = useNook();
  const activeToggle = useToggle();
  const rootClassNames = classNames(
    s.root,
    activeToggle.active && s["--active"],
  );

  useHotkeys({
    "meta+i": activeToggle.toggle,
  });

  return (
    <View
      backgroundColor="elevation-overlay"
      borderColor="neutral-faded"
      borderRadius="medium"
      position="fixed"
      className={rootClassNames}
    >
      <View direction="row" gap={3} padding={2} align="center">
        <View.Item grow>
          <Text variant="caption-1" weight="medium">
            Nook
          </Text>
        </View.Item>
        <Actionable onClick={activeToggle.toggle}>
          <Icon
            size={4}
            svg={IconCrosshair}
            color={activeToggle.active ? "primary" : "neutral"}
          />
        </Actionable>
        <Badge>{Object.keys(nook.components).length} components</Badge>
      </View>
    </View>
  );
};

export default Widget;
