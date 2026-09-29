import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView, trackViewContent, trackInitiateCheckout } from "./pixel";

/*
  <PixelTracker />  -  render it ONCE, inside <BrowserRouter> (see README).

  On every route change it fires:
    - PageView                       (always, except dashboard pages)
    - ViewContent                    (on a page-1 / problem page)
    - InitiateCheckout               (on a page-2 / order page)

  It works out product + variant from the URL, so you never touch the 16
  landing pages:
    /kit/man-baf            -> ViewContent,        variant "man-baf"
    /kit/man-baf/order      -> InitiateCheckout,   variant "man-baf"
    /engprob                -> ViewContent,        variant "engbook"
    /engprob/engbook        -> InitiateCheckout,   variant "engbook"
  A new /kit/<anything> route is picked up automatically.

  Dashboard pages are skipped on purpose, so your own visits never
  pollute the pixel data.
*/
function parsePath(pathname) {
  const seg = pathname.split("/").filter(Boolean);

  if (seg[0] === "kit" && seg[1]) {
    return {
      product: "phone-cleaning-kit",
      variant: seg[1],
      isOrderPage: seg[2] === "order",
    };
  }

  if (seg[0] === "engprob") {
    return {
      product: "english-words-book",
      variant: "engbook",
      isOrderPage: seg[1] === "engbook",
    };
  }

  return null;
}

export default function PixelTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith("/dashboard")) return;

    trackPageView();

    const page = parsePath(pathname);
    if (!page) return;

    if (page.isOrderPage) {
      trackInitiateCheckout(page);
    } else {
      trackViewContent(page);
    }
  }, [pathname]);

  return null;
}
