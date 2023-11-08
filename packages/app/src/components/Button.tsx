import nook from "nook";
import { Button as RSButton } from "reshaped";
import Logo from "./Logo";

const Button = (props: any) => {
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
