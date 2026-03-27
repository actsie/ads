import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
  Img,
  staticFile,
} from "remotion";
import rough from "roughjs";

// Original image dimensions from tesseract OCR
const IMG_ORIG_W = 1162;
const IMG_ORIG_H = 1514;

// Scale image to 85% of 1080px height, centered on 1920x1080
const SCALE = (1080 * 0.85) / IMG_ORIG_H;
const IMG_W = IMG_ORIG_W * SCALE;
const IMG_H = IMG_ORIG_H * SCALE;
const IMG_X = (1920 - IMG_W) / 2;
const IMG_Y = (1080 - IMG_H) / 2;

// OCR positions scaled to composition coords
// "Introducing thepersongame.com," — left=123 top=110 right=577
const H1 = { x: IMG_X + 123 * SCALE, y: IMG_Y + 104 * SCALE, w: (577 - 123) * SCALE, h: 36 * SCALE };
// "make people feel special" — left=298 top=346 right=673
const H2 = { x: IMG_X + 298 * SCALE, y: IMG_Y + 340 * SCALE, w: (673 - 298) * SCALE, h: 42 * SCALE };

const DURATION = 150; // 5 seconds at 30fps

// Convert roughjs OpSet ops to SVG path d string
function opsToD(ops: Array<{op: string; data: number[]}>): string {
  return ops.map(op => {
    if (op.op === "move") return `M ${op.data[0]} ${op.data[1]}`;
    if (op.op === "lineTo") return `L ${op.data[0]} ${op.data[1]}`;
    if (op.op === "bcurveTo") return `C ${op.data[0]} ${op.data[1]}, ${op.data[2]} ${op.data[3]}, ${op.data[4]} ${op.data[5]}`;
    return "";
  }).join(" ");
}

// Generate rough SVG paths synchronously — works in Remotion render
function makeHighlight(x: number, y: number, w: number, h: number, fill: string, stroke: string, seed: number) {
  if (w <= 0) return null;
  const gen = rough.generator();
  const drawable = gen.rectangle(x, y, w, h, {
    fill,
    fillStyle: "solid",
    stroke,
    strokeWidth: 1.5,
    roughness: 2,
    bowing: 1.5,
    seed,
  });
  return drawable.sets.map((set, i) => {
    const isFill = set.type === "fillPath" || set.type === "fillSketch";
    const d = opsToD(set.ops as Array<{op: string; data: number[]}>);
    return (
      <path
        key={i}
        d={d}
        fill={isFill ? fill : "none"}
        stroke={isFill ? "none" : stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    );
  });
}

export const ArticleHighlight: React.FC = () => {
  const frame = useCurrentFrame();

  const blur = interpolate(frame, [0, 30], [14, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const scale = interpolate(frame, [0, DURATION], [1, 1.07], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const rotateY = interpolate(frame, [0, DURATION], [-7.5, 7.5], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const rotateX = interpolate(frame, [0, DURATION], [4, -4], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const h1Progress = interpolate(frame, [35, 75], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const h2Progress = interpolate(frame, [85, 120], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const jitterSeed = Math.floor(frame / 3);

  const h1Paths = frame >= 35
    ? makeHighlight(H1.x, H1.y, H1.w * h1Progress, H1.h, "rgba(255,220,0,0.25)", "rgba(240,200,0,0.9)", jitterSeed)
    : null;
  const h2Paths = frame >= 85
    ? makeHighlight(H2.x, H2.y, H2.w * h2Progress, H2.h, "rgba(255,100,100,0.25)", "rgba(255,80,80,0.9)", jitterSeed + 1)
    : null;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000", perspective: 1200 }}>
      <div style={{
        width: 1920, height: 1080,
        position: "relative",
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
        transform: `scale(${scale}) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
        transformStyle: "preserve-3d",
      }}>

        {/* Highlights — behind the image */}
        <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0, zIndex: 3 }}>
          {h1Paths}
          {h2Paths}
        </svg>

        {/* Tweet image — on top of highlights */}
        <div style={{
          position: "absolute",
          left: IMG_X, top: IMG_Y,
          width: IMG_W, height: IMG_H,
          zIndex: 2,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 20px 80px rgba(0,0,0,0.6)",
        }}>
          <Img
            src={staticFile("maitweet.png")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

      </div>
    </AbsoluteFill>
  );
};
