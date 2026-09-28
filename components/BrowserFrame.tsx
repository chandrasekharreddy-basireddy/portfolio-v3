import type { ReactNode } from "react";
import styles from "./visuals/visuals.module.css";

type BrowserFrameProps = {
  url: string;
  children: ReactNode;
  className?: string;
};

export function BrowserFrame({ url, children, className }: BrowserFrameProps) {
  return (
    <figure className={`${styles.frame} ${className ?? ""}`} aria-hidden="true">
      <div className={styles.chrome}>
        <span className={styles.chromeDots} />
        <span className={styles.chromeUrl}>{url}</span>
      </div>
      <div className={styles.chromeBody}>{children}</div>
    </figure>
  );
}
