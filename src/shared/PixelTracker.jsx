import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView, trackViewContent } from "./pixel";

/*
  <PixelTracker />  -  render it ONCE, inside <BrowserRouter> (see README).

  On every route change it fires:
    - PageView                       (always, except dashboard pages)
    - ViewContent                    (on landing/problem pages)

  InitiateCheckout is fired only after a successful order submission,
  not merely when an order form route is opened.

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

    trackViewContent(page);
  }, [pathname]);

  return null;
}
