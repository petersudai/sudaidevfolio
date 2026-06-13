"use client";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CalendlyButton } from "@/components/CalendlyButton";
import { track } from "@vercel/analytics";

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.08) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    o.observe(el); return () => o.disconnect();
  }, [ref, threshold]);
  return v;
}

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  background: "var(--s4)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "10px",
  color: "var(--t1)",
  fontFamily: "Plus Jakarta Sans, system-ui, sans-serif",
  fontSize: "14px",
  fontWeight: 400,
  outline: "none",
  transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
};

const FIELD_FOCUS = {
  onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "rgba(20,184,166,0.4)";
    e.target.style.background = "var(--s5)";
    e.target.style.boxShadow = "0 0 0 3px rgba(20,184,166,0.09)";
  },
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "rgba(255,255,255,0.08)";
    e.target.style.background = "var(--s4)";
    e.target.style.boxShadow = "none";
  },
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--t3)",
  marginBottom: "8px",
};

const selectStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 36px 12px 16px",
  background: "var(--s4)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "10px",
  color: "var(--t1)",
  fontFamily: "Plus Jakarta Sans, system-ui, sans-serif",
  fontSize: "14px",
  fontWeight: 400,
  outline: "none",
  transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%234d6f88' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 14px center",
  appearance: "none",
  WebkitAppearance: "none",
  cursor: "pointer",
};

