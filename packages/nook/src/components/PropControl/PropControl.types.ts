/**
 * TODO: 
Object
Array
Function
Node
Date
 */

export type BaseControlProps = {
  name: string;
};

export type GenericControlProps<Value extends unknown> = BaseControlProps & {
  value: Value;
  onChange: (args: { name: string; value: Value }) => void;
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

export type ControlProps =
  | StringControlProps
  | NumberControlProps
  | BooleanControlProps
  | EnumControlProps;
