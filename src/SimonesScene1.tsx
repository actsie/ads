import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  Img,
  staticFile,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { SimonesProps } from "./SimonesSchema";

const FONT = '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif';

const SPREAD_ANGLE = 20;   // degrees between each card
const CARD_W = 260;
const CARD_H = 500;
const PIVOT_Y = 980;       // where cards are anchored (below center)
const STAGGER = 3;         // frames between each card fanning out

export const SimonesScene1: React.FC<SimonesProps> = ({ photoFolder, photos }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PHOTOS = photos.map((p) => `${photoFolder}/${p}`);
  const N = PHOTOS.length;

  // Text fades in at frame 18
  const textOpacity = interpolate(frame, [18, 40], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Slide everything up at frame 96
  const slideUp = interpolate(frame, [90, 100], [0, -1200], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#111111", overflow: "hidden" }}>
      <div style={{ width: "100%", height: "100%", transform: `translateY(${slideUp}px)` }}>

        {/* Cards */}
        {PHOTOS.map((photo, i) => {
          const finalAngle = (i - (N - 1) / 2) * SPREAD_ANGLE;

          // Each card springs from 0° to its final angle, staggered
          const angle = spring({
            frame: frame - i * STAGGER,
            fps,
            config: { stiffness: 120, damping: 18, overshootClamping: false },
            from: 0,
            to: finalAngle,
          });

          // Cards also rise up slightly as they fan out
          const riseY = spring({
            frame: frame - i * STAGGER,
            fps,
            config: { stiffness: 120, damping: 18 },
            from: 60,
            to: 0,
          });

          const opacity = 1;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 540 - CARD_W / 2,
                top: PIVOT_Y - CARD_H + riseY,
                width: CARD_W,
                height: CARD_H,
                borderRadius: 16,
                overflow: "hidden",
                opacity,
                transform: `rotate(${angle}deg)`,
                transformOrigin: `50% calc(100% + 200px)`,
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              }}
            >
              <Img
                src={staticFile(photo)}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          );
        })}

        {/* Text */}
        <div style={{
          position: "absolute",
          top: 280,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: textOpacity,
          zIndex: 10,
        }}>
          <div style={{
            fontSize: 64,
            fontWeight: 900,
            color: "#ffffff",
            fontFamily: FONT,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            textShadow: "0 0 40px rgba(0,0,0,1), 0 2px 12px rgba(0,0,0,0.9)",
          }}>
            You put everything<br />into this.
          </div>
        </div>

      </div>
    </AbsoluteFill>
  );
};
