"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
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

const skillGroups = [
  { label: "Frontend",    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript"] },
  { label: "Backend",     items: ["Python", "Flask", "Node.js", "Express.js", "REST APIs"] },
  { label: "Database",    items: ["PostgreSQL", "Supabase", "MongoDB"] },
  { label: "Specialisms", items: ["SaaS Architecture", "Payment Integration", "Auth Systems", "QR Systems", "Real-time", "Dashboards"] },
];
const hot = new Set(["React", "Next.js", "TypeScript", "Python", "Flask", "PostgreSQL", "Supabase", "Node.js"]);

const bio = [
  <>I got into this because I like solving things. Not the code part specifically but what sits before it: understanding what a business actually needs and figuring out the right way to build it. <strong style={{ color: "var(--t1)", fontWeight: 600 }}>Peter Sudai</strong>, fullstack developer based in Nairobi, Kenya.</>,
  <>When you hire me, you get me. I ask the questions most developers skip, think through the details that tend to cause problems later, and keep you informed in plain language. No jargon, no radio silence, no surprises.</>,
  <>I work with <strong style={{ color: "var(--t1)", fontWeight: 600 }}>founders, growing businesses and creatives</strong>. Not every project is the right fit and I&apos;d rather tell you that upfront than waste your time. But when I take something on, I&apos;m fully in.</>,
];

export function About() {
  const ref  = useRef<HTMLDivElement>(null);
  const v    = useInView(ref);
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section id="about" className="py-32 relative overflow-hidden"
             style={{
               background: "var(--s1)",
               backgroundImage: "radial-gradient(circle, rgba(20,184,166,0.055) 1px, transparent 1px)",
               backgroundSize: "26px 26px",
             }}>
      {/* Atmospheric glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
           style={{ background: "radial-gradient(ellipse, rgba(20,184,166,0.08) 0%, transparent 65%)" }}/>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
           style={{ background: "radial-gradient(ellipse, rgba(20,184,166,0.05) 0%, transparent 70%)" }}/>
      <div className="absolute top-0 inset-x-0 h-px"
           style={{ background: "linear-gradient(90deg,transparent,rgba(20,184,166,0.12),transparent)" }}/>

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* Left — bio */}
          <div className={cn("transition-all duration-700", v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>

            {/* Photo + label row */}
            <div className="flex items-start gap-5 mb-8">
              {/* Portrait */}
              <div className="relative flex-shrink-0 w-[108px] h-[132px] rounded-2xl overflow-hidden"
                   style={{ border: "1px solid rgba(20,184,166,0.2)", boxShadow: "0 0 0 4px rgba(20,184,166,0.05)" }}>
                <Image
                  src="/images/peter.jpg"
                  alt="Peter Sudai"
                  fill
                  className="object-cover object-top"
                  quality={100}
                />
              </div>

              {/* Label + heading */}
              <div className="pt-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[10px]" style={{ color: "var(--t4)" }}>04</span>
                  <div className="w-8 h-px" style={{ background: "var(--ac)" }}/>
                  <span className="font-mono text-2xs" style={{ color: "var(--ac)", letterSpacing: "0.18em", textTransform: "uppercase" }}>About</span>
                </div>
                <h2 className="font-heading" style={{ fontSize: "clamp(1.6rem,3.2vw,2.4rem)", color: "var(--t1)", lineHeight: 1.2 }}>
                  Good software starts<br/>with <span className="font-serif-display" style={{ color: "var(--ac3)" }}>good questions</span>
                </h2>
              </div>
            </div>

            <div className="space-y-5 mb-10">
              {bio.map((text, i) => (
                <p key={i}
                   className={cn("transition-all duration-700", v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}
                   style={{ fontSize: "15px", lineHeight: 1.85, color: "var(--t2)", fontWeight: 400, transitionDelay: `${180 + i * 110}ms` }}>
                  {text}
                </p>
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              {[
                {
                  href: "https://github.com/petersudai",
                  label: "github.com/petersudai",
                  mono: true,
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                  ),
                },
                {
                  href: "mailto:psudai@gmail.com",
                  label: "psudai@gmail.com",
                  mono: true,
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                    </svg>
                  ),
                },
              ].map(l => (
                <a key={l.href} href={l.href}
                   target={l.href.startsWith("http") ? "_blank" : undefined}
                   rel="noopener noreferrer"
                   className="group flex items-center gap-2.5 px-4 py-2.5 rounded-2xl glass text-sm transition-all duration-300"
                   style={{ color: "var(--t2)" }}
                   onMouseEnter={e => {
                     const el = e.currentTarget as HTMLElement;
                     el.style.borderColor = "rgba(20,184,166,0.25)";
                     el.style.transform = "translateY(-2px)";
                     el.style.color = "var(--t1)";
                   }}
                   onMouseLeave={e => {
                     const el = e.currentTarget as HTMLElement;
                     el.style.borderColor = "";
                     el.style.transform = "";
                     el.style.color = "var(--t2)";
                   }}>
                  <span style={{ color: "var(--ac)", display: "flex", alignItems: "center" }}>{l.icon}</span>
                  <span style={{ fontFamily: l.mono ? "JetBrains Mono, monospace" : "inherit", fontSize: "12px" }}>
                    {l.label}
                  </span>
                </a>
              ))}
            </div>

            {/* Location */}
            <div className="inline-flex items-center gap-3 px-5 py-4 rounded-2xl glass-teal">
              <span className="text-xl">🌍</span>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--t1)", marginBottom: "2px" }}>Nairobi, Kenya</div>
                <div style={{ fontSize: "12px", color: "var(--t3)" }}>Remote · UTC+3 · Available globally</div>
              </div>
            </div>
          </div>

          {/* Right — skills */}
          <div className={cn("space-y-3 transition-all duration-700 delay-200", v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
            {skillGroups.map((g, gi) => (
              <div key={g.label}
                   className="rounded-3xl p-5 transition-all duration-300"
                   style={{
                     background: "var(--s3)",
                     border: "1px solid rgba(255,255,255,0.06)",
                     transitionDelay: `${gi * 60}ms`,
                   }}
                   onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(20,184,166,0.14)")}
                   onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}>
                <div className="mb-3" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--t3)" }}>
                  {g.label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.items.map(skill => {
                    const isHot = hot.has(skill);
                    const isHov = hover === skill;
                    return (
                      <button key={skill}
                              onMouseEnter={() => setHover(skill)}
                              onMouseLeave={() => setHover(null)}
                              className="transition-all duration-200 cursor-default"
                              style={{
                                fontSize: "12px",
                                fontWeight: isHot ? 500 : 400,
                                padding: "5px 12px",
                                borderRadius: "100px",
                                background: isHot
                                  ? (isHov ? "rgba(20,184,166,0.2)" : "rgba(20,184,166,0.1)")
                                  : (isHov ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)"),
                                color: isHot
                                  ? (isHov ? "var(--ac3)" : "var(--ac)")
                                  : (isHov ? "var(--t2)" : "var(--t3)"),
                                border: `1px solid ${isHot ? "rgba(20,184,166,0.24)" : "rgba(255,255,255,0.07)"}`,
                                transform: isHov ? "scale(1.06) translateY(-1px)" : "scale(1)",
                                boxShadow: isHov && isHot ? "0 0 14px rgba(20,184,166,0.2)" : "none",
                              }}>
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Values */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "🎯", label: "Product-minded" },
                { icon: "💬", label: "Clear comms"    },
                { icon: "⚡", label: "Fast delivery"  },
              ].map(val => (
                <div key={val.label}
                     className="p-4 rounded-3xl text-center transition-all duration-300 cursor-default"
                     style={{ background: "var(--s3)", border: "1px solid rgba(255,255,255,0.06)" }}
                     onMouseEnter={e => {
                       const el = e.currentTarget as HTMLElement;
                       el.style.borderColor = "rgba(20,184,166,0.18)";
                       el.style.transform = "translateY(-3px)";
                       el.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
                     }}
                     onMouseLeave={e => {
                       const el = e.currentTarget as HTMLElement;
                       el.style.borderColor = "rgba(255,255,255,0.06)";
                       el.style.transform = "";
                       el.style.boxShadow = "";
                     }}>
                  <div className="text-xl mb-2">{val.icon}</div>
                  <div style={{ fontSize: "12px", color: "var(--t2)", fontWeight: 500 }}>{val.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
