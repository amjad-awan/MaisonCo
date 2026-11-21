import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#12233B" }}>
        <svg width="180" height="180" viewBox="0 0 64 64">
          <rect x="4" y="4" width="56" height="56" rx="0" fill="none" stroke="#C9A56B" strokeOpacity="0.35" strokeWidth="1.2" />
          <path d="M15 47V20l17 17 17-17v27" fill="none" stroke="#C9A56B" strokeWidth="5.5" strokeLinecap="square" strokeLinejoin="miter" />
          <circle cx="32" cy="50" r="2.2" fill="#1E5266" />
        </svg>
      </div>
    ),
    size,
  );
}