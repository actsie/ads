# Remotion Video Prompts

## Adding a New Shop

### NoPOS Template (social post / perishable special flow)

Fill in the details below and add a `<Composition>` block to `src/Root.tsx`:

```
- Shop name:
- Template: NoPOS (SimonesVideo)
- Photo folder: /public/SHOPNAME
- Photos (5–7 filenames for the fan in Scene 1):
- Product photo (shown in chat Scene 3):
- Suggested special name:
- Draft Instagram caption:
- Perishable alert (key ingredient that's expiring → ties to the special):
```

**Rule:** perishableAlert must name the ingredient that the suggested special uses.
Example: Espresso Martini → "1 bottle of espresso liqueur expires in 4 days. Suggest a special to move it?"

---

### POS Template (reorder / supplier draft order flow)

```
- Shop name:
- Template: POS (POSVideo)
- Photo folder: /public/SHOPNAME
- Photos (5–7 filenames for the fan in Scene 1):
- Product photo:
- Low stock item (e.g. "cold brew concentrate"):
- Sales trend (e.g. "up 40% this week"):
- Reorder item (e.g. "Cold Brew Concentrate — 2 x 5L bags"):
- Supplier name (e.g. "Pacific Coast Roasters"):
- Supplier phone (e.g. "+1 (555) 012-3456"):
```

---

## Rendering a Video (MantisСlaw)

Project path on MantisСlaw:
`/Users/mantisclaw/.openclaw/workspace/ads/remotion/project`

### Pull latest and render a single shop:
```
1. cd /Users/mantisclaw/.openclaw/workspace/ads/remotion/project
2. git pull exploration main
3. npx remotion render src/index.ts {CompositionId} out/{filename}.mp4
```

### Composition IDs
| Shop | Composition ID | Template |
|------|---------------|----------|
| Simone's | SimonesVideo | NoPOS |
| The Mental Bar | MentalBarVideo | NoPOS |
| The Trade | TradeCoffeeVideo | NoPOS |
| The Witch's Cottage | WitchsCottageVideo | NoPOS |
| With Love Market and Café | WithLoveVideo | NoPOS |
| Frost Me Cafe and Bakery | FrostMeCafeVideo | NoPOS |
| 27 Club Coffee | 27ClubCoffeeVideo | NoPOS |
| Alchemy Cafe | AlchemyCafeVideo | NoPOS |
| Cafe Coda Chico | CafeCodaChicoVideo | NoPOS |
| Cafe Dulce | CafeDulceVideo | NoPOS |
| Cafe Nido | CafeNidoVideo | NoPOS |
| Cafe Vida | CafeVidaVideo | NoPOS |
| Simone's (POS demo) | POSVideoDemo | POS |
| Camp 4 Wine Cafe LLC | Camp4Video | POS |
| Another Café | AnotherCafeVideo | POS |
| Frontside Cafe LLC | FrontsideCafeVideo | POS |

---

## Advanced Composition Prompts

### How to find positions for rough.js annotations

Depending on what you're annotating, use the right method:

