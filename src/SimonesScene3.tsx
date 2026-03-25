import React from "react";
import { SimonesProps } from "./SimonesSchema";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
  Img,
  staticFile,
} from "remotion";

const FONT = '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif';

export const SimonesScene3: React.FC<SimonesProps> = ({ shopName, photoFolder, productPhoto, suggestedSpecial, draftPostCaption }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Notification pops in
  const notifScale = spring({
    frame,
    fps,
    config: { stiffness: 600, damping: 24, overshootClamping: false },
    from: 0.7,
    to: 1,
  });
  const notifOpacity = interpolate(frame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Morph: notification → chat bubble (frames 60–76)
  const morphProgress = interpolate(frame, [60, 76], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const cardLeft = interpolate(morphProgress, [0, 1], [90, 60]);
  const cardTop = interpolate(morphProgress, [0, 1], [260, 80]);
  const cardWidth = interpolate(morphProgress, [0, 1], [900, 780]);
  const cardRadiusTopLeft = interpolate(morphProgress, [0, 1], [32, 22]);
  const cardRadiusTopRight = interpolate(morphProgress, [0, 1], [32, 22]);
  const cardRadiusBottomRight = interpolate(morphProgress, [0, 1], [32, 22]);
  const cardRadiusBottomLeft = interpolate(morphProgress, [0, 1], [32, 4]);
  const headerOpacity = interpolate(morphProgress, [0, 0.4], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const headerHeight = interpolate(morphProgress, [0, 0.4], [46, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const notifFontSize = interpolate(morphProgress, [0, 1], [42, 20]);
  const cardPadding = interpolate(morphProgress, [0, 1], [44, 18]);
  const shadowOpacity = interpolate(morphProgress, [0, 0.6], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Only scroll up when confirm bubble is about to appear
  const scrollY = interpolate(frame, [200, 220], [0, 650], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // "Yes pls" reply (frames 95–108)
  const replyOpacity = interpolate(frame, [95, 105], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const replySlide = spring({
    frame: frame - 95,
    fps,
    config: { stiffness: 260, damping: 22 },
    from: 60,
    to: 0,
  });

  // Typing indicator (frames 115–138)
  const typingOpacity = interpolate(frame, [115, 122, 132, 138], [0, 1, 1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Response bubble (frames 138–158)
  const responseOpacity = interpolate(frame, [138, 150], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const responseSlide = spring({
    frame: frame - 138,
    fps,
    config: { stiffness: 200, damping: 22 },
    from: -50,
    to: 0,
  });

  // "Do both" reply (frame 183)
  const doBothOpacity = interpolate(frame, [183, 193], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const doBothSlide = spring({
    frame: frame - 183,
    fps,
    config: { stiffness: 260, damping: 22 },
    from: 60,
    to: 0,
  });

  // Typing before confirm (frames 196–210)
  const confirmTypingOpacity = interpolate(frame, [196, 202, 218, 223], [0, 1, 1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Confirm bubble (frame 223)
  const confirmOpacity = interpolate(frame, [223, 233], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const confirmSlide = spring({
    frame: frame - 223,
    fps,
    config: { stiffness: 200, damping: 22 },
    from: -50,
    to: 0,
  });

  // iOS app-close: scale down to card (frames 310–330), then swipe up (frames 330–348)
  const cardScale = interpolate(frame, [310, 330], [1, 0.48], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const cardSwipeUp = interpolate(frame, [330, 340], [0, -2400], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const cardBorderRadius = interpolate(frame, [310, 330], [0, 28], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Photo + post prompt (frame 248)
  const photoOpacity = interpolate(frame, [248, 260], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const photoSlide = spring({
    frame: frame - 248,
    fps,
    config: { stiffness: 200, damping: 22 },
    from: -50,
    to: 0,
  });
  const postPromptOpacity = interpolate(frame, [265, 275], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const postPromptSlide = spring({
    frame: frame - 265,
    fps,
    config: { stiffness: 200, damping: 22 },
    from: -50,
    to: 0,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#ffffff", fontFamily: FONT, overflow: "hidden" }}>
      {/* iOS app-close wrapper */}
      <div style={{
        position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
        transform: `scale(${cardScale}) translateY(${cardSwipeUp}px)`,
        transformOrigin: "center center",
        borderRadius: cardBorderRadius,
        overflow: "hidden",
      }}>
      <div style={{ width: "100%", height: "100%", backgroundColor: "#ffffff" }}>
      <div style={{ width: "100%", height: "100%", transform: `translateY(${-scrollY}px)` }}>

        {/* Notification / chat bubble (morphs) */}
        <div style={{
          position: "absolute",
          left: cardLeft,
          top: cardTop,
          width: cardWidth,
          backgroundColor: "#f2f2f7",
          borderRadius: `${cardRadiusTopLeft}px ${cardRadiusTopRight}px ${cardRadiusBottomRight}px ${cardRadiusBottomLeft}px`,
          padding: cardPadding,
          boxShadow: `0 8px 40px rgba(0,0,0,${0.12 * shadowOpacity})`,
          opacity: notifOpacity,
          transform: morphProgress === 0 ? `scale(${notifScale})` : "scale(1)",
          transformOrigin: "center center",
        }}>
          <div style={{
            opacity: headerOpacity,
            height: headerHeight,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: headerOpacity > 0 ? 14 : 0,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              backgroundColor: "#111111",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, flexShrink: 0, color: "#ffffff",
            }}>✦</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#888888", letterSpacing: 0.2 }}>
              {shopName.toUpperCase()} AI
            </div>
            <div style={{ fontSize: 18, color: "#aaaaaa", marginLeft: "auto" }}>now</div>
          </div>

          <div style={{
            fontSize: notifFontSize,
            fontWeight: 600,
            color: "#111111",
            lineHeight: 1.4,
            letterSpacing: "-0.01em",
          }}>
            1 carton of heavy cream expires in 5 days. Suggest a special to move it?
          </div>
        </div>

        {/* "Yes pls" reply */}
        <div style={{
          position: "absolute",
          right: 60,
          top: 226,
          opacity: replyOpacity,
          transform: `translateX(${replySlide}px)`,
        }}>
          <div style={{
            backgroundColor: "#007AFF",
            color: "#ffffff",
            fontSize: 22,
            fontWeight: 500,
            padding: "14px 20px",
            borderRadius: "22px 22px 4px 22px",
          }}>
            Yes pls
          </div>
        </div>

        {/* Typing indicator */}
        <div style={{
          position: "absolute",
          left: 60,
          top: 310,
          opacity: typingOpacity,
        }}>
          <div style={{
            backgroundColor: "#f2f2f7",
            borderRadius: "22px 22px 22px 4px",
            padding: "16px 20px",
            display: "flex",
            gap: 6,
            alignItems: "center",
            width: 72,
          }}>
            {[0, 1, 2].map((dot) => (
              <div key={dot} style={{
                width: 8, height: 8,
                borderRadius: "50%",
                backgroundColor: "#888888",
                transform: `translateY(${Math.sin((frame - 115) * 0.35 + dot * 1.1) * 4}px)`,
              }} />
            ))}
          </div>
        </div>

        {/* Response bubble */}
        <div style={{
          position: "absolute",
          left: 60,
          top: 310,
          opacity: responseOpacity,
          transform: `translateX(${responseSlide}px)`,
          width: 780,
        }}>
          <div style={{
            backgroundColor: "#f2f2f7",
            borderRadius: "22px 22px 22px 4px",
            padding: "22px 26px",
          }}>
            <div style={{ fontSize: 20, color: "#111111", lineHeight: 1.6 }}>
              Based on what's in stock, here are your best options:<br /><br />
              ☕ <strong>{suggestedSpecial}</strong> — best option. You have 1 full carton of cream, 1 bottle of vanilla syrup, and cold brew concentrate in stock. Enough for ~20 cups.<br /><br />
              🥛 <strong>Cream Matcha Latte</strong> — works too, but matcha tin is nearly empty. Good for ~10 cups before you run out. Restock takes 1–2 days.<br /><br />
              Want me to:<br />
              - Add {suggestedSpecial} to the menu?<br />
              - Order more matcha?
            </div>
          </div>
        </div>

        {/* "Do both" reply */}
        <div style={{
          position: "absolute",
          right: 60,
          top: 840,
          opacity: doBothOpacity,
          transform: `translateX(${doBothSlide}px)`,
        }}>
          <div style={{
            backgroundColor: "#007AFF",
            color: "#ffffff",
            fontSize: 22,
            fontWeight: 500,
            padding: "14px 20px",
            borderRadius: "22px 22px 4px 22px",
          }}>
            Do both
          </div>
        </div>

        {/* Typing before confirm */}
        <div style={{
          position: "absolute",
          left: 60,
          top: 930,
          opacity: confirmTypingOpacity,
        }}>
          <div style={{
            backgroundColor: "#f2f2f7",
            borderRadius: "22px 22px 22px 4px",
            padding: "16px 20px",
            display: "flex",
            gap: 6,
            alignItems: "center",
            width: 72,
          }}>
            {[0, 1, 2].map((dot) => (
              <div key={dot} style={{
                width: 8, height: 8,
                borderRadius: "50%",
                backgroundColor: "#888888",
                transform: `translateY(${Math.sin((frame - 196) * 0.35 + dot * 1.1) * 4}px)`,
              }} />
            ))}
          </div>
        </div>

        {/* Confirm bubble */}
        <div style={{
          position: "absolute",
          left: 60,
          top: 930,
          opacity: confirmOpacity,
          transform: `translateX(${confirmSlide}px)`,
          maxWidth: 780,
        }}>
          <div style={{
            backgroundColor: "#f2f2f7",
            borderRadius: "22px 22px 22px 4px",
            padding: "16px 22px",
            fontSize: 20,
            color: "#111111",
            lineHeight: 1.5,
          }}>
            Done. {suggestedSpecial} set as today's special — you might also want to write it on the board at the counter. Matcha reorder placed — delivery scheduled for tomorrow morning.
          </div>
        </div>

        {/* Photo bubble */}
        <div style={{
          position: "absolute",
          left: 60,
          top: 1080,
          opacity: photoOpacity,
          transform: `translateX(${photoSlide}px)`,
        }}>
          <div style={{
            width: 340,
            height: 340,
            borderRadius: "22px 22px 22px 4px",
            overflow: "hidden",
          }}>
            <Img
              src={staticFile(`${photoFolder}/${productPhoto}`)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Draft post + post prompt bubble */}
        <div style={{
          position: "absolute",
          left: 60,
          top: 1440,
          opacity: postPromptOpacity,
          transform: `translateX(${postPromptSlide}px)`,
          maxWidth: 780,
        }}>
          <div style={{
            backgroundColor: "#f2f2f7",
            borderRadius: "22px 22px 22px 4px",
            padding: "16px 22px",
            fontSize: 20,
            color: "#111111",
            lineHeight: 1.6,
          }}>
            Here's a draft post:<br /><br />
            <span style={{ fontStyle: "italic", color: "#333333" }}>
              "{draftPostCaption}"
            </span>
            <br /><br />
            Want me to post this to Facebook and Instagram?
          </div>
        </div>

      </div>
      </div>
      </div>
    </AbsoluteFill>
  );
};
