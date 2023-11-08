import * as React from "react";
import nook from "nook";
import Image from "next/image";
import styles from "../app/page.module.css";

/**
 * ### Logo
 * This is a component that is used in the app and is also used in the `nook` library view.
 */
const Logo: React.FC<{
  /**
   * ### Color
   * **Logo** has a color prop that can be either `red` or `green`
   */
  color: 'red' | 'green'
}> = () => {
  return (
    <Image
      className={styles.logo}
      src="/next.svg"
      alt="Next.js Logo"
      width={180}
      height={37}
      priority
    />
  );
};

export default nook(Logo);
