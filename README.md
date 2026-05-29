# TravelAxis BD — Frontend

The frontend for TravelAxis BD, a full-stack tour booking platform built for Bangladesh. Built with Next.js 16 and React 19, it handles everything from browsing tours to completing payments and viewing invoices — with a clean, responsive UI that works across devices.

🔗 Live: https://frontend-travel-axis.vercel.app  
🔗 Backend Repo: https://github.com/TusharChow20/travelAxis_backend_tour_web

---

## What This App Does

Users can browse tours across Bangladesh, filter by division, tour type, and price, and book any tour they like. After booking, they're redirected to SSLCommerz to complete payment securely. Once paid, they get an email with a PDF invoice and can track everything from their personal dashboard.

Admins get a separate dashboard to manage tours, users, bookings, and view platform statistics with charts.

---

## Features

**Auth**
- Email/password login with OTP email verification
- Google OAuth via Passport.js
- JWT stored in httpOnly cookies (no localStorage)
- Silent token refresh — stays logged in across browser restarts
- Forgot password and reset password flow

**Public**
- Hero slider with animated transitions
- Tour listing with search, filter by division/type/price range
- Individual tour detail page with booking
- About, Contact, FAQ, Privacy Policy, Terms, Cancellation, Payment Methods pages

**User Dashboard**
- View and manage bookings
- Payment history with invoice download
- Profile management
- Change password

**Admin Dashboard**
- Manage tours (create, edit, delete with image upload)
- Manage users and roles
- View and manage all bookings
- Stats page with monthly revenue chart, booking status, payment status, and tours by division

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| State Management | Redux Toolkit |
| Styling | Tailwind CSS v4, shadcn/ui |
| Forms | React Hook Form + Zod |
| HTTP Client | Axios (with interceptor for token refresh) |
| Icons | Lucide React, React Icons |
| Charts | Recharts |
| Theme | next-themes (dark/light mode) |

---

## Project Structure
src/
├── app/
│   ├── (auth)/          # login, register, otp, forgot/reset password
│   ├── (dashboard)/     # admin and user dashboards
│   └── (public)/        # home, tours, booking, static pages
├── components/
│   ├── modules/         # feature-specific components
│   ├── shared/          # Navbar, Footer, AuthProvider, Providers
│   └── ui/              # shadcn components
├── redux/               # store, slices (auth, booking, tour)
├── lib/                 # axios instance
└── hooks/               # useTheme

---

## Getting Started

### Prerequisites
- Node.js 18+
- Backend running locally or deployed

### Installation

```bash
git clone https://github.com/TusharChow20/travel-axis-frontend
cd travel-axis-frontend
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://backend-travel-axis.vercel.app/api/v1
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## Auth Flow

1. User logs in → backend sets `accessToken` (2 days) and `refreshToken` (30 days) as httpOnly cookies
2. On every page load, `AuthProvider` calls `/user/me` to restore session
3. If access token expires mid-session, the Axios interceptor silently calls `/auth/refresh-token` and retries the original request
4. If refresh also fails, user is redirected to login only if on a protected route

---

## Demo

| Role | Email | Password |
|---|---|---|
| User | demo@travelaxis.com | Demo@1234 |

---

## Developer

**Tushar Chowdhury**  
🔗 [Portfolio](https://tushar-chowdhury-protfolio.vercel.app) · [GitHub](https://github.com/TusharChow20) · [LinkedIn](https://www.linkedin.com/in/tusharchowdhury20211/)---

## Getting Started

### Prerequisites
- Node.js 18+
- Backend running locally or deployed

### Installation

```bash
git clone https://github.com/TusharChow20/travel-axis-frontend
cd travel-axis-frontend
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://backend-travel-axis.vercel.app/api/v1
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## Auth Flow

1. User logs in → backend sets `accessToken` (2 days) and `refreshToken` (30 days) as httpOnly cookies
2. On every page load, `AuthProvider` calls `/user/me` to restore session
3. If access token expires mid-session, the Axios interceptor silently calls `/auth/refresh-token` and retries the original request
4. If refresh also fails, user is redirected to login only if on a protected route

---

## Demo

| Role | Email | Password |
|---|---|---|
| User | demo@travelaxis.com | Demo@1234 |

---

## Developer

**Tushar Chowdhury**  
🔗 [Portfolio](https://tushar-chowdhury-protfolio.vercel.app) · [GitHub](https://github.com/TusharChow20) · [LinkedIn](https://www.linkedin.com/in/tusharchowdhury20211/)