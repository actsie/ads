---
name: make-ad
description: Full process for building Facebook ad videos in Remotion — concept, hooks, frame-by-frame prompting, iteration, and rendering. Use this when building any ad video from scratch or adapting a template for a new client.
---

# How to Make a Remotion Ad Video

## The Core Rule
**Don't describe the vibe. Describe the exact frame-by-frame motion.**
One scene at a time. Never prompt the full video in one go.

---

## Full Process (always follow this order)

1. **Write the hook** — what makes someone stop scrolling?
2. **Map the scenes** — 3 scenes max, under 15 seconds total
3. **Map the timeline** — convert every beat to frames at 30fps
4. **Prompt scene 1** — get it working before moving on
5. **Review and iterate** — fix specific things before building the next scene
6. **Repeat for remaining scenes**
7. **Render** — each scene individually, then merge in iMovie

---

## Step 1 — Write the Hook

The hook is the first 1–3 seconds. It has to make the target audience feel seen before they realize it's an ad.

**What works:**
- Their exact pain in their words — "You're out of brown sugar syrup again"
- A native-feeling UI element they recognize — a search bar, notification, POS screen
- A contrast — chaos → clean, old way → new way
- A number — "7 problems before your first coffee"

**What doesn't work:**
- Marketing language ("Take your business to the next level")
- Generic benefit claims ("Save time and money")
- Starting with a logo

**Hook formats that work:**
- **"You know that feeling when..."** — opens a pain loop
- **"What if your [problem] fixed itself?"** — pattern interrupt
- **"Most [audience] don't know..."** — curiosity gap
- **Counting up** — a number that keeps climbing creates tension
- **Notification stack** — escalating alerts, faster and faster

---

## Step 2 — Map the Scenes

For a Facebook ad: 3 scenes, under 15 seconds.

| Scene | Purpose | Target duration |
|-------|---------|----------------|
| 1 | Hook — the pattern interrupt | 3–5s (90–150 frames) |
| 2 | Pain/Product — show the problem or the solution | 4–6s (120–180 frames) |
| 3 | CTA — clean close, where to find them | 3–5s (90–150 frames) |

---

## Step 3 — Map the Timeline

Convert every beat to frames before writing the prompt.

```
0.1s = frame 3
0.2s = frame 6
0.4s = frame 12
0.9s = frame 27
1.0s = frame 30
2.0s = frame 60
3.0s = frame 90
4.0s = frame 120
5.0s = frame 150
```

Write out the full beat list first:
```
0–0.1s   (frames 0–3):    circle fades in
0.1–0.4s (frames 3–12):   icon scales in
0.4–0.9s (frames 12–27):  circle stretches to search bar
0.9–3s   (frames 27–90):  text types in
```

---

## Step 4 — Write the Prompt

### The Formula

For each element, specify:
1. **Frame range** — when it starts and ends
2. **Start state** — size, opacity, position
3. **End state** — where it lands
4. **How it gets there** — exact spring config OR interpolate values
5. **Hold time** — how long before the next thing happens

### Spring Config Reference

```js
// Clean slide-up
spring({ frame: frame - X, fps, config: { stiffness: 200, damping: 20 } })

// Bouncy pop (overshoots slightly)
spring({ frame: frame - X, fps, config: { stiffness: 280, damping: 18, overshootClamping: false } })

// Big bounce (logo drop, ball landing)
spring({ frame: frame - X, fps, config: { stiffness: 180, damping: 8, overshootClamping: false } })

// Snappy punch (fast, tight)
spring({ frame: frame - X, fps, config: { stiffness: 340, damping: 22 } })

// Slow float
spring({ frame: frame - X, fps, config: { stiffness: 80, damping: 15 } })

// Escalating speed (notifications getting faster)
// Notif 1: stiffness 120, damping 20
// Notif 2: stiffness 150, damping 18
// Notif 3: stiffness 180, damping 16
// Notif 4: stiffness 220, damping 14
// Notif 5: stiffness 280, damping 12
// Notif 6: stiffness 340, damping 10
// Notif 7: stiffness 400, damping 8
```

### Layout Patterns

