import React, { useEffect, useRef, useState } from "react";
import OrderForm from "../../shared/OrderForm";

import bookImage from './images/engboook.jpeg'

/*
  engbook.jsx  -  Page 2 of the funnel (the product + order form).
  Props:
    backHref   link of the back button (page 1)               default "/"
    bookImage  product photo                                  default "/book.jpg"
*/

const CSS = `@import url("https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@700;800&family=Tajawal:wght@400;500;700&display=swap");
.eng{--bg:#FFF8EA; --surface:#FFFFFF; --ink:#1B2A5C; --muted:#56607F; --line:#E9DFC8;
  --red:#D63A22; --red-deep:#A82A16; --yellow:#FFC629; --green:#2E9E5B; --blue:#2C86D9;
  --t-red:#FFE6DF; --t-yellow:#FFF1C4; --t-green:#DDF2E5; --t-blue:#DAEAFA;
  --font-display:"Baloo Bhaijaan 2","Tajawal","Segoe UI",Tahoma,sans-serif;
  --font-body:"Tajawal","Segoe UI",Tahoma,Arial,sans-serif;
  }
@media (prefers-color-scheme: dark){.eng:not([data-theme="light"]){
    --bg:#111A38; --surface:#1B2649; --ink:#FFF3DC; --muted:#B7BFD8; --line:#2F3C68;
    --red:#EF5A3F; --red-deep:#B8301B;
    --t-red:#3B2534; --t-yellow:#3A3623; --t-green:#1F3B34; --t-blue:#1F3659;
  }}
.eng[data-theme="dark"]{
  --bg:#111A38; --surface:#1B2649; --ink:#FFF3DC; --muted:#B7BFD8; --line:#2F3C68;
  --red:#EF5A3F; --red-deep:#B8301B;
  --t-red:#3B2534; --t-yellow:#3A3623; --t-green:#1F3B34; --t-blue:#1F3659;
}
.eng *,.eng *::before,.eng *::after{box-sizing:border-box}
.eng{margin:0;background:var(--bg);color:var(--ink);font-family:var(--font-body);font-size:18px;line-height:1.75;-webkit-text-size-adjust:100%}
.eng img{max-width:100%;display:block}
.eng a{color:inherit}
.eng .wrap{max-width:520px;margin:0 auto;padding:0 20px}
.eng h1,.eng h2,.eng h3{font-family:var(--font-display);font-weight:800;line-height:1.35;margin:0}
.eng p{margin:0}
.eng [hidden]{display:none!important}
.eng .strip{height:14px;background:repeating-linear-gradient(90deg,
  var(--red) 0 14px,#fff 14px 28px,var(--blue) 28px 42px,#fff 42px 56px,
  var(--yellow) 56px 70px,#fff 70px 84px,var(--green) 84px 98px,#fff 98px 112px)}
.eng .btn{display:block;width:100%;border:0;cursor:pointer;text-align:center;text-decoration:none;
  font-family:var(--font-display);font-weight:800;font-size:21px;line-height:1.4;color:#fff;
  background:var(--red);padding:16px 20px;border-radius:18px;box-shadow:0 6px 0 var(--red-deep);
  transition:transform .12s,box-shadow .12s}
.eng .btn:active{transform:translateY(4px);box-shadow:0 2px 0 var(--red-deep)}
.eng .btn:focus-visible,.eng .opt:focus-within,.eng summary:focus-visible,.eng input:focus-visible,.eng select:focus-visible,.eng .back:focus-visible{outline:3px solid var(--blue);outline-offset:3px}
.eng .btn small{display:block;font-family:var(--font-body);font-weight:500;font-size:14px;opacity:.92}
.eng .top{display:flex;align-items:center;justify-content:space-between;padding:14px 0}
.eng .back{background:none;border:0;font:inherit;font-size:15px;color:var(--muted);cursor:pointer;padding:6px 2px}
.eng .offer-hero{text-align:center;padding:6px 0 34px}
.eng .offer-hero h1{font-size:31px;margin-bottom:12px}
.eng .offer-hero .sub{color:var(--muted);font-size:18px;margin-bottom:24px}
.eng .frame{background:var(--surface);border-radius:22px;padding:0 0 20px;overflow:hidden;box-shadow:0 10px 28px rgba(20,30,70,.18);margin-bottom:24px}
.eng .frame img{width:100%}
.eng .price-line{display:flex;align-items:baseline;justify-content:center;gap:10px;padding-top:16px}
.eng .price-line .now{font-family:var(--font-display);font-weight:800;font-size:38px;color:var(--red)}
.eng .price-line .unit{font-weight:700}
.eng .benefits{display:grid;gap:14px}
.eng .ben{display:flex;gap:16px;align-items:flex-start;background:var(--surface);border-radius:20px;padding:18px;border:2px solid var(--line)}
.eng .ben .ico{flex:0 0 52px;height:52px;border-radius:16px;display:grid;place-items:center;font-size:27px}
.eng .ben:nth-child(1) .ico{background:var(--t-blue)}
.eng .ben:nth-child(2) .ico{background:var(--t-red)}
.eng .ben:nth-child(3) .ico{background:var(--t-yellow)}
.eng .ben:nth-child(4) .ico{background:var(--t-green)}
.eng .ben h3{font-size:20px;margin-bottom:2px}
.eng .ben p{color:var(--muted);font-size:17px;line-height:1.65}
.eng .steps{display:grid;gap:12px;counter-reset:s}
.eng .step{display:flex;gap:14px;align-items:center;font-weight:700;font-size:19px}
.eng .step::before{counter-increment:s;content:counter(s);flex:0 0 40px;height:40px;border-radius:50%;background:var(--yellow);color:#1B2A5C;display:grid;place-items:center;font-family:var(--font-display);font-size:20px}
.eng .steps-note{margin-top:16px;color:var(--muted)}
.eng .order{background:var(--surface);border-top:0;padding:0 0 46px}
.eng .order .inner{padding-top:34px}
.eng .order h2{font-size:28px;margin-bottom:6px}
.eng .order .lead{color:var(--muted);margin-bottom:22px}
.eng .opts{display:grid;gap:12px;margin-bottom:22px}
.eng .opt{position:relative;display:flex;align-items:center;gap:14px;border:3px solid var(--line);border-radius:18px;padding:16px;cursor:pointer;background:var(--bg)}
.eng .opt input{position:absolute;opacity:0;inset:0;cursor:pointer}
.eng .opt .dot{flex:0 0 26px;height:26px;border-radius:50%;border:3px solid var(--muted);display:grid;place-items:center}
.eng .opt:has(input:checked){border-color:var(--red);background:var(--t-red)}
.eng .opt:has(input:checked) .dot{border-color:var(--red)}
.eng .opt:has(input:checked) .dot::after{content:"";width:12px;height:12px;border-radius:50%;background:var(--red)}
.eng .opt .name{font-family:var(--font-display);font-weight:800;font-size:20px;line-height:1.3}
.eng .opt .name span{display:block;font-family:var(--font-body);font-weight:500;font-size:15px;color:var(--muted)}
.eng .opt .cost-tag{margin-inline-start:auto;text-align:left;font-family:var(--font-display);font-weight:800;font-size:22px;color:var(--red);white-space:nowrap}
.eng .opt .save{position:absolute;top:-13px;inset-inline-end:14px;background:var(--green);color:#fff;font-size:13px;font-weight:700;padding:2px 12px;border-radius:99px}
.eng label.f{display:block;font-weight:700;margin:0 0 6px;font-size:16px}
.eng .field{margin-bottom:16px}
.eng .field input[type=text],.eng .field input[type=tel],.eng .field select{width:100%;font:inherit;font-size:18px;color:var(--ink);background:var(--bg);border:2px solid var(--line);border-radius:14px;padding:13px 14px;min-height:52px}
.eng .err{color:var(--red);font-size:14px;font-weight:700;margin-top:4px;min-height:0}
.eng .row2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.eng .seg{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.eng .seg label{position:relative;border:2px solid var(--line);border-radius:14px;padding:12px 8px;text-align:center;font-weight:700;font-size:16px;cursor:pointer;background:var(--bg)}
.eng .seg input{position:absolute;opacity:0;inset:0;cursor:pointer}
.eng .seg label:has(input:checked){border-color:var(--red);background:var(--t-red)}
.eng .seg label:focus-within{outline:3px solid var(--blue);outline-offset:2px}
.eng .total{display:flex;justify-content:space-between;align-items:center;background:var(--t-yellow);border-radius:16px;padding:14px 18px;margin:6px 0 18px;font-weight:700}
.eng .total strong{font-family:var(--font-display);font-size:26px;font-weight:800}
.eng .trust{display:grid;gap:8px;margin-top:20px;font-size:16px;color:var(--muted)}
.eng .trust div::before{content:"✓";color:var(--green);font-weight:800;margin-inline-end:8px}
.eng .done{text-align:center;padding:40px 0 20px}
.eng .done .tick{font-size:62px}
.eng .done h2{margin:10px 0 10px}
.eng details{border-bottom:2px solid var(--line);padding:14px 0}
.eng summary{cursor:pointer;font-weight:700;font-size:18px;list-style:none;display:flex;justify-content:space-between;gap:12px}
.eng summary::-webkit-details-marker{display:none}
.eng summary::after{content:"+";font-family:var(--font-display);font-size:24px;line-height:1;color:var(--red)}
.eng details[open] summary::after{content:"–"}
.eng details p{color:var(--muted);margin-top:8px;font-size:17px}
.eng .sticky{position:fixed;left:0;right:0;bottom:0;z-index:20;background:var(--bg);border-top:2px solid var(--line);padding:10px 16px calc(10px + env(safe-area-inset-bottom,0px));transition:transform .25s}
.eng .sticky.off{transform:translateY(110%)}
.eng .sticky .inner{max-width:520px;margin:0 auto;display:flex;align-items:center;gap:14px}
.eng .sticky .p{font-family:var(--font-display);font-weight:800;font-size:22px;color:var(--red);white-space:nowrap;line-height:1.2}
.eng .sticky .p small{display:block;font-family:var(--font-body);font-weight:500;font-size:12px;color:var(--muted)}
.eng .sticky .btn{font-size:18px;padding:12px 14px}`;

