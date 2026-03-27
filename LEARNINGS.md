# Learnings & Project Journey

A running log of what we've discovered, what packages do what, gotchas, and decisions made.
Written so a new person (or future session) can get up to speed fast.

---

## What This Project Is

Fountain of Scale is building short 1080x1080 videos to send to local café and restaurant owners.
The videos demonstrate an AI tool that helps them reduce food waste and reorder stock automatically.

There are two video templates:
- **NoPOS** — for shops that don't have a POS system. Shows a perishable alert → suggested special → draft Instagram post.
- **POS** — for shops that already have a POS (Toast, Square, Lightspeed). Shows the AI reading POS data → spotting low stock → drafting a supplier order via SMS.

Videos are built in **Remotion** — a framework that lets you write animations in React/TypeScript and render them to MP4.

---

## Tech Stack

| Tool | What it does |
|------|-------------|
| **Remotion** | React-based video framework. Write animations as React components, render to MP4. |
| **Zod** | Schema validation. Used to define props for each video template so Remotion Studio can edit them. |
| **roughjs** | Draws hand-drawn / sketchy SVG shapes. Used for the highlighter marker effect on article compositions. |
| **tesseract** | CLI OCR tool — reads text from images and returns positions. Used (when installed) to find where text is in a screenshot so the highlighter knows where to draw. Install with `brew install tesseract`. |

---

## Package Manager

This project uses **npm** (there's a `package-lock.json`). Always use `npm install`, never `yarn` or `pnpm`.

---

## Key Remotion Concepts

- `useCurrentFrame()` — returns the current frame number within a sequence
- `useVideoConfig()` — gives you `fps`, `width`, `height`, `durationInFrames`
- `spring()` — physics-based animation, like React Native's Animated. Use for bouncy/snappy motion.
- `interpolate()` — maps a value from one range to another. Like CSS transitions but frame-based.
- `Easing` — easing curves (e.g. `Easing.out(Easing.cubic)`) to make motion feel natural.
- `staticFile()` — the correct way to reference files in `/public`. Never use raw paths or `require()`.
- `<Sequence>` — wraps a component so it starts at a specific frame within the video.
- `<Composition>` — registers a video in Root.tsx with its duration, fps, size, schema, and defaultProps.

---

## Gotchas

### Zod schema + defaultProps must be hardcoded object literals
Never reference a variable in `defaultProps`. Remotion reads these statically. If you use a variable, it breaks.

### System fonts only
Never use Google Fonts or custom font imports inside animation components — they cause render failures on MantisСlaw (the remote render machine). Always use:
```
'-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif'
```

### staticFile() not require()
Always use `src={staticFile("filename.png")}` to reference public assets. Using `require("/absolute/path")` breaks on other machines.

### Absolute positioning for chat bubbles
Never use flex/margin for chat bubbles in scene 3 — use `position: absolute` with fixed `top` values. This way scroll (`translateY`) works correctly.

### Scroll wrapper pattern
To scroll chat bubbles: wrap everything in `<div style={{ transform: translateY(${-scrollY}px) }}>`. The scroll value animates via `interpolate()`.

### Easing inverts for nudge timing
The pain wheel spin uses `Easing.out(Easing.cubic)` which frontloads motion. If you calculate nudge frame timing assuming linear spin, items will nudge too early. Invert the easing: `t = 1 - Math.pow(1 - p, 1/3)` to find the real frame.

### roughjs in Remotion
roughjs works with SVG in Remotion. Use a `useRef<SVGSVGElement>` and draw inside `useEffect`. The SVG must be `position: absolute` and rendered **behind** the image (lower `zIndex`) so the highlight appears under text.

---

## Animation Techniques Built

### Card fan + stack back + flip (Scene 1)
- Cards fan out using `transformOrigin: "50% calc(100% + 200px)"` — pivot point below the card
- Stack back: `effectiveAngle = fanAngle * (1 - stackBack)` — all cards lerp to 0°
- Flip: `rotateY(0→180deg)` with `perspective`, `transformStyle: preserve-3d`, `backfaceVisibility: hidden` on front/back faces

### iOS notification morph
- Single div that interpolates: `top`, `left`, `width`, `borderRadius`, `fontSize`, `padding`
- Header (app name + icon) fades out and collapses via `height` interpolation
- Turns into a chat bubble shape by frame 76

### iOS app-close
- `scale(1 → 0.48)` then `translateY(0 → -2400px)` — mimics swiping the app away

### Pain wheel (drum roller)
- Items placed on a cylinder: `y = CENTER_Y + sin(angle) * RADIUS`
- `z = cos(angle)` drives opacity, blur, and scale
- Items behind the cylinder (`z < -0.1`) are not rendered

### Rough.js highlight evolving left to right
- Draw a `rough.rectangle()` with width = `highlightMaxWidth * progress`
- `progress` animates via `interpolate()` from 0 to 1 after blur clears
- SVG must be on top of the image (`zIndex` higher than image) — putting it behind hides the highlight under the image's white background
- Use `fill` with low opacity (e.g. `rgba(255,220,0,0.25)`) so text shows through — classic highlighter pen look
- Border stroke uses a higher opacity (e.g. `rgba(240,200,0,0.9)`) for the sketchy outline
- **Do NOT use `useMemo`** for the roughjs paths — Remotion caches stale values from thumbnail renders and the highlight leaks to frame 0. Compute paths inline with a direct frame guard: `const h1Paths = frame >= 35 ? makeHighlight(...) : null`
- **Jitter speed**: roughjs redraws paths every frame by default (30fps flicker). Control it by passing a `seed` derived from `Math.floor(frame / N)` — higher N = slower jitter. `N=3` ≈ 10fps jitter, `N=6` ≈ 5fps, `N=12` ≈ 2.5fps. Sweet spot is around 3–6.
- **mix-blend-mode: multiply** makes the highlight visible through a white background but discolors any colored text (e.g. blue links turn green). Avoid it — use the SVG on top with opacity instead.

### Blur in / unblur
- `filter: blur(${value}px)` on the wrapper div
- `interpolate(frame, [0, 30], [12, 0])` — blurs in first second then clears

### 3D rotation + zoom
- `transform: scale(${scale}) rotateY(${rotateY}deg) rotateX(${rotateX}deg)` on wrapper
- Parent needs `perspective: 1200` for the 3D effect to show

---

## MantisСlaw (Remote Render Machine)

MantisСlaw is a separate Mac that renders the videos. It pulls from GitHub and runs Remotion render commands.

- Project path: `/Users/mantisclaw/.openclaw/workspace/ads/remotion/project`
- Always push to both remotes: `git push actsie main && git push exploration main`
- MantisСlaw pulls from `exploration` remote
- Image downloads from Google Drive take ~8 minutes
- Render one composition at a time to avoid memory issues

---

## Workflow for Adding a New Shop

1. Get shop info: name, photo filenames, product photo, special/item details
2. Add `<Composition>` block to `src/Root.tsx`
3. Add photo folder to `/public/SHOPNAME/`
4. Commit + push to both remotes
5. Tell MantisСlaw to pull and render

See `PROMPTS.md` for the exact template to fill in.
