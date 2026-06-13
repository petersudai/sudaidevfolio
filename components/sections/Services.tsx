"use client";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.08) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    o.observe(el); return () => o.disconnect();
  }, [ref, threshold]);
  return v;
}

const services = [
  {
    icon: "⚡",
    title: "SaaS & Web App Development",
    featured: true,
    desc: "Most MVPs become millstones. They scale fine until they don't. Then you're paying a second team to rebuild what the first team rushed. I architect for what comes after launch, so your investors and users never see the cracks.",
    tags: ["Next.js", "Supabase", "Stripe", "Auth", "TypeScript"],
  },
  {
    icon: "⚙️",
    title: "Backend Systems & APIs",
    featured: false,
    desc: "The backbone of every serious product is an API no one sees but everyone depends on. I build backends that handle real traffic, fail gracefully, and let your frontend team move fast without breaking things.",
    tags: ["Python", "Flask", "Node.js", "PostgreSQL", "MongoDB"],
  },
  {
    icon: "🌐",
    title: "Business Websites",
    featured: false,
    desc: "You have about four seconds before a visitor decides whether you're worth their time. I build sites that make those seconds count. Fast, clear and engineered to turn browsers into buyers.",
    tags: ["React", "Next.js", "Tailwind", "CMS", "SEO"],
  },
  {
    icon: "📊",
    title: "Dashboards & Admin Panels",
    featured: false,
    desc: "Flying blind is expensive. A well-designed operations dashboard turns raw data into real decisions: bookings, revenue, anomalies, users. Exactly what you need, exactly when you need it.",
    tags: ["Real-time", "Charts", "Role-based", "WebSockets"],
  },
  {
    icon: "🎫",
    title: "Booking & Ticketing Systems",
    featured: false,
    desc: "I've shipped a live ticketing platform handling real events across East Africa. M-Pesa payments, QR entry, multi-tier pricing. If you need something like that, or better, I know exactly how to build it.",
    tags: ["QR Codes", "M-Pesa", "Payments", "Mobile"],
  },
  {
    icon: "🔧",
    title: "Custom Solutions",
    featured: false,
    desc: "The best problems don't have off-the-shelf answers. If you've tried explaining this to other developers and walked away with a confused look, tell me. I like the ones that don't fit a template.",
    tags: ["Bespoke", "Any Stack", "Consultation"],
  },
];

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const v   = useInView(ref);

  return (
    <section id="services" className="py-32 relative overflow-hidden"
             style={{
               background: "var(--s2)",
               backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
               backgroundSize: "48px 48px",
             }}>
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(20,184,166,0.15),transparent)" }}/>

      {/* Large faded watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden>
        <span className="font-mono font-black"
              style={{ fontSize: "clamp(180px,28vw,340px)", color: "rgba(20,184,166,0.028)", lineHeight: 1, letterSpacing: "-0.05em" }}>
          {"</>"}
        </span>
      </div>

      {/* Radial glow anchored top-right */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
           style={{ background: "radial-gradient(ellipse, rgba(20,184,166,0.07) 0%, transparent 65%)" }} />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>

        {/* Header */}
        <div className={cn("mb-20 transition-all duration-700", v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[10px]" style={{ color: "var(--t4)" }}>02</span>
            <div className="w-8 h-px" style={{ background: "var(--ac)" }}/>
            <span className="font-mono text-2xs" style={{ color: "var(--ac)", letterSpacing: "0.18em", textTransform: "uppercase" }}>What I build</span>
          </div>
          <h2 className="font-heading mb-5" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "var(--t1)" }}>
            From first idea to a<br/>product that <span className="font-serif-display" style={{ color: "var(--ac3)" }}>earns its keep</span>
          </h2>
          <p style={{ fontSize: "16px", color: "var(--t2)", maxWidth: "480px", lineHeight: 1.8, fontWeight: 400 }}>
            Every project starts with a problem worth solving. I help you define it, scope it, and build the system that earns its keep in your business.
          </p>
        </div>

        {/* Grid — max 3 cols, precise gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={cn(
                "group relative rounded-3xl p-7 flex flex-col cursor-default",
                "transition-all duration-500",
                v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{
                background: s.featured ? "var(--s4)" : "var(--s3)",
                border: `1px solid ${s.featured ? "rgba(20,184,166,0.18)" : "rgba(255,255,255,0.06)"}`,
                transitionDelay: v ? `${i * 70}ms` : "0ms",
                willChange: "transform",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-6px)";
                el.style.borderColor = "rgba(20,184,166,0.25)";
                el.style.boxShadow = "0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(20,184,166,0.1)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "";
                el.style.borderColor = s.featured ? "rgba(20,184,166,0.18)" : "rgba(255,255,255,0.06)";
                el.style.boxShadow = "";
              }}
            >
              {/* Featured top accent line */}
              {s.featured && (
                <div className="absolute top-0 left-8 right-8 h-px"
                     style={{ background: "linear-gradient(90deg,transparent,rgba(20,184,166,0.6),transparent)" }}/>
              )}

              {/* Icon */}
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-6",
                "transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5"
              )} style={{
                background: s.featured ? "rgba(20,184,166,0.14)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${s.featured ? "rgba(20,184,166,0.28)" : "rgba(255,255,255,0.08)"}`,
              }}>
                {s.icon}
              </div>

              <h3 className="font-heading mb-3 transition-colors duration-300 group-hover:text-teal-300"
                  style={{ fontSize: "16px", fontWeight: 700, color: "var(--t1)", lineHeight: 1.35 }}>
                {s.title}
              </h3>

              <p className="flex-1 mb-6 transition-colors duration-300"
                 style={{ fontSize: "14px", color: "var(--t2)", lineHeight: 1.75, fontWeight: 400 }}>
                {s.desc}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-auto">
                {s.tags.map(t => (
                  <span key={t} className="tag"
                        style={{
                          background: s.featured ? "rgba(20,184,166,0.08)" : "rgba(255,255,255,0.04)",
                          color: s.featured ? "var(--ac3)" : "var(--t3)",
                          border: `1px solid ${s.featured ? "rgba(20,184,166,0.18)" : "rgba(255,255,255,0.07)"}`,
                          fontSize: "11px",
                        }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA nudge */}
        <div className={cn("mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 p-7 rounded-3xl transition-all duration-700 delay-500",
                           v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}
             style={{ background: "rgba(20,184,166,0.05)", border: "1px solid rgba(20,184,166,0.12)" }}>
          <div>
            <p className="font-heading font-bold mb-1" style={{ fontSize: "18px", color: "var(--t1)" }}>
              Not sure which service fits your situation?
            </p>
            <p style={{ fontSize: "14px", color: "var(--t2)" }}>
              Tell me what you&apos;re trying to build. I&apos;ll tell you honestly what it takes.
            </p>
          </div>
          <a href="#contact"
             className="flex-shrink-0 flex items-center gap-2.5 px-7 py-3.5 rounded-full font-heading font-semibold text-sm transition-all duration-300 hover:-translate-y-1 whitespace-nowrap"
             style={{ background: "var(--ac)", color: "var(--s1)" }}
             onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="#0d9488"; (e.currentTarget as HTMLElement).style.boxShadow="0 10px 28px rgba(20,184,166,0.4)"; }}
             onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="var(--ac)"; (e.currentTarget as HTMLElement).style.boxShadow=""; }}>
            Let&apos;s figure it out
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(20,184,166,0.1),transparent)" }}/>
    </section>
  );
}
