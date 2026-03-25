import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { MellowCupProps } from "./MellowCupSchema";

const FONT = '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif';

const WordPop: React.FC<{
  word: string;
  startFrame: number;
  fontSize: number;
  color: string;
  fontWeight: number;
}> = ({ word, startFrame, fontSize, color, fontWeight }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { stiffness: 280, damping: 18, overshootClamping: false },
    from: 0,
    to: 1,
  });

  return (
    <span
      style={{
        display: "inline-block",
        opacity: interpolate(progress, [0, 1], [0, 1]),
        transform: `scale(${interpolate(progress, [0, 1], [0.6, 1])}) translateY(${interpolate(progress, [0, 1], [20, 0])}px)`,
        transformOrigin: "left center",
        fontSize,
        fontWeight,
        color,
        fontFamily: FONT,
        lineHeight: 1.15,
        marginRight: fontSize * 0.28,
      }}
    >
      {word}
    </span>
  );
};

export const MellowCupScene1: React.FC<MellowCupProps> = ({
  hook,
  tagline,
  shopName,
  accentColor,
}) => {
  const frame = useCurrentFrame();

  // Split hook into words and animate each
  const words = hook.split(" ");
  const taglineOpacity = interpolate(frame, [105, 122], [0, 1], { extrapolateRight: "clamp" });
  const taglineY = interpolate(frame, [105, 122], [16, 0], { extrapolateRight: "clamp" });
  const containerOpacity = interpolate(frame, [145, 165], [1, 0], { extrapolateRight: "clamp" });

  // Group words into lines of ~3 words
  const lines: string[][] = [];
  for (let i = 0; i < words.length; i += 3) {
    lines.push(words.slice(i, i + 3));
  }

  let wordIndex = 0;

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
      <div style={{ opacity: containerOpacity }}>
        {lines.map((lineWords, lineIdx) => {
          const lineStart = lineIdx * 3;
          return (
            <div key={lineIdx} style={{ display: "flex", flexWrap: "wrap", marginBottom: 8 }}>
              {lineWords.map((word, wIdx) => {
                const globalIdx = lineStart + wIdx;
                const isLastWord = globalIdx === words.length - 1;
                const color = isLastWord ? accentColor : "#2c1a0e";
                const startFrame = 8 + globalIdx * 8;
                wordIndex++;
                return (
                  <WordPop
                    key={wIdx}
                    word={word}
                    startFrame={startFrame}
                    fontSize={72}
                    color={color}
                    fontWeight={900}
                  />
                );
              })}
            </div>
          );
        })}

        {/* Tagline */}
        <div
          style={{
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
            fontSize: 28,
            fontWeight: 400,
            color: "#9b8c7d",
            fontFamily: FONT,
            letterSpacing: "0.02em",
            marginTop: 16,
          }}
        >
          {shopName} — {tagline}
        </div>
      </div>
    </AbsoluteFill>
  );
};
