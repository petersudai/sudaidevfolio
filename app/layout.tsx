import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";

export const metadata: Metadata = {
  metadataBase: new URL("https://petersudai.dev"),
  title: "Peter Sudai | Fullstack Developer & Product Designer",
  description: "Fullstack developer and product designer in Nairobi, Kenya. I design and build brand sites, web apps and platforms with studio level polish and engineering built to last.",
  keywords: ["fullstack developer", "product designer", "web designer", "Next.js", "Python", "Nairobi", "Kenya", "brand websites", "freelance developer", "React developer", "UI design", "M-Pesa integration"],
  authors: [{ name: "Peter Sudai" }],
  openGraph: {
    title: "Peter Sudai | Fullstack Developer & Product Designer",
    description: "Brand sites, products and platforms. Designed and engineered end to end.",
    type: "website",
    locale: "en_US",
    url: "https://petersudai.dev",
    siteName: "Peter Sudai",
    images: [{ url: "https://petersudai.dev/og", width: 1200, height: 630, alt: "Peter Sudai | Fullstack Developer & Product Designer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Peter Sudai | Fullstack Developer & Product Designer",
    description: "Brand sites, products and platforms. Designed and engineered end to end.",
    images: ["https://petersudai.dev/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Peter Sudai",
  jobTitle: "Fullstack Developer & Product Designer",
  url: "https://petersudai.dev",
  email: "psudai@gmail.com",
  sameAs: [
    "https://github.com/petersudai",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  knowsAbout: ["Product Design", "UI/UX Design", "Brand Websites", "Next.js", "React", "TypeScript", "Python", "Node.js", "Supabase", "PostgreSQL", "SaaS Development", "REST APIs"],
  offers: {
    "@type": "Offer",
    description: "Design and development of brand sites, web apps, SaaS products and custom platforms, handled end to end from design to deployment.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Instrument+Serif:ital@1&display=swap"
          rel="stylesheet"
        />
        {/* Calendly popup widget */}
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <SmoothScroll />
        <ScrollProgress />
        <CustomCursor />
        <Analytics />
        <script
          src="https://assets.calendly.com/assets/external/widget.js"
          type="text/javascript"
          async
        />
      </body>
    </html>
  );
}
