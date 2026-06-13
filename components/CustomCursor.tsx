"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

/*
 * Studio cursor: a precise teal dot that tracks instantly, and a soft ring
 * that trails behind with lag. The ring grows over interactive elements.
 * Desktop pointer devices only; bows out for reduced-motion users.
 */
export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine    = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("has-custom-cursor");
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    // quickTo gives buttery sub-frame tweening without re-creating tweens
    const dotX  = gsap.quickTo(dot,  "x", { duration: 0.08, ease: "power2.out" });
    const dotY  = gsap.quickTo(dot,  "y", { duration: 0.08, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      dotX(e.clientX); dotY(e.clientY);
      ringX(e.clientX); ringY(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });

    // Ring grows over anything interactive (event delegation, no per-element wiring)
    const over = (e: MouseEvent) => {
      const interactive = (e.target as HTMLElement).closest?.(
        "a, button, [role='button'], input, textarea, select, label"
      );
      gsap.to(ring, { scale: interactive ? 1.8 : 1, opacity: interactive ? 0.9 : 0.5, duration: 0.3, ease: "power2.out" });
      gsap.to(dot,  { scale: interactive ? 0.4 : 1, duration: 0.3, ease: "power2.out" });
    };
    window.addEventListener("mouseover", over, { passive: true });

    // Fade out when the pointer leaves the window
    const leave = () => gsap.to([dot, ring], { opacity: 0, duration: 0.25 });
    const enter = () => {
      gsap.to(dot,  { opacity: 1,   duration: 0.25 });
      gsap.to(ring, { opacity: 0.5, duration: 0.25 });
    };
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
    </>
  );
}