```js
// Centered element
position: "absolute", left: "50%", transform: "translateX(-50%)"

// Centered both axes
position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)"

// Left-aligned block, centered on screen
position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: 820

// Full bleed image behind text
position: "absolute", top: "50%", left: "50%",
transform: `translate(-50%, calc(-50% + ${interpolate(progress, [0, 1], [120, 0])}px)) scale(...)`
```

### Technical Rules

- **System fonts only** — `'-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif'`. Never `@remotion/google-fonts` — causes top-level await errors
- **One file per scene** — `Scene1.tsx`, `Scene2.tsx` etc. Files over ~300 lines hit token limits
- **Static images** — put in `public/` folder, reference with `staticFile("filename.png")` and `<Img src={...} />`
- **No shadows on PNGs** — use `objectFit: "contain"` not `"cover"` for logos on transparent backgrounds
- **Sub-components need explicit props** — if a component inside a scene uses a prop value, it must receive it as its own prop, not rely on closure scope

---

## Real Prompt Examples

### Example 1 — Search Bar Scene

```
Create src/Scene1.tsx. 1080x1080, 30fps. Dark background (#0a0a0a).

Animate a search bar growing from center:

- Frames 0–3: White circle (48px diameter) fades in at center using interpolate(frame, [0, 3], [0, 1]) for opacity
- Frames 3–12: Search icon (🔍 20px) scales in inside the circle using spring({ frame: frame - 3, fps, config: { stiffness: 200, damping: 15 } })
- Frames 12–27: Circle stretches horizontally — width expands from 48px to 820px using spring({ frame: frame - 12, fps, config: { stiffness: 120, damping: 18 } }). Height stays 56px. Border radius stays 28px (pill). Background white. Centered using position: absolute, left: 50%, transform: translateX(-50%)
- Frames 27–90: Blinking cursor appears inside bar on the left. Characters type one at a time: "Free ai inventory management system" — one character every 2 frames. Text: #1a1a1a, 22px, system font.

Search icon stays visible through to the end. No other effects. Show me the code. thanks!
```

### Example 2 — Stacked iOS Notifications

```
Create src/Scene2.tsx. 1080x1080, 30fps. White background.

Animate 7 iOS-style frosted glass notifications dropping in from the top, each faster than the last. New notifications always appear at the top and push previous ones down.

Notification card style:
- Width: 820px, centered horizontally using position: absolute, left: 50%, transform: translateX(-50%)
- Height: 76px
- Background: rgba(255, 255, 255, 0.65)
- backdropFilter: blur(20px) saturate(180%)
- Border: 1px solid rgba(209, 213, 219, 0.5)
- Border radius: 20px
- Box shadow: 0 4px 24px rgba(0,0,0,0.08)
- Padding: 0 20px
- Layout: flex row, align items center, gap 14px
- Left: bubble-popped.png as avatar, 36px diameter, objectFit: cover, borderRadius: 50%
- Right: two lines — top "Fountain of Scale" 12px #888 font-weight 500, bottom notification text 16px #1a1a1a font-weight 600
- Each card's top = 80px + (cardIndex * 88px) — 88 = card height 76 + gap 12

Notification texts (in order):
1. "You're out of brown sugar syrup."
2. "You're running low on oat milk."
3. "Table 4 can't order their usual."
4. "Supplier can't deliver until Thursday."
5. "Weekend rush — tapioca pearls almost gone."
6. "Staff texting: we're out of cups."
7. "Customer left a 1-star review — item unavailable."

Drop animation: each notification drops from y: -100px to y: 0px relative to its stacked position. As each new notification arrives, all existing ones animate down by 88px simultaneously using spring.

Timing and spring configs (escalating speed):
- Notif 1 arrives frame 10 — spring({ stiffness: 120, damping: 20 }) — hold 40 frames
- Notif 2 arrives frame 50 — spring({ stiffness: 150, damping: 18 }) — hold 25 frames
- Notif 3 arrives frame 75 — spring({ stiffness: 180, damping: 16 }) — hold 15 frames
- Notif 4 arrives frame 90 — spring({ stiffness: 220, damping: 14 }) — hold 8 frames
- Notif 5 arrives frame 98 — spring({ stiffness: 280, damping: 12 }) — hold 5 frames
- Notif 6 arrives frame 103 — spring({ stiffness: 340, damping: 10 }) — hold 3 frames
- Notif 7 arrives frame 106 — spring({ stiffness: 400, damping: 8 }) — hold 3 frames

Screen shake (frames 109–125):
transform: translateX(${Math.sin((frame - 109) * 1.8) * 5}px) on the entire container.

Use system fonts only. No other effects. thanks!
```

