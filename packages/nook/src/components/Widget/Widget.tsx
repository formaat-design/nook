"use client";

import React from "react";
import {
  View,
  Text,
  Badge,
  Actionable,
  Icon,
  Tooltip,
  Button,
  MenuItem,
  useHotkeys,
  classNames,
} from "reshaped";
import type { BuildtimeMetadata } from "nook-types";
import _meta from "nook-build/.nook/meta.json";
import LibraryView from "../LibraryView";
import { useNook } from "../NookProvider";
import PropControls from "../PropControls";
import IconCrosshair from "../../icons/Crosshair";
import { convertProperties } from "../../utilities/docgen";
import s from "./Widget.module.css";

const Widget = () => {
  const { mode, setMode, components, selectedComponentId } = useNook();
  const active = mode === "active" || mode === "library";
  const rootClassNames = classNames(s.root, mode && s[`--mode-${mode}`]);
  const meta = _meta as BuildtimeMetadata;
  const selectedComponent = selectedComponentId
    ? components[selectedComponentId]
    : null;

  const handleInspectClick = React.useCallback(() => {
    setMode((prev) => {
      if (prev === "inspect" || prev === "active") return "idle";
      if (prev === "idle" || prev === "library") return "inspect";
      return prev;
    });
  }, [setMode]);

  useHotkeys(
    {
      "meta+i": handleInspectClick,
      escape: () => setMode("idle"),
    },
    [handleInspectClick, setMode],
  );

  return (
    <>
      <View
        backgroundColor="elevation-overlay"
        borderColor="neutral-faded"
        borderRadius="medium"
        position="fixed"
        zIndex={9999}
        overflow="hidden"
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
          {mode !== "library" && (
            <Badge>{Object.keys(components).length} components</Badge>
          )}
          <Tooltip text="⌘I" position="start">
            {(attributes) => (
              <Actionable onClick={handleInspectClick} attributes={attributes}>
                <Icon
                  size={4}
                  svg={IconCrosshair}
                  color={
                    mode === "inspect" || mode === "active"
                      ? "primary"
                      : "neutral"
                  }
                />
              </Actionable>
            )}
          </Tooltip>
        </View>

        {mode == "active" && (
          <View
            padding={2}
            gap={4}
            direction="row"
            align="stretch"
            grow
            overflow="hidden"
          >
            <View width="180px" gap={2}>
              {selectedComponentId && (
                <MenuItem roundedCorners selected color="neutral">
                  {selectedComponent?.name}
                </MenuItem>
              )}
              <View.Item>
                <Button onClick={() => setMode("library")} variant="faded">
                  Show library
                </Button>
              </View.Item>
            </View>

            <View
              grow
              gap={2}
              padding={3}
              paddingEnd={1}
              backgroundColor="elevation-base"
              borderRadius="medium"
              height="100%"
              className={s.props}
            >
              {selectedComponent && (
                <PropControls
                  id={selectedComponent.id}
                  // values={{
                  //   veryLongLabel: "Hello world",
                  //   min: 2,
                  //   disabled: true,
                  //   data: {
                  //     name: "Nook",
                  //   },
                  //   items: [
                  //     { name: "Nook", type: "Text" },
                  //     { name: "Storybook", type: "Number" },
                  //   ],
                  //   labels: ["foo", "bar", "baz"],
                  //   variant: "primary",
                  //   children: <>111</>,
                  // }}
                  values={{
                    ...selectedComponent.props,
                    ...selectedComponent.overrides,
                  }}
                  controls={convertProperties(
                    meta.components[selectedComponent.name]?.props,
                  )}
                />
              )}
            </View>
          </View>
        )}

        {mode === "library" && <LibraryView />}
      </View>
    </>
  );
};

export default Widget;
