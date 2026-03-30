# Deployment & DNS Routing Plan — Operation Healing Waters

> Created: 2026-03-29
> Pattern: Same as Bayou Charity (bayoucharity.org → Cloudflare Pages)

---

## Overview

Domain is purchased through Squarespace. Site deploys to Cloudflare Pages as a static export. DNS records in Squarespace point the domain to the CF Pages project.

---

## Step 1: Pre-Deploy Fixes (CLI Session)

Before deploying, these must be completed:

1. **EXIF rotation** — Run Pillow `ImageOps.exif_transpose()` on all photos in `public/images/`
2. **Image compression** — All JPEGs to 80% quality, max 1920px wide. OG image to 1200×630.
3. **Build verification** — `npm run build` must succeed and produce `out/` with `out/index.html`

Optional (can deploy without, redeploy after):
- EmailJS credentials in `.env.local`
- Favicon

---

## Step 2: Create Cloudflare Pages Project

### Option A: GitHub Integration (Recommended)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages → Create a project
2. Connect GitHub → select `gr8gray253/Operation_Healing_Waters`
3. Configure build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Root directory:** (leave blank — package.json is at root)
   - **Node.js version:** 20 (set via environment variable `NODE_VERSION=20`)
4. Deploy

The project will get a `*.pages.dev` subdomain (e.g., `operation-healing-waters.pages.dev`).

### Option B: Direct Upload via Wrangler

```bash
npx wrangler pages project create operation-healing-waters
npx wrangler pages deploy out --project-name=operation-healing-waters
```

---

## Step 3: DNS Routing (Squarespace → Cloudflare Pages)

### Get the CF Pages URL first

After the first deploy, note the `*.pages.dev` URL (e.g., `operation-healing-waters.pages.dev`).

### Add Custom Domain in Cloudflare

1. In CF Dashboard → Pages → your project → Custom domains
2. Click "Set up a custom domain"
3. Enter the domain (e.g., `operationhealingwaters.com` or whatever the actual domain is)
4. Cloudflare will show you the required DNS records

### Configure DNS in Squarespace

1. Log into Squarespace → Domains → select the domain → DNS Settings
2. Remove any existing A records or CNAME for `@` or `www` that point to Squarespace
3. Add the following records:

**For root domain (`@`):**

| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME | `@` | `operation-healing-waters.pages.dev` | Auto |

Note: Squarespace may not support CNAME on root (`@`). If so, use Cloudflare's provided IP addresses as A records instead:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | `@` | `192.0.2.1` (Cloudflare will provide actual IP) | Auto |

**For www subdomain:**

| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME | `www` | `operation-healing-waters.pages.dev` | Auto |

### Alternative: Transfer DNS to Cloudflare (Cleaner)

If Squarespace DNS is limited (no CNAME flattening for root), consider:

1. Add the domain to Cloudflare's free DNS plan
2. In Squarespace, change nameservers to Cloudflare's (Cloudflare will provide these)
3. Manage all DNS records in Cloudflare dashboard
4. This gives you CNAME flattening, automatic SSL, and better performance

This is the same approach used for Bayou Charity if applicable.

---

## Step 4: Post-Deploy Verification

Checklist (from `cli-handoff-2026-03-26-deploy.md`):

- [ ] Photos display upright (not rotated)
- [ ] Wave dividers animate on scroll
- [ ] SideNav works (desktop pill + mobile bottom bar)
- [ ] No top navbar visible
- [ ] Contact form visible and submits (if EmailJS wired)
- [ ] Gallery shows 5 photos with working lightbox
- [ ] Social section shows Instagram embed + follow links
- [ ] Bayou Charity link in footer
- [ ] Service worker cache busted (hard refresh or incognito)
- [ ] Custom domain resolves with HTTPS
- [ ] www redirects to root (or vice versa)

---

## ~~Step 5: Git History Cleanup~~ — COMPLETED 2026-03-29

Fresh orphan commit (`ca65252`) created and force-pushed to `main`. Old 30+ commit history containing CLAUDE.md with client contact info is gone. Repo now has single clean commit.

---

## DNS Propagation

After changing DNS records, allow 24-48 hours for full propagation. Use these tools to verify:

- `dig +short operationhealingwaters.com` (check A/CNAME records)
- https://dnschecker.org (visual propagation check)
- Cloudflare dashboard will show "Active" when the custom domain is verified

---

## Rollback Plan

If something goes wrong with the deploy:

1. The `*.pages.dev` URL always works regardless of custom domain status
2. Previous deployments are available in CF Pages dashboard → Deployments
3. DNS changes can be reverted in Squarespace by pointing records back to Squarespace's servers
