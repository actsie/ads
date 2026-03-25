# Video Prompt Guide — How to Prompt Mantis Claw to Build Ad Videos

## The Core Principle
Don't describe the vibe. Describe the exact frame-by-frame motion.
One scene at a time. Never give the full video in one prompt.

---

## The Prompting Formula

### 1. Map the timeline first (before writing the prompt)
Convert every beat to frames at 30fps:
- 0.1s = frame 3
- 0.4s = frame 12
- 0.9s = frame 27
- 1.0s = frame 30
- 2.0s = frame 60
- 3.0s = frame 90

### 2. For each element, specify:
- **What frame it starts** — `frame X`
- **What it looks like at start** — size, opacity, position, blur
- **What it looks like at end** — size, opacity, position
- **How it gets there** — spring config OR interpolate with easing
- **Any hold time** — how long it stays before next thing happens

### 3. Always specify spring configs explicitly:
```
spring({ frame: frame - [delay], fps, config: { stiffness: [X], damping: [Y] } })
```
- Clean slide-up: stiffness 200, damping 20
- Bouncy pop: stiffness 180, damping 12, overshootClamping: false
- Snappy punch: stiffness 300, damping 25
- Slow float: stiffness 80, damping 15

### 4. Specify layout precisely:
- `position: absolute, left: 50%, transform: translateX(-50%)` for centered
- Exact px sizes, not "big" or "small"
- Border radius, padding, colors as hex codes

---

## Example: Search Bar Scene (the reference)

**Concept:** Search bar grows from a circle at center — feels native, not like an ad

**Timeline mapping:**
- Frame 0–3 (0–0.1s): Circle fades in
- Frame 3–12 (0.1–0.4s): Search icon grows inside circle
- Frame 12–27 (0.4–0.9s): Circle stretches into full search bar
- Frame 27+ (0.91s+): Text types in

**The prompt:**
> Create `src/Scene1.tsx`. 1080x1080, 30fps. Dark background (#0a0a0a).
>
> - **Frames 0–3:** White circle (48px diameter) fades in at center using `interpolate(frame, [0, 3], [0, 1])` for opacity
> - **Frames 3–12:** Search icon (20px) scales in inside the circle using `spring({ frame: frame - 3, fps, config: { stiffness: 200, damping: 15 } })`
> - **Frames 12–27:** Circle stretches horizontally — width expands from 48px to 820px using `spring({ frame: frame - 12, fps, config: { stiffness: 120, damping: 18 } })`. Height stays 56px. Border radius 28px (pill). Background white. Centered using `position: absolute, left: 50%, transform: translateX(-50%)`
> - **Frames 27–90:** Blinking cursor appears inside bar. Characters type one at a time: "Free ai inventory management system" — one character every 2 frames. Text: #1a1a1a, 22px, system font.

---

## What Makes This Approach Work

- **Frame-by-frame = no guessing.** The agent knows exactly what to build.
- **Spring configs = consistent feel.** No random animations.
- **One scene at a time = reviewable.** You see it before moving on.
- **Creative concepts first.** Describe the idea in plain English, then map it to frames together before writing the prompt.

---

## How to Come Up With Creative Concepts

Think in terms of:
- **Native-feeling UI elements** — search bars, phone notifications, POS screens, text messages
- **Things their audience recognizes** — a sticky note, a clipboard, a fridge, a spreadsheet
- **Contrast moments** — before/after, chaos/clean, old way/new way
- **Real interactions** — typing, clicking, swiping, a result appearing

Then map that idea to a frame timeline before prompting.

---

## Scene-by-Scene Template

When building a full ad, prompt each scene separately in this order:

**Scene 1 — Hook (0–4s / frames 0–120)**
The pattern interrupt. Something visually unexpected that signals the niche.

**Scene 2 — Pain (4–9s / frames 120–270)**
Their problem, in their words. Simple text animation.

**Scene 3 — The moment (9–16s / frames 270–480)**
Show the specific pain point — a UI, a situation, a contrast.

**Scene 4 — CTA (16–20s / frames 480–600)**
Clean. Static or one simple animation. URL on screen.

---

## Rules

- Never prompt the full video at once
- Never say "animate this nicely" — specify the exact motion
- Always review before moving to the next scene
- If it looks wrong, describe exactly what's wrong (timing, size, position) — don't ask it to "fix it"
- Font: use system fonts (`-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif`) until video is proven — avoids font loading errors
