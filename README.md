# Tea-shirts

A full-stack e-commerce portfolio project built with Next.js 16. Browse and purchase tea-themed apparel and accessories, with a canvas-based product customiser that lets you upload a photo of your tea and place it on any product.

**Live demo:** [teakauppa.vercel.app](https://teakauppa.vercel.app)

---

## Features

- **Product customiser** — upload a photo, drag and resize it on the product canvas, download a preview PNG (Fabric.js)
- **Stripe Checkout** — full payment flow with server-side price validation and payment status verification
- **Persistent cart** — variant-aware (product × size × colour), survives page refresh (Zustand + localStorage)
- **Scroll animations** — Framer Motion entrance animations on product cards and section headings
- **SEO** — per-product `generateMetadata`, OpenGraph, Twitter cards, JSON-LD structured data, auto-generated sitemap and robots.txt
- **Accessibility** — ARIA roles, keyboard navigation, live regions, focus management — no UI component library

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4 |
| Animations | Framer Motion v12 |
| Canvas editor | Fabric.js v7 |
| State | Zustand v5 (with persist) |
| Payments | Stripe Checkout |
| Deployment | Vercel |

---

## Getting started

### Prerequisites

- Node.js 18+
- A [Stripe](https://stripe.com) account (free, test mode is fine)

### 1. Clone and install

```bash
git clone https://github.com/HakalahtiAtte/teakauppa.git
cd teakauppa
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

| Variable | Description |
|---|---|
| `STRIPE_SECRET_KEY` | Stripe secret key (`sk_test_...` for local dev) |
| `NEXT_PUBLIC_SITE_URL` | Full URL of the site (`http://localhost:3000` locally) |

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Test a payment

Use Stripe's test card `4242 4242 4242 4242` with any future expiry and any CVC.

---

## Project structure

```
app/
  api/checkout/        # POST: create Stripe session | GET: verify payment
  cart/                # Cart page
  shop/[slug]/         # Product detail page (SSG)
  shop/                # Shop listing page
  success/             # Order confirmation
components/
  MockupEditor.jsx     # Fabric.js canvas customiser
  CartToast.jsx        # Add-to-cart notification
  StickyCartBar.jsx    # Sticky bottom bar (visible when ATC button scrolls out)
  SizeGuideModal.jsx   # Size guide dialog
  YouMightAlsoLike.jsx # Related products
  ProductGrid.jsx      # Product grid with skeleton loading
  ProductCard.jsx      # Individual product card with scroll animation
lib/
  products.js          # Product catalogue and data helpers
store/
  cartStore.js         # Zustand cart store
```

---

## Security notes

- Prices are validated server-side on every checkout request — the client only sends product IDs
- `payment_status` is verified before displaying order confirmation or clearing the cart
- Stripe redirect URLs use `NEXT_PUBLIC_SITE_URL` (not the `Origin` request header)
- File uploads in the canvas editor are MIME-checked and capped at 10 MB
