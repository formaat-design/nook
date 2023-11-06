import PropControlString from "./components/PropControlString";
import PropControlNumber from "./components/PropControlNumber";
import PropControlBoolean from "./components/PropControlBoolean";
import PropControlEnum from "./components/PropControlEnum";
import type * as T from "./PropControl.types";

const PropControl = (props: T.ControlProps) => {
  switch (props.type) {
    case "string":
      return <PropControlString {...props} />;
    case "number":
      return <PropControlNumber {...props} />;
    case "boolean":
      return <PropControlBoolean {...props} />;
    case "enum":
      return <PropControlEnum {...props} />;
    default:
      throw new Error("Nook: Unsupported property control type");
  }
};

export default PropControl;
