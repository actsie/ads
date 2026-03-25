import { useCurrentFrame, spring, interpolate } from "remotion";
import React from "react";

const FPS = 30;
const WIDTH = 1080;
const HEIGHT = 1080;

interface Exchange {
  id: number;
  typingStart: number;
  fsBubbleStart: number;
  fsBubbleEnd: number;
  userReplyStart: number;
  userReplyEnd: number;
  confirmationStart: number;
  confirmationEnd: number;
  fsText: string;
  userText: string;
  confirmationText: string;
  timestamp: string;
}

const EXCHANGES: Exchange[] = [
  {
    id: 1,
    typingStart: 75,
    fsBubbleStart: 87,
    fsBubbleEnd: 99,
    userReplyStart: 119,
    userReplyEnd: 129,
    confirmationStart: 129,
    confirmationEnd: 139,
    fsText:
      "Brown sugar syrup at 2 units. Reorder 10 from Chan's Supply? Est. Friday delivery.",
    userText: "Yes",
    confirmationText:
      "✓ Reorder placed — 10 units, Chan's Supply. Arriving Friday.",
    timestamp: "9:14 AM",
  },
  {
    id: 2,
    typingStart: 139,
    fsBubbleStart: 149,
    fsBubbleEnd: 161,
    userReplyStart: 175,
    userReplyEnd: 184,
    confirmationStart: 184,
    confirmationEnd: 192,
    fsText: "Oat milk at 3 units. Reorder 6 units?",
    userText: "Yeah go ahead",
    confirmationText:
      "✓ Done — 6 units ordered. You'll get a delivery confirmation Thursday.",
    timestamp: "9:14 AM",
  },
  {
    id: 3,
    typingStart: 192,
    fsBubbleStart: 200,
    fsBubbleEnd: 211,
    userReplyStart: 222,
    userReplyEnd: 230,
    confirmationStart: 230,
    confirmationEnd: 236,
    fsText: "Tapioca pearls at 4 units. Reorder 12 for the weekend?",
    userText: "Yes pls",
    confirmationText: "✓ 12 units ordered. Stock covered through Sunday.",
    timestamp: "9:15 AM",
  },
  {
    id: 4,
    typingStart: 236,
    fsBubbleStart: 243,
    fsBubbleEnd: 253,
    userReplyStart: 261,
    userReplyEnd: 268,
    confirmationStart: 268,
    confirmationEnd: 273,
    fsText:
      "Backup supplier available — same price, delivers Wednesday. Switch for this order?",
    userText: "Yes switch",
    confirmationText:
      "✓ Switched to backup supplier. Delivers Wednesday, same price.",
    timestamp: "9:15 AM",
  },
  {
    id: 5,
    typingStart: 273,
    fsBubbleStart: 279,
    fsBubbleEnd: 288,
    userReplyStart: 294,
    userReplyEnd: 300,
    confirmationStart: 300,
    confirmationEnd: 304,
    fsText: "Cups at 8 units. Reorder 200?",
    userText: "Yes",
    confirmationText: "✓ 200 cups on the way.",
    timestamp: "9:15 AM",
  },
  {
    id: 6,
    typingStart: 304,
    fsBubbleStart: 309,
    fsBubbleEnd: 318,
    userReplyStart: 323,
    userReplyEnd: 329,
    confirmationStart: 329,
    confirmationEnd: 332,
    fsText:
      "1-star review flagged — item was unavailable. Auto-reply sent, discount offered.",
    userText: "Ok thanks",
    confirmationText: "✓ Auto-reply sent. Customer offered 15% off next visit.",
    timestamp: "9:16 AM",
  },
  {
    id: 7,
    typingStart: 332,
    fsBubbleStart: 336,
    fsBubbleEnd: 347,
    userReplyStart: -1,
    userReplyEnd: -1,
    confirmationStart: 347,
    confirmationEnd: 365,
    fsText: "All restocks confirmed. Shelves covered through the weekend. ✓",
    userText: "",
    confirmationText:
      "All 6 restocks confirmed. You're covered through the weekend. ✓",
    timestamp: "9:16 AM",
  },
];

