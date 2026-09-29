import React, { useEffect, useRef, useState } from "react";
import OrderForm from "../../../shared/OrderForm";
import kitImage from '../images/kit.jpeg'
import { CSS } from "../themes/womenTheme";

/*
  cleanbook.jsx  -  Page 2 of the funnel (the product + order form).
  Props:
    backHref   link of the back button (page 1)               default "/"
    kitImage   product photo                                  default "/kit.jpg"
*/



const PRICE = { 1: 2500, 2: 1700, 4: 1000 }; // price per kit by quantity

const OFFERS = [
  { q: 1, title: "كيت واحد", note: "لتليفونك" },
  { q: 2, title: "كيتين: واحد ليك و واحد لتيليفون آخر في الدار", note: "1700 دج للكيت • 3400 دج", save: "وفّر 1600 دج", per: true },
  { q: 4, title: "كيت لكل تيليفون في الدار", note: "1000 دج للكيت • 4000 دج", save: "وفّر 6000 دج", per: true },
];

const KIT = [
  ["⬛", "ملصقات الباف", "تغطي الباف و تحميه من الوسخ و البودرة.."],
  ["🔌", "4 سدادات", "تغطي الكونكتور كي ما تشارجيش، باش الوسخ ما يدخلش.."],
  ["🪥", "10 فرشات رفيعة", "تدخل في الكونكتور و تخرج الوسخ"],
  ["🖌️", "فرشاتين بمقبض", "لتنظيف الباف و الحواف و الأزرار بحركات خفيفة."],
  ["🔧", "ملقط", "يخرج الوسخ اللي ما تقدرش توصلو الفرشاة."],
];

const FAQ = [
  ["يحمي التيليفون كامل من الغبار؟", "لا. يغطي الكونكتور و الباف، و هذي من الأماكن اللي يدخل منها الغبار. و كي تخدم في بلاصة فيها غبار بزاف، نقي مرة على مرة."],
  [" يخدم لكل الهواتف؟", "الفرشات و الملقط و ملصقات الباف تخدم مع أي هاتف. بالنسبة للسدادات، نأكدو معاك نوع كونكتور تليفونك في مكالمة التأكيد."],
  [" يخرّب الكونكتور", "لا. الفرشات ناعمة. المهم تطفي التليفون و تخدم بحركات خفيفة، بلا قوة."],
  [" يصلح كل مشاكل الشحن؟", "لا. كي يكون السبب وسخ متراكم، غالباً يرجع الشحن و الصوت. أما إذا المشكل في البطارية أو الكابل، التنظيف ما يبدلهوش."],
  ["كيفاش ندفع؟", "الدفع عند الاستلام. تستلم الكيت و تدفع للموزع."],
  [" تتصلو بيا قبل الشحن؟", "إيه. نتصلو بيك في الهاتف باش نأكدو الطلب و العنوان."],
  ["نقدر نطلب أكثر من كيت؟", "إيه. كيتين بـ 1700 دج للكيت، و 4 كيتات بـ 1000 دج للكيت."],
];

export default function CleanBook({ backHref = "/" }) {
  const [hideSticky, setHideSticky] = useState(false);
  const orderRef = useRef(null);

  const goOrder = () => orderRef.current && orderRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

  useEffect(() => {
    const el = orderRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((en) => setHideSticky(en[0].isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);


  return (
    <div className="cl" dir="rtl" lang="ar" style={{ paddingBottom: 90 }}>
      <style>{CSS}</style>
      <main>
        <div className="pills" />
        <div className="wrap">
          <div className="top"><a className="back" href={backHref}>‹ رجوع</a></div>

          <section className="offer-hero">
            <h1>نقي تيليفونك من وسخ الخدمة، و غطيه باش يبقى محمي</h1>
            <p className="sub">كيت كامل ينقي لوسخ من الباف و الكونكتور، و فيه سدادات و ملصقات تحميهم من من البودرة، الحناء و الزيت.</p>
            <div className="frame">
              <img src={kitImage} alt="كيت تنظيف الهاتف" width="660" height="495" />
              <div className="price-line"><span className="now">2500</span><span className="unit">دج</span></div>
            </div>
            <button className="btn" type="button" onClick={goOrder}>اطلب الآن – الدفع عند الاستلام</button>
          </section>
        </div>

        <section className="section">
          <div className="wrap">
            <h2>واش فيه الكيت؟</h2>
            <div className="kit">
              {KIT.map(([e, t, d]) => (
                <div className="item" key={t}><div className="ico">{e}</div><div><h3>{t}</h3><p>{d}</p></div></div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 8 }}>
          <div className="wrap">
            <h2>كيفاش تخدمو؟</h2>
            <div className="steps">
              <div className="step">طفي التليفون.</div>
              <div className="step">نقي الكونكتور و الباف بالفرشاة، و خرجي الوسخ بالملقط</div>
              <div className="step">ركّبي الملصق على الباف، و السدادة على الكونكتور كي ما تشارجيش.</div>
              <div className="step">مرة على مرة، عاودي نقي... مور ما تخدمي.</div>
            </div>
            <p className="steps-note">⚠️ نقّي بلعقل و ما تدخليش الفرشاة بالقوة..</p>
          </div>
        </section>

        {/* REAL BEFORE/AFTER PHOTOS OR A SHORT DEMO VIDEO GO HERE (add a section once you have them) */}

        <section className="order" ref={orderRef}>
          <div className="pills" />
          <div className="wrap inner">
            <h2>اطلب الكيت الآن</h2>
            <p className="lead">تدفع كي يوصلك. ما تدفع والو من قبل.</p>
            <OrderForm
              product="phone-cleaning-kit"
              variant="woman-makeup"
              offers={OFFERS}
              price={PRICE}
            />
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <h2>أسئلة يسقسيو عليها الناس</h2>
            {FAQ.map(([q, a]) => (
              <details key={q}><summary>{q}</summary><p>{a}</p></details>
            ))}
          </div>
        </section>

        <div className="pills" />
        <div className="foot wrap">الدفع عند الاستلام · التوصيل مجاني لكل الولايات</div>

          <div className={"sticky" + (hideSticky ? " off" : "")}>
            <div className="inner">
              <div className="p">{PRICE[1]} دج<small>الدفع عند الاستلام</small></div>
              <button className="btn" type="button" onClick={goOrder}>اطلب الآن</button>
            </div>
          </div>
      </main>
    </div>
  );
}
