# Hartzheim Performance — hartzheimperformance.com

Single-page static site for Jack Hartzheim's personal training business.

## Files
- `index.html` — page structure & content
- `styles.css` — brand styling (black/white/red, Anton display font)
- `script.js` — nav, scroll reveal, contact form (mailto fallback)
- `assets/logo.svg` — placeholder logo (replace with the real logo art)
- `assets/favicon.svg` — favicon
- `assets/coach-placeholder.svg` — replace with Jack's photo
- `CNAME` — set to `hartzheimperformance.com` for GitHub Pages
- `robots.txt`, `sitemap.xml` — SEO

## Local preview
```bash
cd /Users/mattsullivan/HartzheimWebsite
python3 -m http.server 8000
# open http://localhost:8000
```

## Tying the site to hartzheimperformance.com

You have **3 easy options** — all free or near-free:

### Option A — Cloudflare Pages (recommended, fastest, free)
1. Push this folder to a GitHub repo (e.g. `hartzheim-site`).
2. Cloudflare → **Pages** → "Create project" → connect the repo. No build command, output dir = `/`.
3. Pages → **Custom domains** → add `hartzheimperformance.com` and `www.hartzheimperformance.com`.
4. At the registrar where Jack bought the domain, point the nameservers to Cloudflare (CF gives you the exact NS records). Done — automatic HTTPS, global CDN.

### Option B — GitHub Pages (also free)
1. Push this folder to a repo. Settings → Pages → Branch: `main`, root folder.
2. The `CNAME` file is already in this repo so GitHub will serve `hartzheimperformance.com`.
3. At the registrar, set DNS:
   - `A`     `@`   →  `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` `www` →  `<your-github-username>.github.io.`
4. In GitHub Pages settings, check "Enforce HTTPS".

### Option C — Netlify (drag & drop, free)
1. netlify.com → drag this folder onto the dashboard. Site is live on a `*.netlify.app` URL.
2. Domain settings → "Add custom domain" → `hartzheimperformance.com`.
3. At the registrar, point DNS to Netlify per their instructions (or change nameservers).

## Contact form
The form submits via [FormSubmit](https://formsubmit.co) AJAX to `jackhcpt@hartzheimperformance.com` (see the `action` on `<form id="consultForm">` in `index.html`). The first real submission triggers a one-time FormSubmit confirmation email — click the link in it to activate delivery.

## Email
Set up `jackhcpt@hartzheimperformance.com` either:
- Through the domain registrar's email forwarding (free → forwards to Jack's gmail), or
- Google Workspace ($6/mo) for a real mailbox.

## To-do before launch
- [ ] Replace the placeholder Stripe link in `index.html` (`pricing__pay`, currently `buy.stripe.com/REPLACE_WITH_YOUR_STRIPE_LINK`) with the live payment/checkout URL
- [ ] Add real social links (Instagram, etc.) in the footer
- [ ] Optionally add an `og-image.jpg` (1200×630) for link previews
