import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#070f18",
          padding: "64px 80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(20,184,166,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}/>

        {/* Top-right glow */}
        <div style={{
          position: "absolute", top: "-80px", right: "-80px",
          width: "480px", height: "480px", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(20,184,166,0.15) 0%, transparent 65%)",
        }}/>

        {/* Bottom-left glow */}
        <div style={{
          position: "absolute", bottom: "-60px", left: "-60px",
          width: "360px", height: "360px", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(20,184,166,0.08) 0%, transparent 70%)",
        }}/>

        {/* Top row — availability pill + domain */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.2)",
            borderRadius: "100px", padding: "8px 18px",
          }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#14b8a6" }}/>
            <span style={{ color: "#5eead4", fontSize: "15px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Available for new projects
            </span>
          </div>
          <span style={{ color: "#14b8a6", fontSize: "18px", fontWeight: 600, letterSpacing: "0.02em" }}>
            petersudai.dev
          </span>
        </div>

        {/* Centre — name + headline + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0px", position: "relative", zIndex: 1 }}>
          {/* Name */}
          <div style={{ fontSize: "22px", fontWeight: 500, color: "#6a8fa8", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "20px" }}>
            Peter Sudai · Fullstack Developer & Product Designer
          </div>

          {/* Final typewriter phrase */}
          <div style={{ fontSize: "72px", fontWeight: 800, color: "#f0f6ff", lineHeight: 1.05, letterSpacing: "-0.035em", marginBottom: "12px" }}>
            Real solutions.{"\n"}Built to last.
          </div>

          {/* Teal tagline */}
          <div style={{ fontSize: "52px", fontWeight: 800, color: "#5eead4", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            Simplify, scale, and transform.
          </div>
        </div>

        {/* Bottom row — positioning line + location */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
          <span style={{ fontSize: "18px", color: "#6a8fa8", letterSpacing: "0.03em", maxWidth: "640px", lineHeight: 1.6 }}>
            Brand sites, products and platforms. Designed and engineered end to end.
          </span>

          {/* Location */}
          <span style={{ fontSize: "15px", color: "#3a5a70", letterSpacing: "0.04em" }}>
            Nairobi, Kenya · Remote worldwide
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
