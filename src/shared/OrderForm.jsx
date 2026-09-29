import React, { useState } from "react";
import { supabase } from "./supabaseClient";
import { getBaladiyas, WILAYAS } from "./wilayas";
import { trackPurchase } from "./pixel";

/*
  OrderForm.jsx  -  the order form used by every product's page 2.

  Renders inside whatever theme (menTheme / womenTheme / menThemeLight) the
  parent page already imported, since it reuses the same class names
  (.opts, .opt, .field, .seg, .total, .btn, .trust, .done, .err ...) that
  those theme files already style. No CSS of its own.

  Props:
    product   string   e.g. "phone-cleaning-kit" or "english-words-book"
    variant   string   e.g. "man-baf", "woman-connectbaf", "engbook"
                        (this is what lets the dashboard tell orders apart)
    offers    array    [{ q, title, note, save?, per? }, ...]  same shape
                        you already use in every cleanbook.jsx / engbook.jsx
    price     object   { [qty]: pricePerUnit }  e.g. { 1: 2500, 2: 1700, 4: 1000 }
    unitLabel string   optional, defaults to "دج" — shown after each price
    defaultQty number  optional, defaults to 1
    perUnitLabel string optional, defaults to "للكيت"
*/
export default function OrderForm({
  product,
  variant,
  offers,
  price,
  unitLabel = "دج",
  defaultQty = 1,
  perUnitLabel = "للكيت",
}) {
  const [qty, setQty] = useState(defaultQty);
  const [form, setForm] = useState({ name: "", phone: "", wilaya: "", commune: "", delivery: "home" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sendErr, setSendErr] = useState("");
  const [done, setDone] = useState(null);

  const total = qty * price[qty];
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const baladiyas = getBaladiyas(form.wilaya);

  function setWilaya(e) {
    setForm((f) => ({ ...f, wilaya: e.target.value, commune: "" }));
  }

  async function submit(e) {
    e.preventDefault();
    const phone = form.phone.replace(/[\s.-]/g, "");
    const er = {};
    if (form.name.trim().length < 3) er.name = "اكتب الإسم و اللقب";
    if (!/^0[567]\d{8}$/.test(phone)) er.phone = "رقم الهاتف لازم يبدأ بـ 05 أو 06 أو 07 و فيه 10 أرقام";
    if (!form.wilaya) er.wilaya = "اختر الولاية";
    if (!form.commune.trim()) er.commune = "اكتب البلدية";
    setErrors(er);
    if (Object.keys(er).length) return;

    setSending(true);
    setSendErr("");

    const { error } = await supabase.from("orders").insert({
      product,
      variant,
      name: form.name.trim(),
      phone,
      wilaya: form.wilaya,
      commune: form.commune.trim(),
      delivery: form.delivery,
      quantity: qty,
      unit_price: price[qty],
      total,
      status: "new",
    });

    setSending(false);

    if (error) {
      console.error("OrderForm insert error:", error);
      setSendErr("صرا مشكل في الإرسال. عاود حاول من فضلك.");
      return;
    }

    // Order is safely in Supabase -> tell Meta. Only fires on success,
    // so failed submissions never count as purchases.
    trackPurchase({ product, variant, total, quantity: qty, wilaya: form.wilaya });

    setDone(phone);
  }

  if (done) {
    return (
      <div className="done">
        <div className="tick">✅</div>
        <h2>وصلنا طلبك!</h2>
        <p>
          راح نتصلو بيك قريب على الرقم <b dir="ltr">{done}</b> باش نأكدو العنوان.
          <br />
          بارك الله فيك 🤍
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="opts" role="radiogroup" aria-label="اختر العرض">
        {offers.map((o) => (
          <label className="opt" key={o.q}>
            {o.save && <span className="save">{o.save}</span>}
            <input type="radio" name="offer" value={o.q} checked={qty === o.q} onChange={() => setQty(o.q)} />
            <span className="dot" />
            <span className="name">
              {o.title} <span>{o.note}</span>
            </span>
            <span className="cost-tag">
              {price[o.q]} {unitLabel}
              {o.per && (
                <small
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    color: "var(--muted)",
                  }}
                >
                  {perUnitLabel}
                </small>
              )}
            </span>
          </label>
        ))}
      </div>

      <div className="field">
        <label className="f" htmlFor="of-name">الإسم و اللقب</label>
        <input
          type="text"
          id="of-name"
          autoComplete="name"
          placeholder="مثال: محمد بن علي"
          value={form.name}
          onChange={set("name")}
        />
        <div className="err">{errors.name}</div>
      </div>

      <div className="field">
        <label className="f" htmlFor="of-phone">رقم الهاتف</label>
        <input
          type="tel"
          id="of-phone"
          inputMode="tel"
          autoComplete="tel"
          placeholder="05 / 06 / 07 XX XX XX XX"
          dir="ltr"
          style={{ textAlign: "right" }}
          value={form.phone}
          onChange={set("phone")}
        />
        <div className="err">{errors.phone}</div>
      </div>

      <div className="row2">
        <div className="field">
          <label className="f" htmlFor="of-wilaya">الولاية</label>
          <select id="of-wilaya" value={form.wilaya} onChange={setWilaya}>
            <option value="">اختر</option>
            {WILAYAS.map((wilaya) => (
              <option key={wilaya.code} value={wilaya.name_ar}>
                {String(wilaya.code).padStart(2, "0")} - {wilaya.name_ar}
              </option>
            ))}
          </select>
          <div className="err">{errors.wilaya}</div>
        </div>
        <div className="field">
          <label className="f" htmlFor="of-commune">البلدية</label>
          <select
            id="of-commune"
            autoComplete="address-level2"
            value={form.commune}
            onChange={set("commune")}
            disabled={!form.wilaya}
          >
            <option value="">{form.wilaya ? "اختر البلدية" : "اختر الولاية أولا"}</option>
            {baladiyas.map((baladiya) => (
              <option key={baladiya.name_ar} value={baladiya.name_ar}>
                {baladiya.name_ar}
              </option>
            ))}
          </select>
          <div className="err">{errors.commune}</div>
        </div>
      </div>

      <div className="field">
        <label className="f">نوع التوصيل</label>
        <div className="seg">
          <label>
            <input type="radio" name="delivery" value="home" checked={form.delivery === "home"} onChange={set("delivery")} />
            🏠 للدار
          </label>
          <label>
            <input type="radio" name="delivery" value="desk" checked={form.delivery === "desk"} onChange={set("delivery")} />
            🏢 للمكتب
          </label>
        </div>
      </div>

      <div className="total">
        <span>المجموع</span>
        <strong>{total} {unitLabel}</strong>
      </div>

      <button className="btn" type="submit" disabled={sending}>
        {sending ? "جاري الإرسال..." : "أكد طلبي – الدفع عند الاستلام"}
        <small>نتصلو بيك باش نأكدو الطلب</small>
      </button>
      <div className="err" role="alert" style={{ textAlign: "center", marginTop: 10 }}>
        {sendErr}
      </div>

      <div className="trust">
        <div>الدفع عند الاستلام</div>
        <div>التوصيل مجاني لكل الولايات</div>
        <div>نتصلو بيك في الهاتف قبل الشحن</div>
      </div>
    </form>
  );
}
