"use client";

import React from "react";
import ReactDOM from "react-dom";
import { useNook } from "../NookProvider";
import type * as T from "./InspectedComponent.types";
import s from "./InspectedComponent.module.css";

const Context = React.createContext<(value: boolean) => void>(() => {});

const useSetParentDisabled = () => React.useContext(Context);

const InspectedComponent = (props: T.Props) => {
  const { children, name, id, onClick } = props;
  const [disabled, setDisabled] = React.useState(false);
  const { mode, setMode, selectedComponentId } = useNook();
  const setParentDisabled = useSetParentDisabled();
  const [childCount, setChildCount] = React.useState(0);
  const [selectionStyle, setSelectionStyle] =
    React.useState<T.SelectionStyle | null>(null);
  const elRef = React.useRef<HTMLElement | null>(null);
  const inspecting = mode === "inspect" || mode === "active";

  const handleComponentMouseEnter = (e: React.MouseEvent) => {
    if (!inspecting) return;

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
    setParentDisabled(false);
    if (id !== selectedComponentId) {
      setSelectionStyle(null);
    }
  };

  React.useEffect(() => {
    if (id === selectedComponentId && inspecting) return;
    setSelectionStyle(null);
  }, [selectedComponentId, id, inspecting]);

  React.useEffect(() => {
    if (!inspecting) return;

    const elChild = elRef.current?.firstElementChild;
    const handleInspect = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      setMode("active");
      onClick();
    };

    elChild?.addEventListener("click", handleInspect);
    return () => elChild?.removeEventListener("click", handleInspect);
  }, [inspecting, setMode, onClick]);

  return (
    <Context.Provider value={setDisabled}>
      <span
        className={s.el}
        ref={elRef}
        onMouseOver={handleComponentMouseEnter}
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
          <div className={s.selection} style={selectionStyle}>
            <span className={s.name}>
              {name}
              {!!childCount && ` + ${childCount} more`}
            </span>
          </div>,
          document.body,
        )}
    </Context.Provider>
  );
};

export default InspectedComponent;
