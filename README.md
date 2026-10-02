# Blessenzo Holdings – ICT E-commerce Website

Full-featured Next.js 15 + TypeScript + Tailwind site for Blessenzo Holdings (Pty) Ltd.

## Features
- Product catalogue with categories (aligned to Tarsus / Pinnacle / Axiz / Mustek brands)
- Working shopping cart (localStorage) + Checkout flow
- Request Quote + Contact forms
- Floating WhatsApp button
- About (Mission / Vision / Values / B-BBEE Level 1)
- Services page (ICT only)
- Admin / Import guidance page for updating stock from distributor portals
- Responsive corporate design

## Quick start

```bash
cd blessenzo-shop
npm install
npm run dev
```

Open http://localhost:3000

## Deploy (Vercel – free)

1. Push folder to GitHub
2. Import at vercel.com
3. Add your custom domain in project settings

## Updating products / stock

Export from Tarsus (or other) partner portal → update `src/data/products.ts` → redeploy.
See `/admin` page on the site for the recommended process.

## Stripe (optional next step)

The checkout currently creates an order request. To enable live card payments:
1. Create a Stripe account
2. Add `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to environment variables
3. We can wire Stripe Checkout or Payment Element in a follow-up.

## Company data

All details live in `src/data/company.ts` (contacts, banking, mission, values, partners).

## Quotes, Proforma & Tax Invoice PDFs

1. Add products to the cart
2. Open **/documents**
3. Choose **Quotation**, **Pro-forma Invoice** or **Tax Invoice**
4. Fill in customer details
5. **Download PDF** (requires `jspdf` + `jspdf-autotable`) or **Print / Save as PDF**

```bash
npm install jspdf jspdf-autotable
```

Documents include your banking details, payment terms, VAT split, and auto document numbers (Q-/PF-/INV-YYYY-####).

## PayFast

Configure in `src/data/company.ts` → `payfast`:

- `sandbox: true` uses PayFast test credentials
- For live: set `sandbox: false` and your Merchant ID, Key, Passphrase

Card payments apply the 2.5% surcharge from your invoice terms.
