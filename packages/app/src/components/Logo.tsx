import * as React from "react";
import nook from "nook";
import Image from "next/image";
import styles from "../app/page.module.css";

const Logo: React.FC<{ color: 'red' | 'green' | 'orage' }> = () => {
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
