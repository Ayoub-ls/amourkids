/*
  pixel.js  -  thin wrapper around window.fbq so the rest of the app
  never has to null-check it or remember Meta's event names.

  Requires the Meta base snippet to already be loaded in index.html
  (see index.html.snippet.txt in this folder). If that snippet isn't
  present yet (e.g. in local dev without a pixel ID), every call here
  is a silent no-op instead of a crash.
*/

function fbq(...args) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq(...args);
}

/** Standard Meta event. Call with an event name Meta recognizes
 *  (PageView, ViewContent, InitiateCheckout, Purchase, Lead, ...). */
export function trackEvent(name, params) {
  fbq("track", name, params);
}

/** Custom event, for anything Meta doesn't have a built-in name for.
 *  Shows up in Events Manager as its own event you can build audiences
 *  or custom conversions from. */
export function trackCustomEvent(name, params) {
  fbq("trackCustom", name, params);
}

export function trackPageView() {
  trackEvent("PageView");
}

/** Fire when someone lands on a problem page (page 1 of a funnel). */
export function trackViewContent({ product, variant }) {
  trackEvent("ViewContent", {
    content_name: variant,
    content_category: product,
    content_type: "product",
  });
}

/** Fire when someone reaches the order page (page 2 of a funnel). */
export function trackInitiateCheckout({ product, variant }) {
  trackEvent("InitiateCheckout", {
    content_name: variant,
    content_category: product,
    content_type: "product",
  });
}

/** Fire once an order status becomes confirmed. */
export function trackPurchase({ orderId, product, variant, total, quantity, wilaya }) {
  const dedupeKey = `pixel_purchase_${orderId}`;

  if (orderId && typeof window !== "undefined") {
    try {
      if (window.localStorage.getItem(dedupeKey)) return;
      window.localStorage.setItem(dedupeKey, "1");
    } catch {
      // Storage can be unavailable; the dashboard transition guard still prevents normal duplicates.
    }
  }

  trackEvent("Purchase", {
    value: total,
    currency: "DZD",
    content_name: variant,
    content_category: product,
    content_type: "product",
    num_items: quantity,
  });

  trackCustomEvent("COD_Order", {
    order_id: orderId,
    product,
    variant,
    wilaya,
    quantity,
    value: total,
    currency: "DZD",
  });
}
