import React, { useEffect } from "react";

export default function NotificationToast({ order, onClose }) {
  useEffect(() => {
    if (!order) return;
    const t = setTimeout(onClose, 6000);
    return () => clearTimeout(t);
  }, [order, onClose]);

  if (!order) return null;

  return (
    <div className="db-toast" onClick={onClose} role="status">
      <div className="db-toast-title">🛎️ New order</div>
      <div className="db-toast-body">
        {order.name} · <span dir="ltr">{order.phone}</span> · {order.total} DA
        <br />
        {order.product} — {order.variant}
      </div>
    </div>
  );
}
