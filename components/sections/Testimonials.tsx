"use client";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
    o.observe(el); return () => o.disconnect();
  }, [ref]);
  return v;
}

const PILLARS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: "You're buying outcomes, not hours",
    body: "Every decision I make ties back to your business goal: more customers, more revenue, less friction. Code is the tool, not the deliverable.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.5a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    title: "You'll always know where things stand",
    body: "Regular builds you can actually test. Fast replies. No radio silence. I treat your project like it matters. Because it does.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    title: "I'll tell you what you don't need",
    body: "If a feature will slow you down without adding real value, I'll say so. Even when it means less work for me. You deserve honest advice, not yes-man billing.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
    title: "Production quality from day one",
    body: "Not \"good enough for now\" code. I build systems architected to scale, so you're not paying another developer to rewrite it in 6 months.",
  },
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const v   = useInView(ref);

  return (
    <section className="py-28 relative" style={{ background: "var(--s2)" }}>
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(20,184,166,0.12),transparent)" }}/>

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <div className={cn("mb-16 transition-all duration-700", v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5")}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px" style={{ background: "var(--ac)" }}/>
            <span className="font-mono text-2xs" style={{ color: "var(--ac)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Why clients choose me</span>
          </div>
          <h2 className="font-heading" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "var(--t1)", marginBottom: "1rem" }}>
            What it&apos;s actually like<br/>to work with me
          </h2>
          <p style={{ fontSize: "15px", color: "var(--t2)", maxWidth: "440px", lineHeight: 1.7 }}>
            Four things serious clients consistently tell me matter more than any resume line.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {PILLARS.map((p, i) => (
            <div key={p.title}
                 className={cn(
                   "group relative rounded-3xl p-7 flex flex-col gap-4 transition-all duration-500 cursor-default",
                   v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                 )}
                 style={{
                   background: "var(--s4)",
                   border: "1px solid rgba(255,255,255,0.06)",
                   transitionDelay: v ? `${i * 80}ms` : "0ms",
                 }}
                 onMouseEnter={e => {
                   (e.currentTarget as HTMLElement).style.borderColor = "rgba(20,184,166,0.18)";
                   (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
                   (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(20,184,166,0.07)";
                 }}
                 onMouseLeave={e => {
                   (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                   (e.currentTarget as HTMLElement).style.transform = "";
                   (e.currentTarget as HTMLElement).style.boxShadow = "";
                 }}>

              {/* Icon */}
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
                   style={{ background: "rgba(20,184,166,0.08)", border: "1px solid rgba(20,184,166,0.14)", color: "var(--ac)" }}>
                {p.icon}
              </div>

              <div>
                <h3 className="font-heading font-bold mb-2 transition-colors duration-300 group-hover:text-teal-300"
                    style={{ fontSize: "17px", color: "var(--t1)", lineHeight: 1.3 }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: "14px", color: "var(--t3)", lineHeight: 1.75, fontWeight: 400 }}>
                  {p.body}
                </p>
              </div>

              {/* Subtle accent corner */}
              <div className="absolute top-0 right-0 w-24 h-24 rounded-3xl pointer-events-none overflow-hidden">
                <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                     style={{ background: "radial-gradient(ellipse,rgba(20,184,166,0.06) 0%,transparent 70%)" }} />
              </div>
            </div>
          ))}
        </div>

        {/* CTA nudge */}
        <div className={cn("mt-14 text-center transition-all duration-700 delay-400", v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
          <p className="mb-5" style={{ fontSize: "15px", color: "var(--t3)" }}>
            Sounds like the kind of developer you&apos;re looking for?
          </p>
          <a href="#contact"
             className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-heading font-semibold text-sm transition-all duration-300 hover:-translate-y-1"
             style={{ background: "var(--ac)", color: "var(--s1)" }}
             onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="#0d9488"; (e.currentTarget as HTMLElement).style.boxShadow="0 10px 28px rgba(20,184,166,0.4)"; }}
             onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="var(--ac)"; (e.currentTarget as HTMLElement).style.boxShadow=""; }}>
            Let&apos;s talk about your project
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(20,184,166,0.08),transparent)" }}/>
    </section>
  );
}
