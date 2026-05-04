"use client";
export function Footer() {
  return (
    <footer className="relative py-8" style={{ background: "var(--s0)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center font-heading font-bold text-[11px]"
               style={{ background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.2)", color: "var(--ac)" }}>PS</div>
          <span className="font-heading font-bold text-sm" style={{ color: "var(--t4)" }}>
            Sudai<span style={{ color: "var(--ac)" }}>.</span>
          </span>
        </div>
        <div className="flex items-center gap-6">
          {[
            { label:"Services", href:"#services" },
            { label:"Work",     href:"#work" },
            { label:"About",    href:"#about" },
            { label:"GitHub",   href:"https://github.com/petersudai" },
            { label:"Email",    href:"mailto:psudai@gmail.com" },
          ].map(l => (
            <a key={l.label} href={l.href}
               className="text-xs transition-colors duration-200"
               style={{ color: "var(--t4)" }}
               onMouseEnter={e => (e.currentTarget.style.color = "var(--t2)")}
               onMouseLeave={e => (e.currentTarget.style.color = "var(--t4)")}>
              {l.label}
            </a>
          ))}
        </div>
        <div className="text-xs" style={{ color: "var(--t4)" }}>
          © {new Date().getFullYear()} Peter Gathuku Sudai
        </div>
      </div>
    </footer>
  );
}