const PRICE = { 1: 7900, 2: 6900, 4: 5900 }; // price per book by quantity


const OFFERS = [
  { q: 1, title: "كتاب واحد", note: "للولد اللي يبدأ", per: false },
  { q: 2, title: "كتابين", note: "6900 دج للكتاب • 13800 دج", save: "وفّر 2000 دج", per: true },
  { q: 4, title: "4 كتب", note: "5900 دج للكتاب • 23600 دج", save: "وفّر 8000 دج", per: true },
];

const FAQ = [
  ["من أي سن يناسب الكتاب؟", "من 2 سنين حتى 12 سنة. الصغار يلعبوا بالصور و الأصوات، و الكبار اللي يبداو الإنجليزية يتعلموا كلمات جداد."],
  ["كيفاش ندفع؟", "الدفع عند الاستلام. تستلم الكتاب و تدفع للموزع."],
  ["واش تتصلو بيا قبل الشحن؟", "إيه. نتصلو بيك في الهاتف باش نأكدو الطلب و العنوان."],
  ["الأصوات بأي لغة؟", "الكلمات بالإنجليزية، ينطقها الكتاب لولدك مع كل صورة."],
  ["نقدر نطلب أكثر من كتاب؟", "إيه. كتابين بـ 6900 دج للكتاب، و 4 كتب بـ 5900 دج للكتاب."],
];

