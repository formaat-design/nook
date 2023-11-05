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
  const { register, unregister, mode, setMode } = useNook();
  const setParentDisabled = useSetParentDisabled();
  const [childCount, setChildCount] = React.useState(0);
  const [selectionStyle, setSelectionStyle] =
    React.useState<T.SelectionStyle | null>(null);
  const elRef = React.useRef<HTMLElement | null>(null);

  const handleComponentMouseEnter = (e: React.MouseEvent) => {
    if (mode !== "inspect") return;

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

  const handleSelectionMouseLeave = () => {
    setSelectionStyle(null);
    setParentDisabled(false);
  };

  React.useEffect(() => {
    register(id, { name });

    return () => {
      unregister(id);
    };
  }, [id, register, unregister, name]);

  React.useEffect(() => {
    if (mode !== "inspect") return;

    const elChild = elRef.current?.firstElementChild;
    const handleInspect = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      setMode("active");
    };

    elChild?.addEventListener("click", handleInspect);
    return () => elChild?.removeEventListener("click", handleInspect);
  }, [mode, setMode]);

  return (
    <Context.Provider value={setDisabled}>
      <span
        className={s.el}
        ref={elRef}
        onMouseEnter={handleComponentMouseEnter}
        onMouseLeave={handleSelectionMouseLeave}
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