const TypingIndicator: React.FC<{ frame: number; visible: boolean }> = ({
  frame,
  visible,
}) => {
  if (!visible) return null;

  const dotY1 = Math.sin(frame * 0.4) * 4;
  const dotY2 = Math.sin(frame * 0.4 + 1) * 4;
  const dotY3 = Math.sin(frame * 0.4 + 2) * 4;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        paddingLeft: 0,
        marginBottom: 8,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          backgroundColor: "#1c1c1e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "white",
            transform: `translateY(${dotY1}px)`,
          }}
        />
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "white",
            transform: `translateY(${dotY2}px)`,
          }}
        />
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "white",
            transform: `translateY(${dotY3}px)`,
          }}
        />
      </div>
    </div>
  );
};

const FunctionallySpeakingBubble: React.FC<{
  text: string;
  animationProgress: number;
  isConfirmation?: boolean;
  timestamp?: string;
}> = ({ text, animationProgress, isConfirmation = false, timestamp }) => {
  const slideX = interpolate(animationProgress, [0, 1], [-60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(animationProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ marginBottom: 8 }}>
      <div
        style={{
          fontSize: 11,
          color: "#888",
          fontWeight: 500,
          marginBottom: 4,
          paddingLeft: 0,
        }}
      >
        Fountain of Scale
      </div>
      <div
        style={{
          backgroundColor: "#e8e8e8",
          color: "#000000",
          fontSize: 15,
          fontWeight: 400,
          borderRadius: "18px 18px 18px 4px",
          padding: "10px 14px",
          maxWidth: 480,
          whiteSpace: "normal",
          wordBreak: "break-word",
          transform: `translateX(${slideX}px)`,
          opacity,
        }}
      >
        {text}
      </div>
      {timestamp && (
        <div
          style={{
            fontSize: 11,
            color: "#aaaaaa",
            fontWeight: 400,
            marginTop: 4,
            opacity,
          }}
        >
          {timestamp}
        </div>
      )}
    </div>
  );
};

const UserBubble: React.FC<{
  text: string;
  animationProgress: number;
  timestamp?: string;
}> = ({ text, animationProgress, timestamp }) => {
  const slideX = interpolate(animationProgress, [0, 1], [60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(animationProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ marginBottom: 8 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 4,
        }}
      >
        <div
          style={{
            backgroundColor: "#007AFF",
            color: "white",
            fontSize: 15,
            fontWeight: 400,
            borderRadius: "18px 18px 4px 18px",
            padding: "10px 14px",
            maxWidth: 420,
            wordWrap: "break-word",
            transform: `translateX(${slideX}px)`,
            opacity,
          }}
        >
          {text}
        </div>
      </div>
      {timestamp && (
        <div
          style={{
            fontSize: 11,
            color: "#aaaaaa",
            fontWeight: 400,
            marginBottom: 4,
            textAlign: "right",
            opacity,
          }}
        >
          {timestamp}
        </div>
      )}
    </div>
  );
};

