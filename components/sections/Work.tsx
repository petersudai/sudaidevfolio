"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { track } from "@vercel/analytics";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROJECTS } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ─── Editorial case block — GSAP scroll reveal + parallax ───── */
function ProjectCard({
  slug, title, type, url, outcome, description, meta, screens, accent,
  flip = false, featured = false,
}: {
  slug: string;
  title: string;
  type: string;
  url: string;
  outcome: string;
  description: string;
  meta: string;
  screens: { src: string; label: string }[];
  accent: string;
  flip?: boolean;
  featured?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setActive(s => (s + 1) % screens.length), 3400);
    return () => clearInterval(iv);
  }, [screens.length]);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = root.current;
    if (!el) return;

    const img   = el.querySelector("[data-img]");
    const inner = el.querySelector("[data-parallax]");
    const words = el.querySelectorAll("[data-reveal]");

    // Image block rises in as it enters the viewport
    gsap.from(img, {
      y: 64, opacity: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 82%" },
    });

    // Text lines stagger up just after
    gsap.from(words, {
      y: 36, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.09,
      scrollTrigger: { trigger: el, start: "top 78%" },
    });

    // Subtle parallax drift on the screenshots while scrolling through
    gsap.fromTo(inner,
      { yPercent: -1.5, scale: 1.03 },
      {
        yPercent: 1.5, scale: 1.03, ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      }
    );
  }, { scope: root });

  return (
    <div ref={root} className={cn("grid lg:grid-cols-12 gap-8 lg:gap-14", featured ? "items-start" : "items-center")}>
      {/* Imagery — links through to the case study */}
      <Link
        href={`/work/${slug}`}
        onClick={() => track("open_case_study", { project: title })}
        data-img
        className={cn(
          "group relative block rounded-3xl overflow-hidden border transition-colors duration-500",
          featured
            ? "lg:col-span-12 h-[300px] sm:h-[400px] lg:h-[540px]"
            : "lg:col-span-7 h-[260px] sm:h-[340px] lg:h-[440px]",
          !featured && flip && "lg:order-2"
        )}
        style={{ background: "#03080e", borderColor: "rgba(255,255,255,0.06)" }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = `${accent}35`)}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)")}
      >
        <div data-parallax className="absolute inset-0">
          {screens.map((s, i) => (
            <div key={s.src}
                 className="absolute inset-0 transition-opacity duration-700"
                 style={{ opacity: active === i ? 1 : 0 }}>
              <Image
                src={s.src}
                alt={`${title} · ${s.label}`}
                fill
                className="object-contain object-center"
                sizes="(max-width: 1024px) 100vw, 60vw"
                quality={100}
                priority={featured && i === 0}
              />
            </div>
          ))}
        </div>

        {/* Live pill */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
             style={{ background: "rgba(3,8,14,0.85)", border: `1px solid ${accent}35` }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent, boxShadow: `0 0 5px ${accent}` }} />
          <span className="text-[9px] font-bold uppercase tracking-[0.14em]" style={{ color: accent }}>Live</span>
        </div>

        {/* Screen label */}
        <div className="absolute bottom-4 right-4 z-10">
          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full"
                style={{ background: "rgba(3,8,14,0.85)", border: "1px solid rgba(255,255,255,0.07)", color: "var(--t4)" }}>
            {screens[active].label}
          </span>
        </div>

        {/* Dot switcher */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
          {screens.map((s, i) => (
            <button key={s.src}
                    onClick={e => { e.preventDefault(); setActive(i); }}
                    aria-label={s.label}
                    style={{
                      width: active === i ? "20px" : "5px", height: "5px",
                      borderRadius: "3px", transition: "all 0.3s",
                      background: active === i ? accent : "rgba(255,255,255,0.2)",
                    }} />
          ))}
        </div>

        {/* View case study hint on hover */}
        <div className="absolute inset-0 z-[5] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
             style={{ background: "rgba(3,8,14,0.35)" }}>
          <span className="flex items-center gap-2 px-5 py-2.5 rounded-full font-mono uppercase backdrop-blur-sm"
                style={{ fontSize: "11px", letterSpacing: "0.16em", background: "rgba(3,8,14,0.7)", border: `1px solid ${accent}55`, color: accent }}>
            View case study
            <svg className="w-3 h-3" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </span>
        </div>
      </Link>

      {/* Words */}
      <div className={cn(featured ? "lg:col-span-8" : "lg:col-span-5", !featured && flip && "lg:order-1")}>
        <div data-reveal className="flex items-center gap-3 mb-4">
          {featured && (
            <span className="text-[10px] uppercase tracking-[0.18em] font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: `${accent}10`, border: `1px solid ${accent}30`, color: accent }}>
              Featured
            </span>
          )}
          <span className="text-[10px] uppercase tracking-[0.16em] font-semibold" style={{ color: accent }}>
            {type}
          </span>
        </div>

        <h3 data-reveal className="font-heading font-bold mb-4"
            style={{ fontSize: "clamp(1.6rem,2.8vw,2.1rem)", color: "#e8f0f5", lineHeight: 1.15 }}>
          {title}
        </h3>

        <p data-reveal className="mb-3" style={{ fontSize: "15px", lineHeight: 1.6, color: "var(--t2)", fontWeight: 500 }}>
          {outcome}
        </p>

        <p data-reveal className="mb-6" style={{ fontSize: "13.5px", lineHeight: 1.75, color: "#4a6070" }}>
          {description}
        </p>

        <div data-reveal className="font-mono mb-7" style={{ fontSize: "11px", letterSpacing: "0.08em", color: "var(--t4)" }}>
          {meta}
        </div>

        <div data-reveal className="flex flex-wrap items-center gap-x-7 gap-y-3">
          <Link href={`/work/${slug}`}
                onClick={() => track("open_case_study", { project: title })}
                className="group/link inline-flex items-center gap-2.5 text-[13px] font-semibold transition-all duration-300"
                style={{ color: accent }}>
            <span className="relative">
              View case study
              <span className="absolute -bottom-1 left-0 h-px w-0 group-hover/link:w-full transition-all duration-300"
                    style={{ background: accent }} />
            </span>
            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <a href={url} target="_blank" rel="noopener noreferrer"
             onClick={() => track("view_live_site", { project: title })}
             className="group/ext inline-flex items-center gap-2 text-[12px] font-medium transition-colors duration-300"
             style={{ color: "var(--t3)" }}
             onMouseEnter={e => (e.currentTarget.style.color = accent)}
             onMouseLeave={e => (e.currentTarget.style.color = "var(--t3)")}>
            Live site
            <svg className="w-3 h-3 transition-transform duration-300 group-hover/ext:translate-x-0.5 group-hover/ext:-translate-y-0.5" viewBox="0 0 14 14" fill="none">
              <path d="M1 13L13 1M13 1H5M13 1v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Work section ──────────────────────────────────────── */
export function Work() {
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = headerRef.current;
    if (!el) return;
    gsap.from(el.children, {
      y: 32, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.1,
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
  }, { scope: headerRef });

  return (
    <section id="work" className="py-28 relative" style={{ background: "var(--s1)" }}>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
           style={{ background: "linear-gradient(90deg,transparent,rgba(20,184,166,0.1),transparent)" }} />

      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div ref={headerRef} className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px]" style={{ color: "var(--t4)" }}>01</span>
            <div className="h-px w-8" style={{ background: "var(--ac)" }} />
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium" style={{ color: "var(--ac)" }}>Selected work</span>
          </div>
          <h2 className="font-heading font-bold text-[clamp(2rem,4.5vw,3.25rem)] mb-4" style={{ color: "#e8f0f5", lineHeight: 1.1 }}>
            Work with <span className="font-serif-display" style={{ color: "var(--ac3)" }}>intent</span>
          </h2>
          <p className="text-[1rem] max-w-[460px] leading-relaxed font-normal" style={{ color: "#7a9ab0" }}>
            Brand sites, products and platforms. Each one designed,
            engineered and shipped end to end.
          </p>
        </div>

        {/* Case blocks — generous spacing, alternating rhythm */}
        <div className="flex flex-col gap-20 lg:gap-28">
          {PROJECTS.map((p, i) => (
            <ProjectCard
              key={p.slug}
              slug={p.slug}
              title={p.title}
              type={p.type}
              url={p.url}
              outcome={p.outcome}
              description={p.description}
              meta={p.meta}
              screens={p.screens}
              accent={p.accent}
              featured={p.featured}
              flip={!p.featured && i % 2 === 1}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