### Example 3 — Word-by-Word Hook (Mellow Cup style)

```
Create src/MellowCupScene1.tsx. 1080x1080, 30fps. Background #faf8f4.

Left-aligned text block, justified to the left edge, paddingLeft 100px.

Split the hook string into words. Group into lines of 3 words. Each word pops in with:
spring({ frame: frame - startFrame, fps, config: { stiffness: 280, damping: 18, overshootClamping: false } })
Scale 0.6 to 1.0, opacity 0 to 1, translateY 20px to 0px. Transform origin left center.
startFrame = 8 + (globalWordIndex * 8)
Last word gets accentColor, all others #2c1a0e.
Font size 72px, font-weight 900, system font, letterSpacing -0.03em.

Tagline fades up at frame 105:
opacity: interpolate(frame, [105, 122], [0, 1])
translateY: interpolate(frame, [105, 122], [16, 0])
Font size 28px, font-weight 400, color #9b8c7d, letterSpacing 0.02em.
Text: "{shopName} — {tagline}"

Everything fades out at frame 145:
opacity: interpolate(frame, [145, 165], [1, 0])

Use system fonts only. thanks!
```

### Example 4 — iMessage Chat with Typing Indicator

```
iMessage-style chat. Centered container 820px wide, position absolute left 50% transform translateX(-50%). White background. Bubbles stack top to bottom. Container translates up as new bubbles appear to keep the latest visible near the bottom.

Fountain of Scale bubble (left):
- Background: #e8e8e8, text: #000000
- Border radius: 18px 18px 18px 4px
- Padding: 10px 14px
- Max width: fit-content, max 480px
- "Fountain of Scale" label above: 11px #888 font-weight 500
- Slide in from left: translateX from -60px to 0px, opacity 0 to 1
  spring({ stiffness: 200, damping: 18 }) over 12 frames

User reply bubble (right):
- Background: #007AFF, text: white
- Border radius: 18px 18px 4px 18px
- Padding: 10px 14px
- Max width: 420px, align self: flex-end
- Slide in from right: translateX from 60px to 0px, opacity 0 to 1
  spring({ stiffness: 220, damping: 20 }) over 10 frames

Typing indicator (appears before each FS bubble):
3 dots in a dark bubble (#1c1c1e). Each dot 8px white circle.
Bouncing: translateY(Math.sin(frame * 0.4 + dotIndex) * 4 + "px")
Fades out when FS bubble appears.

Each exchange timing (adjust frame numbers per scene):
- typingStart: when ... dots appear
- fsBubbleStart: when FS bubble slides in
- userReplyStart: when user bubble slides in
- hold: pause before next exchange

Container scroll up per exchange:
scrollOffset += 140 * spring({ frame: frame - exchange.typingStart, fps, config: { stiffness: 120, damping: 18 } })
Apply as translateY(-scrollOffset) to entire container.

Use system fonts only. thanks!
```

---

## Spiral Staircase Photo Animation

A top-down spiral where photos rise from the center (small, faded) and expand outward as they come toward the camera (large, clear). Loops infinitely. Good for opening scenes with real client photos.

### How It Works

Each tile has a `phase` (0 to 1) that determines its position along the spiral:
- `phase = 0` — deep center, small, faded
- `phase = 1` — close to camera, wide radius, bright, then fades out and loops

The key insight: **convert `useCurrentFrame()` to milliseconds first**, then use the same math as a CSS animation timestamp. This makes the Remotion version identical to the HTML prototype.

