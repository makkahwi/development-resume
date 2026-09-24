import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#0f2032", color: "#fff", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", fontSize: 32, fontWeight: 700, letterSpacing: -1 }}>Makkahwi <span style={{ color: "#a9c8f6", marginLeft: 8 }}>AI</span></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>Meet Suhaib Ahmad.</div>
        <div style={{ fontSize: 29, color: "#c4d0e0" }}>Work, projects, experience, and the person behind them.</div>
      </div>
      <div style={{ fontSize: 24, color: "#a9c8f6" }}>ai.suhaib.dev</div>
    </div>,
    size,
  );
}
