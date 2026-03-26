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

const PAINS = [
  "Your POS tracks sales, not spoilage",
  "Reordering still happens on gut feel",
  "Waste you can't see in the reports",
  "Stock runs out between orders",
  "Data sits there, nothing acts on it",
  "Food cost report comes too late",
  "You find out after the damage is done",
];

const ARROW_STOP_INDEX = 4;
const ITEM_ANGLE = 28;
const RADIUS = 480;
const CENTER_Y = 500;
const CENTER_X = 160;
const SPIN_END = 160;

export const POSScene2: React.FC<POSProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = interpolate(frame, [0, 18], [1080, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const whiteSlide = interpolate(frame, [150, 162], [1080, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const bridgeSlideOut = interpolate(frame, [194, 200], [0, 1400], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const bridgeVisible = frame >= 150 && frame < 200;

  const emojiScale = spring({
    frame: frame - 172,
    fps,
    config: { stiffness: 500, damping: 18, overshootClamping: false },
    from: 0,
    to: 1,
  });
  const emojiVisible = frame >= 172 && frame < 200;

  const totalSpin = -ARROW_STOP_INDEX * ITEM_ANGLE;
  const spinAngle = interpolate(frame, [20, SPIN_END], [0, totalSpin], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const activeIndex = Math.min(
    PAINS.reduce((closest, _, i) => {
      const angle = i * ITEM_ANGLE + spinAngle;
      const closestAngle = closest * ITEM_ANGLE + spinAngle;
      return Math.abs(angle) < Math.abs(closestAngle) ? i : closest;
    }, 0),
    ARROW_STOP_INDEX
  );

  const activeItemCenterFrame = PAINS.map((_, i) => {
    const p = i / ARROW_STOP_INDEX;
    const t = 1 - Math.pow(1 - p, 1 / 3);
    return 20 + t * (SPIN_END - 20);
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#111111", overflow: "hidden" }}>
      <div style={{ width: "100%", height: "100%", transform: `translateY(${slideIn + (whiteSlide - 1080)}px)` }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          perspective: 1000,
          perspectiveOrigin: "30% 50%",
        }}>
          <div style={{
            width: "100%", height: "100%",
            transform: "rotateY(-10deg)",
            transformStyle: "preserve-3d",
          }}>
            <div style={{
              position: "absolute",
              left: CENTER_X - 58,
              top: CENTER_Y - 36,
              fontSize: 52,
              color: "#ffffff",
              fontFamily: FONT,
              lineHeight: 1,
              zIndex: 10,
            }}>→</div>

            {PAINS.map((pain, i) => {
              const angleRad = (i * ITEM_ANGLE + spinAngle) * (Math.PI / 180);
              const y = CENTER_Y + Math.sin(angleRad) * RADIUS;
              const z = Math.cos(angleRad);
              if (z < -0.1) return null;

              const opacity = Math.max(0, z * 1.1);
              const isActive = i === activeIndex;
              const blur = isActive ? 0 : Math.max(0, (1 - z) * 6);
              const scale = 0.45 + z * 0.55;

              const nudge = isActive && frame >= activeItemCenterFrame[i] ? spring({
                frame: frame - activeItemCenterFrame[i],
                fps,
                config: { stiffness: 400, damping: 28, overshootClamping: true },
                from: i === ARROW_STOP_INDEX ? 0 : 10,
                to: i === ARROW_STOP_INDEX ? 10 : 0,
              }) : 0;

              return (
                <div key={i} style={{
                  position: "absolute",
                  left: CENTER_X + nudge,
                  top: y - 40,
                  opacity,
                  filter: blur > 0.4 ? `blur(${blur}px)` : undefined,
                  transform: `scale(${scale})`,
                  transformOrigin: "left center",
                  fontSize: 60,
                  fontWeight: 400,
                  color: "#ffffff",
                  fontFamily: FONT,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                }}>
                  {pain}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div style={{
        position: "absolute",
        left: 0, right: 0,
        top: whiteSlide,
        height: 1080,
        backgroundColor: "#ffffff",
      }} />
      <div style={{
        position: "absolute",
        left: 80,
        top: whiteSlide + 460,
        display: bridgeVisible ? "block" : "none",
        transform: `translateX(${bridgeSlideOut}px)`,
        transformOrigin: "left center",
        pointerEvents: "none",
      }}>
        <div style={{
          fontSize: 64,
          fontWeight: 700,
          color: "#111111",
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
        }}>
          What if your data<br />just worked for you? {" "}
          <span style={{
            display: emojiVisible ? "inline-block" : "none",
            transform: `scale(${emojiScale})`,
            transformOrigin: "left center",
            fontSize: 64,
          }}>🫨</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
