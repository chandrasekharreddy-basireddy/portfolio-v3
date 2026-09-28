import styles from "./visuals.module.css";

export function SurvivalSchoolVisual() {
  return (
    <>
      <div className={styles.ssHeader}>
        <span className={styles.vLabel}>Mock exam · Physics</span>
        <div className={styles.ssMeta}>
          <span className={`${styles.vChip} ${styles.vChipAccent}`}>
            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--accent)",
              }}
            />
            18:42
          </span>
          <span className={styles.vChip}>Q 12 / 30</span>
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
