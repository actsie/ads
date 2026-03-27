# Meta Ad Research App

## What it is
A tool that takes one keyword → searches the Meta Ad Library → analyzes winning ads → generates creative briefs and ad variations. Replaces manual scrolling, note-taking, and brief-writing.

## How it fits the AI CMO vision
This is one of the skills the AI CMO orchestrator would call:
> AI CMO → "research competitor ads in [niche]" → calls this tool → gets briefs back → feeds into video creation skill → Remotion renders the ad

It's not a standalone project — it's a building block of the same system.

---

## What's buildable

### Meta Ad Library API
- Public API, no auth needed for basic searches
- Filter by: keyword, country, language, ad category, active status
- Returns: ad copy, headline, CTA, image URLs, video URLs, page name, run dates
- 100+ ads fetchable in one call

### Core features
1. **Search + filter** — keyword in, filtered ad list out
2. **Creative brief generator** — feed ad copy + metadata to Claude API → structured brief
3. **Trend radar** — batch 100+ ads, ask Claude to find patterns in format, CTA language, landing page structure
4. **10 ad variations** — Claude writes them given a brief + brand info
5. **Video analysis (optional)** — send video URL to Gemini 1.5 Pro API for creative DNA breakdown

### What to skip (v1)
- Video analysis — ad copy + headline + CTA covers 80% of the value without it
- Add Gemini video analysis in v2 once core loop works

---

## Tech stack
- **Node or Python script** (or simple web app)
- **Meta Ad Library API** — fetch ads
- **Claude API** (`claude-sonnet-4-6`) — brief generation, trend analysis, ad variations
- **Optional:** Gemini API for video understanding
- **Hosting:** Replit or local CLI tool

---

## Build scope
- **v1 (1–2 days):** CLI or simple web app — search → pick ads → generate brief + 10 variations
- **v2:** Trend radar across 100+ ads, video analysis via Gemini, brand profile saved between sessions

---

## Prompt to build v1

```
Build a Node.js CLI tool that:

1. Takes a keyword as input
2. Calls the Meta Ad Library API to fetch the top 20 active ads for that keyword
   (use country: US, ad_type: ALL, fields: id,ad_creative_body,ad_creative_link_title,ad_creative_link_description,page_name,ad_snapshot_url)
3. Displays the results as a numbered list with: page name, headline, body copy
4. Lets the user pick 1–3 ads by number
5. Sends the selected ads to the Claude API (claude-sonnet-4-6) with this prompt:
   "You are a performance marketing strategist. Based on these winning Facebook ads,
   generate: (1) a creative brief identifying what makes these ads work, and
   (2) 10 new ad variations for [brand name] in the same niche. Include hook,
   body copy, CTA, and format recommendation for each."
6. Outputs the brief and variations to a markdown file: output/[keyword]-brief.md

Brand name and Meta API access token are passed as env vars: BRAND_NAME, META_ACCESS_TOKEN, ANTHROPIC_API_KEY
```
