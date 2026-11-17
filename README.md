# Aarovia Group — Next.js rebuild

This is your original site (aaroviagroup.com) rebuilt on Next.js 14, with a
database-backed admin panel added. All original CSS/JS/images/videos are kept
as-is under `public/`, so the front-end looks and behaves exactly like the
live site.

## What's included

- All 17 original pages, converted to Next.js routes (home, about, services,
  projects, contact, blog, faqs, help, privacy-policy, terms-conditions, and
  the 6 property category pages).
- A working contact form that submits enquiries to Aarovia CRM and also saves
  a local **Lead** record when the database is available.
- A dynamic **Blog** (list + individual post pages) pulled from the database.
- An admin panel at `/admin` with login (email + password, roles) and full
  create/edit/delete for:
  - Featured Projects and Properties in separate admin areas
  - Blog Posts, with selectable post types and an internal 100% SEO checklist required for publishing
  - Leads (view + change status + delete)
  - Testimonials
- An admin page editor for custom pages and homepage hero/about content, plus
  image uploads for page sections, properties, blog covers, testimonials, and
  site branding. Named projects power Featured Projects; category pages remain
  distinct and are not listed as named projects.

## 1. Install dependencies

```bash
npm install
```

## 2. Set up the database

Create a free Postgres project at [supabase.com](https://supabase.com) (or
use Vercel Postgres). Copy `.env.example` to `.env` and fill in:

- `DATABASE_URL` — the pooled connection string (port 6543)
- `DIRECT_URL` — the direct connection string (port 5432)
- `AUTH_SECRET` — generate with `openssl rand -base64 32`
- `CRM_LEADS_API_URL` — optional; defaults to Aarovia's public leads endpoint.
- `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` — your first admin login

Then push the schema and create your admin user:

```bash
npm run db:push
npm run db:seed
```

## 3. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000` for the site, `http://localhost:3000/admin/login`
for the admin panel (use the email/password from `.env`).

Project cover and gallery uploads use Vercel Blob so they persist across
deployments. Create a Blob store in the Vercel project and connect it to the
project for Production and Preview; this provides the `BLOB_READ_WRITE_TOKEN`
environment variable needed for uploads. For local uploads, add the token to
your local `.env`. Other admin media uploads still use `public/uploads` and are
intended for local development or persistent servers, not ephemeral serverless
deployments.

## 4. Deploy to Vercel

Easiest path (recommended): push this project to a GitHub repo, then import
it at [vercel.com/new](https://vercel.com/new) and connect that repo. Vercel
will auto-detect Next.js.

In the Vercel project's **Settings → Environment Variables**, add the same
variables from your `.env` file (`DATABASE_URL`, `DIRECT_URL`, `AUTH_SECRET`,
optional `CRM_LEADS_API_URL`, plus the seed vars if you want to re-run the seed from a
Vercel deployment shell — otherwise those two are only needed locally).

Alternative (using the Vercel CLI with your token, no GitHub required):

```bash
npm i -g vercel
vercel login --token YOUR_VERCEL_TOKEN
vercel link
vercel env add DATABASE_URL
vercel env add DIRECT_URL
vercel env add AUTH_SECRET
vercel --prod
```

## 5. Point your domain

In the Vercel project → Settings → Domains, add `www.aaroviagroup.com` (and
`aaroviagroup.com`), then update your DNS at your domain registrar with the
records Vercel shows you (usually a CNAME for `www` and an A record for the
apex domain).

## Notes on fidelity

- Every page uses the **exact original** CSS, JS, images and videos — nothing
  was rebuilt from scratch, so animations (WOW.js, GSAP, Isotope, Swiper,
  magic cursor) behave identically to the live site.
- Navigation between pages uses full page loads (plain links, not Next.js's
  client-side router). This was a deliberate choice: the theme's jQuery/GSAP
  scripts expect a fresh page load to re-initialize correctly, and this
  guarantees the animations behave exactly like the current live site.
- The category pages (luxury-apartments, villa-plots, etc.) and the
  `/projects` page are the exact static copies from your live site, unchanged.

## New: live property listings

Since the admin panel manages individual properties (with price, bedrooms,
amenities, etc.), two new pages were added that didn't exist on the original
site, styled to match the existing theme:

Named projects such as Premia, Lake Estate, and Veda Vilasa are managed in
**Admin → Featured Projects**, separately from category pages such as Luxury
Apartments in **Admin → Properties**. Published projects marked Featured feed
both the homepage Featured Projects section and the public `/projects` page.
Their names, links, images, logos, categories, locations, and display order
also feed the project-logo carousel.

- `/properties` — a filterable grid of every published property, using the
  theme's existing "service card" styling.
- `/properties/[slug]` — an individual property detail page, styled using
  the theme's existing "project sidebar" layout (the same one used on the
  luxury-apartments/villa-plots/etc. pages).

A "LISTINGS" link was added to the main nav pointing at `/properties` so
visitors can find it. Anything you add in **Admin → Properties** shows up
there immediately — nothing else to wire up.
