"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { track } from "@vercel/analytics";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CalendlyButton } from "@/components/CalendlyButton";
import type { Project } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function CaseStudy({ project, next }: { project: Project; next: Project }) {
  const root = useRef<HTMLDivElement>(null);
  const accent = project.accent;
  const [lead, ...gallery] = project.screens;

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = root.current;
    if (!el) return;

    gsap.from("[data-rise]", {
      y: 40, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.08,
      scrollTrigger: { trigger: "[data-rise]", start: "top 90%" },
    });

    el.querySelectorAll<HTMLElement>("[data-frame]").forEach(frame => {
      gsap.from(frame, {
        y: 60, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: frame, start: "top 85%" },
      });
      const inner = frame.querySelector("[data-frame-img]");
      if (inner) {
        // Gentle drift only — keep scale near 1 so screenshots stay pixel sharp
        gsap.fromTo(inner,
          { yPercent: -2.5, scale: 1.05 },
          { yPercent: 2.5, scale: 1.05, ease: "none",
            scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true } });
      }
    });
  }, { scope: root });

  return (
    <div ref={root} style={{ background: "var(--s1)" }}>
      {/* Accent wash behind the hero */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]"
           style={{ background: `radial-gradient(60% 60% at 70% 0%, ${accent}14 0%, transparent 70%)` }} />

      {/* Slim header */}
      <header className="relative z-20 max-w-6xl mx-auto px-6 pt-10 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative w-9 h-9 rounded-xl flex items-center justify-center"
               style={{ background: `${accent}1a`, border: `1px solid ${accent}40` }}>
            <span className="font-heading font-bold text-xs tracking-tight" style={{ color: accent }}>PS</span>
          </div>
          <span className="font-heading font-bold text-[15px] tracking-tight" style={{ color: "var(--t1)" }}>
            Sudai<span style={{ color: accent }}>.</span>
          </span>
        </Link>
        <Link href="/#work"
              className="group inline-flex items-center gap-2 font-mono uppercase transition-colors duration-300"
              style={{ fontSize: "11px", letterSpacing: "0.16em", color: "var(--t3)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--t1)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--t3)")}>
          <svg className="w-3 h-3 transition-transform duration-300 group-hover:-translate-x-1" viewBox="0 0 14 14" fill="none">
            <path d="M13 7H1M7 1L1 7l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          All work
        </Link>
      </header>

      {/* Hero */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-16 lg:pt-28 lg:pb-20">
        <div data-rise className="flex items-center gap-3 mb-7 font-mono uppercase"
             style={{ fontSize: "11px", letterSpacing: "0.16em" }}>
          <span style={{ color: accent }}>{project.type}</span>
          <span style={{ color: "var(--t4)" }}>/</span>
          <span style={{ color: "var(--t3)" }}>{project.year}</span>
        </div>

        <h1 data-rise className="font-heading font-extrabold mb-8"
            style={{ fontSize: "clamp(2.6rem,7vw,5.5rem)", lineHeight: 1.04, letterSpacing: "-0.035em", color: "var(--t1)" }}>
          {project.title}
        </h1>

        <p data-rise className="max-w-[640px] mb-12"
           style={{ fontSize: "clamp(1.05rem,2vw,1.4rem)", lineHeight: 1.5, color: "var(--t2)" }}>
          {project.outcome}
        </p>

        {/* Spec sheet */}
        <div data-rise className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 pt-8 border-t"
             style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          {[
            { k: "Role",     v: project.role },
            { k: "Location", v: project.location },
            { k: "Year",     v: project.year },
            { k: "Status",   v: "Live" },
          ].map(item => (
            <div key={item.k} className="pr-4">
              <div className="font-mono uppercase mb-1.5" style={{ fontSize: "10px", letterSpacing: "0.14em", color: "var(--t4)" }}>{item.k}</div>
              <div style={{ fontSize: "14px", color: "var(--t1)", fontWeight: 500 }}>{item.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Lead image */}
      <section className="relative z-10 max-w-[1200px] mx-auto px-6 mb-28 lg:mb-36">
        <div data-frame className="relative rounded-3xl overflow-hidden border"
             style={{ borderColor: `${accent}22`, aspectRatio: "16 / 10", background: "#03080e" }}>
          <div data-frame-img className="absolute inset-0">
            <Image src={lead.src} alt={`${project.title}, ${lead.label}`} fill priority
                   className="object-contain" sizes="(max-width: 1200px) 100vw, 1200px" unoptimized />
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 mb-28 lg:mb-36">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div data-rise className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8" style={{ background: accent }} />
                <span className="font-mono uppercase" style={{ fontSize: "11px", letterSpacing: "0.18em", color: accent }}>Overview</span>
              </div>
            </div>
          </div>
          <div data-rise className="lg:col-span-8">
            <p className="font-heading"
               style={{ fontSize: "clamp(1.4rem,2.6vw,2rem)", lineHeight: 1.4, color: "var(--t1)", fontWeight: 600, letterSpacing: "-0.01em" }}>
              {project.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Palette */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 mb-28 lg:mb-36">
        <div data-rise className="flex items-center gap-3 mb-10">
          <div className="h-px w-8" style={{ background: accent }} />
          <span className="font-mono uppercase" style={{ fontSize: "11px", letterSpacing: "0.18em", color: accent }}>Palette</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6">
          {project.palette.map(c => (
            <div data-rise key={c.hex} className="group">
              <div className="w-full rounded-2xl border transition-transform duration-300 group-hover:-translate-y-1"
                   style={{ aspectRatio: "4 / 5", background: c.hex, borderColor: "rgba(255,255,255,0.08)" }} />
              <div className="mt-3">
                <div style={{ fontSize: "13px", color: "var(--t1)", fontWeight: 500 }}>{c.name}</div>
                <div className="font-mono uppercase mt-0.5" style={{ fontSize: "11px", letterSpacing: "0.06em", color: "var(--t4)" }}>{c.hex}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 mb-28 lg:mb-36">
        <div data-rise className="flex items-center gap-3 mb-10">
          <div className="h-px w-8" style={{ background: accent }} />
          <span className="font-mono uppercase" style={{ fontSize: "11px", letterSpacing: "0.18em", color: accent }}>What I built</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-px rounded-3xl overflow-hidden"
             style={{ background: "rgba(255,255,255,0.06)" }}>
          {project.highlights.map((h, i) => (
            <div data-rise key={h} className="p-8 lg:p-10 flex items-start gap-5" style={{ background: "var(--s2)" }}>
              <span className="font-mono shrink-0" style={{ fontSize: "12px", color: accent, paddingTop: "3px" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontSize: "16px", lineHeight: 1.5, color: "var(--t1)", fontWeight: 500 }}>{h}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="relative z-10 max-w-[1200px] mx-auto px-6 mb-28 lg:mb-36">
          <div className="flex flex-col gap-8 lg:gap-12">
            {gallery.map((s, i) => {
              // First gallery shot full width, then alternating pairs feel
              const wide = i === 0 || i === gallery.length - 1;
              return (
                <div data-frame key={s.src}
                     className={cn("relative rounded-3xl overflow-hidden border", wide ? "w-full" : "w-full lg:w-[85%]", !wide && i % 2 === 0 && "lg:ml-auto")}
                     style={{ borderColor: "rgba(255,255,255,0.07)", aspectRatio: wide ? "16 / 9" : "16 / 10", background: "#03080e" }}>
                  <div data-frame-img className="absolute inset-0">
                    <Image src={s.src} alt={`${project.title}, ${s.label}`} fill
                           className="object-contain" sizes="(max-width: 1200px) 100vw, 1000px" unoptimized />
                  </div>
                  <div className="absolute bottom-4 left-4 z-10">
                    <span className="font-mono px-2.5 py-1 rounded-full"
                          style={{ fontSize: "10px", background: "rgba(3,8,14,0.8)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--t3)" }}>
                      {s.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Live CTA + stack */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 mb-28 lg:mb-36">
        <div className="rounded-3xl p-10 lg:p-16 text-center relative overflow-hidden"
             style={{ background: "var(--s2)", border: `1px solid ${accent}22` }}>
          <div className="pointer-events-none absolute inset-0"
               style={{ background: `radial-gradient(50% 80% at 50% 0%, ${accent}12 0%, transparent 70%)` }} />
          <div className="relative">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {project.stack.map(t => (
                <span key={t} className="font-mono px-3 py-1.5 rounded-full"
                      style={{ fontSize: "11px", background: `${accent}0d`, border: `1px solid ${accent}2e`, color: `${accent}cc` }}>
                  {t}
                </span>
              ))}
            </div>
            <h2 className="font-heading font-bold mb-8" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", color: "var(--t1)", lineHeight: 1.15 }}>
              See it <span className="font-serif-display" style={{ color: accent }}>live</span>
            </h2>
            <a href={project.url} target="_blank" rel="noopener noreferrer"
               onClick={() => track("view_live_site", { project: project.title })}
               className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-full font-heading font-semibold text-[15px] transition-all duration-300 hover:-translate-y-1"
               style={{ background: accent, color: "#03080e" }}>
              Visit {project.title}
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" viewBox="0 0 14 14" fill="none">
                <path d="M1 13L13 1M13 1H5M13 1v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Next project */}
      <Link href={`/work/${next.slug}`}
            onClick={() => track("open_case_study", { project: next.title, from: "next" })}
            className="group relative z-10 block border-t"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <div className="font-mono uppercase mb-4" style={{ fontSize: "11px", letterSpacing: "0.18em", color: "var(--t4)" }}>
            Next project
          </div>
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="font-mono uppercase mb-3" style={{ fontSize: "11px", letterSpacing: "0.14em", color: next.accent }}>{next.type}</div>
              <h2 className="font-heading font-extrabold transition-colors duration-300"
                  style={{ fontSize: "clamp(2rem,5vw,4rem)", lineHeight: 1.05, letterSpacing: "-0.03em", color: "var(--t1)" }}>
                {next.title}
              </h2>
            </div>
            <div className="shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                 style={{ border: `1px solid ${next.accent}40`, color: next.accent }}>
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </Link>

      {/* Minimal footer */}
      <footer className="relative z-10 border-t" style={{ borderColor: "rgba(255,255,255,0.05)", background: "var(--s0)" }}>
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <span style={{ fontSize: "13px", color: "var(--t3)" }}>
            Like what you see? Let&apos;s talk about your project.
          </span>
          <div className="flex items-center gap-6">
            <CalendlyButton
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-semibold text-[13px] transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: accent, color: "#03080e" }}>
              Book a call
              <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </CalendlyButton>
            <Link href="/#work" className="font-mono uppercase transition-colors duration-300"
                  style={{ fontSize: "11px", letterSpacing: "0.14em", color: "var(--t3)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--t1)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--t3)")}>
              All work
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
