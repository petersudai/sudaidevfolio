"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

function useInView(threshold = 0.08) {
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

const TF_SCREENS = [
  { src: "/images/ticketforge/landing.png",     label: "Landing page"    },
  { src: "/images/ticketforge/marketplace.png", label: "Event discovery" },
  { src: "/images/ticketforge/ticket-qr.png",   label: "QR ticket"       },
];

const SM_SCREENS = [
  { src: "/images/sarah-mitchell/hero.png",    label: "Hero"         },
  { src: "/images/sarah-mitchell/about.png",   label: "About"        },
  { src: "/images/sarah-mitchell/booking.png", label: "Booking form" },
];

const VM_SCREENS = [
  { src: "/images/voltamobile/hero.png",     label: "Hero"          },
  { src: "/images/voltamobile/featured.png", label: "Featured week" },
  { src: "/images/voltamobile/catalog.png",  label: "All phones"    },
];

// Cycling across the main platform and two distinct client identities
const CF_SCREENS = [
  { src: "/images/creative-folio/main.png",  label: "Platform home"             },
  { src: "/images/amara/hero.png",           label: "AMARA — DJ site"           },
  { src: "/images/amara/about.png",          label: "AMARA — About"             },
  { src: "/images/nadia-osei/hero.png",      label: "Nadia Osei — Photography"  },
  { src: "/images/nadia-osei/about.png",     label: "Nadia Osei — About"        },
];

/* ─── Reusable project card — full-width horizontal layout ──── */
function ProjectCard({
  title, type, url, description, outcome, features, tags, screens, accent, delay, inView,
}: {
  title: string;
  type: string;
  url: string;
  description: string;
  outcome: string;
  features: string[];
  tags: string[];
  screens: { src: string; label: string }[];
  accent: string;
  delay: number;
  inView: boolean;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setActive(s => (s + 1) % screens.length), 3400);
    return () => clearInterval(iv);
  }, [screens.length]);

  return (
    <div
      className={cn(
        "group rounded-3xl overflow-hidden border transition-all duration-700",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{
        background: "var(--s3)",
        border: "1px solid rgba(255,255,255,0.06)",
        transitionDelay: `${delay}ms`,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${accent}30`;
        el.style.boxShadow = `0 24px 60px rgba(0,0,0,0.3), 0 0 0 1px ${accent}14`;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(255,255,255,0.06)";
        el.style.boxShadow = "";
      }}
    >
      {/* Accent top line */}
      <div className="h-px w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
           style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }} />

      <div className="grid lg:grid-cols-[1fr_380px]">
        {/* Screenshot area */}
        <div className="relative min-h-[300px] lg:min-h-[400px] overflow-hidden border-b lg:border-b-0 lg:border-r border-white/[0.05]"
             style={{ background: "#03080e" }}>
          {screens.map((s, i) => (
            <div key={s.src}
                 className="absolute inset-0 transition-opacity duration-700"
                 style={{ opacity: active === i ? 1 : 0 }}>
              <Image
                src={s.src}
                alt={`${title} — ${s.label}`}
                fill
                className="object-contain object-top"
                sizes="(max-width: 1024px) 100vw, 60vw"
                quality={100}
                priority={i === 0}
              />
            </div>
          ))}

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
              <button key={s.src} onClick={() => setActive(i)} aria-label={s.label}
                      style={{
                        width: active === i ? "20px" : "5px", height: "5px",
                        borderRadius: "3px", transition: "all 0.3s",
                        background: active === i ? accent : "rgba(255,255,255,0.2)",
                      }} />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.16em] font-semibold" style={{ color: accent }}>
              {type}
            </span>
            <h3 className="font-heading font-bold text-[22px] mt-1.5 mb-2 transition-colors duration-300 group-hover:text-teal-300"
                style={{ color: "#e8f0f5", lineHeight: 1.2 }}>
              {title}
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accent }} />
              <span className="text-[11px] font-mono tracking-wide" style={{ color: accent, opacity: 0.85 }}>{outcome}</span>
            </div>
            <p className="text-[13px] leading-relaxed mb-5 transition-colors duration-300 group-hover:text-[#7a9ab0]"
               style={{ color: "#4a6070" }}>
              {description}
            </p>

            {/* Feature list */}
            <div className="space-y-2 mb-5">
              {features.map(f => (
                <div key={f} className="flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
                    <circle cx="6" cy="6" r="5" stroke={accent} strokeWidth="1" strokeOpacity="0.35"/>
                    <circle cx="6" cy="6" r="2" fill={accent}/>
                  </svg>
                  <span className="text-[12px]" style={{ color: "var(--t3)" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5 pt-4 border-t border-white/[0.05]">
              {tags.map(t => (
                <span key={t} className="text-[10px] px-2.5 py-1 rounded-full"
                      style={{ background: `${accent}0d`, border: `1px solid ${accent}30`, color: `${accent}99` }}>
                  {t}
                </span>
              ))}
            </div>

            {/* CTA */}
            <a href={url} target="_blank" rel="noopener noreferrer"
               className="group/btn flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300"
               style={{ background: `${accent}16`, border: `1px solid ${accent}30`, color: accent }}
               onMouseEnter={e => {
                 const el = e.currentTarget as HTMLElement;
                 el.style.background = `${accent}26`;
                 el.style.transform = "translateY(-2px)";
                 el.style.boxShadow = `0 8px 24px ${accent}22`;
               }}
               onMouseLeave={e => {
                 const el = e.currentTarget as HTMLElement;
                 el.style.background = `${accent}16`;
                 el.style.transform = "";
                 el.style.boxShadow = "";
               }}>
              View live site
              <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" viewBox="0 0 14 14" fill="none">
                <path d="M1 13L13 1M13 1H5M13 1v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Work section ──────────────────────────────────────── */
export function Work() {
  const { ref, inView } = useInView();
  const [activeScreen, setActiveScreen] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setActiveScreen(s => (s + 1) % TF_SCREENS.length), 3500);
    return () => clearInterval(iv);
  }, []);

  return (
    <section id="work" className="py-28 relative" style={{ background: "var(--s1)" }}>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
           style={{ background: "linear-gradient(90deg,transparent,rgba(20,184,166,0.1),transparent)" }} />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>

        {/* Header */}
        <div className={cn("mb-16 transition-all duration-700", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: "var(--ac)" }} />
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium" style={{ color: "var(--ac)" }}>Selected work</span>
          </div>
          <h2 className="font-heading font-bold text-[clamp(2rem,4vw,3rem)] mb-4" style={{ color: "#e8f0f5" }}>
            Products I&apos;ve built
          </h2>
          <p className="text-[1rem] max-w-[440px] leading-relaxed font-normal" style={{ color: "#7a9ab0" }}>
            Real systems serving real users. Designed for business outcomes, not just portfolio points.
          </p>
        </div>

        {/* ── TicketForge — Flagship ──────────────────────────── */}
        <div className={cn(
          "group rounded-3xl overflow-hidden border border-teal-500/[0.1] transition-all duration-700 mb-5",
          "hover:border-teal-500/[0.2] hover:shadow-[0_24px_80px_rgba(20,184,166,0.07)]",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )} style={{ background: "var(--s3)" }}>

          {/* Flagship banner */}
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
            <div className="flex items-center gap-2 text-[11px] font-mono" style={{ color: "#4d6f88" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500/40" />
              ticketforge.vercel.app
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_380px]">
            {/* Screenshots */}
            <div className="relative min-h-[300px] lg:min-h-[400px] overflow-hidden border-b lg:border-b-0 lg:border-r border-teal-500/[0.07]"
                 style={{ background: "#03080e" }}>
              {TF_SCREENS.map((s, i) => (
                <div key={s.src}
                     className="absolute inset-0 flex items-center justify-center p-4 transition-opacity duration-700"
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
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                {TF_SCREENS.map((s, i) => (
                  <button key={s.src} onClick={() => setActiveScreen(i)} aria-label={s.label}
                          style={{
                            width: activeScreen === i ? "24px" : "6px", height: "6px",
                            borderRadius: "3px", transition: "all 0.3s",
                            background: activeScreen === i ? "var(--ac)" : "rgba(255,255,255,0.2)",
                          }} />
                ))}
              </div>
              <div className="absolute bottom-5 right-5 z-20">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(3,8,14,0.8)", border: "1px solid rgba(255,255,255,0.07)", color: "#4d6f88" }}>
                  {TF_SCREENS[activeScreen].label}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.16em] font-semibold" style={{ color: "var(--ac)" }}>
                  Live SaaS · Event management
                </span>
                <h3 className="font-heading font-bold text-[22px] mt-1.5 mb-2 transition-colors duration-300 group-hover:text-teal-300"
                    style={{ color: "#e8f0f5", lineHeight: 1.2 }}>
                  TicketForge
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ac)" }} />
                  <span className="text-[11px] font-mono tracking-wide" style={{ color: "var(--ac)", opacity: 0.85 }}>Live across East Africa — real events, real revenue</span>
                </div>
                <p className="text-[13px] leading-relaxed mb-5 transition-colors duration-300 group-hover:text-[#7a9ab0]"
                   style={{ color: "#4a6070" }}>
                  A full-cycle event management SaaS serving organizers across East Africa.
                  M-Pesa native payments, QR-based entry validation, real-time attendee dashboards
                  and tiered ticketing. All in one platform built from the ground up.
                </p>

                {/* Feature list */}
                <div className="space-y-2 mb-5">
                  {[
                    "M-Pesa native payment integration",
                    "QR-based instant entry validation",
                    "General + VIP tiered ticketing",
                    "Real-time live attendee dashboard",
                  ].map(f => (
                    <div key={f} className="flex items-center gap-2">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
                        <circle cx="6" cy="6" r="5" stroke="var(--ac)" strokeWidth="1" strokeOpacity="0.35"/>
                        <circle cx="6" cy="6" r="2" fill="var(--ac)"/>
                      </svg>
                      <span className="text-[12px]" style={{ color: "var(--t3)" }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-5 pt-4 border-t border-white/[0.05]">
                  {["Next.js","Supabase","PostgreSQL","TypeScript","Tailwind","M-Pesa API"].map(s => (
                    <span key={s} className="text-[10px] px-2.5 py-1 rounded-full"
                          style={{ background: "rgba(20,184,166,0.06)", border: "1px solid rgba(20,184,166,0.12)", color: "rgba(20,184,166,0.55)" }}>
                      {s}
                    </span>
                  ))}
                </div>
                <a href="https://ticketforge.vercel.app" target="_blank" rel="noopener noreferrer"
                   className="group/btn flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300"
                   style={{ background: "rgba(20,184,166,0.12)", border: "1px solid rgba(20,184,166,0.25)", color: "var(--ac)" }}
                   onMouseEnter={e => {
                     const el = e.currentTarget as HTMLElement;
                     el.style.background = "rgba(20,184,166,0.22)";
                     el.style.transform = "translateY(-2px)";
                     el.style.boxShadow = "0 8px 24px rgba(20,184,166,0.22)";
                   }}
                   onMouseLeave={e => {
                     const el = e.currentTarget as HTMLElement;
                     el.style.background = "rgba(20,184,166,0.12)";
                     el.style.transform = "";
                     el.style.boxShadow = "";
                   }}>
                  View live app
                  <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" viewBox="0 0 14 14" fill="none">
                    <path d="M1 13L13 1M13 1H5M13 1v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Secondary projects — stacked full-width ─────────── */}
        <div className="flex flex-col gap-5">
          <ProjectCard
            title="Professional Consulting Website"
            type="Business website · Lead generation"
            url="https://sarahmitchellcorp.vercel.app"
            outcome="Converts C-suite visitors into booked calls before they hit the form"
            description="Built for a business consultant targeting mid-market CEOs. Every section earns its place. Credibility-first hero with floating proof overlays, social validation built into the layout, and a booking form designed to qualify leads before the first call is ever made."
            features={[
              "Conversion-first layout",
              "Lead-qualifying booking form",
              "Credential storytelling",
              "Social proof overlays",
            ]}
            tags={["Next.js", "Tailwind", "Booking form", "Lead gen"]}
            screens={SM_SCREENS}
            accent="#c2510c"
            delay={150}
            inView={inView}
          />
          <ProjectCard
            title="Creative Portfolio Platform"
            type="Productized service · Creatives"
            url="https://sudaicreativefolio.vercel.app"
            outcome="One codebase, infinite client identities — shipped in days not months"
            description="One platform, any creative identity. Built for DJs, photographers and visual artists who want a site that actually represents their work. Custom audio player with waveform visualisation, masonry gallery with lightbox, booking tiers and a design language that adapts completely per client."
            features={[
              "Custom audio player + waveforms",
              "Masonry gallery + lightbox",
              "Session booking tiers",
              "Per-client design identity",
            ]}
            tags={["Next.js", "TypeScript", "Tailwind", "Animations"]}
            screens={CF_SCREENS}
            accent="#7c3aed"
            delay={250}
            inView={inView}
          />
          <ProjectCard
            title="VoltaMobile"
            type="E-commerce · Phone retail"
            url="https://voltamobile.vercel.app"
            outcome="Takes Nairobi phone shops online — no developer dependency after handoff"
            description="A full storefront built to pitch phone shop owners and general merchants on what an online presence can do for them. Filterable device catalog, a featured section for weekly highlights, WhatsApp-first checkout and battery-tested verification badges. Everything a Nairobi electronics shop needs to move stock online, under one roof."
            features={[
              "Filterable catalog by brand, condition and color",
              "Featured section for weekly highlights",
              "WhatsApp-first checkout flow",
              "Battery-tested and Ex-UK condition badges",
            ]}
            tags={["Next.js", "Tailwind", "E-commerce", "WhatsApp API"]}
            screens={VM_SCREENS}
            accent="#3b82f6"
            delay={350}
            inView={inView}
          />
        </div>

      </div>
    </section>
  );
}
