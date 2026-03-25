import { useCurrentFrame, interpolate, spring } from "remotion";
import React from "react";

const FPS = 30;
const WIDTH = 1080;
const HEIGHT = 1080;

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();

  // Frame ranges for each animation phase
  const CIRCLE_FADE_START = 0;
  const ICON_SCALE_START = 3;
  const STRETCH_START = 12;
  const STRETCH_END = 27;
  const TEXT_START = 27;

  // Phase 2: Icon scales in (frames 3-12)
  const iconSpringValue = spring({
    frame: Math.max(0, frame - ICON_SCALE_START),
    fps: FPS,
    config: { stiffness: 200, damping: 15 },
  });
  const iconScale = interpolate(iconSpringValue, [0, 1], [0, 1]);

  // Phase 3: Circle stretches into search bar (frames 12-27)
  const stretchSpringValue = spring({
    frame: Math.max(
      0,
      Math.min(frame - STRETCH_START, STRETCH_END - STRETCH_START),
    ),
    fps: FPS,
    config: { stiffness: 120, damping: 18 },
  });
  const barWidth = interpolate(stretchSpringValue, [0, 1], [48, 820], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 4: Text typing (frames 27-90)
  // 0.91-1.88 seconds = 27.3-56.4 frames at 30fps
  // Adjust TEXT_END to ~57 to finish typing by 1.88 seconds
  const TEXT_TYPING_END = 57; // finishes at ~1.9 seconds
  const textPhaseFrame = Math.max(0, frame - TEXT_START);
  const text = "Free ai inventory management system";
  // 35 characters in 30 frames: 1 char per 0.857 frames
  const charIndex = Math.ceil(textPhaseFrame / 0.857);
  const displayedText = text.slice(0, Math.min(charIndex, text.length));
  const showCursor =
    frame >= TEXT_START && frame < TEXT_TYPING_END && charIndex <= text.length;
  const cursorBlink = Math.sin((frame - TEXT_START) * 0.1) > 0;

  // Determine current phase to control visibility
  const isCirclePhase = frame <= STRETCH_END;
  const isTextPhase = frame >= TEXT_START;

  // Phase 5: Fade to white background + zoom search bar (frames 57-65)
  const whiteBackgroundOpacity = interpolate(
    frame,
    [TEXT_TYPING_END, 65],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Search bar zoom as it fades to white
  const searchBarScale = interpolate(frame, [TEXT_TYPING_END, 65], [1, 3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Search Bar Container */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) scale(${searchBarScale})`,
          width: Math.max(48, barWidth),
          height: 56,
          backgroundColor: "#ffffff",
          borderRadius: 28,
          opacity: frame >= CIRCLE_FADE_START ? 1 : 0,
          display: "flex",
          alignItems: "center",
          paddingLeft: 16,
          paddingRight: 16,
          boxSizing: "border-box",
        }}
      >
        {/* Magnifying Glass Icon */}
        <svg
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth={2}
          style={{
            flexShrink: 0,
            marginRight: barWidth > 100 ? 12 : 0,
            transform: `scale(${isCirclePhase ? iconScale : 1})`,
            transformOrigin: "center",
            opacity: 1,
          }}
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>

        {/* Text Content */}
        {isTextPhase && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              color: "#1a1a1a",
              fontSize: 22,
              fontWeight: 400,
              minHeight: "1em",
            }}
          >
            <span>{displayedText}</span>
            {showCursor && (
              <span
                style={{
                  width: 2,
                  height: "1em",
                  backgroundColor: "#1a1a1a",
                  marginLeft: 4,
                  opacity: cursorBlink ? 1 : 0,
                }}
              />
            )}
          </div>
        )}
      </div>

      {/* White fade overlay (frames 57-90) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: WIDTH,
          height: HEIGHT,
          backgroundColor: "#ffffff",
          opacity: whiteBackgroundOpacity,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
