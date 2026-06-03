# ShopVibe | Premium E-Commerce Application

ShopVibe is a high-performance, responsive e-commerce web application built with modern Next.js. It features a premium dark-themed design system, smooth keyframe animations, robust client-side state caching, and automated session management.

---

## 🛠️ Tech Stack

- **Framework**: Next.js (latest / App Router)
- **Library**: React 19 & TypeScript
- **Styling**: Tailwind CSS v4 (inline theme parameters & transitions)
- **State Management**: TanStack React Query v5 (client-side caching)
- **HTTP Client**: Axios (pre-configured with auto-refresh response interceptors)

---

## 📦 Project Structure

```
e-commerce-task/
├── app/                  # App router pages & API proxy routes
│   ├── (auth)/           # Login and Register pages
│   ├── api/              # Secure auth refresh & credentials proxy
│   └── products/         # Catalog grid and Product details [id]/
├── components/           # Reusable React components
│   ├── layout/           # Navbar, DesktopNav, MobileMenu
│   ├── products/         # ProductCard, ImageGallery, Search, Filters
│   └── ui/               # Shared interface components (StarRating, etc.)
├── context/              # React AuthContext state provider
├── hooks/                # Custom hooks (useProducts, useDebounce)
├── lib/                  # Axios API client setup & closures
├── providers/            # TanStack Query Client wrapper
└── types/                # Strict TypeScript interface declarations
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 🔗 Live Demo
- **Live Demo**: [https://shopvibe-ecommerce.vercel.app](https://shopvibe-ecommerce.vercel.app)

---

## 📈 Evaluation Criteria Realization

### 1. Code Quality
- **Type-Safety**: Complete end-to-end data typing mapped through `@/types`.
- **Silent Authentication**: Session token renewals via Axios response interceptors handle `401 Unauthorized` states silently.
- **Hook Extraction**: Throttled filters and pagination calls decoupled into `@/hooks`.

### 2. Component Architecture
- **Single Responsibility**: Navbar refactored from a single file into a controller (`Navbar.tsx`) and layout sub-components (`DesktopNav`, `MobileMenu`).
- **Data Flow**: One-way clean prop interfaces with no side-effects in layout blocks.

### 3. Responsiveness
- **Layout Grids**: Standardized breakpoints (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`) resize catalog layouts smoothly.
- **Mobile Menu**: Outside clicks are captured by window event listeners to automatically close the mobile navigation drawer.
- **Category Filter**: Supports touch horizontal scroll views (`overflow-x-auto`) to fit small viewports without vertical distortion.

### 4. Performance
- **LCP Optimization**: Preloads above-the-fold catalog images (`priority={index < 4}`) with high fetch priority, removing lazy-load delays.
- **Keystroke Throttling**: Search inputs are debounced to 300ms, minimizing redundant API requests.
- **Smart Rendering**: Combines SEO-friendly Server-Side rendering for product details with rapid Client-Side client caching.

### 5. UX/UI Implementation
- **Premium Aesthetics**: Styled with deep dark-mode mesh gradients, custom scrollbars, and glassmorphism elements.
- **Feedback Loops**: Smooth scale transformations (`group-hover:scale-110`), glow-ring borders, and skeleton loaders.
