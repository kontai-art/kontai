# Kontai — Showrooms & Experience Spaces

Static one-page site for `kontai.io` (Infomaniak hosting + Git deployment).

## Tech
No build tools required. Pure HTML/CSS/JS.
- index.html
- styles.css
- app.js
- assets/img/* (PNG fallbacks; optional AVIF/WebP sources)

## Local preview
Just open `index.html` in a browser (or use any static server):
```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## GitHub setup
```bash
git init
git add .
git commit -m "Initial commit: Kontai showroom"
git branch -M main
git remote add origin https://github.com/<your-org>/kontai-showroom.git
git push -u origin main
```

## Infomaniak Git deployment
1. Go to Infomaniak Admin → **Web hosting** → your site → **Deployments** → **Add a deployment**.
2. Choose **From Git repository** → connect GitHub → select repo `kontai-showroom`, branch `main`.
3. **Deployment path**: `public_html` (or subfolder `public_html/showroom` if you want it under `kontai.io/showroom/`).
4. Save → **Deploy**.

> Every `git push` to `main` will re-deploy automatically.

## Domain (kontai.io)
- If this hosting is already attached to `kontai.io`, no DNS changes needed.
- If not: Infomaniak **Domains** → attach `kontai.io` to this hosting.

## Images
Place your PNGs under `assets/img/` with these names:
- hero-1920.png
- case-energy-1600.png
- case-sea-1600.png
- case-currents-1600.png
- case-holo-1600.png
- case-sustain-1600.png
- case-lab-1600.png
- og-showroom-1200x630.jpg

Optional high-efficiency sources:
- Add `.avif` and `.webp` with the same base names; `<picture>` will pick them automatically.

## SEO
- Update OG image when final hero is ready (`<meta property="og:image" ...>`).
- `robots.txt` and `sitemap.xml` included.

## Privacy & Analytics
- `app.js` contains a `WEBHOOK_URL` for optional event pings (n8n). Leave `null` to disable.
- All metrics described on page are privacy-first by design.

## Maintenance
- Edit files → `git commit` → `git push main` → Infomaniak deploys.
- No build pipeline; super low-maintenance.
