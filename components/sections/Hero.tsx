"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const STACK = ["Next.js","React","TypeScript","Python","Flask","Node.js","Supabase","PostgreSQL","MongoDB","Tailwind CSS","Express","REST APIs"];

export function Hero() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const mouse      = useRef({ x: -500, y: -500 });
  const [vis,   setVis]   = useState(false);
  const [typed, setTyped] = useState("");
  const full = "I build software that";

  useEffect(() => { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t); }, []);

  useEffect(() => {
    if (!vis) return;
    let i = 0;
    const iv = setInterval(() => { setTyped(full.slice(0, ++i)); if (i >= full.length) clearInterval(iv); }, 40);
    return () => clearInterval(iv);
  }, [vis]);

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
      r: Math.random() * 1.2 + 0.3, a: Math.random() * 0.3 + 0.07, ph: Math.random() * Math.PI * 2,
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

    // Stop animation when section scrolls out of view (saves battery + CPU)
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

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden" style={{ background: "var(--s1)" }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />

      {/* Layered bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgba(20,184,166,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(20,184,166,0.025) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}/>
        <div className="absolute top-1/3 right-1/4 w-[480px] h-[480px] rounded-full" style={{ background: "radial-gradient(ellipse,rgba(20,184,166,0.07) 0%,transparent 70%)" }}/>
        <div className="absolute bottom-1/3 left-1/5 w-[320px] h-[320px] rounded-full" style={{ background: "radial-gradient(ellipse,rgba(20,184,166,0.04) 0%,transparent 70%)" }}/>
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
              style={{ fontSize: "clamp(3rem,7.5vw,6rem)", lineHeight: 1.04, letterSpacing: "-0.035em", color: "var(--t1)" }}>
            <span className="block">
              {typed}
              <span className="inline-block w-[3px] h-[0.85em] ml-1 rounded-sm align-middle animate-live-pulse" style={{ background: "var(--ac)" }}/>
            </span>
            <span className="block text-gradient-teal">makes businesses grow.</span>
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
          <a href="#contact"
             className="group flex items-center gap-2.5 px-7 py-4 rounded-full font-heading font-semibold text-base bg-teal-500 hover:bg-teal-400 transition-all duration-300 hover:-translate-y-1"
             style={{ color: "var(--s1)", boxShadow: "0 0 0 0 rgba(20,184,166,0)" }}
             onMouseEnter={e => (e.currentTarget.style.boxShadow="0 12px 32px rgba(20,184,166,0.42)")}
             onMouseLeave={e => (e.currentTarget.style.boxShadow="0 0 0 0 rgba(20,184,166,0)")}>
            Start a project
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#work"
             className="group flex items-center gap-2.5 px-7 py-4 rounded-full font-body font-medium text-sm glass hover:border-teal-500/25 transition-all duration-300 hover:-translate-y-0.5"
             style={{ color: "var(--t2)" }}>
            See live work
            <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </a>
        </div>

        {/* Stats */}
        <div className={cn("flex flex-wrap gap-x-10 gap-y-6 pt-10 border-t", vis ? "opacity-100" : "opacity-0")}
             style={{ borderColor: "rgba(20,184,166,0.1)", transition: "opacity 0.8s ease 0.6s" }}>
          {[
            { val: "3+",   label: "Years",            sub: "shipping production software" },
            { val: "12+",  label: "Products shipped",  sub: "live in production"           },
            { val: "4",    label: "Industries",        sub: "events · finance · logistics · real estate" },
            { val: "24h",  label: "Response time",     sub: "guaranteed"                   },
          ].map((s, i) => (
            <div key={s.label} className="flex flex-col gap-0.5 group" style={{ animationDelay: `${0.65 + i*0.07}s` }}>
              <span className="font-heading font-bold transition-colors duration-300 group-hover:text-teal-300"
                    style={{ fontSize: "2rem", lineHeight: 1, color: "var(--t1)" }}>{s.val}</span>
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