```tsx
const timestamp = (frame / fps) * 1000;
const phase = ((timestamp / CYCLE_DURATION_MS) + (i / COUNT)) % 1;
```

### Full Pattern

```tsx
const COUNT = 7;              // one per photo, no duplicates
const CYCLE_DURATION_MS = 18000; // slow = 18s, fast = 8s
const TOTAL_ROTATIONS = 1.5;  // how many times around the spiral
const MAX_DEPTH = 700;
const MIN_RADIUS = 10;        // tight at center
const MAX_RADIUS = 320;       // wide at outer edge

// Per tile:
const angle = phase * TOTAL_ROTATIONS * 360;
const radius = MIN_RADIUS + phase * (MAX_RADIUS - MIN_RADIUS);
const zDepth = -MAX_DEPTH + phase * (MAX_DEPTH - 150); // stops before hitting camera

// Opacity — smooth ease in, gradual brighten, fade out near top
let opacity: number;
if (phase < 0.4) opacity = Math.pow(phase / 0.4, 2) * 0.85;
else if (phase > 0.78) opacity = (1 - phase) / 0.22;
else opacity = 0.85 + ((phase - 0.4) / 0.38) * 0.15;

// Transform
tile.style.transform = `rotateZ(${angle}deg) translateX(${radius}px) translateZ(${zDepth}px)`;
```

### Container Setup (critical for 3D to work)

```tsx
// Outer — sets the camera
<div style={{
  perspective: 500,
  perspectiveOrigin: "50% 30%",  // 30% = camera slightly above center
  width: "100%", height: "100%",
  display: "flex", alignItems: "center", justifyContent: "center",
}}>
  {/* Inner — the rotating stage */}
  <div style={{
    transformStyle: "preserve-3d",
    position: "relative",
    width: 0, height: 0,  // zero size so tiles position from true center
  }}>
    {tiles}
  </div>
</div>
```

### Tuning Guide
- **Slower/faster** — change `CYCLE_DURATION_MS` (18000 = slow, 8000 = fast)
- **Wider spiral** — increase `MAX_RADIUS`
- **More rotations** — increase `TOTAL_ROTATIONS`
- **Camera angle** — adjust `perspectiveOrigin` Y value (30% = slight top-down, 50% = flat side view, -80% = extreme top-down)
- **Tile size** — 180x180px feels right for 1080x1080 canvas
- **No duplicate photos** — set `COUNT` equal to number of photos

### Building in HTML First
Always prototype this in a plain HTML file before converting to Remotion. Use `requestAnimationFrame(timestamp)` in HTML — the math is identical, just swap `timestamp` for `(frame / fps) * 1000` in Remotion. Iterate visually in the browser (instant refresh) then port the final values over.

### Full Scene Template (copy and adapt)

