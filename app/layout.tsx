import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://petersudai.dev"),
  title: "Peter Sudai — Fullstack Developer | Web Apps, SaaS & Backend Systems",
  description: "Fullstack developer based in Nairobi, Kenya. I build web apps, SaaS products, and backend systems that help businesses acquire more customers and generate more revenue.",
  keywords: ["fullstack developer", "web developer", "Next.js", "Python", "Nairobi", "Kenya", "SaaS", "freelance developer", "React developer", "backend developer", "M-Pesa integration"],
  authors: [{ name: "Peter Gathuku Sudai" }],
  openGraph: {
    title: "Peter Sudai — Fullstack Developer",
    description: "I build web apps, SaaS products, and backend systems that make businesses grow.",
    type: "website",
    locale: "en_US",
    url: "https://petersudai.dev",
    siteName: "Peter Sudai",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peter Sudai — Fullstack Developer",
    description: "I build web apps, SaaS products, and backend systems that make businesses grow.",
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
  name: "Peter Gathuku Sudai",
  jobTitle: "Fullstack Developer",
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
  knowsAbout: ["Next.js", "React", "TypeScript", "Python", "Flask", "Node.js", "Supabase", "PostgreSQL", "SaaS Development", "REST APIs"],
  offers: {
    "@type": "Offer",
    description: "Fullstack web development services including SaaS products, web apps, APIs, and custom software solutions.",
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
          href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
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
        <script
          src="https://assets.calendly.com/assets/external/widget.js"
          type="text/javascript"
          async
        />
      </body>
    </html>
  );
}
