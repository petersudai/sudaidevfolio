"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const COMING: { title: string; desc: string; stack: string[]; eta: string }[] = [
  {
    title: "Rental Management System",
    desc: "Multi-unit property management with tenant onboarding, automated rent collection, maintenance tracking, and financial reporting.",
    stack: ["Next.js","Supabase","Python","Flask","PostgreSQL"],
    eta: "Q3 2026",
  },
  {
    title: "Personal Finance Tracker v2",
    desc: "A complete rebuild. Cleaner architecture, deeper analytics, goal-based budgeting and multi-currency support for the African market.",
    stack: ["Next.js","TypeScript","Supabase","Tailwind"],
    eta: "Q4 2026",
  },
];

export function Work() {
  const { ref, inView } = useInView();
  const [activeScreen, setActiveScreen] = useState(0);

  const screens = [
    { src: "/images/ticketforge/landing.png",     label: "Landing page"    },
    { src: "/images/ticketforge/marketplace.png", label: "Event discovery" },
    { src: "/images/ticketforge/ticket-qr.png",   label: "QR ticket"       },
  ];

  useEffect(() => {
    const iv = setInterval(() => setActiveScreen(s => (s + 1) % screens.length), 3500);
    return () => clearInterval(iv);
  }, [screens.length]);

  return (
    <section id="work" className="py-28 surface-1 relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-teal-500/10 to-transparent" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <div className={cn("mb-16 transition-all duration-700", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-teal-500/50" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-teal-500 font-medium">Selected work</span>
          </div>
          <h2 className="font-heading font-bold text-[clamp(2rem,4vw,3rem)] text-[#e8f0f5] mb-4">
            Products I&apos;ve built
          </h2>
          <p className="text-[#7a9ab0] text-[1rem] max-w-[440px] leading-relaxed font-normal">
            Real systems serving real users. Designed for business outcomes, not just portfolio points.
          </p>
        </div>

        {/* TicketForge — Flagship */}
        <div className={cn(
          "group rounded-3xl overflow-hidden border border-teal-500/[0.1] transition-all duration-700 mb-5",
          "hover:border-teal-500/[0.2] hover:shadow-[0_24px_80px_rgba(20,184,166,0.07)]",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )} style={{ background: "var(--s3)" }}>

          {/* Live SaaS banner */}
          <div className="flex items-center justify-between px-8 py-4 border-b border-teal-500/[0.08]"
               style={{ background: "rgba(20,184,166,0.04)" }}>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-live-pulse" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                    style={{
                      background: "linear-gradient(90deg, var(--ac3), var(--ac), var(--ac3))",
                      backgroundSize: "200% auto",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      animation: "shimmer 2.4s linear infinite",
                    }}>
                Live SaaS Product
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#4d6f88] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500/40" />
              ticketforge.vercel.app
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_420px]">
            {/* Screenshot showcase */}
            <div className="relative min-h-[380px] lg:min-h-[560px] overflow-hidden border-b lg:border-b-0 lg:border-r border-teal-500/[0.07]"
                 style={{ background: "#03080e" }}>

              {screens.map((s, i) => (
                <div key={s.src} className="absolute inset-0 flex items-center justify-center p-4 transition-opacity duration-700"
                     style={{ opacity: activeScreen === i ? 1 : 0 }}>
                  <Image
                    src={s.src}
                    alt={`TicketForge — ${s.label}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    quality={100}
                    priority={i === 0}
                  />
                </div>
              ))}

              {/* Screen switcher dots */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                {screens.map((s, i) => (
                  <button
                    key={s.src}
                    onClick={() => setActiveScreen(i)}
                    className="transition-all duration-300"
                    aria-label={s.label}
                    style={{
                      width: activeScreen === i ? "24px" : "6px",
                      height: "6px",
                      borderRadius: "3px",
                      background: activeScreen === i ? "var(--ac)" : "rgba(255,255,255,0.2)",
                    }}
                  />
                ))}
              </div>

              {/* Screen label */}
              <div className="absolute bottom-5 right-5 z-20">
                <span className="text-[10px] font-mono text-[#4d6f88] px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(3,8,14,0.8)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  {screens[activeScreen].label}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <div className="mb-5">
                  <h3 className="font-heading font-bold text-[26px] text-[#e8f0f5] mb-1 group-hover:text-teal-300 transition-colors duration-300">
                    TicketForge
                  </h3>
                  <p className="text-teal-400/70 text-[13px] font-medium">
                    The ticketing platform built for African events
                  </p>
                </div>

                <p className="text-[#4a6070] text-sm leading-relaxed font-normal mb-6 group-hover:text-[#7a9ab0] transition-colors duration-300">
                  A full-cycle event management SaaS serving organizers across East Africa.
                  M-Pesa native payments, QR-based entry validation, real-time attendee dashboards,
                  and tiered ticketing. All in one platform built from the ground up.
                </p>

                {/* Impact metrics */}
                <div className="grid grid-cols-2 gap-2.5 mb-6">
                  {[
                    { val: "M-Pesa",    desc: "Native payment integration"   },
                    { val: "QR",        desc: "Instant entry validation"      },
                    { val: "Multi-tier",desc: "General + VIP ticketing"       },
                    { val: "Real-time", desc: "Live attendee dashboard"       },
                  ].map(m => (
                    <div key={m.val}
                         className="bg-white/[0.02] border border-teal-500/[0.08] rounded-xl p-3 group-hover:border-teal-500/[0.14] transition-all duration-300">
                      <div className="font-heading font-bold text-[14px] text-[#e8f0f5] mb-0.5">{m.val}</div>
                      <div className="text-[11px] text-[#3a5060] leading-tight">{m.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack + actions */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-6 pt-5 border-t border-teal-500/[0.07]">
                  {["Next.js","Supabase","PostgreSQL","TypeScript","Tailwind","M-Pesa API"].map(s => (
                    <span key={s}
                          className="text-[10px] px-2.5 py-1 rounded-full bg-teal-500/[0.06] border border-teal-500/[0.12] text-teal-500/60 group-hover:text-teal-500/80 transition-colors duration-300">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <a href="https://ticketforge.vercel.app"
                     target="_blank" rel="noopener noreferrer"
                     className="group/btn flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                     style={{ background: "var(--ac)", color: "var(--s1)" }}
                     onMouseEnter={e => { e.currentTarget.style.background="#0d9488"; e.currentTarget.style.boxShadow="0 8px 24px rgba(20,184,166,0.35)"; }}
                     onMouseLeave={e => { e.currentTarget.style.background="var(--ac)"; e.currentTarget.style.boxShadow="none"; }}>
                    View live app
                    <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" viewBox="0 0 14 14" fill="none">
                      <path d="M1 13L13 1M13 1H5M13 1v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <a href="https://github.com/petersudai"
                     target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium glass hover:border-teal-500/20 transition-all duration-300 hover:-translate-y-0.5"
                     style={{ color: "var(--t3)" }}>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                    Source
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* In Development */}
        <div className={cn(
          "transition-all duration-700 delay-150",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
            <span className="text-[11px] uppercase tracking-[0.18em] font-mono" style={{ color: "var(--t4)" }}>In development</span>
            <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {COMING.map((p, i) => (
              <div key={p.title}
                   className={cn(
                     "group rounded-2xl p-6 border transition-all duration-500 hover:-translate-y-1",
                     "hover:border-teal-500/[0.12] hover:shadow-[0_16px_48px_rgba(20,184,166,0.05)]",
                     inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                   )}
                   style={{ background: "var(--s3)", border: "1px solid rgba(255,255,255,0.05)", transitionDelay: `${(i+1)*80+150}ms` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--t4)" }} />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color: "var(--t4)" }}>In development</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                        style={{ color: "var(--t4)", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    {p.eta}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-[17px] text-[#e8f0f5] mb-2 group-hover:text-teal-300/80 transition-colors duration-300">{p.title}</h3>
                <p className="text-[12px] text-[#3a5060] leading-relaxed mb-4 group-hover:text-[#4a6070] transition-colors duration-300">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map(s => (
                    <span key={s} className="text-[10px] px-2 py-0.5 rounded-full text-[#2a4155]"
                          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub CTA */}
        <div className={cn("mt-10 text-center transition-all duration-700 delay-300", inView ? "opacity-100" : "opacity-0")}>
          <a href="https://github.com/petersudai"
             target="_blank" rel="noopener noreferrer"
             className="group inline-flex items-center gap-3 glass px-6 py-3.5 rounded-2xl text-sm text-[#7a9ab0] hover:text-[#e8f0f5] hover:border-teal-500/20 transition-all duration-300">
            <span className="font-mono text-teal-500 text-[12px]">github.com/</span>
            <span>petersudai</span>
            <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
