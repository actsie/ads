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
- Filter by: keyword, country, language, ad category, active status
- Returns: ad copy, headlines, spend ranges, run dates, publisher platforms, snapshot URLs
- 100 ads per call (max), ~200 calls/hour before rate limits hit
- Paginate via `paging.cursors.after` in the response for 100+ ads

> **Note — NOT truly public:** Requires a Facebook Developer account + identity verification (government ID via facebook.com/ID). Verification takes 3–5 business days — plan for this before starting. Also need a User Access Token or System User Token (System User preferred for automation — doesn't expire with a personal login).

> **Note — no media files returned:** The API does not return video files or image files. `ad_snapshot_url` is a webpage (HTML preview), not a media URL. To get actual video files you need to scrape that page with Playwright or use Apify's Meta Ad Library actor. This is the hard step for video analysis.

### Core features
1. **Search + filter** — keyword in, filtered ad list out
2. **Creative brief generator** — feed ad copy + metadata to Claude API → structured brief
3. **Trend radar** — batch 100+ ads, ask Claude to find patterns in format, CTA language, landing page structure
4. **10 ad variations** — Claude writes them given a brief + brand info
5. **Video analysis (v2)** — scrape video URL from snapshot page → download → upload to Gemini File API → analyze with `gemini-2.5-flash`

### What to skip (v1)
- Video analysis — ad copy + headline + CTA covers 80% of the value without it
- Add Gemini video analysis in v2 once core loop works

---

## Tech stack

### v1
- **Node.js or Python** — CLI tool
- **Meta Ad Library API** — fetch ads (requires token + verified developer account)
- **Claude Agent SDK** (`claude-sonnet-4-6`) — brief generation, trend analysis, ad variations
- Use the **subagents pattern**: orchestrator routes to `ad-fetcher`, `report-writer` subagents. No custom routing logic needed — agent descriptions handle routing.

### v2 (video analysis addition)
- **Playwright** — scrape actual video URLs from `ad_snapshot_url` snapshot pages (or use Apify actor as shortcut)
- **Gemini 2.5 Flash** — upload video via Gemini File API, analyze hook/offer/CTA/tone
- Can batch up to 10 videos per Gemini request
- Files uploaded to Gemini File API are deleted after 48 hours — not persistent storage

> **Note — Gemini can't take Meta URLs directly:** You must download the video file first, then upload it via `genai.upload_file()`. Gemini only accepts YouTube URLs, GCS URIs, or uploaded files — not arbitrary HTTPS video URLs.

---

## Build scope
- **v1 (1–2 days):** CLI — search → display ads → pick ads → generate brief + 10 variations → output markdown
- **v2:** Trend radar across 100+ ads, video analysis via Gemini, brand profile saved between sessions

---

## Revised full stack (v2)
1. Meta Ad Library API → metadata + `ad_snapshot_url` for up to 100 ads
2. Playwright (or Apify) → scrape actual video URLs from snapshot pages
3. Gemini 2.5 Flash → download video → upload to File API → analyze
4. Claude Agent SDK with subagents → orchestrate everything, write final report

---

## Prompt to build v1

```
Build a Node.js CLI tool that:

1. Takes a keyword as input
2. Calls the Meta Ad Library API to fetch the top 20 active ads for that keyword
   Endpoint: GET https://graph.facebook.com/v23.0/ads_archive
   Params: search_terms, ad_type=ALL, ad_active_status=ALL, ad_reached_countries=["US"],
   fields: page_name,ad_creative_bodies,ad_creative_link_titles,ad_creative_link_descriptions,ad_snapshot_url,ad_delivery_start_time,spend,publisher_platforms
   limit: 20
3. Displays the results as a numbered list with: page name, headline, body copy, run start date
4. Lets the user pick 1–3 ads by number
5. Sends the selected ads to the Claude API (claude-sonnet-4-6) with this prompt:
   "You are a performance marketing strategist. Based on these winning Facebook ads,
   generate: (1) a creative brief identifying what makes these ads work, and
   (2) 10 new ad variations for [brand name] in the same niche. Include hook,
   body copy, CTA, and format recommendation for each."
6. Outputs the brief and variations to a markdown file: output/[keyword]-brief.md

Env vars required: BRAND_NAME, META_ACCESS_TOKEN, ANTHROPIC_API_KEY
Note: META_ACCESS_TOKEN requires a verified Facebook Developer account and identity verification.
```

---

## Sources
- [Facebook Ad Library API: Complete Guide — adlibrary.com](https://adlibrary.com/guides/facebook-ad-library-api)
- [How to Use the Meta Ad Library API — apidog.com](https://apidog.com/blog/facebook-ad-library-api/)
- [Meta Ad Library API scraping guide — swipekit.app](https://swipekit.app/articles/meta-ad-library-api)
- [Claude Agent SDK Overview — official docs](https://platform.claude.com/docs/en/agent-sdk/overview)
- [Video understanding — Gemini API docs](https://ai.google.dev/gemini-api/docs/video-understanding)
- [Analyze Meta Ad Library Video Ads with Gemini — n8n workflow](https://n8n.io/workflows/3069-analyze-meta-ad-library-video-ads-with-gemini-and-store-results-in-google-sheets/)
- [Gemini 2.5 video understanding — Google Developers Blog](https://developers.googleblog.com/gemini-2-5-video-understanding/)
