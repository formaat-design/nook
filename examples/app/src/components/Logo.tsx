import nook from "nook";
import Image from "next/image";
import styles from "../app/page.module.css";

export type Props = {
  src?: string;
  count?: number;
  selected?: boolean;
};

const Logo = (props: Props) => {
  return (
    <div>
      <Image
        className={styles.logo}
        src={props.src || "/next.svg"}
        alt="Next.js Logo"
        width={180}
        height={37}
        priority
        objectFit="cover"
      />
      {props.count ? `Count: ${props.count}` : null}
    </div>
  );
};

export default nook(Logo);
