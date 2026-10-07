import React, { useMemo, useState } from "react";
import { useOrders } from "./useOrders";
import NotificationToast from "./NotificationToast";
import "./dashboard.css";

const STATUSES = ["new", "confirmed", "shipped", "delivered", "cancelled"];
const DA_PER_USD = 251;

const statusClassName = (status) => "db-status db-status--" + status;

const DAY_MS = 24 * 60 * 60 * 1000;

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function toDayKey(date) {
  const localDate = startOfDay(date);
  return `${localDate.getFullYear()}-${String(localDate.getMonth() + 1).padStart(2, "0")}-${String(localDate.getDate()).padStart(2, "0")}`;
}

function buildOrderTimeline(orders, dayCount = 14) {
  const today = startOfDay(new Date());
  const days = Array.from({ length: dayCount }, (_, index) => {
    const date = new Date(today.getTime() - (dayCount - 1 - index) * DAY_MS);
    return { date, key: toDayKey(date), all: 0, delivered: 0 };
  });
  const daysByKey = new Map(days.map((day) => [day.key, day]));

  orders.forEach((order) => {
    const date = new Date(order.created_at);
    if (Number.isNaN(date.getTime())) return;
    const day = daysByKey.get(toDayKey(date));
    if (!day) return;
    day.all += 1;
    if (order.status === "delivered") day.delivered += 1;
  });

  return days;
}

function OrdersTimelineChart({ data }) {
  const width = 760;
  const height = 260;
  const padding = { top: 22, right: 22, bottom: 42, left: 40 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(1, ...data.flatMap((day) => [day.all, day.delivered]));
  const x = (index) => padding.left + (data.length > 1 ? (index / (data.length - 1)) * chartWidth : chartWidth / 2);
  const y = (value) => padding.top + chartHeight - (value / maxValue) * chartHeight;
  const makePath = (field) => data.map((day, index) => `${index === 0 ? "M" : "L"}${x(index)},${y(day[field])}`).join(" ");
  const gridValues = Array.from({ length: 5 }, (_, index) => ({
    value: (maxValue / 4) * index,
    label: Math.round((maxValue / 4) * index),
  }));

  return (
    <section className="db-chart-card" aria-labelledby="orders-timeline-title">
      <div className="db-chart-heading">
        <div>
          <h2 id="orders-timeline-title">Order activity</h2>
          <p>Last 14 days</p>
        </div>
        <div className="db-chart-legend" aria-label="Chart legend">
          <span className="db-legend-all">All orders</span>
          <span className="db-legend-delivered">Delivered orders</span>
        </div>
      </div>
      <div className="db-chart-scroll">
        <svg className="db-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="All orders and delivered orders by day">
          {gridValues.map(({ value, label }, index) => (
            <g key={index}>
              <line x1={padding.left} x2={width - padding.right} y1={y(value)} y2={y(value)} className="db-chart-grid" />
              <text x={padding.left - 9} y={y(value) + 4} className="db-chart-y-label">{label}</text>
            </g>
          ))}
          <path d={makePath("all")} className="db-chart-line db-chart-line--all" />
          <path d={makePath("delivered")} className="db-chart-line db-chart-line--delivered" />
          {data.map((day, index) => (
            <g key={day.key}>
              <title>{`${day.date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}: ${day.all} all orders, ${day.delivered} delivered`}</title>
              <circle cx={x(index)} cy={y(day.all)} r="3.5" className="db-chart-point db-chart-point--all" />
              <circle cx={x(index)} cy={y(day.delivered)} r="3.5" className="db-chart-point db-chart-point--delivered" />
              {(index === 0 || index === data.length - 1 || index % 3 === 0) && (
                <text x={x(index)} y={height - 16} textAnchor="middle" className="db-chart-x-label">
                  {day.date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}

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
    .reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  const deliveredRevenue = orders
    .filter((o) => o.status === "delivered")
    .reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  const deliveredRevenueUsd = deliveredRevenue / DA_PER_USD;
  const timeline = useMemo(() => buildOrderTimeline(orders), [orders]);

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
        <div className="db-stat db-stat--revenue"><span>{deliveredRevenue} DA</span>Delivered revenue</div>
        <div className="db-stat db-stat--revenue"><span>${deliveredRevenueUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>Delivered revenue (USD)</div>
      </div>

      <OrdersTimelineChart data={timeline} />

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
