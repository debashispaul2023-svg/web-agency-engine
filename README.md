# Web Agency Engine

Pipeline for local-service sites.

1. `python scraper.py https://example.com --out data.json`
2. `python build.py`
3. Open `dist/index.html`

## Design contract (do not regress)

Old demos failed because they looked generated. New builds must not use:

- black glass pages (`#0a0a0a` + blur cards)
- floating gradient blobs
- liquid-glass nav / glow buttons
- fake 3D orbs, forest plates, neon purple
- invented services, phones, or testimonials
- Inter + italic serif “AI agency” costume

Default look: paper background, ink type, one solid CTA, real scrape data only.

Preview data is All American Plumbing (Tulsa) so every field can be checked.
Sell only after the template is approved.
