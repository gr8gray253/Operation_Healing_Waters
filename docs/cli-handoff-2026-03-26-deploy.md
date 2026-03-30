# CLI Handoff — OHW Deploy

> Last updated: 2026-03-29
> Cowork sessions completed: nav consolidation, SocialFeed rewrite, Contact solid bg, contrast sweep, WaveDivider finalized, codebase cleanup, git history scrub, documentation refresh.
>
> Git repo is clean: single commit on `main` at https://github.com/gr8gray253/Operation_Healing_Waters.git
> TypeScript compiles clean. WaveDivider is done — do not iterate further.

---

## Task 1: EXIF Rotation — ALL Photos

**Priority:** P0 — every photo except gallery-5.jpg displays sideways

**What:** gallery-1.jpg, gallery-2.jpg, gallery-3.jpg, gallery-4.jpg, hero.jpg, and all `Derrious (owner) fish *.jpeg` files are stored landscape with EXIF rotation flags. The pixel data needs to be physically rotated.

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

## Task 3: Full Build

```bash
npx next build
```

**Verify:**
- Build completes with `output: 'export'`
- `out/` directory created
- `out/index.html` exists
- No TypeScript errors (already confirmed clean)

**Note:** `next.config.mjs` is already the correct filename. If build fails with config resolution errors, verify no `next.config.ts` or `next.config.js` exists alongside it.

---

## Task 4: CF Pages Deploy

**Option A — GitHub integration (recommended):**
1. In CF Dashboard → Pages → Create a project → Connect to Git
2. Select `gr8gray253/Operation_Healing_Waters` repo
3. Build settings: command = `npm run build`, output dir = `out`, env `NODE_VERSION=20`
4. Deploy

**Option B — Direct upload via Wrangler:**
```bash
npx wrangler pages project create operation-healing-waters
npx wrangler pages deploy out/ --project-name=operation-healing-waters
```

**Verify:** Check the `*.pages.dev` URL in a browser.

---

## Task 5: DNS Routing (Squarespace → CF Pages)

See `docs/deployment-dns-plan.md` for full instructions.

**Summary:**
1. Add custom domain in CF Pages dashboard
2. In Squarespace DNS, add CNAME record pointing to `<project>.pages.dev`
3. Wait for DNS propagation (up to 48hrs, usually minutes)
4. Verify HTTPS works on custom domain

---

## Task 6: Post-Deploy Verification

- [ ] All photos display upright (not sideways)
- [ ] Wave dividers animate between sections
- [ ] SideNav works on desktop (left pill) and mobile (bottom bar)
- [ ] No top navbar visible
- [ ] Contact form visible with readable text on solid navy
- [ ] Gallery shows 5 photos in portrait aspect
- [ ] Social section shows Instagram embed + inline TikTok link
- [ ] Bayou Charity link only in footer (small text)
- [ ] Service worker cache busted (hard refresh or incognito)
- [ ] Custom domain resolves with HTTPS
- [ ] www redirects properly

---

## Task 7: Verify EmailJS

**Priority:** P1 — `.env.local` should be populated and ready.

**Previously set up (Cowork session):**
- Service connected: Gmail → `support@operationhealingwaters.org` (Service ID: `service_4g2p5ae`)
- Template created: "Contact Us" (Template ID: `template_dypb96q`) — all fields mapped
- `.env.local` populated with all 3 credentials

**Verify:** Run `npx next dev`, submit the contact form, confirm email arrives.

**If credentials are missing:** Get from Captain Derrious or recreate via emailjs.com dashboard.

---

## Task 8: Commit Deploy Changes

After tasks 1-3 modify files (EXIF fix, compression, any config changes):

```bash
git add public/images/ next.config.mjs
git commit -m "fix: EXIF rotation + image compression for deploy"
git push origin main
```

**STOP rules:**
- Never `git add .` or `git add -A`
- Never commit CLAUDE.md, AGENTS.md, .claude/, or .env files
- README.md and docs/ ARE tracked and can be committed

---

## Not Blocked — Handle in CLI

- **Favicon** — use `/public/images/logo.jpg`. Add to `app/layout.tsx` metadata:
  ```ts
  icons: { icon: '/images/logo.jpg' }
  ```
- **Accessibility polish** — reduced-motion fixes (9 components), gallery lightbox ARIA/focus trap, contact form fieldset. See CLAUDE.md and vault note for full list.

---

## STOP Rules Active

1. Push + verify CF Pages deploy before calling session done
2. Never commit CLAUDE.md, AGENTS.md, .claude/, or .env files
3. Never re-declare global singletons
4. Bust service worker cache on every deploy
5. No puzzle-piece shapes — organic curves only
6. Commit specific files only — never `git add .`
