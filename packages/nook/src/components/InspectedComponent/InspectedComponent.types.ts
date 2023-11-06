import React from "react";

export type Props = {
  children: React.ReactNode;
  name: string;
  id: string;
  onClick: () => void;
};

export type SelectionStyle = {
  top: number;
  left: number;
  width: number;
  height: number;
};
