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
  useHotkeys,
  classNames,
} from "reshaped";
import LibraryView from "../LibraryView";
import { useNook } from "../NookProvider";
import PropControl from "../PropControl";
import IconCrosshair from "../../icons/Crosshair";
import s from "./Widget.module.css";

const Widget = () => {
  const { mode, setMode, components, selectedComponent } = useNook();
  const active = mode === "active" || mode === "library";
  const rootClassNames = classNames(s.root, mode && s[`--mode-${mode}`]);

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
          <View padding={2} gap={2}>
            {selectedComponent && components[selectedComponent.id]?.name}
            <Button onClick={() => setMode("library")} variant="faded">
              Show library
            </Button>

            <PropControl
              type="string"
              name="Very long label"
              value="Hello world"
              onChange={() => {}}
            />

            <PropControl
              type="number"
              name="min"
              value={2}
              onChange={() => {}}
            />

            <PropControl
              type="boolean"
              name="disabled"
              value={true}
              onChange={() => {}}
            />

            <PropControl
              type="enum"
              name="variant"
              value="primary"
              options={["primary", "secondary"]}
              onChange={() => {}}
            />
          </View>
        )}

        {mode === "library" && <LibraryView />}
      </View>
    </>
  );
};

export default Widget;
