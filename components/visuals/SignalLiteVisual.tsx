import styles from "./visuals.module.css";

export function SignalLiteVisual() {
  return (
    <>
      <div className={styles.slLayout}>
        <div className={styles.slSidebar}>
          <span className={styles.vLabel}>Conversations</span>
          <div className={`${styles.slConversation} ${styles.slConversationActive}`}>
            <span># systems-study</span>
            <span className={styles.slUnread}>3 new</span>
          </div>
          <div className={styles.slConversation}>
            <span>exam-squad</span>
          </div>
          <div className={styles.slConversation}>
            <span>hostel-ott</span>
          </div>
          <div className={styles.slConversation}>
            <span>project-sync</span>
          </div>
        </div>

        <div className={styles.slChat}>
          <span className={styles.vLabel}># systems-study</span>

          <div className={styles.slMessage}>
            so the refresh token lives in an HttpOnly cookie?
            <div className={styles.slMessageMeta}>
              <span>14:02</span>
              <span>✓✓ read</span>
            </div>
          </div>

          <div className={`${styles.slMessage} ${styles.slMessageMine}`}>
            right — and it rotates on every use, so a stolen one dies the second
            it's replayed
            <div className={styles.slMessageMeta}>
              <span>14:02</span>
              <span>✓✓ read</span>
            </div>
          </div>

          <div className={styles.slMessage}>
            and the whole family gets revoked?
            <div className={styles.slMessageMeta}>
              <span>14:03</span>
              <span>✓ sent</span>
            </div>
          </div>

          <div className={styles.slStatusRow}>
            <span className={styles.vChip}>
              <span className={styles.vDot} />
              ws · connected
            </span>
            <span className={styles.vChip}>refresh rotated 14:02</span>
          </div>
        </div>
      </div>
    </>
  );
}
