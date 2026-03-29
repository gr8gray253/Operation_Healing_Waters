# CLI Handoff — OHW Deploy (2026-03-26)

> Cowork session completed: nav consolidation (SideNav only), SocialFeed rewrite, Contact solid bg, contrast sweep, WaveDivider finalized (Variation 1 "Deeper Teal" — 3-layer organic waves, h-24/md:h-32, no gold accent). TypeScript compiles clean. WaveDivider is done — do not iterate further.
>
> This handoff covers the remaining deploy blockers.

---

## Task 1: EXIF Rotation — ALL Photos

**Priority:** P0 — every photo except gallery-5.jpg displays sideways

**What:** gallery-1.jpg, gallery-2.jpg, gallery-3.jpg, gallery-4.jpg, hero.jpg, and all `Derrious (owner) fish *.jpeg` files are stored landscape with EXIF rotation flags. Browsers may or may not respect them. The pixel data needs to be physically rotated.

**How:**
```python
from PIL import Image, ImageOps
from pathlib import Path

img_dir = Path("public/images")
for f in img_dir.glob("*"):
    if f.suffix.lower() in (".jpg", ".jpeg", ".png"):
        img = Image.open(f)
        img = ImageOps.exif_transpose(img)
        img.save(f, quality=85)
        print(f"Fixed: {f.name}")
```

**Verify:** Open each image in a viewer — people should be upright, not sideways.

---

## Task 2: Image Compression

**Priority:** P0 — ~35MB uncompressed kills load time

**What:** All JPEGs in `public/images/` to 80% quality, max 1920px wide. OG image to 1200×630.

**How:** Extend the script above:
```python
MAX_WIDTH = 1920
for f in img_dir.glob("*"):
    if f.suffix.lower() in (".jpg", ".jpeg"):
        img = Image.open(f)
        img = ImageOps.exif_transpose(img)
        if img.width > MAX_WIDTH:
            ratio = MAX_WIDTH / img.width
            img = img.resize((MAX_WIDTH, int(img.height * ratio)), Image.LANCZOS)
        img.save(f, quality=80, optimize=True)

# OG image special size
og = Image.open(img_dir / "og-image.jpg")
og = ImageOps.exif_transpose(og)
og = og.resize((1200, 630), Image.LANCZOS)
og.save(img_dir / "og-image.jpg", quality=80, optimize=True)
```

**Verify:** `du -sh public/images/` should be under 5MB total.

---

## Task 3: Rename next.config.ts → next.config.mjs

**Priority:** P0 — build fails without this (see global-mistake-ledger #9)

**What:** Windows case-insensitive NTFS mount blocks having both `.ts` and `.js`. The fix from the ledger: rename to `.mjs`.

**How:**
```bash
mv next.config.ts next.config.mjs
```

**Verify:** `next build` completes without ENOENT errors. The config already has `output: 'export'` and `images: { unoptimized: true }`.

---

## Task 4: Full Build

```bash
npx next build
```

**Verify:**
- Build completes with `output: 'export'`
- `out/` directory created
- `out/index.html` exists
- No TypeScript errors (already confirmed clean)

---

## Task 5: CF Pages Deploy

**Option A — Direct upload (fastest for today):**
```bash
npx wrangler pages deploy out/ --project-name=operation-healing-waters
```

If the project doesn't exist yet, Wrangler will prompt to create it. Alternatively use the Cloudflare MCP from Cowork.

**Option B — GitHub integration (proper long-term):**
1. Create GitHub repo: `gh repo create operation-healing-waters --private --source=.`
2. Commit specific files (STOP 2: never `git add .`, never commit CLAUDE.md/docs/README.md)
3. Push to origin
4. Connect CF Pages to GitHub in dashboard

**Verify (STOP 1):** After deploy completes, verify in CF Pages dashboard that the build succeeded AND check the production URL in a browser.

---

## Task 6: Post-Deploy Verification

- [ ] All photos display upright (not sideways)
- [ ] Wave dividers animate between sections
- [ ] SideNav works on desktop (left pill) and mobile (bottom bar)
- [ ] No top navbar visible
- [ ] Contact form visible with readable text on solid navy
- [ ] Gallery shows 5 photos in portrait aspect, no owner fish photos
- [ ] Social section shows Instagram embed + inline TikTok link
- [ ] Bayou Charity link only in footer (small text)
- [ ] Service worker cache busted (STOP 4)

---

## Task 7: Verify EmailJS

**Priority:** P1 — `.env.local` is populated and ready. Just verify it works.

**Already done (Cowork session):**
- Service connected: Gmail → `support@operationhealingwaters.org` (Service ID: `service_4g2p5ae`)
- Template created: "Contact Us" (Template ID: `template_dypb96q`) — all fields mapped correctly
- `.env.local` populated with all 3 credentials

**Verify:** Run `npx next dev`, submit the contact form, confirm email arrives at `support@operationhealingwaters.org`

---

## Blocked — Needs Eric

*(nothing currently blocked)*

## Not Blocked — Handle in CLI

- **Favicon** — use `/public/images/logo.jpg` (already exists — same logo as top of SideNav). Add to `app/layout.tsx` metadata:
  ```ts
  icons: { icon: '/images/logo.jpg' }
  ```
- **PartnerBanner** — no logo needed. Component is text-only ("Proud partner of BayouCharity.org" + link button). No image file required.

---

## STOP Rules Active

1. Push + verify CF Pages deploy before calling session done
2. Never commit docs/, CLAUDE.md, README.md, AGENTS.md to GitHub
3. Never re-declare global singletons
4. Bust service worker cache on every deploy
5. No puzzle-piece shapes — organic curves only
