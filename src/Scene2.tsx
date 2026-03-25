import { useCurrentFrame, spring, interpolate } from "remotion";
import React from "react";

const FPS = 30;
const WIDTH = 1080;
const HEIGHT = 1080;

interface Notification {
  id: number;
  arrivalFrame: number;
  stiffness: number;
  damping: number;
  holdFrames: number;
  text: string;
}

const NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    arrivalFrame: 7,
    stiffness: 120,
    damping: 20,
    holdFrames: 23,
    text: "You're out of brown sugar syrup.",
  },
  {
    id: 2,
    arrivalFrame: 30,
    stiffness: 150,
    damping: 18,
    holdFrames: 15,
    text: "You're running low on oat milk.",
  },
  {
    id: 3,
    arrivalFrame: 45,
    stiffness: 180,
    damping: 16,
    holdFrames: 9,
    text: "Table 4 can't order their usual.",
  },
  {
    id: 4,
    arrivalFrame: 54,
    stiffness: 220,
    damping: 14,
    holdFrames: 5,
    text: "Supplier can't deliver until Thursday.",
  },
  {
    id: 5,
    arrivalFrame: 59,
    stiffness: 280,
    damping: 12,
    holdFrames: 3,
    text: "Weekend rush — tapioca pearls almost gone.",
  },
  {
    id: 6,
    arrivalFrame: 62,
    stiffness: 340,
    damping: 10,
    holdFrames: 2,
    text: "Staff texting: we're out of cups.",
  },
  {
    id: 7,
    arrivalFrame: 64,
    stiffness: 400,
    damping: 8,
    holdFrames: 2,
    text: "Customer left a 1-star review — item unavailable.",
  },
];

const NotificationCard: React.FC<{
  notification: Notification;
  positionIndex: number;
  frame: number;
  fps: number;
  totalNotificationsArrived: number;
}> = ({
  notification,
  positionIndex,
  frame,
  fps,
  totalNotificationsArrived,
}) => {
  // Calculate drop animation for this notification
  const timeSinceArrival = frame - notification.arrivalFrame;
  const isActive = timeSinceArrival >= 0;

  const dropSpringValue = isActive
    ? spring({
        frame: Math.max(0, timeSinceArrival),
        fps,
        config: {
          stiffness: notification.stiffness,
          damping: notification.damping,
        },
      })
    : 0;

  const dropY = interpolate(dropSpringValue, [0, 1], [-100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Position based on how many notifications have already arrived before this one
  const topPosition = 80 + positionIndex * 88 + dropY;

  // Calculate timestamp: oldest (first to arrive) is "now", newer ones show "Xm ago"
  // positionIndex 0 is the first/oldest, so it gets "now"
  // positionIndex 1 gets "1m ago", etc.
  const minutesAgo = positionIndex;
  const timestamp = minutesAgo === 0 ? "now" : `${minutesAgo}m ago`;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        transform: `translateX(-50%)`,
        top: topPosition,
        width: 820,
        height: 76,
        backgroundColor: "rgba(255, 255, 255, 0.65)",
        backdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(209, 213, 219, 0.5)",
        borderRadius: 20,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        opacity: isActive ? 1 : 0,
      }}
    >
      {/* Fountain of Scale avatar */}
      <img
        src={require("/Users/stacyenot/Desktop/my-video/public/bubble-popped.png")}
        alt="Fountain of Scale"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          objectFit: "cover",
          flexShrink: 0,
        }}
      />

      {/* Text content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          flex: 1,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 12,
            color: "#888",
            fontWeight: 500,
          }}
        >
          Fountain of Scale
        </div>
        <div
          style={{
            fontSize: 16,
            color: "#1a1a1a",
            fontWeight: 600,
          }}
        >
          {notification.text}
        </div>
      </div>

      {/* Timestamp */}
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 16,
          fontSize: 11,
          color: "#aaaaaa",
          fontWeight: 400,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif",
        }}
      >
        {timestamp}
      </div>
    </div>
  );
};

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();

  // Screen shake (frames 66-82, ~2.2-2.7 seconds)
  const shakeOffset =
    frame >= 66 && frame < 82 ? Math.sin((frame - 66) * 1.8) * 5 : 0;

  // Notification slide up (frames 82-102)
  const notificationSlideY = interpolate(frame, [82, 102], [0, -1200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: "#ffffff",
        overflow: "hidden",
        position: "relative",
        transform: `translateX(${shakeOffset}px)`,
      }}
    >
      {/* Notification container with slide animation */}
      <div
        style={{
          transform: `translateY(${notificationSlideY}px)`,
        }}
      >
        {/* Render all notifications */}
        {NOTIFICATIONS.map((notification, index) => {
          // Count how many notifications have arrived by current frame
          const totalArrived = NOTIFICATIONS.filter(
            (n) => frame >= n.arrivalFrame,
          ).length;
          return (
            <NotificationCard
              key={notification.id}
              notification={notification}
              positionIndex={index}
              frame={frame}
              fps={FPS}
              totalNotificationsArrived={totalArrived}
            />
          );
        })}
      </div>
    </div>
  );
};
