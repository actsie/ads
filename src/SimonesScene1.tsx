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

const SPREAD_ANGLE = 20;
const CARD_W = 260;
const CARD_H = 500;
const PIVOT_Y = 980;
const STAGGER = 3;

export const SimonesScene1: React.FC<SimonesProps> = ({ photoFolder, photos }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PHOTOS = photos.map((p) => `${photoFolder}/${p}`);
  const N = PHOTOS.length;

  // Front text fades in then out
  const textOpacity = interpolate(frame, [18, 40, 48, 55], [0, 1, 1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Slide up exit
  const slideUp = interpolate(frame, [95, 100], [0, -1200], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  // Stack back — all cards return to angle 0 starting frame 50
  const stackBack = spring({
    frame: frame - 50,
    fps,
    config: { stiffness: 300, damping: 28 },
    from: 0,
    to: 1,
  });

  // Flip — rotateY 0 to 180 at frames 65–85
  const flipAngle = interpolate(frame, [65, 85], [0, 180], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  // Back text springs in after flip completes
  const backTextOpacity = interpolate(frame, [75, 82], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const backTextScale = spring({
    frame: frame - 75,
    fps,
    config: { stiffness: 400, damping: 24 },
    from: 0.85,
    to: 1,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#111111", overflow: "hidden" }}>
      <div style={{ width: "100%", height: "100%", transform: `translateY(${slideUp}px)` }}>

        {/* Perspective container for flip */}
        <div style={{
          width: "100%", height: "100%",
          perspective: 1200,
          perspectiveOrigin: "50% 50%",
        }}>
          <div style={{
            width: "100%", height: "100%",
            transform: `rotateY(${flipAngle}deg)`,
            transformStyle: "preserve-3d",
            position: "relative",
          }}>

            {/* FRONT FACE — cards + text */}
            <div style={{
              position: "absolute", width: "100%", height: "100%",
              backfaceVisibility: "hidden",
            }}>
              {PHOTOS.map((photo, i) => {
                const finalAngle = (i - (N - 1) / 2) * SPREAD_ANGLE;

                const fanAngle = spring({
                  frame: frame - i * STAGGER,
                  fps,
                  config: { stiffness: 120, damping: 18, overshootClamping: false },
                  from: 0,
                  to: finalAngle,
                });

                const riseY = spring({
                  frame: frame - i * STAGGER,
                  fps,
                  config: { stiffness: 120, damping: 18 },
                  from: 60,
                  to: 0,
                });

                // Lerp angle back to 0 as stackBack progresses
                const effectiveAngle = fanAngle * (1 - stackBack);

                return (
                  <div key={i} style={{
                    position: "absolute",
                    left: 540 - CARD_W / 2,
                    top: PIVOT_Y - CARD_H + riseY,
                    width: CARD_W,
                    height: CARD_H,
                    borderRadius: 16,
                    overflow: "hidden",
                    transform: `rotate(${effectiveAngle}deg)`,
                    transformOrigin: `50% calc(100% + 200px)`,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                  }}>
                    <Img
                      src={staticFile(photo)}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                );
              })}

              {/* Front text */}
              <div style={{
                position: "absolute",
                top: 280,
                left: 0, right: 0,
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

            {/* BACK FACE — dark + reveal text */}
            <div style={{
              position: "absolute", width: "100%", height: "100%",
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              backgroundColor: "#111111",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <div style={{
                opacity: backTextOpacity,
                transform: `scale(${backTextScale})`,
                transformOrigin: "center center",
                textAlign: "center",
                padding: "0 80px",
              }}>
                <div style={{
                  fontSize: 72,
                  fontWeight: 900,
                  color: "#ffffff",
                  fontFamily: FONT,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.2,
                }}>
                  But it's harder<br />than it should be.
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </AbsoluteFill>
  );
};
