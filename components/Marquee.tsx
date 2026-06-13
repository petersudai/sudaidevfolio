const ITEMS = ["Brand sites", "Products", "Platforms", "Design", "Engineering", "Nairobi to the world"];

/*
 * Editorial marquee: oversized ghost-outline type drifting horizontally.
 * Pure CSS animation; duplicated row makes the -50% loop seamless.
 */
export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div aria-hidden="true" className="relative overflow-hidden py-10 select-none border-y"
         style={{
           background: "var(--s1)",
           borderColor: "rgba(255,255,255,0.03)",
           maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
           WebkitMaskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
         }}>
      <div className="marquee-track flex items-center">
        {row.map((t, i) => (
          <span key={i} className="flex items-center">
            <span className="font-heading font-extrabold uppercase whitespace-nowrap text-ghost px-8"
                  style={{ fontSize: "clamp(2.2rem,5vw,4.5rem)", lineHeight: 1, letterSpacing: "-0.02em" }}>
              {t}
            </span>
            <span style={{ color: "var(--go2)", fontSize: "clamp(0.9rem,1.6vw,1.4rem)", opacity: 0.6 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
