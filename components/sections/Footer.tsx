"use client";
import { useEffect, useState } from "react";

export function Footer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative pt-12 pb-24 md:pb-12" style={{ background: "var(--s0)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center font-heading font-bold text-[11px]"
               style={{ background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.2)", color: "var(--ac)" }}>PS</div>
          <span className="font-heading font-bold text-sm" style={{ color: "var(--t4)" }}>
            Sudai<span style={{ color: "var(--ac)" }}>.</span>
          </span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {[
            { label: "Work",     href: "#work"                          },
            { label: "Services", href: "#services"                      },
            { label: "About",    href: "#about"                         },
            { label: "GitHub",   href: "https://github.com/petersudai"  },
            { label: "Email",    href: "mailto:psudai@gmail.com"        },
          ].map(l => (
            <a key={l.label} href={l.href}
               className="text-xs transition-colors duration-200"
               style={{ color: "var(--t3)" }}
               onMouseEnter={e => (e.currentTarget.style.color = "var(--t1)")}
               onMouseLeave={e => (e.currentTarget.style.color = "var(--t3)")}>
              {l.label}
            </a>
          ))}
        </div>

        {/* Copyright + colophon */}
        <div className="text-center md:text-right" style={{ color: "var(--t3)" }}>
          <div className="text-xs" style={{ lineHeight: 1.6, letterSpacing: "0.06em" }}>
            © {new Date().getFullYear()} Peter Sudai
          </div>
          <div className="mt-2" style={{ fontSize: "11px", letterSpacing: "0.05em", lineHeight: 1.6, color: "var(--t4)" }}>
            Designed and built in <span className="font-serif-display" style={{ color: "var(--ac3)" }}>Nairobi</span>
          </div>
        </div>
      </div>

      {/* Scroll-to-top button */}
      <button
        onClick={scrollTop}
        aria-label="Scroll to top"
        className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          background: "rgba(20,184,166,0.12)",
          border: "1px solid rgba(20,184,166,0.25)",
          color: "var(--ac)",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transform: visible ? "translateY(0)" : "translateY(12px)",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = "rgba(20,184,166,0.22)";
          e.currentTarget.style.borderColor = "rgba(20,184,166,0.5)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = "rgba(20,184,166,0.12)";
          e.currentTarget.style.borderColor = "rgba(20,184,166,0.25)";
          e.currentTarget.style.transform = visible ? "translateY(0)" : "translateY(12px)";
        }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </footer>
  );
}
