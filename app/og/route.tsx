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
          padding: "72px 80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(20,184,166,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Top glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(20,184,166,0.18) 0%, transparent 65%)",
          }}
        />

        {/* Bottom glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(20,184,166,0.1) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0px", position: "relative", zIndex: 1 }}>
          {/* Availability pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(20,184,166,0.1)",
              border: "1px solid rgba(20,184,166,0.2)",
              borderRadius: "100px",
              padding: "8px 18px",
              width: "fit-content",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#14b8a6",
              }}
            />
            <span style={{ color: "#5eead4", fontSize: "16px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Available for new projects
            </span>
          </div>

          {/* Name */}
          <div style={{ fontSize: "82px", fontWeight: 800, color: "#e8f0f5", lineHeight: 1, letterSpacing: "-0.03em", marginBottom: "16px" }}>
            Peter Sudai
          </div>

          {/* Title */}
          <div style={{ fontSize: "34px", color: "#14b8a6", fontWeight: 600, letterSpacing: "-0.01em" }}>
            Fullstack Developer
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "20px", color: "#4a6070", maxWidth: "580px", lineHeight: 1.6 }}>
            Web apps, SaaS products and business tools for founders, businesses and creatives.
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
            <div style={{ fontSize: "16px", color: "#2a4a60", letterSpacing: "0.05em" }}>Nairobi, Kenya · Remote worldwide</div>
            <div style={{ fontSize: "18px", color: "#14b8a6", fontWeight: 600, letterSpacing: "0.02em" }}>petersudai.dev</div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
