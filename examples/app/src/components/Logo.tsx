import nook from "nook";
import Image from "next/image";
import styles from "../app/page.module.css";

export type Props = {
  src?: string;
  foo2?: number;
};

const Logo = (props: Props) => {
  return (
    <Image
      className={styles.logo}
      src={props.src || "/next.svg"}
      alt="Next.js Logo"
      width={180}
      height={37}
      priority
    />
  );
};

export default nook(Logo);
