# Ceylon Aquatic Plants (Pvt) Ltd — Official Production Website

A world-class, premium aquarium plants showcase website and administrative management system developed for **Ceylon Aquatic Plants (Pvt) Ltd**, an international live aquatic flora exporter based in Sri Lanka.

---

## 1. Project Overview & Scope

- **Official Client:** Ceylon Aquatic Plants (Pvt) Ltd (Ref: Mr. Alex Woelfel / Lanka Pixel Creations (Pvt) Ltd)
- **Visual Reference Inspiration:** [aquafleur.com](https://aquafleur.com/) (botanical showcase, structure, visual storytelling)
- **Classification:** Premium Informational Showcase & Business Online Showroom.
- **Strict Limitation:** **No e-commerce, shopping carts, online checkout, payment gateways, or customer registration.** Visitors view the catalogue and contact the company directly via email, telephone, or WhatsApp.
- **Administration Area:** Secure, private administrator dashboard (`/admin`) with Supabase authentication, allowing full management of plants, categories, gallery albums/images, videos, PDF documents, and website content without requiring developer intervention.

---

## 2. Technology Stack

- **Frontend Framework:** Next.js (App Router, Server Components & Client Interactivity)
- **Language:** TypeScript with strict type checking
- **Styling:** Tailwind CSS with custom botanical design system
- **Icons:** Lucide Icons
- **Database & Authentication:** Supabase PostgreSQL with Row Level Security (RLS) & Supabase Storage
- **Security:** CSRF protection, IP-based sliding window rate limiting, honeypot bot traps, XSS sanitization, and strict security headers

---

## 3. Brand Identity & Design System

The visual identity uses a deep, luxurious aquatic botanical palette:

| Token | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Primary Background** | `#102D24` | Deep forest aquatic green for header, hero, and dark sections |
| **Secondary Background** | `#174C3B` | Rich mid-tone botanical green for cards, dropdowns, and borders |
| **Primary Brand Green** | `#247A63` | Vibrant accent emerald for badges, active states, and focal points |
| **Dark Surface** | `#0B211B` | Ultra-deep substrate black-green for footer and sidebar |
| **Accent Gold / Yellow** | `#E3B341` | Warm golden yellow for badges, ratings, highlights, and primary CTA accents |
| **Main Light Background** | `#F5F4ED` | Warm biological off-white/cream for readable plant catalogue grids and text |
| **Pure White** | `#FFFFFF` | Plant card backgrounds, crisp text, and contrast cards |
| **Primary Text (Dark)** | `#FFFFFF` | Headings and text on deep green backgrounds |
| **Secondary Text** | `#CBD5CE` | Subtitles, muted copy, and metadata |
| **Borders** | `#29483C` | Subtle dividers and card outlines |

---

## 4. Website Navigation Structure

The website implements the required navigation:

1. **Home** (`/`)
2. **Aquarium Plants** (`/aquarium-plants`) with dropdown menu:
   - Plants Bunch (`/aquarium-plants/plants-bunch`)
   - Potted Plants (`/aquarium-plants/potted-plants`)
   - Garden-Pond Plants (`/aquarium-plants/garden-pond-plants`)
   - Terrarium Plants (`/aquarium-plants/terrarium-plants`)
   - Tissue Culture (`/aquarium-plants/tissue-culture`)
   - Other Products (`/aquarium-plants/other-products`)
3. **Gallery** (`/gallery`) &mdash; Categorized albums with full-screen lightbox
4. **Video** (`/video`) &mdash; Responsive player for nursery documentaries & tutorials
5. **About** (`/about`) &mdash; Company background, vision, mission, core values & PDF downloads
6. **Contact** (`/contact`) &mdash; Direct phone, WhatsApp, email, map, and inquiry form

---

## 5. Administrator Dashboard (`/admin`)

Access the management dashboard at `/admin/login`.

### Pre-Configured Administrator Credentials (Local Standalone):
- **Email:** `admin@ceylonaquaticplants.com`
- **Password:** `CeylonAqua2026!`

*(When connecting remote Supabase Auth, you can invite your administrator email directly through the Supabase Authentication Dashboard.)*

### Dashboard Capabilities:
1. **Overview:** Real-time metrics for Total Plants, Published Plants, Drafts, Categories, Gallery Photos, and Inquiries.
2. **Plant Management:** Full CRUD, multi-image upload, botanical taxonomy, placement, light, CO2, growth rate, and SEO metadata.
3. **Category Management:** Full CRUD, order management, banner upload, descriptions, and accidental deletion safeguards.
4. **Gallery Management:** Image uploads, album groupings, captions, and publishing toggles.
5. **Video Management:** YouTube embed parsing, thumbnail configuration, and homepage featured selection.
6. **Document Management:** Official PDF catalogue and acclimatization guide uploads.
7. **Homepage Content:** Live editing of hero headlines, subtitles, and why-choose-us pillars.
8. **About Page Content:** Live editing of corporate vision, mission statement, and nursery narrative.
9. **Contact & Inquiries:** Manage public coordinates, social links, and review customer inquiry submissions.
10. **SEO Management:** Sitemap inspection, robots.txt status, and keyword mappings.
11. **Security & Account:** Session audit, security review checklist, and password updates.

---

## 6. Database & Supabase Setup

The database schema and seed data are stored in version-controlled SQL files:

- `supabase/schema.sql`: Table definitions, foreign keys, indexes, and Row Level Security policies.
- `supabase/seed.sql`: Default 6 categories, botanical plant specimens, albums, videos, and settings.

### One-Click Supabase Setup:
1. Create a new project in [Supabase](https://supabase.com).
2. Navigate to the **SQL Editor** in your Supabase project dashboard.
3. Paste the contents of `supabase/schema.sql` and click **Run**.
4. Paste the contents of `supabase/seed.sql` and click **Run**.
5. Create three public storage buckets in Supabase Storage:
   - `plants`
   - `gallery`
   - `documents`
6. Copy your project URL and anon public key into `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here
   ```

---

## 7. Local Development & Production Build

### Install dependencies:
```bash
npm install
```

### Run local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the public website, or [http://localhost:3000/admin](http://localhost:3000/admin) to view the administrator dashboard.

### Compile production build:
```bash
npm run build
```

### Start production server:
```bash
npm run start
```

---

## 8. Technical SEO & Schema.org Structured Data

- **XML Sitemap:** Available dynamically at `/sitemap.xml`.
- **Robots Directives:** Available at `/robots.txt` (disallowing `/admin` routes).
- **Canonical URLs:** Configured on every public page and plant detail page.
- **Structured Data:**
  - `Organization` & `WebSite` JSON-LD on layout.
  - `BreadcrumbList` on category and plant pages.
  - `Product` on plant detail pages with authentic botanical specs.
  - `VideoObject` on video showcase page.

---

## 9. Security Controls & Checklist

- [x] **No Public Customer Registration:** Admin only.
- [x] **Server-Side Authorization:** Admin routes and API endpoints verify authenticated sessions.
- [x] **Row Level Security (RLS):** Public access restricted to `is_published = true`.
- [x] **Anti-Spam & Rate Limiting:** Honeypot fields and sliding-window IP limits on inquiry form.
- [x] **File Upload Security:** Strict MIME type validation, file size restrictions, and unique UUID file renaming.
- [x] **Security Headers:** Strict Content Security Policy (CSP), HSTS, X-Content-Type-Options, X-Frame-Options: SAMEORIGIN.
- [x] **Zero Plaintext Secrets Committed:** All credentials managed through environment variables with `.env.example` provided.
