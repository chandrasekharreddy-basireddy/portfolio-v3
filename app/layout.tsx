import type { Metadata, Viewport } from "next";
import "@fontsource/instrument-sans/400.css";
import "@fontsource/instrument-sans/500.css";
import "@fontsource/instrument-sans/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@/styles/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: "Chandra Sekhar Reddy Basireddy — Computer Science Student & Developer",
    template: "%s — Chandra Sekhar Reddy Basireddy",
  },
  description:
    "Computer Science student at Sai University. I build software to understand how systems really work — a learning platform, a security-first messaging app and a walkable 3D world.",
  openGraph: {
    title: "Chandra Sekhar Reddy Basireddy",
    description:
      "Computer Science student at Sai University. I build software to understand how systems really work.",
    url: "/",
    siteName: "Chandra Sekhar Reddy Basireddy",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Chandra Sekhar Reddy Basireddy — Computer Science Student & Developer",
      },
    ],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f6f2",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  email: `mailto:${site.email}`,
  url: site.siteUrl,
  jobTitle: "Computer Science Student",
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "Sai University",
  },
  sameAs: [site.github, site.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
