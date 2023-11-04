"use client";

import s from "./Widget.module.css"
import { View, Text } from "reshaped"

const Widget = () => {
  return (
    <div className={s.root}>
      <View backgroundColor="elevation-overlay" borderRadius="medium" padding={2} paddingInline={3}>
        <Text variant="caption-1" weight="medium">Nook</Text>
      </View>
    </div>
  )
}

export default Widget;