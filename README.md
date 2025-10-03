
# Canadian Cardinal — Zero‑cost Catalog Website

A minimalist, catalog-only website for an eyewear brand. No subscriptions, no backend, no build step.
- Host free on **GitHub Pages** (or Cloudflare Pages / Netlify / Vercel).
- Single HTML file + Tailwind via CDN + tiny JS.
- Filters, search, and WhatsApp/Email "Request Quote" out of the box.

## 1) Quick start (GitHub Pages — no code tools)
1. Create a GitHub account at https://github.com (free).
2. Click **New repository** → name it e.g. `canadiancardinal-site` → keep it **Public** → Create.
3. Drag & drop all files from this folder into the repository root (or click **Add file → Upload files**).
4. Go to **Settings → Pages** (left sidebar):
   - Source: **Deploy from a branch**
   - Branch: **main** / **root** (/) → **Save**
5. Wait ~30–60 seconds. Your site will be live at:
   `https://YOUR-USERNAME.github.io/canadiancardinal-site/`

## 2) Customize
Open `assets/js/app.js` and edit:
- `CONFIG.brandName`, `CONFIG.email`, `CONFIG.whatsapp` (without +, e.g., "14165551234").
- `CONFIG.catalogUrl` if you replace the PDF in `/catalogs` folder.
Add your products by editing the `PRODUCTS` array (copy an existing object).

Replace placeholder images in `assets/images/placeholder.svg` with your product shots:
- Add files to `assets/images/` and point each product's `images` array to them.

## 3) Optional: Analytics (free)
- Create a Google Analytics property and paste the gtag `<script>` in `index.html` before `</head>`.

## 4) Optional: Contact form
This template uses WhatsApp/mailto for inquiries. If you need a form:
- Use **Google Forms** (free), then link or embed it in the Contact section.

## 5) Cloudflare Pages (alternative host, free)
- Create a Cloudflare account → Pages → Create project → **Upload** (direct upload without Git).
- Drop this folder; set **Build command: none**; **Build output directory: /**.
- Deploy. You’ll get a free `*.pages.dev` URL.

## Notes
- Tailwind is loaded via CDN; no build/pipeline required.
- Everything is static; no backend or database involved.
- SEO basics included (title, meta description, OpenGraph, JSON‑LD Organization).