```tsx
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, Img, staticFile, interpolate, Easing } from "remotion";

const FONT = '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif';

const PHOTOS = [
  "SHOP_FOLDER/photo1.jpg",
  "SHOP_FOLDER/photo2.jpg",
  // one entry per photo, no duplicates — set COUNT to match
];

const COUNT = 7;              // match number of photos
const CYCLE_DURATION_MS = 18000; // 18s = slow, 10s = medium, 8s = fast
const TOTAL_ROTATIONS = 1.5;
const MAX_DEPTH = 700;
const MIN_RADIUS = 10;        // tail (center)
const MAX_RADIUS = 480;       // head (outer edge) — increase for wider spiral

export const SpiralScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const timestamp = (frame / fps) * 1000;

  // Text fade in — adjust frame numbers for timing
  const textOpacity = interpolate(frame, [18, 40], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Slide everything up and off screen — adjust start frame for timing
  const slideUp = interpolate(frame, [96, 106], [0, -1200], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  const tiles = Array.from({ length: COUNT }, (_, i) => {
    const phase = ((timestamp / CYCLE_DURATION_MS) + i / COUNT) % 1;
    const angle = phase * TOTAL_ROTATIONS * 360;
    const radius = MIN_RADIUS + phase * (MAX_RADIUS - MIN_RADIUS);
    const zDepth = -MAX_DEPTH + phase * (MAX_DEPTH - 150);
    let opacity: number;
    if (phase < 0.4) opacity = Math.pow(phase / 0.4, 2) * 0.85;
    else if (phase > 0.78) opacity = (1 - phase) / 0.22;
    else opacity = 0.85 + ((phase - 0.4) / 0.38) * 0.15;
    return { i, angle, radius, zDepth, opacity, photo: PHOTOS[i] };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#111111" }}>
      <div style={{ width: "100%", height: "100%", transform: `translateY(${slideUp}px)` }}>
        <div style={{ width: "100%", height: "100%", perspective: 500, perspectiveOrigin: "50% 30%",
          display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          {/* Spiral */}
          <div style={{ transformStyle: "preserve-3d", position: "relative", width: 0, height: 0 }}>
            {tiles.map(({ i, angle, radius, zDepth, opacity, photo }) => (
              <div key={i} style={{
                position: "absolute", width: 240, height: 240, top: -120, left: -120,
                borderRadius: 12, overflow: "hidden", opacity,
                transform: `rotateZ(${angle}deg) translateX(${radius}px) translateZ(${zDepth}px)`,
                boxShadow: "0 4px 24px rgba(0,0,0,0.6)",
              }}>
                <Img src={staticFile(photo)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
          {/* Center text */}
          <div style={{ position: "absolute", textAlign: "center", opacity: textOpacity, zIndex: 10 }}>
            <div style={{ fontSize: 64, fontWeight: 900, color: "#ffffff", fontFamily: FONT,
              letterSpacing: "-0.03em", lineHeight: 1.15,
              textShadow: "0 0 40px rgba(0,0,0,1), 0 2px 12px rgba(0,0,0,0.9)" }}>
              Your text here.
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
```

**Knobs to adjust:**
- `CYCLE_DURATION_MS` — speed of the spiral
- `MAX_RADIUS` — how wide the head gets
- `COUNT` + `PHOTOS` — always match, no duplicates
- `perspectiveOrigin` Y — `30%` = slight top-down, `-80%` = extreme top-down
- Text frame range `[18, 40]` — when text fades in
- Slide frame range `[96, 106]` — when everything exits (10 frames = very fast)

---

## How to Iterate (Fixing Scenes)

Always describe exactly what's wrong — don't say "fix it."

**Timing is wrong:**
> "The text finishes typing at 2.5 seconds but should finish at 1.88 seconds (frame 56). Adjust the character-per-frame rate so it completes by frame 56."

**Element is in the wrong position:**
> "The 'New Matcha Latte' title is too high. Move it from top: 80 to top: 200."

**Animation keeps going after it should stop:**
> "The search bar width keeps expanding after frame 27 — it should clamp at 820px. Add extrapolateRight: 'clamp' to the interpolate or use overshootClamping: true on the spring."

**Something is cut off:**
> "The text bubbles are getting clipped at the bottom edge. The chat container has a fixed height — change it to give more vertical space or set overflow: visible."

**Sub-component not getting props:**
> "ReferenceError: price is not defined in PriceSticker. Add price: string to PriceSticker's props interface and pass it at the call site."

---

## Using the Mellow Cup Template

A reusable 3-scene coffee shop ad template lives at:
`/Users/mantisclaw/.openclaw/workspace/ads/remotion/project/`

**3 scenes:**
- `MellowCupScene1.tsx` — hook, word-by-word pop-in
- `MellowCupScene2.tsx` — product showcase, price sticker
- `MellowCupScene4.tsx` — CTA, "Come find us." + shop name + neighborhood

**To adapt for a new coffee shop client:**
1. `git pull origin main` in the project root
2. Open `src/Root.tsx`
3. Update `defaultProps` for all 3 compositions — change `shopName`, `tagline`, `neighborhood`, `accentColor`, `productImage`, `logoImage`, `hook`, `productName`, `price`
4. Add the client's product image to `public/` folder
5. Add the client's logo to `public/` folder

**IMPORTANT:** `defaultProps` must be a hardcoded object literal directly in the `<Composition>` tag — you cannot reference a variable. Remotion's static analysis reads it literally.

