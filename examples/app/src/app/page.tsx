"use client";

import { NookProvider } from "nook";
import { Reshaped } from "reshaped";
import Button from "../components/Button";
import Logo from "../components/Logo";
import styles from "./page.module.css";
import "reshaped/themes/reshaped/theme.css";

export default function Home() {
  return (
    <Reshaped>
      <NookProvider>
        <main className={styles.main}>
          <div className={styles.description}>
            <p>
              Get started by editing&nbsp;
              <code className={styles.code}>src/app/page.tsx</code>
            </p>
          </div>

          <Button>Hello</Button>

          <div className={styles.center}>
            <Logo />
          </div>
        </main>
      </NookProvider>
    </Reshaped>
  );
}
