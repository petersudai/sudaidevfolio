"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { CalendlyButton } from "@/components/CalendlyButton";

const STACK = ["Next.js","React","TypeScript","Python","Flask","Node.js","Supabase","PostgreSQL","MongoDB","Tailwind CSS","Express","REST APIs"];

const PHRASES = [
  "The problem stops here.",
  "Your biggest bottleneck deserves a real solution.",
  "Life's complicated enough. Your software shouldn't be.",
  "I build the solution you've been working around.",
  "Your work is great. Your website should show that.",
  "Real solutions. Built to last.",
];

const TAGLINE = "Simplify, scale, and transform.";

const TYPE_SPEED   = 48;   // ms per character while typing
const DELETE_SPEED = 20;   // ms per character while deleting
const PAUSE_AFTER  = 2000; // ms the full string stays visible before deletion

export function Hero() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const mouse      = useRef({ x: -500, y: -500 });
  const [vis,             setVis]             = useState(false);
  const [typed,           setTyped]           = useState("");
  const [phraseIdx,       setPhraseIdx]       = useState(0);
  const [isDeleting,      setIsDeleting]      = useState(false);
  const [isTypingTagline, setIsTypingTagline] = useState(false);
  const [typedTagline,    setTypedTagline]    = useState("");
  const [isDone,          setIsDone]          = useState(false);

  useEffect(() => { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t); }, []);

  // Cycling typewriter — after the final phrase, types the teal tagline then stops
  useEffect(() => {
    if (!vis || isDone) return;

    // ── Tagline phase ────────────────────────────────────────────────
    if (isTypingTagline) {
      if (typedTagline.length < TAGLINE.length) {
        const t = setTimeout(() => setTypedTagline(TAGLINE.slice(0, typedTagline.length + 1)), TYPE_SPEED);
        return () => clearTimeout(t);
      } else {
        setIsDone(true);
      }
      return;
    }

    // ── Phrase phase ─────────────────────────────────────────────────
    const phrase = PHRASES[phraseIdx];
    const isLast = phraseIdx === PHRASES.length - 1;

    if (!isDeleting) {
      if (typed.length < phrase.length) {
        const t = setTimeout(() => setTyped(phrase.slice(0, typed.length + 1)), TYPE_SPEED);
        return () => clearTimeout(t);
      } else {
        if (isLast) {
          // Pause, then start typing the tagline on the next line
          const t = setTimeout(() => setIsTypingTagline(true), PAUSE_AFTER);
          return () => clearTimeout(t);
        }
        const t = setTimeout(() => setIsDeleting(true), PAUSE_AFTER);
        return () => clearTimeout(t);
      }
    } else {
      if (typed.length > 0) {
        const t = setTimeout(() => setTyped(typed.slice(0, -1)), DELETE_SPEED);
        return () => clearTimeout(t);
      } else {
        setIsDeleting(false);
        setPhraseIdx(i => i + 1);
      }
    }
  }, [vis, typed, phraseIdx, isDeleting, isTypingTagline, typedTagline, isDone]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    type P = { x:number;y:number;vx:number;vy:number;r:number;a:number;ph:number };
    const pts: P[] = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.8 + 0.6, a: Math.random() * 0.5 + 0.15, ph: Math.random() * Math.PI * 2,
    }));

    let raf: number;
    let running = false;

    const draw = (t: number) => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouse.current;

      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        const dx = p.x - mx, dy = p.y - my, dist = Math.hypot(dx, dy);
        if (dist < 130 && dist > 0) { const f = (130-dist)/130*0.7; p.x += dx/dist*f; p.y += dy/dist*f; }
        const pulse = Math.sin(t * 0.0008 + p.ph) * 0.4 + 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(20,184,166,${p.a * pulse})`;
        ctx.fill();
      });

      for (let i = 0; i < pts.length; i++) {
        for (let j = i+1; j < pts.length; j++) {
          const dx = pts[i].x-pts[j].x, dy = pts[i].y-pts[j].y, d = Math.hypot(dx,dy);
          if (d < 90) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(20,184,166,${0.055*(1-d/90)})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!running) { running = true; raf = requestAnimationFrame(draw); }
      } else {
        running = false;
        cancelAnimationFrame(raf);
      }
    }, { threshold: 0 });
    io.observe(section);

    const onMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    window.addEventListener("mousemove", onMouse);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  // Whether the tagline line is showing (being typed or fully done)
  const showTagline = isTypingTagline || isDone;

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden" style={{ background: "var(--s1)" }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />

      {/* Layered bg — viewport-anchored positions so they never shift with content */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgba(20,184,166,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(20,184,166,0.025) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}/>
        <div className="absolute w-[480px] h-[480px] rounded-full" style={{ top: "30vh", right: "20vw", background: "radial-gradient(ellipse,rgba(20,184,166,0.07) 0%,transparent 70%)" }}/>
        <div className="absolute w-[320px] h-[320px] rounded-full" style={{ bottom: "28vh", left: "12vw", background: "radial-gradient(ellipse,rgba(20,184,166,0.04) 0%,transparent 70%)" }}/>
        <div className="absolute bottom-16 inset-x-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(20,184,166,0.12),transparent)" }}/>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-16 w-full">
        {/* Status pill */}
        <div className={cn(
          "inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-10 text-xs font-medium glass-teal",
          vis ? "opacity-100" : "opacity-0"
        )} style={{ transition: "opacity 0.6s ease 0.1s" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-live-pulse" />
          <span style={{ color: "var(--t2)" }}>Available for new projects</span>
          <span className="w-px h-3" style={{ background: "rgba(20,184,166,0.25)" }}/>
          <span style={{ color: "var(--t3)" }}>Nairobi, Kenya · Remote worldwide</span>
        </div>

        {/* Headline */}
        <div className={cn(vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}
             style={{ transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s" }}>
          <h1 className="font-heading font-extrabold mb-6"
              style={{ fontSize: "clamp(1.75rem,6vw,6rem)", lineHeight: 1.1, letterSpacing: "-0.035em", color: "var(--t1)" }}>
            {/*
              minHeight pre-reserves 4 lines so the section never grows when the
              teal tagline appears — 4 × lineHeight(1.1) × font-size-clamp:
              min: 4×1.1×1.75rem=7.7rem  |  mid: 4×1.1×6vw=26.4vw  |  max: 4×1.1×6rem=26.4rem
            */}
            <span className="block" style={{ minHeight: "clamp(7.7rem,26.4vw,26.4rem)" }}>

              {/* White phrase line — cursor here until tagline phase begins */}
              <span className="block">
                {typed}
                {!showTagline && (
                  <span className="inline-block w-[3px] h-[0.85em] ml-1 rounded-sm align-middle animate-cursor-blink"
                        style={{ background: "var(--ac)" }}/>
                )}
              </span>

              {/* Teal tagline — typewritten on a new line, cursor moves here */}
              {showTagline && (
                <span className="block" style={{ color: "var(--ac3)" }}>
                  {isDone ? (
                    // Once fully typed: "transform" sweeps gold left→right on a 3s loop
                    <>
                      {"Simplify, scale, and "}
                      <span style={{
                        background: "linear-gradient(90deg, var(--ac3) 0%, var(--ac3) 20%, var(--go2) 50%, var(--ac3) 80%, var(--ac3) 100%)",
                        backgroundSize: "200% auto",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        animation: "shimmerLTR 3s ease-in-out infinite",
                        display: "inline",
                      }}>transform</span>
                      {"."}
                    </>
                  ) : (
                    // While typing: plain teal
                    typedTagline
                  )}
                  {/* Resting cursor — slows to 3s to breathe with the shimmer once done */}
                  <span className="inline-block w-[3px] h-[0.85em] ml-1 rounded-sm align-middle"
                        style={{
                          background: "var(--ac3)",
                          animation: isDone
                            ? "cursorBlink 3s steps(1) infinite"
                            : "cursorBlink 1.1s steps(1) infinite",
                        }}/>
                </span>
              )}

            </span>
          </h1>
        </div>

        {/* Sub */}
        <p className={cn("max-w-[540px] font-body mb-10", vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5")}
           style={{ fontSize: "17px", lineHeight: 1.75, color: "#c4d9e8", transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s", fontWeight: 400 }}>
          Web apps, platforms, business tools and digital products for founders,
          businesses and creatives who need things done right. Not just done.
        </p>

        {/* CTAs */}
        <div className={cn("flex flex-wrap items-center gap-4 mb-20", vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}
             style={{ transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.45s" }}>
          <CalendlyButton
            className="group flex items-center gap-2.5 px-7 py-4 rounded-full font-heading font-semibold text-base bg-teal-500 hover:bg-teal-400 transition-all duration-300 hover:-translate-y-1"
            style={{ color: "var(--s1)", boxShadow: "0 0 0 0 rgba(20,184,166,0)" }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow="0 12px 32px rgba(20,184,166,0.42)")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow="0 0 0 0 rgba(20,184,166,0)")}>
            Book a free call
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </CalendlyButton>
          <a href="#work"
             className="group flex items-center gap-2.5 px-7 py-4 rounded-full font-body font-medium text-sm glass hover:border-teal-500/25 transition-all duration-300 hover:-translate-y-0.5"
             style={{ color: "var(--t2)" }}>
            See live work
            <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </a>
        </div>

        {/* Stats — 4-column grid for equal spacing; 2-col on mobile */}
        <div className={cn("grid grid-cols-2 sm:grid-cols-4 pt-10 border-t", vis ? "opacity-100" : "opacity-0")}
             style={{ borderColor: "rgba(20,184,166,0.1)", transition: "opacity 0.8s ease 0.6s" }}>
          {[
            { val: "3+",         label: "Years",           sub: "shipping production software" },
            { val: "12h",        label: "Response time",    sub: "guaranteed"                   },
            { val: "100%",       label: "On-time",          sub: "projects delivered on deadline" },
            { val: "End-to-end", label: "Ownership",        sub: "design to deployment"         },
          ].map((s, i) => (
            <div key={s.label}
                 className={cn(
                   "flex flex-col gap-1 group py-4 pr-4",
                   // Left border divider on all but first — desktop only
                   i > 0 ? "sm:border-l sm:pl-8" : "sm:pl-0",
                   // Mobile: bottom border on first row items
                   i < 2 ? "border-b sm:border-b-0 pb-6 sm:pb-4" : "pt-6 sm:pt-4",
                 )}
                 style={{ borderColor: "rgba(20,184,166,0.08)" }}>
              {/* Fixed-height value row keeps all four cells vertically aligned */}
              <div style={{ height: "2.4rem", display: "flex", alignItems: "center" }}>
                <span className="font-heading font-bold transition-colors duration-300 group-hover:text-teal-300"
                      style={{
                        fontSize: s.val.length > 4 ? "1.3rem" : "2rem",
                        lineHeight: 1,
                        color: "var(--t1)",
                        whiteSpace: "nowrap",
                      }}>
                  {s.val}
                </span>
              </div>
              <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--t2)", lineHeight: 1.4 }}>{s.label}</span>
              <span style={{ fontSize: "11px", color: "var(--t3)", lineHeight: 1.4 }}>{s.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stack bar */}
      <div className="relative z-10 border-t" style={{ background: "rgba(3,8,14,0.7)", backdropFilter: "blur(12px)", borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center gap-x-8 gap-y-2">
          <span className="font-mono" style={{ fontSize: "10px", letterSpacing: "0.15em", color: "var(--t4)", textTransform: "uppercase" }}>Stack</span>
          {STACK.map(t => (
            <span key={t} className="transition-colors duration-200 cursor-default"
                  style={{ fontSize: "12px", color: "var(--t3)", fontWeight: 400 }}
                  onMouseEnter={e => (e.currentTarget.style.color="var(--ac)")}
                  onMouseLeave={e => (e.currentTarget.style.color="var(--t3)")}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
