import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0F",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "36px",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 30 40 L 100 40 L 100 60 L 50 60 L 50 90 L 90 90 L 90 110 L 50 110 L 50 140 L 100 140 L 100 160 L 30 160 Z" fill="white" />
          <path d="M 110 40 L 180 40 L 180 60 L 155 60 L 155 160 L 135 160 L 135 60 L 110 60 Z" fill="white" />
          <rect x="135" y="60" width="20" height="14" fill="#3B82F6" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
