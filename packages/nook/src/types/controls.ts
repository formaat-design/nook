export type BaseControlProps = {
  name: string;
  level?: number;
};

export type GenericControlProps<Value extends unknown> = BaseControlProps & {
  parents?: string[];
  value?: Value;
  onChange?: (args: { name: string; value: Value; parents?: string[] }) => void;
};

export type StringControlProps = GenericControlProps<string> & {
  type: "string";
};
export type NumberControlProps = GenericControlProps<number> & {
  type: "number";
};
export type BooleanControlProps = GenericControlProps<boolean> & {
  type: "boolean";
};
export type EnumControlProps = GenericControlProps<string> & {
  type: "enum";
  options: string[];
};
export type SlotControlProps = GenericControlProps<React.ReactNode> & {
  type: "slot";
};
export type ObjectControlProps = GenericControlProps<
  Record<string, unknown> | undefined
> & {
  type: "object";
  fields: Props[];
};
export type ArrayControlProps = GenericControlProps<unknown[]> & {
  type: "array";
  item: Props;
};
export type FunctionControlProps = GenericControlProps<Function | undefined> & {
  type: "function";
};

export type Props =
  | StringControlProps
  | NumberControlProps
  | BooleanControlProps
  | EnumControlProps
  | SlotControlProps
  | ObjectControlProps
  | ArrayControlProps
  | FunctionControlProps;
