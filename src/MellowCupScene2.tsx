import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Img,
  staticFile,
} from "remotion";
import { MellowCupProps } from "./MellowCupSchema";

const FONT = '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif';

const PriceSticker: React.FC<{ progress: number; price: string }> = ({ progress, price }) => {
  const scale = interpolate(progress, [0, 1], [0, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity,
        transformOrigin: "center",
        width: 160,
        height: 160,
        borderRadius: "50%",
        backgroundColor: "#faf8f4",
        border: "3px solid #2c1a0e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Inner white ring */}
      <div
        style={{
          position: "absolute",
          width: 138,
          height: 138,
          borderRadius: "50%",
          border: "1.5px solid #2c1a0e",
          opacity: 0.4,
        }}
      />

      {/* Text content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "#9b8c7d",
            fontFamily: FONT,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          starts at
        </span>
        <div style={{ display: "flex", alignItems: "flex-start", lineHeight: 1 }}>
          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#2c1a0e",
              fontFamily: FONT,
              marginTop: 6,
            }}
          >
            $
          </span>
          <span
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: "#2c1a0e",
              fontFamily: FONT,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {price}
          </span>
        </div>
      </div>
    </div>
  );
};

export const MellowCupScene2: React.FC<MellowCupProps> = ({
  productName,
  price,
  accentColor,
  productImage,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Image springs in from below
  const imgProgress = spring({
    frame,
    fps,
    config: { stiffness: 160, damping: 14, overshootClamping: false },
    from: 0,
    to: 1,
  });

  // "New Matcha Latte" pops in at frame 15
  const titleProgress = spring({
    frame: frame - 15,
    fps,
    config: { stiffness: 280, damping: 18, overshootClamping: false },
    from: 0,
    to: 1,
  });

  // "Now available" badge pops in at frame 35
  const badgeProgress = spring({
    frame: frame - 35,
    fps,
    config: { stiffness: 280, damping: 18, overshootClamping: false },
    from: 0,
    to: 1,
  });

  // Price sticker pops in at frame 55
  const stickerProgress = spring({
    frame: frame - 55,
    fps,
    config: { stiffness: 300, damping: 14, overshootClamping: false },
    from: 0,
    to: 1,
  });

  // Diamond spin — continuous rotation
  const diamondRotation = interpolate(frame, [35, 155], [0, 360], {
    extrapolateRight: "clamp",
  });

  // Fade out at frame 130
  const containerOpacity = interpolate(frame, [130, 150], [1, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#faf8f4",
        overflow: "hidden",
      }}
    >
      <div style={{ opacity: containerOpacity, position: "relative", width: "100%", height: "100%" }}>

        {/* Image — full background, layered behind */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, calc(-50% + ${interpolate(imgProgress, [0, 1], [120, 0])}px)) scale(${interpolate(imgProgress, [0, 1], [0.6, 1])})`,
            transformOrigin: "center center",
          }}
        >
          <Img
            src={staticFile(productImage)}
            style={{
              width: 820,
              height: 820,
              objectFit: "contain",
            }}
          />
        </div>

        {/* "New Matcha Latte" — top, over image */}
        <div
          style={{
            position: "absolute",
            top: 200,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            transform: `scale(${interpolate(titleProgress, [0, 1], [0.7, 1])})`,
            transformOrigin: "center top",
          }}
        >
          <div
            style={{
              fontSize: 62,
              fontWeight: 900,
              color: "#2c1a0e",
              fontFamily: FONT,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              textAlign: "center",
            }}
          >
            {productName}
          </div>
        </div>

        {/* "Now available" badge — bottom center, over image */}
        <div
          style={{
            position: "absolute",
            bottom: 100,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: interpolate(badgeProgress, [0, 1], [0, 1]),
            transform: `scale(${interpolate(badgeProgress, [0, 1], [0.7, 1])})`,
            transformOrigin: "center bottom",
          }}
        >
          <div
            style={{
              backgroundColor: accentColor,
              paddingTop: 14,
              paddingBottom: 14,
              paddingLeft: 36,
              paddingRight: 36,
              borderRadius: 40,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                display: "inline-block",
                transform: `rotate(${diamondRotation}deg)`,
                fontSize: 20,
                lineHeight: 1,
              }}
            >
              ✦
            </span>
            <span
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: "#ffffff",
                fontFamily: FONT,
                letterSpacing: "0.01em",
              }}
            >
              Now available
            </span>
          </div>
        </div>

        {/* Price sticker — bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 80,
          }}
        >
          <PriceSticker progress={stickerProgress} price={price} />
        </div>

      </div>
    </AbsoluteFill>
  );
};
