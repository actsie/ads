import React from "react";
import { POSProps } from "./POSSchema";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

const FONT = '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif';

export const POSScene4: React.FC<POSProps> = ({ shopName }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = interpolate(frame, [0, 18], [1080, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const line1Opacity = interpolate(frame, [2, 14], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const line1Y = spring({
    frame: frame - 2,
    fps,
    config: { stiffness: 600, damping: 30 },
    from: 30,
    to: 0,
  });

  const heartScale = spring({
    frame: frame - 45,
    fps,
    config: { stiffness: 400, damping: 14, overshootClamping: false },
    from: 0,
    to: 1,
  });
  const heartOpacity = interpolate(frame, [45, 50], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const line2Opacity = interpolate(frame, [63, 75], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const line2Y = spring({
    frame: frame - 63,
    fps,
    config: { stiffness: 200, damping: 22 },
    from: 30,
    to: 0,
  });

  const line3Opacity = interpolate(frame, [85, 97], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const line3Y = spring({
    frame: frame - 85,
    fps,
    config: { stiffness: 200, damping: 22 },
    from: 30,
    to: 0,
  });

  const teamOpacity = interpolate(frame, [100, 112], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const teamY = spring({
    frame: frame - 100,
    fps,
    config: { stiffness: 200, damping: 22 },
    from: 16,
    to: 0,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#ffffff", fontFamily: FONT, overflow: "hidden" }}>
      <div style={{
        width: "100%", height: "100%",
        transform: `translateY(${slideIn}px)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: 100,
        paddingRight: 100,
      }}>

        {/* Line 1 + heart */}
        <div style={{
          opacity: line1Opacity,
          transform: `translateY(${line1Y}px)`,
          marginBottom: 32,
        }}>
          <div style={{
            fontSize: shopName.length > 12 ? 46 : 58,
            fontWeight: 800,
            color: "#111111",
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
          }}>
            {shopName} was top of mind<br />when we started this.{" "}
            <span style={{
              fontSize: 52,
              opacity: heartOpacity,
              display: "inline-block",
              transform: `scale(${heartScale})`,
              transformOrigin: "left center",
            }}>
              ❤️
            </span>
          </div>
        </div>

        {/* Line 2 */}
        <div style={{
          opacity: line2Opacity,
          transform: `translateY(${line2Y}px)`,
          marginBottom: 28,
        }}>
          <div style={{
            fontSize: 40,
            fontWeight: 500,
            color: "#333333",
            letterSpacing: "-0.02em",
            lineHeight: 1.3,
          }}>
            Free setup. No obligations.
          </div>
        </div>

        {/* Line 3 */}
        <div style={{
          opacity: line3Opacity,
          transform: `translateY(${line3Y}px)`,
        }}>
          <div style={{
            fontSize: 40,
            fontWeight: 500,
            color: "#333333",
            letterSpacing: "-0.02em",
            lineHeight: 1.3,
          }}>
            Reply <span style={{ color: "#e0253a" }}>yes</span> if you're interested.
          </div>
          <div style={{
            fontSize: 22,
            fontWeight: 400,
            color: "#aaaaaa",
            marginTop: 32,
            letterSpacing: "-0.01em",
            opacity: teamOpacity,
            transform: `translateY(${teamY}px)`,
          }}>
            — Fountain of Scale team
          </div>
        </div>

      </div>
    </AbsoluteFill>
  );
};
