import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";
import { fontFamily } from "./fonts";

const FPS = 30;
const WIDTH = 1080;
const HEIGHT = 1080;
const SAFE_ZONE = 60;
const FONT = fontFamily || "Arial, sans-serif";

const Scene1_Hook = () => {
  const frame = useCurrentFrame();

  const text =
    "If your reorder system is a sticky note on the fridge, this is for you.";

  const startFrame = 0;
  const fadeInDuration = 3;
  const holdDuration = 75;
  const fadeOutDuration = 15;
  const fadeOutStart = startFrame + fadeInDuration + holdDuration;

  const opacity = interpolate(
    frame,
    [
      startFrame,
      startFrame + fadeInDuration,
      fadeOutStart,
      fadeOutStart + fadeOutDuration,
    ],
    [1, 1, 1, 0],
    { extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) },
  );

  const translateY = interpolate(
    frame,
    [startFrame, startFrame + fadeInDuration],
    [30, 0],
    { extrapolateRight: "clamp", easing: Easing.out(Easing.quad) },
  );

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: SAFE_ZONE,
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          fontFamily: FONT,
          fontSize: 64,
          fontWeight: 900,
          color: "#ffffff",
          textAlign: "center",
          lineHeight: 1.3,
        }}
      >
        {text}
      </div>
    </div>
  );
};

const Scene2_Pain = () => {
  const frame = useCurrentFrame();

  const text =
    "Most small beverage shops reorder when something runs out. By then it's already too late.";

  const startFrame = 4 * FPS;
  const fadeInDuration = 3;
  const holdDuration = 100;
  const fadeOutDuration = 15;
  const fadeOutStart = startFrame + fadeInDuration + holdDuration;

  const opacity = interpolate(
    frame,
    [
      startFrame,
      startFrame + fadeInDuration,
      fadeOutStart,
      fadeOutStart + fadeOutDuration,
    ],
    [1, 1, 1, 0],
    { extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) },
  );

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: SAFE_ZONE,
      }}
    >
      <div
        style={{
          opacity,
          fontFamily: FONT,
          fontSize: 42,
          fontWeight: 400,
          color: "#a0a0a0",
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        {text}
      </div>
    </div>
  );
};

const InventoryItem = ({
  name,
  units,
  status,
  index,
  frame,
}: {
  name: string;
  units: string;
  status: "warning" | "ok";
  index: number;
  frame: number;
}) => {
  const startFrame = 4 * FPS + 30;
  const delay = index * 12;
  const slideDuration = 15;

  const opacity = interpolate(
    frame,
    [startFrame + delay, startFrame + delay + slideDuration],
    [0, 1],
    { extrapolateRight: "clamp", easing: Easing.out(Easing.quad) },
  );

  const translateX = interpolate(
    frame,
    [startFrame + delay, startFrame + delay + slideDuration],
    [40, 0],
    { extrapolateRight: "clamp", easing: Easing.out(Easing.quad) },
  );

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${translateX}px)`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 20px",
        borderBottom: "1px solid #1a1a1a",
        fontFamily: FONT,
        fontSize: 36,
        fontWeight: 400,
        color: "#ffffff",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span>{name}</span>
        <span style={{ color: "#666" }}>—</span>
        <span style={{ color: status === "warning" ? "#ff6b6b" : "#666" }}>
          {units}
        </span>
      </div>
      <span style={{ fontSize: 32 }}>{status === "warning" ? "⚠️" : "✓"}</span>
    </div>
  );
};

const Scene3_UI = () => {
  const frame = useCurrentFrame();
  const fps = FPS;

  const containerStart = 9 * fps;
  const containerOpacity = interpolate(
    frame,
    [containerStart, containerStart + 15],
    [0, 1],
    { extrapolateRight: "clamp", easing: Easing.out(Easing.quad) },
  );

  const items = [
    { name: "Oat Milk", units: "2 units left", status: "warning" as const },
    {
      name: "Brown Sugar Syrup",
      units: "1 unit left",
      status: "warning" as const,
    },
    { name: "Tapioca Pearls", units: "12 units", status: "ok" as const },
  ];

  const buttonStart = containerStart + 50;
  const buttonPulse = interpolate(
    frame,
    [buttonStart, buttonStart + 20, buttonStart + 40, buttonStart + 60],
    [1, 1.03, 1, 1.03],
    { extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) },
  );

  const buttonOpacity = interpolate(
    frame,
    [buttonStart, buttonStart + 15],
    [0, 1],
    { extrapolateRight: "clamp", easing: Easing.out(Easing.quad) },
  );

  const confirmationStart = buttonStart + 60;
  const confirmationOpacity = interpolate(
    frame,
    [confirmationStart, confirmationStart + 15],
    [0, 1],
    { extrapolateRight: "clamp", easing: Easing.out(Easing.quad) },
  );

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: SAFE_ZONE,
      }}
    >
      <div
        style={{
          opacity: containerOpacity,
          width: "100%",
          maxWidth: 700,
          backgroundColor: "#141414",
          borderRadius: 20,
          overflow: "hidden",
          border: "1px solid #222",
        }}
      >
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #222",
            fontFamily: FONT,
            fontSize: 32,
            fontWeight: 900,
            color: "#ffffff",
          }}
        >
          Inventory Alert
        </div>

        {items.map((item, index) => (
          <InventoryItem
            key={item.name}
            {...item}
            index={index}
            frame={frame}
          />
        ))}

        <div
          style={{
            padding: "20px 24px",
            opacity: buttonOpacity,
            transform: `scale(${buttonPulse})`,
            transformOrigin: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              color: "#0a0a0a",
              padding: "18px 32px",
              borderRadius: 12,
              fontFamily: FONT,
              fontSize: 38,
              fontWeight: 900,
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            Reorder Now
          </div>
        </div>

        <div
          style={{
            opacity: confirmationOpacity,
            padding: "16px 24px 24px",
            fontFamily: FONT,
            fontSize: 36,
            fontWeight: 400,
            color: "#4ade80",
            textAlign: "center",
          }}
        >
          Order sent ✓
        </div>
      </div>
    </div>
  );
};

const Scene4_CTA = () => {
  const frame = useCurrentFrame();

  const startFrame = 16 * FPS;
  const fadeInDuration = 20;

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + fadeInDuration],
    [0, 1],
    { extrapolateRight: "clamp", easing: Easing.out(Easing.quad) },
  );

  const pulse = interpolate(
    frame,
    [
      startFrame + fadeInDuration,
      startFrame + fadeInDuration + 30,
      startFrame + fadeInDuration + 60,
    ],
    [1, 1.02, 1],
    { extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) },
  );

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: SAFE_ZONE,
        gap: 40,
      }}
    >
      <div
        style={{
          opacity,
          fontFamily: FONT,
          fontSize: 72,
          fontWeight: 900,
          color: "#ffffff",
          textAlign: "center",
        }}
      >
        See how it works
      </div>

      <div
        style={{
          opacity,
          transform: `scale(${pulse})`,
          transformOrigin: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            color: "#0a0a0a",
            padding: "20px 40px",
            borderRadius: 14,
            fontFamily: FONT,
            fontSize: 36,
            fontWeight: 900,
            textAlign: "center",
          }}
        >
          fountainofscale.com
        </div>
      </div>
    </div>
  );
};

export const MyComposition = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      <Scene1_Hook />
      <Scene2_Pain />
      <Scene3_UI />
      <Scene4_CTA />
    </AbsoluteFill>
  );
};
