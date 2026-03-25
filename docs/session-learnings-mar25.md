# Session Learnings — Mellow Cup Template + Zod Schemas (Mar 25)

## What We Did
Built a reusable 4-scene Remotion ad template for Mellow Cup (coffee shop client) with Zod schema integration so any coffee shop's props can be edited visually in Remotion Studio — no code changes needed per client.

**Scenes (4 total):**
1. Hook scene — words pop in one by one, last word gets accent color, tagline fades in below
2. Product scene — product image springs up large, title overlay, "Now available" badge + spinning diamond, price sticker bottom right
3. Brand/vibe scene — logo bounces in, shop name pops large, tagline + neighborhood slide up
4. CTA scene — "Come find us." + shop name in accent color, divider line grows out, logo + neighborhood row

---

## Tool Setup This Session

### Claude Code (Claude Sonnet 4.6)
- Built the entire Mellow Cup template locally using Claude Code (not OpenCode, not Mantis Claw)
- Claude Code runs in the terminal with full file read/write access — no credit burning per message
- Much faster iteration than OpenCode for focused file edits
- Good for: fixing specific bugs, wiring up schemas, adding scenes to existing projects

---

## Key Learnings

### Zod Schemas in Remotion — What They Do
Remotion supports Zod schemas on `<Composition>` tags. When you add one, Remotion Studio shows a visual prop editor panel for that composition — you can change text, colors, images without touching code. This is the mechanism for making a template reusable per client.

**Setup:**
```ts
// MellowCupSchema.ts
import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const mellowCupSchema = z.object({
  shopName: z.string(),
  accentColor: zColor(),   // renders as a color picker in Studio
  productImage: z.string(),
  // ...etc
});
export type MellowCupProps = z.infer<typeof mellowCupSchema>;
```

```tsx
// Root.tsx — wire up schema + defaultProps
<Composition
  id="MellowCupScene1"
  component={MellowCupScene1}
  schema={mellowCupSchema}
  defaultProps={{ shopName: "Mellow Cup", accentColor: "#7bb661", ... }}
/>
```

**Packages needed:**
```
npm install zod
npx remotion add   → select @remotion/zod-types
```

---

### Remotion Schema Gotcha — defaultProps Must Be Hardcoded

**Error:** `Can't save default props: defaultProps prop must be a hardcoded value in the <Composition/> tag`

**Cause:** Remotion's static analysis scans the JSX literally — it can't follow variable references. Even if you export a `defaultMellowCupProps` object from a schema file, passing it as a variable breaks the editor.

**Wrong:**
```tsx
import { defaultMellowCupProps } from "./MellowCupSchema";
<Composition defaultProps={defaultMellowCupProps} />
```

**Right:**
```tsx
<Composition defaultProps={{
  shopName: "Mellow Cup",
  accentColor: "#7bb661",
  // ... all values inlined
}} />
```

The schema file can still export the defaults as a reference for other uses — just not inside `<Composition>`.

---

### PriceSticker Props Bug
If a sub-component inside a scene uses a value from the parent's props (e.g. `price`), it needs to receive it explicitly as its own prop — React doesn't inherit props through closures across component boundaries.

**Wrong:**
```tsx
const PriceSticker: React.FC<{ progress: number }> = ({ progress }) => {
  // uses `price` — but where does it come from?
  return <span>{price}</span>;
};
```

**Right:**
```tsx
const PriceSticker: React.FC<{ progress: number; price: string }> = ({ progress, price }) => {
  return <span>{price}</span>;
};
// and at call site:
<PriceSticker progress={stickerProgress} price={price} />
```

---

## Template Structure (Reusable Per Client)
```
MellowCupSchema.ts       ← all props defined here, one source of truth
MellowCupScene1.tsx      ← imports MellowCupProps, uses destructured props
MellowCupScene2.tsx
MellowCupScene3.tsx
MellowCupScene4.tsx
Root.tsx                 ← registers all 4 with schema + inlined defaultProps
```

To adapt for a new coffee shop client: change `defaultProps` values in Root.tsx (or use the Remotion Studio prop editor) — no scene code changes needed.

---

## Next Steps
- Push Mellow Cup scenes to GitHub (actsie/ads)
- Copy reference docs to Mantis Claw workspace
- Test Mantis Claw building a new ad using this template as a base
