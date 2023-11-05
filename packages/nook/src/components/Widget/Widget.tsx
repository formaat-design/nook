"use client";

import React from "react";
import {
  View,
  Text,
  Badge,
  Actionable,
  Icon,
  Tooltip,
  useToggle,
  useHotkeys,
  classNames,
} from "reshaped";
import { useNook } from "../NookProvider";
import IconCrosshair from "../../icons/Crosshair";
import s from "./Widget.module.css";

const Widget = () => {
  const nook = useNook();
  const active = nook.mode === "active";
  const rootClassNames = classNames(s.root, active && s["--active"]);

  const handleInspectClick = React.useCallback(() => {
    nook.setMode((prev) => {
      return prev === "inspect" ? "idle" : "inspect";
    });
  }, [nook]);

  useHotkeys(
    {
      "meta+i": handleInspectClick,
    },
    [handleInspectClick],
  );

  return (
    <View
      backgroundColor="elevation-overlay"
      borderColor="neutral-faded"
      borderRadius="medium"
      position="fixed"
      className={rootClassNames}
      insetStart={active ? 4 : 2}
      insetBottom={active ? 4 : 2}
    >
      <View direction="row" gap={3} padding={2} align="center">
        <View.Item grow>
          <Text variant="caption-1" weight="medium">
            Nook
          </Text>
        </View.Item>
        <Tooltip text="⌘I" position="start">
          {(attributes) => (
            <Actionable onClick={handleInspectClick} attributes={attributes}>
              <Icon
                size={4}
                svg={IconCrosshair}
                color={nook.mode === "inspect" ? "primary" : "neutral"}
              />
            </Actionable>
          )}
        </Tooltip>
        <Badge>{Object.keys(nook.components).length} components</Badge>
      </View>
    </View>
  );
};

export default Widget;