| Situation | Method |
|-----------|--------|
| Text is baked into an image (screenshot, photo) | Use **tesseract CLI** to OCR the image and get pixel coordinates. Install: `brew install tesseract`. Run: `tesseract [image] stdout tsv` to get word positions. |
| Text is a React element you wrote in Remotion | You already know the position — use the same `left`, `top`, `fontSize` values from your JSX. No OCR needed. |
| UI screenshot with roughly known layout | Eyeball the coordinates and tweak in Remotion Studio scrubbing frame by frame. |
| Need exact position of a rendered element in Studio | Add a `useRef` to the element, call `getBoundingClientRect()` in a `useEffect` (Studio preview only — won't work in render), log the values, then hardcode them. |

---

### Article Highlight Composition
Use when creating a composition that zooms into a screenshot of an article and highlights specific words with a hand-drawn marker effect.

```
Use remotion best practices. Import the following image into the project: [image name]

Use tesseract CLI to do OCR and find the positions of the text. In Remotion,
make a new composition where you load the image and pad the article generously
on a white full HD background.

While the composition is running for 5 seconds, slowly, very subtly, zoom into
it and slightly rotate the article in 3D from left to right. The overall rotation
should be around 15 degrees for each axis.

At the beginning, blur the whole composition and unblur it over 1 second. After
the blur is done, evolve a highlighter from left to right using rough.js over
[words to highlight]. The image has a white background — make sure the marker
appears behind the text.

When installing new dependencies, check for existing lockfiles and use the right
package manager.
```

---

### Rough.js Underline
Animate a hand-drawn underline appearing left to right under a word or phrase.

```
Use rough.js generator API (not useEffect — use inline computation with frame guards).
Draw a gen.line(x1, y1, x2, y2) where x2 = x1 + lineWidth * progress.
progress = interpolate(frame, [startFrame, endFrame], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }).
Render as a <path> inside a <svg> positioned absolute over the composition.
stroke: "[color]", strokeWidth: 2.5, roughness: 1.5, bowing: 1.
Jitter: pass seed={Math.floor(frame / 3)} to keep it stable but slightly alive.
Only compute paths when frame >= startFrame — never use useMemo (Remotion caches stale values from thumbnail renders).
```

---

### Rough.js Circle Callout
Animate a hand-drawn oval growing around a word, number, or area to draw attention to it.

```
Use rough.js generator API.
Draw gen.ellipse(cx, cy, width * progress, height * progress, options).
progress = interpolate(frame, [startFrame, endFrame], [0, 1], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" }).
cx/cy = center of the word (use OCR or known coordinates). width/height = bounding box of the word + padding (~20px each side).
stroke: "[color]", strokeWidth: 2, roughness: 2, fill: "none".
Render as <path> inside absolute <svg>. Only compute when frame >= startFrame.
Jitter: seed={Math.floor(frame / 4)}.
```

---

### Rough.js Animated Arrow
Draw a hand-drawn arrow that points at something on screen, appearing with a draw-on effect.

```
Use rough.js generator API.
Draw gen.path("[SVG path string for arrow line + arrowhead]", options).
For a simple pointing arrow: "M [tailX] [tailY] L [tipX] [tipY]" for the shaft, plus a small V shape for the arrowhead.
Animate by trimming the path — use a clip path or strokeDashoffset trick, or simplify by fading in with opacity = interpolate(frame, [start, start+15], [0, 1]).
stroke: "[color]", strokeWidth: 2.5, roughness: 1.5.
Only compute when frame >= startFrame.
```

---

### Rough.js Fill Styles
When using rough.js fills, choose the style that fits the mood:

```
fillStyle options:
- "solid"       — flat color fill, like a marker. Use for highlights.
- "hachure"     — diagonal lines (default). More hand-drawn, energetic.
- "cross-hatch" — grid pattern. Busy, textured.
- "zigzag"      — jagged fill. Playful, chaotic.
- "dots"        — dotted fill. Soft, subtle.
- "dashed"      — dashed lines. Sketchy but light.

Fill opacity: keep rgba alpha at 0.2–0.35 for overlay on images so text shows through.
Border stroke opacity: 0.8–1.0 for visibility.
Jitter speed: Math.floor(frame / N) as seed — N=3 is ~10fps (lively), N=6 is ~5fps (calm).
```

---

### Rough.js Sketch Border on Card
Animate a hand-drawn border appearing around a card, photo, or UI element.

```
Use rough.js generator API.
Draw gen.rectangle(x, y, width, height, options) — full dimensions, no progress scaling.
Animate with opacity: interpolate(frame, [startFrame, startFrame+20], [0, 1]).
Or animate the border drawing by scaling width: gen.rectangle(x, y, width * progress, height) for left-to-right reveal.
stroke: "[color]", strokeWidth: 2, roughness: 2.5, fill: "none".
Render as <path> inside absolute <svg> on top of the card (zIndex higher than card).
Only compute when frame >= startFrame.
```

---

## Template Structure

### NoPOS (SimonesVideo)
- **Scene 1** (120 frames): Card fan → stack back → flip → "The work never stops. Some of it should."
- **Scene 2** (202 frames): Pain wheel — 7 items, arrow stops at index 4, bridge line slides in
- **Scene 3** (347 frames): iOS notification morph → chat → suggested special → confirm → photo → draft post
- **Scene 4** (160 frames): "{shopName} was top of mind when we started this." + "Reply yes if you're interested."

### POS (POSVideo)
- **Scene 1** (120 frames): Same as NoPOS Scene 1
- **Scene 2** (202 frames): Pain wheel — POS-specific items
- **Scene 3** (430 frames): Notification morph + stock breakdown → chat → draft supplier order → send → "Sent. Following up in 2hrs if no confirmation."
- **Scene 4** (160 frames): "{shopName} was top of mind..." + "Free setup. No obligations."
