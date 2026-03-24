import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  interpolate,
  staticFile,
} from "remotion";
import React from "react";

const FPS = 30;

const dropSpring = (
  frame: number,
  start: number,
  duration: number,
  startY: number,
  endY: number,
): { y: number; opacity: number } => {
  const localFrame = Math.max(0, Math.min(frame - start, duration));
  const springValue = spring({
    frame: localFrame,
    fps: FPS,
    config: { stiffness: 200, damping: 20, overshootClamping: false },
  });
  const y = interpolate(springValue, [0, 1], [startY, endY], {
    extrapolateLeft: "clamp",
    extrapolateRight: "extend",
  });
  const opacity = interpolate(springValue, [0, 0.5, 1], [0, 0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { y, opacity };
};

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();

  const lineOne = dropSpring(frame, 0, 7, 32, 36);
  const lineTwo = dropSpring(frame, 7, 8, 42, 52);
  const lineThreeY = Math.min(lineTwo.y + 8, 60);

  const websiteText = "visit fountainofscale.com";
  const typedFrameStart = 14;
  const typedFramesSinceStart = Math.max(0, frame - typedFrameStart);
  const typedWebsiteChars = Math.min(
    websiteText.length,
    Math.floor(typedFramesSinceStart / 1),
  );
  const displayedWebsiteText = websiteText.slice(0, typedWebsiteChars);
  const visitPart = displayedWebsiteText.slice(
    0,
    Math.min(5, displayedWebsiteText.length),
  );
  const restPart = displayedWebsiteText.slice(visitPart.length);

  const counterDuration = 30;
  const counterNormalized = Math.min(1, frame / counterDuration);
  const counterEased = 1 - Math.pow(1 - counterNormalized, 3);
  const counterValue = Math.min(14, 7 + Math.round(counterEased * 7));

  const logoStartFrame = 42;
  const logoSpringValue = spring({
    frame: Math.max(0, frame - logoStartFrame),
    fps: FPS,
    config: { stiffness: 180, damping: 8, overshootClamping: false },
  });
  const logoOffsetY = interpolate(logoSpringValue, [0, 1], [-220, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "extend",
  });
  const logoOpacity = interpolate(
    frame,
    [logoStartFrame, logoStartFrame + 10],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#ffffff",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "10%",
          top: `${lineOne.y}%`,
          width: "80%",
          opacity: lineOne.opacity,
          fontSize: 72,
          fontWeight: 900,
          color: "#1a1a1a",
          textAlign: "left",
          lineHeight: 1.1,
          marginBottom: 4,
        }}
      >
        {counterValue} days free.
      </div>
      <div
        style={{
          position: "absolute",
          left: "10%",
          top: `${lineTwo.y}%`,
          width: "80%",
          opacity: lineTwo.opacity,
          fontSize: 52,
          fontWeight: 400,
          color: "#555555",
          textAlign: "left",
          lineHeight: 1.1,
          marginBottom: 4,
        }}
      >
        First partner shops only.
      </div>
      <div
        style={{
          position: "absolute",
          left: "10%",
          top: `${lineThreeY}%`,
          width: "80%",
          opacity: displayedWebsiteText.length > 0 ? 1 : 0,
          fontSize: 36,
          fontWeight: 400,
          color: "#FF6B35",
          textAlign: "left",
          lineHeight: 1.1,
          marginBottom: 4,
          letterSpacing: 0.5,
        }}
      >
        <span style={{ color: "#888888" }}>{visitPart}</span>
        <span style={{ color: "#6c5dd3" }}>{restPart}</span>
      </div>
      <img
        src={staticFile("bubble1.png")}
        style={{
          position: "absolute",
          left: "10%",
          top: `calc(${lineOne.y}% - 6% + ${logoOffsetY}px)`,
          width: 160,
          height: 160,
          borderRadius: 24,
          transform: "translate(-50%, -50%)",
          opacity: logoOpacity,
        }}
        alt="logo"
      />
    </AbsoluteFill>
  );
};