export function Contact() {
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const v   = useInView(ref);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:        fd.get("name"),
          email:       fd.get("email"),
          projectType: fd.get("projectType"),
          budget:      fd.get("budget"),
          message:     fd.get("message"),
        }),
      });
      if (!res.ok) throw new Error("Failed to send.");
      track("contact_form_submitted");
      setSent(true);
    } catch {
      setError("Something went wrong. Please email me directly at psudai@gmail.com");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-28 relative overflow-hidden" style={{ background: "var(--s1)" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(20,184,166,0.14),transparent)" }}/>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full" style={{ background: "radial-gradient(ellipse,rgba(20,184,166,0.05) 0%,transparent 70%)" }}/>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div className={cn("transition-all duration-700", v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5")}>
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono text-[10px]" style={{ color: "var(--t4)" }}>05</span>
              <div className="w-8 h-px" style={{ background: "var(--ac)" }}/>
              <span className="font-mono text-2xs" style={{ color: "var(--ac)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Get in touch</span>
            </div>
            <h2 className="font-heading mb-5" style={{ fontSize: "clamp(2rem,4vw,2.75rem)", color: "var(--t1)", lineHeight: 1.1 }}>
              Ready to build<br/><span className="font-serif-display" style={{ color: "var(--ac3)" }}>something great?</span>
            </h2>
            <p style={{ fontSize: "15px", color: "var(--t2)", lineHeight: 1.75, marginBottom: "2.5rem", fontWeight: 400 }}>
              Whether you have a fully scoped project or just a rough idea, I&apos;d love to
              hear about it. I respond within 24 hours, every time.
            </p>

            {/* Channels */}
            <div className="space-y-3 mb-6">
              {[
                {
                  href: "mailto:psudai@gmail.com",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                    </svg>
                  ),
                  label: "Email",
                  value: "psudai@gmail.com",
                  mono: false,
                },
                {
                  href: "https://github.com/petersudai",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                  ),
                  label: "GitHub",
                  value: "github.com/petersudai",
                  mono: true,
                },
              ].map((c, i) => (
                <a key={c.href} href={c.href}
                   target={c.href.startsWith("http") ? "_blank" : undefined}
                   rel="noopener noreferrer"
                   className={cn("group flex items-center gap-4 px-5 py-4 rounded-2xl glass transition-all duration-300",
                     v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}
                   style={{ transitionDelay: v ? `${200+i*70}ms` : "0ms" }}
                   onMouseEnter={e => {
                     (e.currentTarget as HTMLElement).style.borderColor = "rgba(20,184,166,0.2)";
                     (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                   }}
                   onMouseLeave={e => {
                     (e.currentTarget as HTMLElement).style.borderColor = "";
                     (e.currentTarget as HTMLElement).style.transform = "";
                   }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
                       style={{ background: "rgba(20,184,166,0.08)", border: "1px solid rgba(20,184,166,0.15)", color: "var(--ac)" }}>
                    {c.icon}
                  </div>
                  <div className="min-w-0">
                    <div style={{ fontSize: "11px", color: "var(--t3)", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "2px" }}>{c.label}</div>
                    <div style={{ fontSize: c.mono ? "13px" : "14px", color: "var(--t2)", fontFamily: c.mono ? "JetBrains Mono, monospace" : "inherit" }}
                         className="group-hover:text-[#f0f6ff] transition-colors duration-200 truncate">{c.value}</div>
                  </div>
                  <svg className="ml-auto w-3.5 h-3.5 flex-shrink-0 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300"
                       style={{ color: "var(--ac)" }} viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </a>
              ))}
            </div>

            {/* Calendly booking card */}
            <div className="glass-teal rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-1.5">
                <span style={{ fontSize: "15px" }}>📅</span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--ac3)" }}>Free 30-min discovery call</span>
              </div>
              <p style={{ fontSize: "13px", color: "var(--t3)", lineHeight: 1.65, marginBottom: "1rem" }}>
                No pitch, no commitment. Just an honest conversation about your project
                and what it would take to build it right.
              </p>
              <CalendlyButton
                className="group flex items-center justify-center gap-2.5 w-full px-5 py-3 rounded-full font-heading font-semibold text-sm transition-all duration-300"
                style={{ background: "var(--ac)", color: "var(--s1)" }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#0d9488";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(20,184,166,0.4)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "var(--ac)";
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                Book a free call
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </CalendlyButton>
            </div>
          </div>

          {/* Right — form */}
          <div className={cn("rounded-3xl p-8 transition-all duration-700 delay-200", v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5")}
               style={{ background: "var(--s3)", border: "1px solid rgba(255,255,255,0.07)" }}>
            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 w-16 h-16 rounded-full animate-live-pulse" style={{ background: "rgba(20,184,166,0.15)" }}/>
                  <div className="relative w-16 h-16 rounded-full flex items-center justify-center text-2xl" style={{ background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.25)" }}>✓</div>
                </div>
                <h3 className="font-heading mb-2" style={{ fontSize: "22px", color: "var(--t1)" }}>Message sent!</h3>
                <p style={{ fontSize: "14px", color: "var(--t3)" }}>I&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} className="space-y-5">
                <div style={{ marginBottom: "1.5rem" }}>
                  <h3 className="font-heading mb-1" style={{ fontSize: "20px", color: "var(--t1)" }}>Tell me about your project</h3>
                  <p style={{ fontSize: "13px", color: "var(--t3)" }}>I&apos;ll respond within 24 hours.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={labelStyle}>Name</label>
                    <input name="name" type="text" required placeholder="Jane Smith" style={fieldStyle} {...FIELD_FOCUS}/>
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input name="email" type="email" required placeholder="jane@company.com" style={fieldStyle} {...FIELD_FOCUS}/>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Project type</label>
                  <select name="projectType" required style={selectStyle} {...FIELD_FOCUS}>
                    <option value="" style={{ color: "var(--t3)", background: "var(--s4)" }}>Select a service...</option>
                    {["SaaS / Web App","Business Website","Backend API / System","Dashboard / Admin Panel","Booking / Ticketing System","Custom Solution"].map(o => (
                      <option key={o} style={{ background: "var(--s3)", color: "var(--t1)" }}>{o}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Budget range</label>
                  <select name="budget" style={selectStyle} {...FIELD_FOCUS}>
                    <option value="" style={{ color: "var(--t3)", background: "var(--s4)" }}>Approximate budget...</option>
                    {["Under $500","$500 – $1,500","$1,500 – $3,500","$3,500+"].map(o => (
                      <option key={o} style={{ background: "var(--s3)", color: "var(--t1)" }}>{o}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Project details</label>
                  <textarea name="message" rows={4} required
                    placeholder="Tell me about your project, goals, and key features you need..."
                    style={{ ...fieldStyle, resize: "none", lineHeight: 1.65 }}
                    {...FIELD_FOCUS}/>
                </div>

                {error && (
                  <p style={{ fontSize: "13px", color: "#f87171", lineHeight: 1.5 }}>{error}</p>
                )}

                <button type="submit" disabled={loading}
                        className="group w-full flex items-center justify-center gap-2.5 py-4 rounded-full font-heading font-semibold text-base transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{ background: "var(--ac)", color: "var(--s1)" }}
                        onMouseEnter={e => !loading && ((e.currentTarget.style.background = "#0d9488"), (e.currentTarget.style.transform = "translateY(-2px)"), (e.currentTarget.style.boxShadow = "0 10px 28px rgba(20,184,166,0.4)"))}
                        onMouseLeave={e => { e.currentTarget.style.background = "var(--ac)"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                  {loading ? (
                    <><span className="w-4 h-4 rounded-full border-2 border-[#070f18]/30 border-t-[#070f18] animate-spin-slow"/><span>Sending...</span></>
                  ) : (
                    <>Send message<svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