```tsx
// WRONG
<Composition defaultProps={myProps} />

// RIGHT
<Composition defaultProps={{
  shopName: "Bean & Bloom",
  accentColor: "#e07b3a",
  // ...all values inline
}} />
```

---

## Rendering

```bash
# Preview in Remotion Studio
npm run dev   →   localhost:3000

# Render a specific scene
npx remotion render MellowCupScene1 out/scene1.mp4
npx remotion render MellowCupScene2 out/scene2.mp4
npx remotion render MellowCupScene4 out/scene4.mp4
```

Merge scenes in iMovie after rendering.

---

## 3D Drum Roller / Wheel Picker

A vertical cylinder of text items that rotates to reveal each one. The focused item (at the arrow) is sharp and full opacity — all others are blurred and faded. An arrow nudges with a spring when each item comes into focus. Good for listing pain points, features, or options one at a time.

### How It Works

Items sit on a cylinder. Each item's angle determines its Y position (`sin`) and depth (`cos`). `cos` drives opacity, blur, and scale. A `spinAngle` drives by `interpolate` rotates the whole cylinder over time. The active item is whichever has `cos` closest to 1 (facing camera).

```tsx
const ITEM_ANGLE = 22;   // degrees between items — tighter = items closer together
const RADIUS = 320;      // cylinder radius — bigger = more curve depth
const CENTER_Y = 500;    // vertical center on 1080px canvas
const CENTER_X = 160;    // horizontal position of text
const SPIN_END = 160;    // frame when spin completes

const totalSpin = -(N - 1) * ITEM_ANGLE;

// Hold 20 frames at start, then spin with ease-out
const spinAngle = interpolate(frame, [20, SPIN_END], [0, totalSpin], {
  extrapolateLeft: "clamp", extrapolateRight: "clamp",
  easing: Easing.out(Easing.cubic),
});

// Active = item whose angle is closest to 0 (facing camera)
const activeIndex = ITEMS.reduce((closest, _, i) => {
  const angle = i * ITEM_ANGLE + spinAngle;
  const closestAngle = closest * ITEM_ANGLE + spinAngle;
  return Math.abs(angle) < Math.abs(closestAngle) ? i : closest;
}, 0);

// Frame at which each item hits the front
const activeItemCenterFrame = ITEMS.map((_, i) =>
  (-i * ITEM_ANGLE / totalSpin) * SPIN_END
);
```

### Per-Item Rendering

```tsx
const angleRad = (i * ITEM_ANGLE + spinAngle) * (Math.PI / 180);
const y = CENTER_Y + Math.sin(angleRad) * RADIUS;
const z = Math.cos(angleRad); // 1 = front, -1 = back

if (z < -0.1) return null; // skip items behind cylinder

const opacity = Math.max(0, z * 1.1);
const isActive = i === activeIndex;
const blur = isActive ? 0 : Math.max(0, (1 - z) * 6);  // active = sharp, others = blurred
const scale = 0.45 + z * 0.55;

// Poke spring — only fires for active item
const nudge = isActive ? spring({
  frame: frame - activeItemCenterFrame[i],
  fps,
  config: { stiffness: 600, damping: 8, overshootClamping: false },
  from: 18, to: 0,
}) : 0;
```

### Arrow

Fixed position at `CENTER_X`, nudges left when active item changes:

```tsx
const arrowNudge = spring({
  frame: frame - activeItemCenterFrame[activeIndex],
  fps,
  config: { stiffness: 600, damping: 8, overshootClamping: false },
  from: -24, to: 0,
});

// Arrow div
<div style={{
  position: "absolute",
  left: CENTER_X - 58 + arrowNudge,
  top: CENTER_Y - 36,
  fontSize: 52, color: "#ffffff",
}}>→</div>
```

### Container Setup

Wrap in a perspective container with a slight `rotateY` to add depth like the Jitter reference:

```tsx
<div style={{
  position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
  perspective: 1000,
  perspectiveOrigin: "30% 50%",
}}>
  <div style={{
    width: "100%", height: "100%",
    transform: "rotateY(-10deg)",
    transformStyle: "preserve-3d",
  }}>
    {/* arrow and items here */}
  </div>
</div>
```

