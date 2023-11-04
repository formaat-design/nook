"use client";

import React from "react";
import s from "./Widget.module.css"
import { View, Text, Loader } from "reshaped"
import { eventBus } from "../NookProvider/NookProvider";

const Widget = () => {
  const [components, setComponents] = React.useState<any>({});

  React.useEffect(() => {
    const data = sessionStorage.getItem("nook");

    if (data) {
      try {
        setComponents(JSON.parse(data));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  React.useEffect(() => {
    const update = (data: any) => {
      setComponents(data.payload);
      sessionStorage.setItem("nook", JSON.stringify(data.payload));
    };

    eventBus.on("update", update);

    return () => {
      eventBus.off("update", update);
    };
  }, []);

  const componentsArray = Object.entries(components);

  return (
    <div className={s.root}>
      <View backgroundColor="elevation-overlay" borderRadius="medium" padding={2} paddingInline={3} gap={3}>
        {componentsArray.length === 0 && (
          <Loader size='small' />
        )}
        {
          componentsArray.map(([k, v]) => {
            return (
              <div key={k}>
                <Text variant="body-3" weight="medium">{v as string}</Text>
                <Text variant="caption-1" weight="regular">{k as string}</Text>
              </div>
            )
          })
        }
      </View>
    </div>
  )
}

export default Widget;