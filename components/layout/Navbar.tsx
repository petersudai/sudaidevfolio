"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#work",     label: "Work"     },
  { href: "#services", label: "Services" },
  { href: "#about",    label: "About"    },
  { href: "#process",  label: "Process"  },
];

export function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [mobile,    setMobile]    = useState(false);
  const [active,    setActive]    = useState("");

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 40);
      const ids = ["contact","process","about","services","work"];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 inset-x-0 z-50 transition-all duration-500",
      scrolled
        ? "py-3 bg-[#070f18]/90 backdrop-blur-2xl border-b border-white/[0.06]"
        : "py-5 bg-transparent"
    )}>
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="group flex items-center gap-2.5">
          <div className="relative w-9 h-9 rounded-xl bg-teal-500/10 flex items-center justify-center transition-all duration-300 group-hover:bg-teal-500/15">
            {/* Border draws itself in on load */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 36 36" fill="none" aria-hidden="true">
              <rect x="0.75" y="0.75" width="34.5" height="34.5" rx="11"
                    stroke="var(--ac)" strokeWidth="1.5" strokeOpacity="0.45"
                    className="logo-draw" />
            </svg>
            <span className="font-heading font-bold text-xs text-teal-400 tracking-tight">PS</span>
          </div>
          <span className="font-heading font-bold text-[15px] text-ink-1 tracking-tight">
            Sudai<span className="text-teal-500">.</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-0.5">
          {links.map(l => {
            const id = l.href.slice(1);
            const on = active === id;
            return (
              <li key={l.href}>
                <a href={l.href} className={cn(
                  "relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  on ? "text-teal-300" : "text-ink-2 hover:text-ink-1 hover:bg-white/[0.04]"
                )}>
                  {on && <span className="absolute inset-0 rounded-xl bg-teal-500/[0.07] border border-teal-500/[0.14]" />}
                  <span className="relative">{l.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right */}
        <div className="hidden md:flex items-center gap-4">
          <a href="https://github.com/petersudai" target="_blank" rel="noopener noreferrer"
             className="font-mono text-xs text-ink-3 hover:text-teal-400 transition-colors duration-200">
            petersudai
          </a>
          <a href="#contact"
             className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-500 hover:bg-teal-400 text-surface-1 font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(20,184,166,0.4)]">
            Let&apos;s talk
            <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobile(!mobile)}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-white/[0.05] transition-colors"
          aria-label="Menu">
          <span className={cn("w-5 h-px bg-ink-2 transition-all duration-300 origin-center", mobile && "rotate-45 translate-y-[5px]")} />
          <span className={cn("w-5 h-px bg-ink-2 transition-all duration-300", mobile && "opacity-0")} />
          <span className={cn("w-5 h-px bg-ink-2 transition-all duration-300 origin-center", mobile && "-rotate-45 -translate-y-[5px]")} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={cn(
        "md:hidden overflow-hidden transition-all duration-300",
        mobile ? "max-h-80" : "max-h-0"
      )}>
        <div className="border-t border-white/[0.06] bg-[#070f18]/95 backdrop-blur-2xl px-6 py-4 space-y-1">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMobile(false)}
               className="block px-4 py-3 rounded-xl text-sm text-ink-2 hover:text-ink-1 hover:bg-white/[0.04] transition-all">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMobile(false)}
             className="block mt-2 px-4 py-3 rounded-full bg-teal-500 text-surface-1 text-center text-sm font-semibold">
            Let&apos;s talk →
          </a>
        </div>
      </div>
    </header>
  );
}
