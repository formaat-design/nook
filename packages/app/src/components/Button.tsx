import nook from "nook"
import { Button as RSButton } from "reshaped";
import Logo from "./Logo";

const Button = (props: any) => {
  return (
    <RSButton {...props}>
      {props.children}
      <br />
      <br />
      <Logo />
    </RSButton>
  );
};

export default nook(Button);
