import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="shell" style={{ minHeight: "70svh", display: "grid", alignContent: "center" }}>
        <div style={{ maxWidth: "46ch" }}>
          <p className="lede-label">
            <em>404</em>Not found
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginTop: "1rem",
            }}
          >
            This page doesn't exist.
          </h1>
          <p style={{ color: "var(--ink-soft)", marginTop: "1rem" }}>
            The link may be outdated — everything real lives on the{" "}
            <Link href="/" className="link">
              home page
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
