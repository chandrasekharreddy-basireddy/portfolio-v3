"use client";

import { useEffect, useState } from "react";
import styles from "./visuals.module.css";

const START_SECONDS = 18 * 60 + 42;

function format(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * Bespoke miniature of the actual Survival School exam screen. The timer
 * ticks down for real; the content is a genuine question from the product
 * domain. Decorative: the facts it shows are duplicated in the text column.
 */
export function SurvivalSchoolVisual() {
  const [secondsLeft, setSecondsLeft] = useState(START_SECONDS);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setSecondsLeft((left) => (left > 0 ? left - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <div className={styles.ssHeader}>
        <span className={styles.vLabel}>Mock exam · Physics</span>
        <div className={styles.ssMeta}>
          <span className={`${styles.vChip} ${styles.vChipAccent} ${styles.tnum}`}>
            <span className={styles.timerDot} aria-hidden="true" />
            {format(secondsLeft)}
          </span>
          <span className={`${styles.vChip} ${styles.tnum}`}>Q 12 / 30</span>
        </div>
      </div>

      <p className={styles.ssQuestion}>
        In TCP congestion control, what happens when a packet is dropped before
        an acknowledgement is received?
      </p>

      <div className={styles.ssOptions}>
        <div className={styles.ssOption}>
          <span className={styles.ssOptionKey}>A</span>
          The window size doubles immediately
        </div>
        <div className={`${styles.ssOption} ${styles.ssOptionSelected}`}>
          <span className={styles.ssOptionKey}>B</span>
          The window is reduced and retransmission begins
        </div>
        <div className={styles.ssOption}>
          <span className={styles.ssOptionKey}>C</span>
          The connection resets to slow start
        </div>
        <div className={styles.ssOption}>
          <span className={styles.ssOptionKey}>D</span>
          The receiver requests a new connection
        </div>
      </div>

      <div className={styles.ssFooter}>
        <span className={styles.vLabel}>Score kept server-side</span>
        <span className={styles.ssSubmit}>Submit</span>
      </div>
    </>
  );
}
