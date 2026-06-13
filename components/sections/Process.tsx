"use client";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CalendlyButton } from "@/components/CalendlyButton";

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.08 });
    o.observe(el); return () => o.disconnect();
  }, [ref]);
  return v;
}

const steps = [
  { num:"01", title:"Discovery call",     desc:"We talk through your goals, constraints, and what success looks like. No pressure, no pitch. Just an honest conversation.", icon:"💬" },
  { num:"02", title:"Scoping & proposal", desc:"I define scope, timeline, and deliverables in a clear written proposal. No ambiguity, no scope creep, no surprises.",         icon:"📋" },
  { num:"03", title:"Architecture first", desc:"I map the technical architecture and UI flow before writing code. Good systems start with good thinking.",                    icon:"🏗️" },
  { num:"04", title:"Build & iterate",    desc:"Regular updates, working builds early, fast feedback cycles. You're never left wondering what's happening.",                  icon:"⚡" },
  { num:"05", title:"Launch & handoff",   desc:"Clean deployment, full documentation, and post-launch support so your team owns it confidently from day one.",               icon:"🚀" },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const v   = useInView(ref);
  const [active, setActive] = useState(0);
  const hovering = useRef(false);

  useEffect(() => {
    if (!v) return;
    const iv = setInterval(() => {
      if (!hovering.current) setActive(s => (s + 1) % steps.length);
    }, 2400);
    return () => clearInterval(iv);
  }, [v]);

  return (
    <section id="process" className="py-28 relative overflow-hidden"
             style={{
               background: "var(--s2)",
               backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 32px)",
             }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(20,184,166,0.12),transparent)" }}/>
        <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(20,184,166,0.1),transparent)" }}/>
        {/* Central glow — larger and warmer than before */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
             style={{ background: "radial-gradient(ellipse, rgba(20,184,166,0.05) 0%, transparent 65%)" }}/>
        {/* Bottom-left accent */}
        <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full"
             style={{ background: "radial-gradient(ellipse, rgba(20,184,166,0.04) 0%, transparent 70%)" }}/>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10" ref={ref}>
        <div className={cn("mb-16 transition-all duration-700", v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5")}>
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[10px]" style={{ color: "var(--t4)" }}>03</span>
            <div className="w-8 h-px" style={{ background: "var(--ac)" }}/>
            <span className="font-mono text-2xs" style={{ color: "var(--ac)", letterSpacing: "0.18em", textTransform: "uppercase" }}>How I work</span>
          </div>
          <h2 className="font-heading" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "var(--t1)", marginBottom: "1rem" }}>
            From idea to <span className="font-serif-display" style={{ color: "var(--ac3)" }}>shipped</span> product
          </h2>
          <p style={{ fontSize: "15px", color: "var(--t2)", maxWidth: "440px", lineHeight: 1.75 }}>
            A clear, collaborative process that keeps you in control without unnecessary back and forth.
          </p>
        </div>

        {/* Steps grid */}
        <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-4 mb-14">
          {/* Connector line — desktop only */}
          <div className="absolute hidden lg:block top-[52px] left-[10%] right-[10%] h-px pointer-events-none"
               style={{ background: "linear-gradient(90deg, transparent, rgba(20,184,166,0.18), rgba(20,184,166,0.18), rgba(20,184,166,0.18), transparent)" }} />
          {steps.map((s, i) => {
            const on = active === i;
            return (
              <div key={s.num}
                   className={cn("relative p-6 rounded-2xl transition-all duration-400 cursor-default",
                     v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}
                   style={{
                     background: on ? "var(--s5)" : "var(--s3)",
                     border: `1px solid ${on ? "rgba(20,184,166,0.25)" : "rgba(255,255,255,0.06)"}`,
                     transform: on ? "translateY(-4px)" : "",
                     boxShadow: on ? "0 12px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(20,184,166,0.1)" : "none",
                     transitionDelay: v ? `${i*70}ms` : "0ms",
                   }}
                   onMouseEnter={() => { hovering.current = true; setActive(i); }}
                   onMouseLeave={() => { hovering.current = false; }}>
                {/* Accent top */}
                {on && <div className="absolute top-0 inset-x-6 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(20,184,166,0.5),transparent)" }}/>}

                <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-heading font-bold text-sm mb-5 transition-all duration-300"
                     style={{
                       background: on ? "rgba(20,184,166,0.15)" : "rgba(255,255,255,0.04)",
                       border: `1px solid ${on ? "rgba(20,184,166,0.3)" : "rgba(255,255,255,0.07)"}`,
                       color: on ? "var(--ac3)" : "var(--t4)",
                     }}>
                  {s.num}
                </div>

                <div className="text-lg mb-3">{s.icon}</div>

                <h4 className="font-heading mb-2 transition-colors duration-200"
                    style={{ fontSize: "15px", fontWeight: 700, color: on ? "var(--ac3)" : "var(--t1)" }}>
                  {s.title}
                </h4>
                <p style={{ fontSize: "13px", color: "var(--t3)", lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            );
          })}
        </div>

        {/* CTA strip */}
        <div className={cn("flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-2xl transition-all duration-700 delay-500",
                           v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}
             style={{ background: "rgba(20,184,166,0.06)", border: "1px solid rgba(20,184,166,0.15)" }}>
          <div>
            <h3 className="font-heading mb-1" style={{ fontSize: "20px", color: "var(--t1)" }}>Ready to get started?</h3>
            <p style={{ fontSize: "14px", color: "var(--t3)" }}>Free 30-minute discovery call. No commitment, no pitch.</p>
          </div>
          <CalendlyButton
            className="group flex-shrink-0 flex items-center gap-2.5 px-6 py-3.5 rounded-full font-heading font-semibold text-sm transition-all duration-300"
            style={{ background: "var(--ac)", color: "var(--s1)" }}
            onMouseEnter={e => { e.currentTarget.style.background="#0d9488"; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(20,184,166,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.background="var(--ac)"; e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}
          >
            Book a free call
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </CalendlyButton>
        </div>
      </div>
    </section>
  );
}