export default function EngBook({ backHref = "/" }) {
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
    <div className="eng" dir="rtl" lang="ar" style={{ paddingBottom: 90 }}>
      <style>{CSS}</style>
      <main>
        <div className="strip" />
        <div className="wrap">
          <div className="top"><a className="back" href={backHref}>‹ رجوع</a></div>

          <section className="offer-hero">
            <h1>ولدك يتعلم أول كلماتو بالإنجليزية... و هو يلعب</h1>
            <p className="sub">كتاب ناطق فيه +470 صوت و صور حقيقية. لمسة وحدة، و الكلمة تتنطق.</p>
            <div className="frame">
              <div className="strip" />
              <img src={bookImage} alt="First English Words Sound Book" width="469" height="545" />
              <div className="price-line"><span className="now">7900</span><span className="unit">دج</span></div>
            </div>
            <button className="btn" type="button" onClick={goOrder}>نطلب الآن – الدفع عند الاستلام</button>
          </section>
        </div>

        <section className="section">
          <div className="wrap">
            <h2>علاش الأولاد يحبوه؟</h2>
            <div className="benefits">
              <div className="ben"><div className="ico">🙌</div><div><h3>بلا شاشة</h3><p>يلعب بيديه و يلمس الصور، و عينيه بعيدين على التابلت.</p></div></div>
              <div className="ben"><div className="ico">🔊</div><div><h3>نطق صحيح من أول مرة</h3><p>يسمع الكلمة كيما تتنطق، مش كيما نقولوها نحنا.</p></div></div>
              <div className="ben"><div className="ico">🧒</div><div><h3>يتعلم وحدو</h3><p>ما تحتاجش تعرف الإنجليزية باش تعلمو. الكتاب يدير الخدمة.</p></div></div>
              <div className="ben"><div className="ico">🦁</div><div><h3>+470 صوت</h3><p>حيوانات، خضرة و فواكه، أكلات، أشياء نعرفوها... كل صورة و صوتها.</p></div></div>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 8 }}>
          <div className="wrap">
            <h2>كيفاش يخدم؟</h2>
            <div className="steps">
              <div className="step">يلمس الصورة اللي عجبتو</div>
              <div className="step">يسمع الكلمة بالإنجليزية</div>
              <div className="step">يعاودها بروحو، و يزيد يلمس</div>
            </div>
            <p className="steps-note">من 2 سنين حتى 12 سنة، كل واحد يبدأ من الكلمات اللي يعجبوه.</p>
          </div>
        </section>

        {/* REAL PARENT REVIEWS / UNBOXING VIDEO GO HERE (add a section once you have real ones) */}

        <section className="order" ref={orderRef}>
          <div className="strip" />
          <div className="wrap inner">
            <h2>اطلب كتابك الآن</h2>
            <p className="lead">تدفع كي يوصلك. ما تدفع والو من قبل.</p>
            <OrderForm
              product="english-words-book"
              variant="engbook"
              offers={OFFERS}
              price={PRICE}
              perUnitLabel="للكتاب"
            />
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <h2>أسئلة يسقسيو عليها الأولياء</h2>
            {FAQ.map(([q, a]) => (
              <details key={q}><summary>{q}</summary><p>{a}</p></details>
            ))}
          </div>
        </section>

        <div className="strip" />
        <div className="foot wrap">الدفع عند الاستلام · التوصيل لكل الولايات</div>

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
