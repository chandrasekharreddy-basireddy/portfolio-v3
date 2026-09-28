import Link from "next/link";
import styles from "./not-found.module.css";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main id="main" className={`shell ${styles.main}`}>
      <div className={styles.box}>
        <p className="lede-label">
          <em>404</em>Not found
        </p>
        <h1 className={styles.title}>I couldn’t find that page.</h1>
        <p className={styles.body}>
          The address might be off. You can go back to the{" "}
          <Link href="/#work" className="link">
            projects
          </Link>
          , or start again from the{" "}
          <Link href="/" className="link">
            home page
          </Link>
          .
        </p>
        <div className={styles.actions}>
          <Link href="/#work" className={`button button--primary ${styles.action}`}>
            Browse projects
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="/" className={`button ${styles.action}`}>
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
