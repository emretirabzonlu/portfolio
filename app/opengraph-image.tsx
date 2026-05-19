import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Emre Tırabzonlu — Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0F",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          color: "white",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 600,
            height: 400,
            background: "radial-gradient(ellipse, rgba(59,130,246,0.15) 0%, transparent 70%)",
          }}
        />
        {/* Logo top-right */}
        <div style={{ position: "absolute", top: 80, right: 80, display: "flex" }}>
          <svg width="64" height="64" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 30 40 L 100 40 L 100 60 L 50 60 L 50 90 L 90 90 L 90 110 L 50 110 L 50 140 L 100 140 L 100 160 L 30 160 Z" fill="white" />
            <path d="M 110 40 L 180 40 L 180 60 L 155 60 L 155 160 L 135 160 L 135 60 L 110 60 Z" fill="white" />
            <rect x="135" y="60" width="20" height="14" fill="#3B82F6" />
          </svg>
        </div>
        <div style={{ fontSize: 22, color: "#3B82F6", marginBottom: 20, letterSpacing: 4, textTransform: "uppercase" }}>
          Full Stack Developer
        </div>
        <div style={{ fontSize: 80, fontWeight: 800, lineHeight: 1.05, marginBottom: 28 }}>
          Emre Tırabzonlu
        </div>
        <div style={{ fontSize: 26, color: "#A8A8B3", maxWidth: 700, lineHeight: 1.5 }}>
          .NET &amp; React ile uçtan uca kurumsal sistemler
        </div>
        <div style={{ position: "absolute", bottom: 72, left: 80, fontSize: 18, color: "#A8A8B3", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#3B82F6" }} />
          emretirabzonlu.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
