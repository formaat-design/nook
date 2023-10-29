"use client";

import React from "react";
import ReactDOM from "react-dom";
import { useNook } from "../NookProvider";
import type * as T from "./InspectedComponent.types";
import s from "./InspectedComponent.module.css";

const Context = React.createContext<(value: boolean) => void>(() => {});

const useSetParentDisabled = () => React.useContext(Context);

const InspectedComponent = (props: T.Props) => {
  const { children, name, id } = props;
  const [disabled, setDisabled] = React.useState(false);
  const { register, unregister } = useNook();
  const setParentDisabled = useSetParentDisabled();
  const [childCount, setChildCount] = React.useState(0);
  const [selectionStyle, setSelectionStyle] =
    React.useState<T.SelectionStyle | null>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    const el = e.currentTarget.firstChild as HTMLElement | undefined;

    if (!el) return;

    const rect = el.getBoundingClientRect();
    const nookChildren = el.querySelectorAll("[data-nook-id]");

    setParentDisabled(true);
    setChildCount(nookChildren?.length || 0);
    setSelectionStyle({
      left: rect.left - 6,
      top: rect.top - 6,
      width: rect.width + 12,
      height: rect.height + 12,
    });
  };

  const handleMouseLeave = () => {
    setSelectionStyle(null);
    setParentDisabled(false);
  };

  React.useEffect(() => {
    register(id, { name });

    return () => {
      unregister(id);
    };
  }, [id, register, unregister, name]);

  return (
    <Context.Provider value={setDisabled}>
      <span
        className={s.el}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-nook-id={id}
        data-nook-active={!!selectionStyle}
      >
        {children}
      </span>

      {!disabled &&
        !!selectionStyle &&
        typeof document !== "undefined" &&
        ReactDOM.createPortal(
          <span className={s.selection} style={selectionStyle}>
            <span className={s.name}>
              {name}
              {!!childCount && ` + ${childCount} more`}
            </span>
          </span>,
          document.body,
        )}
    </Context.Provider>
  );
};

export default InspectedComponent;
