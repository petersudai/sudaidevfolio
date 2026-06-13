"use client";
import { useEffect, useRef } from "react";

/* Hairline reading-progress bar pinned above the navbar. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 z-[60] h-[2px] pointer-events-none" aria-hidden="true">
      <div ref={barRef} className="h-full origin-left"
           style={{ transform: "scaleX(0)", background: "linear-gradient(90deg, var(--ac), var(--ac3))" }} />
    </div>
  );
}