const ExchangeComponent: React.FC<{
  exchange: Exchange;
  exchangeIndex: number;
  frame: number;
  fps: number;
}> = ({ exchange, exchangeIndex, frame, fps }) => {
  // Typing indicator animation
  const typingActive =
    frame >= exchange.typingStart && frame < exchange.fsBubbleStart;

  // FS bubble animation
  const fsBubbleFrameStart = exchange.fsBubbleStart;
  const fsBubbleFrameEnd = exchange.fsBubbleEnd;
  const fsBubbleProgress = Math.max(
    0,
    Math.min(
      1,
      (frame - fsBubbleFrameStart) / (fsBubbleFrameEnd - fsBubbleFrameStart),
    ),
  );

  const fsBubbleSpringValue = spring({
    frame: Math.max(0, Math.min(fsBubbleProgress * 12, 12)),
    fps,
    config: { stiffness: 200, damping: 18 },
  });
  const fsBubbleAnimProgress = interpolate(
    fsBubbleSpringValue,
    [0, 1],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const showFSBubble = frame >= fsBubbleFrameStart;

  // User bubble animation (only if it exists)
  const hasUserReply = exchange.userReplyStart > 0;
  let userBubbleProgress = 0;
  let userBubbleSpringValue = 0;
  let userBubbleAnimProgress = 0;
  let showUserBubble = false;

  if (hasUserReply) {
    const userBubbleFrameStart = exchange.userReplyStart;
    const userBubbleFrameEnd = exchange.userReplyEnd;
    userBubbleProgress = Math.max(
      0,
      Math.min(
        1,
        (frame - userBubbleFrameStart) /
          (userBubbleFrameEnd - userBubbleFrameStart),
      ),
    );

    userBubbleSpringValue = spring({
      frame: Math.max(0, Math.min(userBubbleProgress * 10, 10)),
      fps,
      config: { stiffness: 220, damping: 20 },
    });
    userBubbleAnimProgress = interpolate(
      userBubbleSpringValue,
      [0, 1],
      [0, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );
    showUserBubble = frame >= userBubbleFrameStart;
  }

  // Confirmation bubble animation
  const confirmationFrameStart = exchange.confirmationStart;
  const confirmationFrameEnd = exchange.confirmationEnd;
  const confirmationProgress = Math.max(
    0,
    Math.min(
      1,
      (frame - confirmationFrameStart) /
        (confirmationFrameEnd - confirmationFrameStart),
    ),
  );

  const confirmationSpringValue = spring({
    frame: Math.max(0, Math.min(confirmationProgress * 12, 12)),
    fps,
    config: { stiffness: 200, damping: 18 },
  });
  const confirmationAnimProgress = interpolate(
    confirmationSpringValue,
    [0, 1],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const showConfirmation = frame >= confirmationFrameStart;

  return (
    <div
      style={{
        marginBottom: 8,
      }}
    >
      <TypingIndicator frame={frame} visible={typingActive} />
      {showFSBubble && (
        <FunctionallySpeakingBubble
          text={exchange.fsText}
          animationProgress={fsBubbleAnimProgress}
          isConfirmation={false}
          timestamp={exchange.timestamp}
        />
      )}
      {showUserBubble && (
        <UserBubble
          text={exchange.userText}
          animationProgress={userBubbleAnimProgress}
          timestamp={exchange.timestamp}
        />
      )}
      {showConfirmation && (
        <FunctionallySpeakingBubble
          text={exchange.confirmationText}
          animationProgress={confirmationAnimProgress}
          isConfirmation={true}
          timestamp={exchange.timestamp}
        />
      )}
    </div>
  );
};

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();

  // Text sequence animation (frames 0-75, 2.5 seconds total)
  // Pop-in for "problems." (frames 0-10)
  const problemsSpringValue = spring({
    frame: Math.max(0, Math.min(frame, 10)),
    fps: FPS,
    config: { stiffness: 280, damping: 18, overshootClamping: false },
  });
  const problemsScale = interpolate(problemsSpringValue, [0, 1], [0.5, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const problemsOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Counter (frames 0-10) - count up
  const counterValue = Math.min(
    7,
    Math.ceil(interpolate(frame, [0, 10], [1, 7])),
  );
  const counterScale = frame < 8 ? problemsScale : 1.0;
  const counterOpacity = frame < 8 ? problemsOpacity : 1.0;

  // Typed text (frames 10-35) - typing to end at ~1.16s
  const typedText = "Handled before your first coffee.";
  const typedFrameStart = 10;
  const typedFramesSinceStart = Math.max(0, frame - typedFrameStart);
  const typedCharIndex = Math.floor(typedFramesSinceStart / 0.75); // Slower typing
  const displayedTypedText = typedText.slice(0, typedCharIndex);
  const showTypedText = frame >= typedFrameStart;

  // Heart emoji pop (frames 50-60) - stays visible, slides down with text
  const heartSpringValue = spring({
    frame: Math.max(0, Math.min(frame - 50, 10)),
    fps: FPS,
    config: { stiffness: 300, damping: 12, overshootClamping: false },
  });
  const heartScale = interpolate(heartSpringValue, [0, 1], [0, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const showHeartPop = frame >= 50;

  // All animation slides down and exits (frames 70-75)
  const slideDownY = interpolate(frame, [70, 75], [0, 80], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // All animation finishes by frame 75 (2.5 seconds), chat starts after
  const containerOpacity =
    frame < 70
      ? 1
      : interpolate(frame, [70, 75], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

  // Chat exit animation (slide up starting at frame 360 = 12 seconds)
  // Slide up frames 360-375 (should already be sliding at 360)
  const chatSlideUpY =
    frame >= 360
      ? interpolate(frame, [360, 375], [0, -1200], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  // Chat fade-out during slide-up (frames 360-375)
  const chatOpacity =
    frame >= 360
      ? interpolate(frame, [360, 375], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;

  const showChat = frame >= 75;
  const showTextSequence = frame < 75;
  const showFinalMessage = frame >= 363;

  // Final message slide-up animation (frames 363-373, starts below, slides to center)
  const finalMessageSlideUpY =
    frame >= 363
      ? interpolate(frame, [363, 373], [80, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 80;

  // Final message tumble-left exit (frames 410-445, tumbles left and rotates out)
  const finalMessageTumbleProgress =
    frame >= 410
      ? interpolate(frame, [410, 445], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  const finalMessageTumbleX = interpolate(
    finalMessageTumbleProgress,
    [0, 1],
    [0, -1200],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const finalMessageTumbleRotate = interpolate(
    finalMessageTumbleProgress,
    [0, 1],
    [0, -720],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const finalMessageTumbleOpacity = interpolate(
    finalMessageTumbleProgress,
    [0, 0.8, 1],
    [1, 0.5, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: "#ffffff",
        overflow: "hidden",
        position: "relative",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* Text sequence (frames 0-210) */}
      {showTextSequence && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) translateY(${slideDownY}px)`,
            width: 820,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            opacity: containerOpacity,
          }}
        >
          {/* Number counter */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "#1a1a1a",
              lineHeight: 1,
              transform: `scale(${counterScale})`,
              opacity: counterOpacity,
              transformOrigin: "left center",
            }}
          >
            {counterValue}
          </div>

          {/* "problems." text */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "#1a1a1a",
              lineHeight: 1,
              transform: `scale(${problemsScale})`,
              opacity: problemsOpacity,
              transformOrigin: "left center",
            }}
          >
            problems.
          </div>

          {/* Typed text below */}
          {showTypedText && (
            <div
              style={{
                fontSize: 52,
                fontWeight: 400,
                color: "#555555",
                marginTop: 4,
                lineHeight: 1.2,
                transformOrigin: "left center",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              {displayedTypedText}
              {showHeartPop && (
                <span
                  style={{
                    fontSize: 52,
                    lineHeight: 1,
                    transform: `scale(${heartScale})`,
                    transformOrigin: "left center",
                  }}
                >
                  ❤️
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Chat UI */}
      {showChat && (
        <div
          style={{
            position: "absolute",
            top: 200,
            left: "50%",
            transform: `translateX(-50%) translateY(${frame >= 360 ? chatSlideUpY : 0}px)`,
            width: 820,
            height: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "visible",
            opacity: chatOpacity,
            zIndex: frame >= 360 ? 1 : 10,
          }}
        >
          {/* Chat content container that scrolls up */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              transform: (() => {
                // Only animate after first typing indicator
                if (frame < EXCHANGES[0].typingStart) {
                  return "translateY(0px)";
                }

                // Calculate cumulative scroll offset based on which exchanges have completed their scroll
                let scrollOffset = 0;
                for (let i = 0; i < EXCHANGES.length; i++) {
                  if (frame >= EXCHANGES[i].typingStart) {
                    // Each exchange scrolls up by 140px once it arrives
                    const springVal = spring({
                      frame: Math.max(
                        0,
                        Math.min(frame - EXCHANGES[i].typingStart, 30),
                      ),
                      fps: FPS,
                      config: { stiffness: 120, damping: 18 },
                    });
                    const normalizedSpring = interpolate(
                      springVal,
                      [0, 1],
                      [0, 1],
                      {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      },
                    );
                    // Add this exchange's contribution to cumulative offset
                    scrollOffset -= 140 * normalizedSpring;
                  }
                }
                return `translateY(${scrollOffset}px)`;
              })(),
            }}
          >
            {EXCHANGES.map((exchange, index) => (
              <ExchangeComponent
                key={exchange.id}
                exchange={exchange}
                exchangeIndex={index}
                frame={frame}
                fps={FPS}
              />
            ))}
          </div>
        </div>
      )}

      {/* Final message "Your shelves. Always ready." + high five emoji (frames 363+) */}
      {showFinalMessage && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: `translate(calc(-50% + ${finalMessageTumbleX}px), calc(-50% + ${finalMessageSlideUpY}px)) rotate(${finalMessageTumbleRotate}deg)`,
            width: 820,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            zIndex: 100,
            pointerEvents: "none",
            height: 130,
            justifyContent: "flex-start",
            opacity: finalMessageTumbleOpacity,
            transformOrigin: "center center",
          }}
        >
          {/* "Your shelves." - bold */}
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "#1a1a1a",
              lineHeight: 1.2,
            }}
          >
            {(() => {
              const line1Text = "Your shelves.";
              const typedFrameStart = 363;
              const typedFramesSinceStart = Math.max(
                0,
                frame - typedFrameStart,
              );
              const typedCharIndex = Math.floor(typedFramesSinceStart / 0.75);
              return line1Text.slice(0, typedCharIndex);
            })()}
          </div>

          {/* "Always ready." + emoji inline */}
          <div
            style={{
              fontSize: 52,
              fontWeight: 400,
              color: "#1a1a1a",
              lineHeight: 1.2,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>
              {(() => {
                const line2Text = "Always ready.";
                // "Your shelves." is 14 chars, takes 14 * 0.75 = 10.5 frames, so starts at 373.5 ≈ 374
                const typedFrameStart = 374;
                const typedFramesSinceStart = Math.max(
                  0,
                  frame - typedFrameStart,
                );
                const typedCharIndex = Math.floor(typedFramesSinceStart / 0.75);
                if (typedCharIndex <= 0) {
                  return "";
                }
                return line2Text.slice(0, typedCharIndex);
              })()}
            </span>
            {(() => {
              // "Always ready." is 14 chars, starts at 374, takes 14 * 0.75 = 10.5 frames
              // Finishes at frame 384.5, high five pops at frame 385
              const emojiStartFrame = 385;
              return frame >= emojiStartFrame ? (
                <span
                  style={{
                    fontSize: 56,
                    transform: `scale(${interpolate(
                      spring({
                        frame: Math.max(
                          0,
                          Math.min(frame - emojiStartFrame, 10),
                        ),
                        fps: FPS,
                        config: {
                          stiffness: 300,
                          damping: 12,
                          overshootClamping: false,
                        },
                      }),
                      [0, 1],
                      [0, 1.0],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                    )})`,
                    transformOrigin: "left center",
                    lineHeight: 1,
                  }}
                >
                  🙌
                </span>
              ) : null;
            })()}
          </div>
        </div>
      )}
    </div>
  );
};
