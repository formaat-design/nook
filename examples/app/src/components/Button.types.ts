import React from "react";

export type Props = {
  color?:
    | "black"
    | "white"
    | "primary"
    | "critical"
    | "positive"
    | "neutral"
    | "inherit";
  variant?: "solid" | "outline" | "ghost" | "faded";
  elevated?: boolean;
  rounded?: boolean;
  loading?: boolean;
  highlighted?: boolean;
  children?: React.ReactNode;
};
