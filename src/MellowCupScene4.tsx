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

export const MellowCupScene4: React.FC<MellowCupProps> = ({
  shopName,
  neighborhood,
  accentColor,
  logoImage,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Accent bar sweeps in from left at frame 0
  const barProgress = spring({
    frame,
    fps,
    config: { stiffness: 200, damping: 22 },
    from: 0,
    to: 1,
  });

  // "Come find us." drops in at frame 10
  const ctaProgress = spring({
    frame: frame - 10,
    fps,
    config: { stiffness: 260, damping: 16, overshootClamping: false },
    from: 0,
    to: 1,
  });

  // Shop name slides in at frame 40
  const nameProgress = spring({
    frame: frame - 40,
    fps,
    config: { stiffness: 220, damping: 20 },
    from: 0,
    to: 1,
  });

  // Neighborhood + logo fade in at frame 65
  const detailProgress = spring({
    frame: frame - 65,
    fps,
    config: { stiffness: 200, damping: 22 },
    from: 0,
    to: 1,
  });

  // Divider line grows at frame 55
  const dividerProgress = spring({
    frame: frame - 55,
    fps,
    config: { stiffness: 180, damping: 20 },
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
        alignItems: "flex-start",
        paddingLeft: 100,
        paddingRight: 100,
        flexDirection: "column",
      }}
    >
      {/* Accent bar on left edge */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "15%",
          bottom: "15%",
          width: 8,
          backgroundColor: accentColor,
          transformOrigin: "top center",
          transform: `scaleY(${barProgress})`,
          borderRadius: "0 4px 4px 0",
        }}
      />

      <div style={{ opacity: containerOpacity }}>
        {/* "Come find us." */}
        <div
          style={{
            opacity: interpolate(ctaProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(ctaProgress, [0, 1], [30, 0])}px)`,
            marginBottom: 12,
          }}
        >
          <div
            style={{
              fontSize: 88,
              fontWeight: 900,
              color: "#2c1a0e",
              fontFamily: FONT,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            Come find us.
          </div>
        </div>

        {/* Shop name */}
        <div
          style={{
            opacity: interpolate(nameProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(nameProgress, [0, 1], [20, 0])}px)`,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              fontSize: 88,
              fontWeight: 900,
              color: accentColor,
              fontFamily: FONT,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {shopName}.
          </div>
        </div>

        {/* Divider line */}
        <div
          style={{
            width: interpolate(dividerProgress, [0, 1], [0, 200]),
            height: 2,
            backgroundColor: "#2c1a0e",
            opacity: 0.15,
            marginBottom: 32,
          }}
        />

        {/* Logo + neighborhood row */}
        <div
          style={{
            opacity: interpolate(detailProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(detailProgress, [0, 1], [12, 0])}px)`,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <Img
            src={staticFile(logoImage)}
            style={{
              width: 48,
              height: 48,
              objectFit: "contain",
              opacity: 0.7,
            }}
          />
          <div
            style={{
              fontSize: 28,
              fontWeight: 400,
              color: "#9b8c7d",
              fontFamily: FONT,
              letterSpacing: "0.02em",
            }}
          >
            {neighborhood}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
