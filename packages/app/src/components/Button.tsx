import nook from "nook";
import { Button as RSButton } from "reshaped";
import Logo from "./Logo";
import { Props } from "./Button.types";

const Button = (props: Props) => {
  return (
    <RSButton {...props} onClick={() => console.log("11111")}>
      {props.children}
      <br />
      <br />
      <Logo />
    </RSButton>
  );
};

export default nook(Button);
