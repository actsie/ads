import React from "react";
import { POSProps } from "./POSSchema";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

const FONT = '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif';

export const POSScene3: React.FC<POSProps> = ({ shopName, lowStockItem, salesTrend, reorderItem, supplierName, supplierPhone }) => {
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
  const cardWidth = interpolate(morphProgress, [0, 1], [900, 560]);
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

  // Typing indicator 1 (frames 115–138)
  const typing1Opacity = interpolate(frame, [115, 122, 132, 138], [0, 1, 1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Response bubble (frames 138–155)
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

  // "Yes" reply (frames 178–188)
  const yesOpacity = interpolate(frame, [178, 188], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const yesSlide = spring({
    frame: frame - 178,
    fps,
    config: { stiffness: 260, damping: 22 },
    from: 60,
    to: 0,
  });

  // Typing indicator 2 (frames 200–222)
  const typing2Opacity = interpolate(frame, [200, 207, 216, 222], [0, 1, 1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Draft order bubble (frames 222–240)
  const draftOpacity = interpolate(frame, [222, 235], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const draftSlide = spring({
    frame: frame - 222,
    fps,
    config: { stiffness: 200, damping: 22 },
    from: -50,
    to: 0,
  });

  // "Send it" reply (frames 268–278)
  const sendOpacity = interpolate(frame, [268, 278], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const sendSlide = spring({
    frame: frame - 268,
    fps,
    config: { stiffness: 260, damping: 22 },
    from: 60,
    to: 0,
  });

  // Typing before confirm (frames 288–308)
  const confirmTypingOpacity = interpolate(frame, [288, 294, 308, 314], [0, 1, 1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Confirm bubble (frames 314–330)
  const confirmOpacity = interpolate(frame, [314, 326], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const confirmSlide = spring({
    frame: frame - 314,
    fps,
    config: { stiffness: 200, damping: 22 },
    from: -50,
    to: 0,
  });

  // Scroll to reveal draft order and beyond
  const scrollY = interpolate(frame, [215, 232], [0, 220], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // iOS app-close
  const cardScale = interpolate(frame, [400, 412], [1, 0.48], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const cardSwipeUp = interpolate(frame, [412, 422], [0, -2400], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const cardBorderRadius = interpolate(frame, [400, 412], [0, 28], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const dotAnim = (dotIndex: number) =>
    Math.sin(frame * 0.4 + dotIndex) * 4;

  return (
    <AbsoluteFill style={{ backgroundColor: "#ffffff", fontFamily: FONT, overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
        transform: `scale(${cardScale}) translateY(${cardSwipeUp}px)`,
        transformOrigin: "center center",
        borderRadius: cardBorderRadius,
        overflow: "hidden",
      }}>
        <div style={{ width: "100%", height: "100%", backgroundColor: "#ffffff" }}>
        <div style={{ width: "100%", height: "100%", transform: `translateY(${-scrollY}px)` }}>

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
              {morphProgress > 0.5 && (
                <div style={{ marginTop: 12, fontSize: 16, lineHeight: 1.7, color: "#444444" }}>
                  📊 This week<br />
                  • Sales: {salesTrend}<br />
                  • Stock left: ~2 days<br />
                  • Normal reorder window: 5 days<br />
                  • Running 3 days behind
                </div>
              )}
            </div>
          </div>

          {/* "Yes pls" reply */}
          <div style={{
            position: "absolute",
            right: 60, top: 400,
            opacity: replyOpacity,
            transform: `translateX(${replySlide}px)`,
          }}>
            <div style={{
              backgroundColor: "#007AFF", color: "#ffffff",
              fontSize: 22, fontWeight: 500,
              padding: "14px 20px",
              borderRadius: "22px 22px 4px 22px",
            }}>Yes pls</div>
          </div>

          {/* Typing 1 */}
          <div style={{ position: "absolute", left: 60, top: 470, opacity: typing1Opacity }}>
            <div style={{
              backgroundColor: "#f2f2f7", borderRadius: "22px 22px 22px 4px",
              padding: "16px 20px", display: "flex", gap: 6, alignItems: "center", width: 72,
            }}>
              {[0, 1, 2].map(d => (
                <div key={d} style={{
                  width: 8, height: 8, borderRadius: "50%", backgroundColor: "#888888",
                  transform: `translateY(${dotAnim(d)}px)`,
                }} />
              ))}
            </div>
          </div>

          {/* Response bubble */}
          <div style={{
            position: "absolute", left: 60, top: 470,
            opacity: responseOpacity,
            transform: `translateX(${responseSlide}px)`,
            width: 780,
          }}>
            <div style={{ backgroundColor: "#f2f2f7", borderRadius: "22px 22px 22px 4px", padding: "22px 26px" }}>
              <div style={{ fontSize: 20, color: "#111111", lineHeight: 1.6 }}>
                Based on your sell-through rate, I'd recommend ordering {reorderItem}. Want me to draft the order?
              </div>
            </div>
          </div>

          {/* "Yes" reply */}
          <div style={{
            position: "absolute",
            right: 60, top: 620,
            opacity: yesOpacity,
            transform: `translateX(${yesSlide}px)`,
          }}>
            <div style={{
              backgroundColor: "#007AFF", color: "#ffffff",
              fontSize: 22, fontWeight: 500,
              padding: "14px 20px",
              borderRadius: "22px 22px 4px 22px",
            }}>Yes</div>
          </div>

          {/* Typing 2 */}
          <div style={{ position: "absolute", left: 60, top: 690, opacity: typing2Opacity }}>
            <div style={{
              backgroundColor: "#f2f2f7", borderRadius: "22px 22px 22px 4px",
              padding: "16px 20px", display: "flex", gap: 6, alignItems: "center", width: 72,
            }}>
              {[0, 1, 2].map(d => (
                <div key={d} style={{
                  width: 8, height: 8, borderRadius: "50%", backgroundColor: "#888888",
                  transform: `translateY(${dotAnim(d)}px)`,
                }} />
              ))}
            </div>
          </div>

          {/* Draft order bubble */}
          <div style={{
            position: "absolute", left: 60, top: 690,
            opacity: draftOpacity,
            transform: `translateX(${draftSlide}px)`,
            width: 780,
          }}>
            <div style={{ backgroundColor: "#f2f2f7", borderRadius: "22px 22px 22px 4px", padding: "22px 26px" }}>
              <div style={{ fontSize: 20, color: "#111111", lineHeight: 1.6 }}>
                Draft order ready:<br /><br />
                <span style={{ fontWeight: 600 }}>{supplierName} · {supplierPhone}</span><br /><br />
                <span style={{ fontStyle: "italic", color: "#444444" }}>
                  "Hi, this is {shopName}. Can we get {reorderItem} delivered tomorrow? Thanks"
                </span><br /><br />
                Follow-up scheduled in 2hrs if no reply.
              </div>
            </div>
          </div>

          {/* "Send it" reply */}
          <div style={{
            position: "absolute",
            right: 60, top: 1010,
            opacity: sendOpacity,
            transform: `translateX(${sendSlide}px)`,
          }}>
            <div style={{
              backgroundColor: "#007AFF", color: "#ffffff",
              fontSize: 22, fontWeight: 500,
              padding: "14px 20px",
              borderRadius: "22px 22px 4px 22px",
            }}>Send it</div>
          </div>

          {/* Typing before confirm */}
          <div style={{ position: "absolute", left: 60, top: 1080, opacity: confirmTypingOpacity }}>
            <div style={{
              backgroundColor: "#f2f2f7", borderRadius: "22px 22px 22px 4px",
              padding: "16px 20px", display: "flex", gap: 6, alignItems: "center", width: 72,
            }}>
              {[0, 1, 2].map(d => (
                <div key={d} style={{
                  width: 8, height: 8, borderRadius: "50%", backgroundColor: "#888888",
                  transform: `translateY(${dotAnim(d)}px)`,
                }} />
              ))}
            </div>
          </div>

          {/* Confirm bubble */}
          <div style={{
            position: "absolute", left: 60, top: 1080,
            opacity: confirmOpacity,
            transform: `translateX(${confirmSlide}px)`,
            maxWidth: 780,
          }}>
            <div style={{
              backgroundColor: "#f2f2f7", borderRadius: "22px 22px 22px 4px",
              padding: "16px 22px",
              fontSize: 20, color: "#111111", lineHeight: 1.5,
            }}>
              Sent. Following up in 2hrs if no confirmation.
            </div>
          </div>

        </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
