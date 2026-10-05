import React, { useMemo, useState } from "react";
import { useOrders } from "./useOrders";
import NotificationToast from "./NotificationToast";
import "./dashboard.css";

const STATUSES = ["new", "confirmed", "shipped", "delivered", "cancelled"];

const statusClassName = (status) => "db-status db-status--" + status;

export default function OrdersPage() {
  const { orders, loading, newOrder, clearNewOrder, updateStatus } = useOrders();
  const [statusFilter, setStatusFilter] = useState("all");
  const [productFilter, setProductFilter] = useState("all");

  const products = useMemo(() => ["all", ...new Set(orders.map((o) => o.product))], [orders]);

  const filtered = orders.filter((o) => {
    if (statusFilter !== "all" && o.status !== statusFilter) return false;
    if (productFilter !== "all" && o.product !== productFilter) return false;
    return true;
  });

  const todayKey = new Date().toDateString();
  const totalToday = orders
    .filter((o) => new Date(o.created_at).toDateString() === todayKey)
    .reduce((sum, o) => sum + (o.total || 0), 0);

  return (
    <div className="db-page">
      <NotificationToast order={newOrder} onClose={clearNewOrder} />

      <div className="db-stats">
        <div className="db-stat"><span>{orders.length}</span>Total orders</div>
        <div className="db-stat"><span>{orders.filter((o) => o.status === "new").length}</span>New</div>
        <div className="db-stat db-status--cancelled"><span>{orders.filter((o) => o.status === "cancelled").length}</span>Cancelled</div>
        <div className="db-stat db-status--delivered"><span>{orders.filter((o) => o.status === "delivered").length}</span>Delivered</div>
        <div className="db-stat db-status--confirmed"><span>{orders.filter((o) => o.status === "confirmed").length}</span>Confirmed</div>
        <div className="db-stat db-status--shipped"><span>{orders.filter((o) => o.status === "shipped").length}</span>Shipped</div>
        <div className="db-stat"><span>{totalToday} DA</span>Today&apos;s revenue</div>
      </div>

      <div className="db-filters">
        <select
          className={statusFilter === "all" ? undefined : statusClassName(statusFilter)}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select value={productFilter} onChange={(e) => setProductFilter(e.target.value)}>
          {products.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="db-loading">Loading orders...</div>
      ) : filtered.length === 0 ? (
        <div className="db-loading">No orders match these filters.</div>
      ) : (
        <div className="db-table-wrap">
          <table className="db-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Product</th>
                <th>Variant</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Wilaya</th>
                <th>Commune</th>
                <th>Delivery</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className={o.status === "new" ? "db-row-new" : ""}>
                  <td>{new Date(o.created_at).toLocaleString()}</td>
                  <td>{o.product}</td>
                  <td>{o.variant}</td>
                  <td>{o.name}</td>
                  <td dir="ltr">{o.phone}</td>
                  <td>{o.wilaya}</td>
                  <td>{o.commune}</td>
                  <td>{o.delivery === "desk" ? "🏢" : "🏠"}</td>
                  <td>{o.quantity}</td>
                  <td>{o.total} DA</td>
                  <td>
                    <select
                      className={statusClassName(o.status)}
                      value={o.status}
                      onChange={(e) => updateStatus(o.id, e.target.value)}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
