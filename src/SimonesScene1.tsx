import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  Img,
  staticFile,
  interpolate,
} from "remotion";

const FONT = '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif';

const PHOTOS = [
  "SIMONES/646418797_1468586038611091_7206347187926231118_n.jpg",
  "SIMONES/653062545_1479455094190852_8656525538161025741_n.jpg",
  "SIMONES/653358140_1481061464030215_7821472743304600534_n.jpg",
  "SIMONES/654300608_1484839580319070_8288790873785131178_n.jpg",
  "SIMONES/5b3970_424c96de57cc49fda1fa3ea2433531e1~mv2.avif",
  "SIMONES/5b3970_6af63a58d89e4c0698d8b764e862ad81~mv2.avif",
  "SIMONES/5b3970_6d93a0982aeb4fe6a618a1d40a977aaf~mv2.avif",
];

const COUNT = 7;
const CYCLE_DURATION_MS = 18000;
const TOTAL_ROTATIONS = 1.5;
const MAX_DEPTH = 700;
const MIN_RADIUS = 10;
const MAX_RADIUS = 480;

export const SimonesScene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Convert frame to ms — same math as the HTML version
  const timestamp = (frame / fps) * 1000;

  // Text fades in at 1.5 seconds (frame 45)
  const textOpacity = interpolate(frame, [45, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tiles = Array.from({ length: COUNT }, (_, i) => {
    const offset = i / COUNT;
    const phase = ((timestamp / CYCLE_DURATION_MS) + offset) % 1;

    const angle = phase * TOTAL_ROTATIONS * 360;
    const radius = MIN_RADIUS + phase * (MAX_RADIUS - MIN_RADIUS);
    const zDepth = -MAX_DEPTH + phase * (MAX_DEPTH - 150);

    // Smooth fade in from center, brighten as it rises, fade out near camera
    let opacity: number;
    if (phase < 0.4) opacity = Math.pow(phase / 0.4, 2) * 0.85;
    else if (phase > 0.78) opacity = (1 - phase) / 0.22;
    else opacity = 0.85 + ((phase - 0.4) / 0.38) * 0.15;

    return { i, angle, radius, zDepth, opacity, photo: PHOTOS[i] };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#111111" }}>
      {/* 3D perspective container */}
      <div
        style={{
          width: "100%",
          height: "100%",
          perspective: 500,
          perspectiveOrigin: "50% 30%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Spiral container */}
        <div
          style={{
            transformStyle: "preserve-3d",
            position: "relative",
            width: 0,
            height: 0,
          }}
        >
          {tiles.map(({ i, angle, radius, zDepth, opacity, photo }) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 240,
                height: 240,
                top: -120,
                left: -120,
                borderRadius: 12,
                overflow: "hidden",
                opacity,
                transform: `rotateZ(${angle}deg) translateX(${radius}px) translateZ(${zDepth}px)`,
                boxShadow: "0 4px 24px rgba(0,0,0,0.6)",
              }}
            >
              <Img
                src={staticFile(photo)}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>

        {/* Center text */}
        <div
          style={{
            position: "absolute",
            textAlign: "center",
            opacity: textOpacity,
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: "#ffffff",
              fontFamily: FONT,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              textShadow: "0 0 40px rgba(0,0,0,1), 0 2px 12px rgba(0,0,0,0.9)",
            }}
          >
            You put everything
            <br />
            into this.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
