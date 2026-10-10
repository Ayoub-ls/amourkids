import React, { useMemo } from "react";
import { useOrders } from "./useOrders";
import "./dashboard.css";

const STATUSES = ["new", "confirmed", "shipped", "delivered", "cancelled"];

const ANSWER_LABELS = {
  age: "عمر الطفل",
  gender: "الجنس",
  level: "مستوى الإنجليزية",
  goal: "الهدف",
  learningStyle: "طريقة التعلم",
  problem: "أكبر صعوبة",
  apple: "Apple",
  cat: "Cat",
};

function statusClassName(status) {
  return `db-status db-status--${status}`;
}

function readQuizAnswers(value) {
  if (!value) return {};
  if (typeof value === "object") return value;
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}

function QuizAnswers({ answers }) {
  const entries = Object.entries(readQuizAnswers(answers));

  if (!entries.length) return <span className="db-quiz-empty">No quiz answers saved</span>;

  return (
    <dl className="db-quiz-answers" dir="rtl">
      {entries.map(([key, value]) => (
        <div key={key}>
          <dt>{ANSWER_LABELS[key] || key}</dt>
          <dd>{typeof value === "object" ? JSON.stringify(value) : String(value)}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function QuizOrdersPage() {
  const { orders, loading, updateStatus } = useOrders();
  const quizOrders = useMemo(
    () => orders.filter((order) => order.variant === "quiz" || order.quiz_answers),
    [orders]
  );
  const answeredOrders = quizOrders.filter((order) => Object.keys(readQuizAnswers(order.quiz_answers)).length).length;

  return (
    <div className="db-page">
      <div className="db-page-heading">
        <div>
          <h1>Quiz orders</h1>
          <p>Orders placed after completing the English-book quiz.</p>
        </div>
      </div>

      <div className="db-stats">
        <div className="db-stat"><span>{quizOrders.length}</span>Quiz orders</div>
        <div className="db-stat"><span>{answeredOrders}</span>With answers</div>
        <div className="db-stat db-status--delivered"><span>{quizOrders.filter((order) => order.status === "delivered").length}</span>Delivered</div>
      </div>

      {loading ? (
        <div className="db-loading">Loading quiz orders...</div>
      ) : quizOrders.length === 0 ? (
        <div className="db-loading">No quiz orders yet.</div>
      ) : (
        <div className="db-table-wrap">
          <table className="db-table db-quiz-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Order</th>
                <th>Quiz answers</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {quizOrders.map((order) => (
                <tr key={order.id} className={order.status === "new" ? "db-row-new" : ""}>
                  <td>{new Date(order.created_at).toLocaleString()}</td>
                  <td>{order.name}</td>
                  <td dir="ltr">{order.phone}</td>
                  <td>{order.wilaya}<br /><span className="db-subtle">{order.commune}</span></td>
                  <td>{order.quantity} × {order.unit_price} DA<br /><strong>{order.total} DA</strong></td>
                  <td className="db-quiz-answers-cell"><QuizAnswers answers={order.quiz_answers} /></td>
                  <td>
                    <select className={statusClassName(order.status)} value={order.status} onChange={(event) => updateStatus(order.id, event.target.value)}>
                      {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
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
