import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import styles from "./not-found.module.css";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className={`shell ${styles.main}`}>
        <div className={styles.box}>
          <p className="lede-label">
            <em>404</em>Not found
          </p>
          <h1 className={styles.title}>That page doesn&rsquo;t exist.</h1>
          <p className={styles.body}>
            The link may be outdated or mistyped. Everything real lives on the
            home page.
          </p>
          <Link href="/" className={styles.back}>
            <span className={styles.backArrow} aria-hidden="true">
              ←
            </span>
            Back home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
