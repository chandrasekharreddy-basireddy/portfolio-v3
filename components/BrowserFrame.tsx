import type { ReactNode } from "react";
import styles from "./visuals/visuals.module.css";

type BrowserFrameProps = {
  url: string;
  children: ReactNode;
  className?: string;
};

export function BrowserFrame({ url, children, className }: BrowserFrameProps) {
  return (
    <figure className={`${styles.frame} ${className ?? ""}`}>
      <div className={styles.chrome} aria-hidden="true">
        <span className={styles.chromeDots} />
        <span className={styles.chromeUrl}>{url}</span>
      </div>
      <div className={styles.chromeBody}>{children}</div>
    </figure>
  );
}
