import PropControlString from "./components/PropControlString";
import PropControlNumber from "./components/PropControlNumber";
import PropControlBoolean from "./components/PropControlBoolean";
import PropControlEnum from "./components/PropControlEnum";
import PropControlSlot from "./components/PropControlSlot";
import PropControlObject from "./components/PropControlObject";
import PropControlArray from "./components/PropControlArray";
import PropControlFunction from "./components/PropControlFunction";
import type * as T from "../../types/controls";

const PropControl = (props: T.Props) => {
  switch (props.type) {
    case "string":
      return <PropControlString {...props} />;
    case "number":
      return <PropControlNumber {...props} />;
    case "boolean":
      return <PropControlBoolean {...props} />;
    case "enum":
      return <PropControlEnum {...props} />;
    case "slot":
      return <PropControlSlot {...props} />;
    case "object":
      return <PropControlObject {...props} />;
    case "array":
      return <PropControlArray {...props} />;
    case "function":
      return <PropControlFunction {...props} />;
    default:
      throw new Error("Nook: Unsupported property control type");
  }
};

export default PropControl;
