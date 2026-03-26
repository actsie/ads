import React from "react";
import { POSProps } from "./POSSchema";
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

export const POSScene3: React.FC<POSProps> = ({ shopName, photoFolder, productPhoto, lowStockItem, salesTrend, reorderItem }) => {
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

  // Scroll up when confirm bubble appears
  const scrollY = interpolate(frame, [200, 220], [0, 600], {
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

  // "Place order" reply (frame 183)
  const orderOpacity = interpolate(frame, [183, 193], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const orderSlide = spring({
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

  // Product photo (frame 248)
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

  // iOS app-close
  const cardScale = interpolate(frame, [318, 330], [1, 0.48], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const cardSwipeUp = interpolate(frame, [330, 340], [0, -2400], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const cardBorderRadius = interpolate(frame, [318, 330], [0, 28], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const dotAnim = (dotIndex: number) =>
    Math.sin(frame * 0.4 + dotIndex) * 4;

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

          {/* Notification / morphing bubble */}
          <div style={{
            position: "absolute",
            left: cardLeft,
            top: cardTop,
            width: cardWidth,
            padding: cardPadding,
            backgroundColor: "#f2f2f7",
            borderRadius: `${cardRadiusTopLeft}px ${cardRadiusTopRight}px ${cardRadiusBottomRight}px ${cardRadiusBottomLeft}px`,
            boxShadow: `0 4px 24px rgba(0,0,0,${shadowOpacity * 0.12})`,
            transform: `scale(${notifScale})`,
            opacity: notifOpacity,
            transformOrigin: "top center",
          }}>
            {/* iOS notification header */}
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              marginBottom: headerHeight > 0 ? 8 : 0,
              opacity: headerOpacity,
              height: headerHeight,
              overflow: "hidden",
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                backgroundColor: "#111111",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, color: "#ffffff", fontWeight: 700, flexShrink: 0,
              }}>✦</div>
              <div style={{ fontSize: 13, color: "#888888", fontWeight: 500 }}>
                {shopName.toUpperCase()} AI · now
              </div>
            </div>
            <div style={{ fontSize: notifFontSize, color: "#111111", fontWeight: 500, lineHeight: 1.4 }}>
              Your POS data shows {lowStockItem} is {salesTrend}. You have 2 days of stock left. Reorder now?
            </div>
          </div>

          {/* Chat scroll container */}
          <div style={{
            position: "absolute",
            left: 60, right: 60,
            top: 80,
            transform: `translateY(${-scrollY}px)`,
          }}>

            {/* AI avatar + name */}
            <div style={{
              display: "flex", alignItems: "center", gap: 12,
              marginTop: 320, marginBottom: 8,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                backgroundColor: "#111111",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, color: "#ffffff", flexShrink: 0,
              }}>✦</div>
              <div style={{ fontSize: 13, color: "#888888", fontWeight: 500 }}>
                {shopName.toUpperCase()} AI
              </div>
            </div>

            {/* AI first bubble — notification text repeated as chat */}
            <div style={{
              backgroundColor: "#f2f2f7",
              borderRadius: "18px 18px 18px 4px",
              padding: "10px 14px",
              fontSize: 20,
              color: "#111111",
              maxWidth: 600,
              lineHeight: 1.4,
              marginBottom: 16,
            }}>
              Your POS data shows {lowStockItem} is {salesTrend}. You have 2 days of stock left. Reorder now?
            </div>

            {/* "Yes pls" reply */}
            <div style={{
              opacity: replyOpacity,
              transform: `translateY(${replySlide}px)`,
              display: "flex", justifyContent: "flex-end",
              marginBottom: 16,
            }}>
              <div style={{
                backgroundColor: "#007AFF",
                borderRadius: "18px 18px 4px 18px",
                padding: "10px 14px",
                fontSize: 20, color: "#ffffff",
                maxWidth: 420,
              }}>
                Yes pls
              </div>
            </div>

            {/* Typing indicator */}
            <div style={{
              opacity: typingOpacity,
              display: "flex", alignItems: "center", gap: 12,
              marginBottom: 16,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                backgroundColor: "#111111",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, color: "#ffffff", flexShrink: 0,
              }}>✦</div>
              <div style={{
                backgroundColor: "#1c1c1e",
                borderRadius: "18px 18px 18px 4px",
                padding: "12px 18px",
                display: "flex", gap: 6, alignItems: "center",
              }}>
                {[0, 1, 2].map(d => (
                  <div key={d} style={{
                    width: 8, height: 8, borderRadius: "50%",
                    backgroundColor: "#ffffff",
                    transform: `translateY(${dotAnim(d)}px)`,
                  }} />
                ))}
              </div>
            </div>

            {/* Response bubble — reorder suggestion */}
            <div style={{
              opacity: responseOpacity,
              transform: `translateY(${responseSlide}px)`,
              display: "flex", alignItems: "flex-start", gap: 12,
              marginBottom: 16,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                backgroundColor: "#111111",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, color: "#ffffff", flexShrink: 0,
              }}>✦</div>
              <div style={{
                backgroundColor: "#f2f2f7",
                borderRadius: "18px 18px 18px 4px",
                padding: "10px 14px",
                fontSize: 20, color: "#111111",
                maxWidth: 560, lineHeight: 1.5,
              }}>
                Based on your current sell-through rate, I'd recommend ordering {reorderItem}. Want me to place the order?
              </div>
            </div>

            {/* "Place order" reply */}
            <div style={{
              opacity: orderOpacity,
              transform: `translateY(${orderSlide}px)`,
              display: "flex", justifyContent: "flex-end",
              marginBottom: 16,
            }}>
              <div style={{
                backgroundColor: "#007AFF",
                borderRadius: "18px 18px 4px 18px",
                padding: "10px 14px",
                fontSize: 20, color: "#ffffff",
                maxWidth: 420,
              }}>
                Place the order
              </div>
            </div>

            {/* Typing before confirm */}
            <div style={{
              opacity: confirmTypingOpacity,
              display: "flex", alignItems: "center", gap: 12,
              marginBottom: 16,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                backgroundColor: "#111111",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, color: "#ffffff", flexShrink: 0,
              }}>✦</div>
              <div style={{
                backgroundColor: "#1c1c1e",
                borderRadius: "18px 18px 18px 4px",
                padding: "12px 18px",
                display: "flex", gap: 6, alignItems: "center",
              }}>
                {[0, 1, 2].map(d => (
                  <div key={d} style={{
                    width: 8, height: 8, borderRadius: "50%",
                    backgroundColor: "#ffffff",
                    transform: `translateY(${dotAnim(d)}px)`,
                  }} />
                ))}
              </div>
            </div>

            {/* Confirm bubble */}
            <div style={{
              opacity: confirmOpacity,
              transform: `translateY(${confirmSlide}px)`,
              display: "flex", alignItems: "flex-start", gap: 12,
              marginBottom: 16,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                backgroundColor: "#111111",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, color: "#ffffff", flexShrink: 0,
              }}>✦</div>
              <div style={{
                backgroundColor: "#f2f2f7",
                borderRadius: "18px 18px 18px 4px",
                padding: "10px 14px",
                fontSize: 20, color: "#111111",
                maxWidth: 560, lineHeight: 1.5,
              }}>
                Done. {reorderItem} order placed — delivery scheduled for tomorrow morning. Your POS will update automatically when it arrives.
              </div>
            </div>

            {/* Product photo */}
            <div style={{
              opacity: photoOpacity,
              transform: `translateY(${photoSlide}px)`,
              display: "flex", alignItems: "flex-start", gap: 12,
              marginBottom: 16,
              marginLeft: 48,
            }}>
              <Img
                src={staticFile(`${photoFolder}/${productPhoto}`)}
                style={{
                  width: 320, height: 320,
                  borderRadius: 16,
                  objectFit: "cover",
                }}
              />
            </div>

          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