### White Push-Up Transition

Slide a white panel up from the bottom to wipe the scene — content rides up with it so it looks pushed, not covered.

```tsx
// At 5 seconds (frame 150), white slides up over 12 frames
const whiteSlide = interpolate(frame, [150, 162], [1080, 0], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
  easing: Easing.inOut(Easing.cubic),
});

// Wrap all content in this div so it moves up with the panel
<div style={{ width: "100%", height: "100%", transform: `translateY(${whiteSlide - 1080}px)` }}>
  {/* ...scene content... */}
</div>

// White panel goes outside/after the content wrapper
<div style={{
  position: "absolute",
  left: 0, right: 0,
  top: whiteSlide,
  height: 1080,
  backgroundColor: "#ffffff",
}} />
```

**Key detail:** `translateY(whiteSlide - 1080)` starts at 0 (no movement) and ends at -1080 (fully off top), perfectly in sync with the white panel rising from 1080 to 0.

**Tuning:**
- Frame range `[150, 162]` — 12 frames = fast. Use `[150, 170]` for slower.
- `Easing.inOut(Easing.cubic)` — smooth acceleration + deceleration
- Change `#ffffff` to any color for different wipe colors

---

### Tuning Guide
- **More/fewer items** — update `ITEMS` array and `N`; `totalSpin` auto-adjusts
- **Spacing between items** — `ITEM_ANGLE` (22° = comfortable, 18° = tighter, 30° = spread out)
- **Depth of curve** — `RADIUS` (320 = moderate, 500 = very curved)
- **Spin speed** — `SPIN_END` (160 frames = ~5.3s, 100 = faster)
- **Hold at start** — first number in `interpolate(frame, [20, SPIN_END]...)` (20 = ~0.67s)
- **Poke bounce** — `damping` on spring (8 = bouncy, 14 = snappy, 20 = no bounce)
- **Blur intensity** — `(1 - z) * 6` (6 = moderate blur, 10 = heavy blur)
- **Viewing angle** — `perspectiveOrigin` and `rotateY` on the container

### Full Scene Template

```tsx
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";

const FONT = '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif';

const ITEMS = [
  "Item one",
  "Item two",
  "Item three",
  "Item four",
  "Item five",
];

const N = ITEMS.length;
const ITEM_ANGLE = 22;
const RADIUS = 320;
const CENTER_Y = 500;
const CENTER_X = 160;
const SPIN_END = 160;

export const WheelScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalSpin = -(N - 1) * ITEM_ANGLE;
  const spinAngle = interpolate(frame, [20, SPIN_END], [0, totalSpin], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const activeIndex = ITEMS.reduce((closest, _, i) => {
    const angle = i * ITEM_ANGLE + spinAngle;
    const closestAngle = closest * ITEM_ANGLE + spinAngle;
    return Math.abs(angle) < Math.abs(closestAngle) ? i : closest;
  }, 0);

  const activeItemCenterFrame = ITEMS.map((_, i) =>
    (-i * ITEM_ANGLE / totalSpin) * SPIN_END
  );

  const arrowNudge = spring({
    frame: frame - activeItemCenterFrame[activeIndex],
    fps,
    config: { stiffness: 600, damping: 8, overshootClamping: false },
    from: -24, to: 0,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#111111", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        perspective: 1000, perspectiveOrigin: "30% 50%",
      }}>
        <div style={{
          width: "100%", height: "100%",
          transform: "rotateY(-10deg)", transformStyle: "preserve-3d",
        }}>

          <div style={{
            position: "absolute",
            left: CENTER_X - 58 + arrowNudge,
            top: CENTER_Y - 36,
            fontSize: 52, color: "#ffffff", fontFamily: FONT, lineHeight: 1, zIndex: 10,
          }}>→</div>

          {ITEMS.map((item, i) => {
            const angleRad = (i * ITEM_ANGLE + spinAngle) * (Math.PI / 180);
            const y = CENTER_Y + Math.sin(angleRad) * RADIUS;
            const z = Math.cos(angleRad);
            if (z < -0.1) return null;

            const opacity = Math.max(0, z * 1.1);
            const isActive = i === activeIndex;
            const blur = isActive ? 0 : Math.max(0, (1 - z) * 6);
            const scale = 0.45 + z * 0.55;

            const nudge = isActive ? spring({
              frame: frame - activeItemCenterFrame[i],
              fps,
              config: { stiffness: 600, damping: 8, overshootClamping: false },
              from: 18, to: 0,
            }) : 0;

            return (
              <div key={i} style={{
                position: "absolute",
                left: CENTER_X + nudge,
                top: y - 40,
                opacity,
                filter: blur > 0.4 ? `blur(${blur}px)` : undefined,
                transform: `scale(${scale})`,
                transformOrigin: "left center",
                fontSize: 72, fontWeight: 400, color: "#ffffff",
                fontFamily: FONT, letterSpacing: "-0.02em",
                lineHeight: 1, whiteSpace: "nowrap",
              }}>
                {item}
              </div>
            );
          })}

        </div>
      </div>
    </AbsoluteFill>
  );
};
```

