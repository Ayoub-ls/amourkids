# Shared order form + Supabase dashboard

## 1. Install

```
npm install @supabase/supabase-js
```

Copy `shared/` and `dashboard/` into your `src/` folder, and `.env.example`
into your project root (then copy it to `.env` and fill in your real values —
Supabase Studio > Project Settings > API).

## 2. Database

Open Supabase Studio > SQL Editor > paste `dashboard/schema.sql` > Run.
This creates the `orders` table, locks it down with row-level security
(public can only insert, only logged-in dashboard users can read/update),
and turns on Realtime for it.

Then create your dashboard login: Authentication > Users > Add user
(email + password). There's no public sign-up page on purpose — only
users you create by hand in Supabase can log in.

## 3. Replace the inline order form in every cleanbook.jsx / engbook.jsx

Each product page already defines its own `PRICE` and `OFFERS`. Keep those
(they're your copy), but swap the `<form>...</form>` block for `<OrderForm />`.

Before (inside cleanbook.jsx, simplified):
```jsx
<form onSubmit={submit} noValidate>
  {/* ~120 lines of inputs, validation, submit handler */}
</form>
```

After:
```jsx
import OrderForm from "../../../shared/OrderForm"; // adjust the relative path

// delete: useState for form/errors/sending/done, the submit() function,
// and the whole <form>...</form> JSX block.

<OrderForm
  product="phone-cleaning-kit"
  variant="man-baf"        // <-- change per avatar folder: man-connector, man-durtyenv, woman-connectbaf, etc.
  offers={OFFERS}
  price={PRICE}
/>
```

You can now also delete the `endpoint` prop and the local `WILAYAS` array/
`submit` function from every cleanbook.jsx / engbook.jsx — `OrderForm`
owns all of that now, and it writes straight to Supabase instead of a
webhook. Do this one avatar folder at a time and check the page still
renders before moving to the next.

For `engbook.jsx`, do the same with `product="english-words-book"` and
`variant="engbook"`.

## 4. Wire the dashboard routes into App.jsx

```jsx
import { AuthProvider } from "./dashboard/AuthContext";
import ProtectedRoute from "./dashboard/ProtectedRoute";
import DashboardLayout from "./dashboard/DashboardLayout";
import Login from "./dashboard/Login";
import OrdersPage from "./dashboard/OrdersPage";

// inside <Routes>, alongside your existing landing-page routes:
<Route path="/dashboard/login" element={
  <AuthProvider><Login /></AuthProvider>
} />
<Route path="/dashboard" element={
  <AuthProvider>
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  </AuthProvider>
}>
  <Route index element={<OrdersPage />} />
</Route>
```

(`AuthProvider` is wrapped around each of those two route subtrees rather
than the whole app, so it doesn't run on every public landing page.)

Visit `/dashboard/login`, sign in with the user you created in step 2,
and you land on `/dashboard` with a live-updating orders table. New
orders trigger a toast + a short beep in every open dashboard tab.

## 5. What "variant" is for

Every `OrderForm` call tags its orders with `product` + `variant`. This is
how the dashboard (and you, later, in the `orders` table) can tell which
ad/avatar/creative an order came from — the whole point of the multi-page
testing setup. Use the exact folder name (`man-baf`, `woman-connectbaf`,
`engbook`, ...) as the variant so it's unambiguous.
