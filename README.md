# Albion Greens — Website

Cinematic Next.js website for Albion Greens, Park Royal microgreens supplier.

## Stack
Next.js 14 · Tailwind CSS · Resend (email) · Vercel (hosting)

## Signature interactions
- Custom cursor with magnetic buttons (desktop only, auto-disabled on touch)
- Infinite variety name ticker
- Hover-follow image preview on variety list (mobile: tap-to-expand instead)
- Animated tab switcher with auto-rotation ("Who We Serve")
- Word-by-word quote reveal on scroll
- Hero photo-stack parallax tied to mouse position
- Full reveal-on-scroll system throughout

All motion-heavy interactions are gated behind `pointer: fine and hover: hover`
media queries / JS checks, so mobile gets clean, fast, touch-native equivalents
instead of broken or pointless desktop effects.

## Local development

```bash
npm install
cp .env.example .env.local
# add your RESEND_API_KEY to .env.local
npm run dev
```

Visit http://localhost:3000

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Import at vercel.com/new — framework auto-detects as Next.js
3. Add `RESEND_API_KEY` in Vercel → Settings → Environment Variables
4. Redeploy
5. (Optional) Verify `albiongreens.co.uk` in Resend → Domains for branded sending
   addresses. Until verified, change `from` fields in `pages/api/*.js` to
   `onboarding@resend.dev`
6. Add your custom domain in Vercel → Settings → Domains

## Pages
- `/` — Home (cinematic signature page)
- `/microgreens` — Full 16-variety catalogue
- `/order` — 3-step order form → emails via Resend
- `/trade` — Wholesale enquiry form
- `/about` — Brand story
- `/contact` — Contact form
- `/faq` — Accordion FAQ

## API routes
- `POST /api/order`
- `POST /api/trade`
- `POST /api/contact`

## Costs
Vercel free tier + Resend free tier (3,000 emails/month) = **£0/month** at this scale.