---

## iOS App-Close Transition

Shrinks the whole scene into a card then swipes it up off screen, leaving a clean background. Looks exactly like closing an app in the iOS app switcher.

### How It Works

Two phases:
1. **Scale down** — uniform scale from 1 to ~0.48, add border radius
2. **Swipe up** — translateY sends the card off screen

Wrap the entire scene content in two divs — one for the iOS close transform, one for the background color.

```tsx
// Frame math
const cardScale = interpolate(frame, [310, 330], [1, 0.48], {
  extrapolateLeft: "clamp", extrapolateRight: "clamp",
  easing: Easing.inOut(Easing.cubic),
});
const cardSwipeUp = interpolate(frame, [330, 348], [0, -2400], {
  extrapolateLeft: "clamp", extrapolateRight: "clamp",
  easing: Easing.in(Easing.cubic),
});
const cardBorderRadius = interpolate(frame, [310, 330], [0, 28], {
  extrapolateLeft: "clamp", extrapolateRight: "clamp",
});
```

```tsx
// JSX — wrap entire scene content
<AbsoluteFill style={{ backgroundColor: "#ffffff" }}>
  {/* iOS close wrapper */}
  <div style={{
    position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
    transform: `scale(${cardScale}) translateY(${cardSwipeUp}px)`,
    transformOrigin: "center center",
    borderRadius: cardBorderRadius,
    overflow: "hidden",
  }}>
    <div style={{ width: "100%", height: "100%", backgroundColor: "#ffffff" }}>
      {/* all scene content here */}
    </div>
  </div>
</AbsoluteFill>
```

### Key Details
- `backgroundColor` on the outer `AbsoluteFill` shows through as the card shrinks — set it to whatever the next scene's bg is (white, black, etc.)
- `overflow: hidden` on the wrapper clips the content to the card shape
- `easing: Easing.in(Easing.cubic)` on swipe up makes it accelerate as it exits — feels natural
- `translateY(-2400)` ensures full exit even after the card has scaled down to 0.48
- Scale `0.48` = comfortable card size. Go smaller (0.35) for a more dramatic effect.
- Adjust `[310, 330]` and `[330, 348]` frame ranges to control when it starts and how fast

### Tuning
- **Slower shrink** — widen the scale range e.g. `[310, 340]`
- **Faster swipe** — tighten the swipe range e.g. `[330, 342]`
- **Bigger card** — increase scale to value e.g. `0.55`
- **More rounded** — increase border radius end value e.g. `40`

---

## Creative Concept Starting Points

Think in UI elements the audience already recognizes:
- **Search bar** — the thing they wish would "just find the answer"
- **Phone notifications** — stack them, make them faster, panic energy
- **iMessage / chat** — show a conversation where the AI handles everything
- **POS screen** — something they stare at daily
- **Sticky note / whiteboard** — lo-fi, feels like something they wrote themselves
- **Receipt** — shows cost savings or what they're missing
- **Calendar** — appointments missed, time freed up

Then map the concept to a visual and a frame timeline before prompting.
