import React from "react";
import { SimonesProps } from "./SimonesSchema";
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
  "Still counting by hand",
  "Running out mid-rush",
  "Ordering on gut feel",
  "Supplier calls every week",
  "Costs you can't trace",
  "No time to fix it",
  "Every week the same problem",
];

const ARROW_STOP_INDEX = 4; // arrow stops at "Costs you can't trace"
const ITEM_ANGLE = 28;   // degrees between items on the wheel
const RADIUS = 480;      // cylinder radius — controls depth of curve
const CENTER_Y = 500;    // vertical center of wheel on canvas
const CENTER_X = 160;    // horizontal position

// Spin stops when ARROW_STOP_INDEX item reaches front
const SPIN_END = 160;

export const SimonesScene2: React.FC<SimonesProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slide in from below at start
  const slideIn = interpolate(frame, [0, 18], [1080, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // White slide-up at 5 seconds (frame 150)
  const whiteSlide = interpolate(frame, [150, 162], [1080, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  // Spin stops when ARROW_STOP_INDEX item reaches front
  const totalSpin = -ARROW_STOP_INDEX * ITEM_ANGLE;
  const spinAngle = interpolate(frame, [20, SPIN_END], [0, totalSpin], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Active item — capped at ARROW_STOP_INDEX
  const activeIndex = Math.min(
    PAINS.reduce((closest, _, i) => {
      const angle = i * ITEM_ANGLE + spinAngle;
      const closestAngle = closest * ITEM_ANGLE + spinAngle;
      return Math.abs(angle) < Math.abs(closestAngle) ? i : closest;
    }, 0),
    ARROW_STOP_INDEX
  );

  // Arrow nudge — fires when active item changes
  const activeItemCenterFrame = PAINS.map((_, i) =>
    (-i * ITEM_ANGLE / totalSpin) * SPIN_END
  );


  return (
    <AbsoluteFill style={{ backgroundColor: "#111111", overflow: "hidden" }}>
      {/* Slide in from below + pushed up by white panel */}
      <div style={{ width: "100%", height: "100%", transform: `translateY(${slideIn + (whiteSlide - 1080)}px)` }}>
      {/* Perspective container — slight angle like the reference */}
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

          {/* Arrow — fixed at center, nudges */}
          <div style={{
            position: "absolute",
            left: CENTER_X - 58,
            top: CENTER_Y - 36,
            fontSize: 52,
            color: "#ffffff",
            fontFamily: FONT,
            lineHeight: 1,
            zIndex: 10,
          }}>
            →
          </div>

          {/* Wheel items */}
          {PAINS.map((pain, i) => {
            const angleRad = (i * ITEM_ANGLE + spinAngle) * (Math.PI / 180);

            // Y and Z from cylinder math
            const y = CENTER_Y + Math.sin(angleRad) * RADIUS;
            const z = Math.cos(angleRad); // 1 = front, -1 = back

            // Only render items in front half
            if (z < -0.1) return null;

            const opacity = Math.max(0, z * 1.1);
            const isActive = i === activeIndex;
            const blur = isActive ? 0 : Math.max(0, (1 - z) * 6);
            const scale = 0.45 + z * 0.55;

            // Quick snappy nudge — overdamped so it settles in ~3 frames
            const nudge = isActive ? spring({
              frame: frame - activeItemCenterFrame[i],
              fps,
              config: { stiffness: 1200, damping: 60, overshootClamping: true },
              from: 10,
              to: 0,
            }) : 0;

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: CENTER_X + nudge,
                  top: y - 40,
                  opacity,
                  filter: blur > 0.4 ? `blur(${blur}px)` : undefined,
                  transform: `scale(${scale})`,
                  transformOrigin: "left center",
                  fontSize: 72,
                  fontWeight: 400,
                  color: "#ffffff",
                  fontFamily: FONT,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                }}
              >
                {pain}
              </div>
            );
          })}

        </div>
      </div>
      </div>
      {/* White slide-up overlay */}
      <div style={{
        position: "absolute",
        left: 0, right: 0,
        top: whiteSlide,
        height: 1080,
        backgroundColor: "#ffffff",
      }} />
    </AbsoluteFill>
  );
};
