import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Img,
  staticFile,
} from "remotion";
import { MellowCupProps } from "./MellowCupSchema";

const FONT = '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif';

export const MellowCupScene3: React.FC<MellowCupProps> = ({
  shopName,
  tagline,
  neighborhood,
  accentColor,
  logoImage,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo bounces in
  const logoProgress = spring({
    frame,
    fps,
    config: { stiffness: 180, damping: 8, overshootClamping: false },
    from: 0,
    to: 1,
  });

  // "Mellow Cup." pops in at frame 20
  const titleProgress = spring({
    frame: frame - 20,
    fps,
    config: { stiffness: 280, damping: 18, overshootClamping: false },
    from: 0,
    to: 1,
  });

  // "Specialty coffee." slides up at frame 40
  const line2Progress = spring({
    frame: frame - 40,
    fps,
    config: { stiffness: 220, damping: 20 },
    from: 0,
    to: 1,
  });

  // "Your neighborhood." slides up at frame 58
  const line3Progress = spring({
    frame: frame - 58,
    fps,
    config: { stiffness: 220, damping: 20 },
    from: 0,
    to: 1,
  });

  // Fade out at frame 130
  const containerOpacity = interpolate(frame, [130, 150], [1, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#faf8f4",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 0,
      }}
    >
      <div
        style={{
          opacity: containerOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
        }}
      >
        {/* Logo */}
        <div
          style={{
            transform: `scale(${interpolate(logoProgress, [0, 1], [0, 1])}) translateY(${interpolate(logoProgress, [0, 1], [-40, 0])}px)`,
            opacity: interpolate(logoProgress, [0, 0.2], [0, 1]),
            marginBottom: 32,
          }}
        >
          <Img
            src={staticFile(logoImage)}
            style={{
              width: 100,
              height: 100,
              objectFit: "contain",
            }}
          />
        </div>

        {/* "Mellow Cup." */}
        <div
          style={{
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            transform: `scale(${interpolate(titleProgress, [0, 1], [0.6, 1])})`,
            transformOrigin: "center",
            marginBottom: 8,
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 900,
              color: "#2c1a0e",
              fontFamily: FONT,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              textAlign: "center",
            }}
          >
            {shopName}.
          </div>
        </div>

        {/* "Specialty coffee." */}
        <div
          style={{
            opacity: interpolate(line2Progress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(line2Progress, [0, 1], [20, 0])}px)`,
            marginBottom: 4,
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 500,
              color: accentColor,
              fontFamily: FONT,
              letterSpacing: "0.01em",
              textAlign: "center",
            }}
          >
            {tagline}
          </div>
        </div>

        {/* "Your neighborhood." */}
        <div
          style={{
            opacity: interpolate(line3Progress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(line3Progress, [0, 1], [20, 0])}px)`,
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 400,
              color: "#9b8c7d",
              fontFamily: FONT,
              letterSpacing: "0.01em",
              textAlign: "center",
            }}
          >
            {neighborhood}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
