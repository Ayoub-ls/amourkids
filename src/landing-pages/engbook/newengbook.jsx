import React, { useEffect, useRef, useState } from "react";
import OrderForm from "../../shared/OrderForm";

import bookCoverImage from "./images/engbook2.png";
import bookTransportImage from "./images/engbook1.png";
import bookTransportDetailImage from "./images/engbook3.png";
import bookSportsImage from "./images/engbook4.png";

/*
  newengbook.jsx  -  Same page as engbook.jsx (product + order form),
  restyled as soft pastel "clay" UI. Logic, copy, prices and OrderForm usage
  are unchanged; only markup wrappers and CSS differ.
  Props:
    backHref   link of the back button (page 1)               default "/"

  Styling notes:
  - The root keeps the `eng` class because the shared <OrderForm> is styled
    through the same class hooks (.opt, .field, .seg, .total, .trust, .done...)
    and CSS variables (--red, --t-red, --line ...). Every variable it reads is
    redefined below with the new palette, and every selector is written as
    `.neb.eng` so these rules win over any other `.eng` rule.
*/

const RAW_CSS = `@import url("https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@700;800&family=Tajawal:wght@400;500;700&display=swap");

/* ---------- tokens ---------- */
.neb{--bg:#FBF1E3; --surface:#FFF9EF; --ink:#4A3426; --soft:#5C4435; --muted:#6F5848; --line:#EBD9C2;
  --red:#C74E29; --red-deep:#9E3818; --red-text:#B8431F; --yellow:#FBD56B; --green:#3F7F6D; --blue:#3E6FA3;
  --t-red:#F9D3C0; --t-yellow:#FBE3A6; --t-green:#CFE3D6; --t-blue:#CFDDEC; --t-lilac:#EBD3E3;
  --on-green:#FFFFFF; --btn-a:#DA6339; --btn-b:#C74E29;
  --sh:122,82,52;
  --clay:0 20px 32px -14px rgba(var(--sh),.34),0 5px 12px rgba(var(--sh),.08),inset 0 3px 6px rgba(255,255,255,.95),inset 0 -6px 12px rgba(190,130,90,.13);
  --clay-sm:0 12px 20px -10px rgba(var(--sh),.34),0 3px 6px rgba(var(--sh),.08),inset 0 2px 4px rgba(255,255,255,.9),inset 0 -4px 8px rgba(190,130,90,.13);
  --clay-xs:0 6px 10px -5px rgba(var(--sh),.35),inset 0 2px 3px rgba(255,255,255,.9),inset 0 -2px 4px rgba(190,130,90,.12);
  --inset:inset 0 3px 8px rgba(var(--sh),.17),inset 0 -2px 3px rgba(255,255,255,.9);
  --blob1:rgba(249,211,192,.65); --blob2:rgba(191,216,204,.65); --blob3:rgba(251,227,166,.55);
  --font-display:"Baloo Bhaijaan 2","Tajawal","Segoe UI",Tahoma,sans-serif;
  --font-body:"Tajawal","Segoe UI",Tahoma,Arial,sans-serif;
}
@media (prefers-color-scheme: dark){.neb:not([data-theme="light"]){
  --bg:#2A211C; --surface:#382D26; --ink:#FBEFE0; --soft:#EAD9C6; --muted:#CDBBAA; --line:#4C3E34;
  --red:#D4552E; --red-deep:#7E2A12; --red-text:#FF9A78; --yellow:#F2C75A; --green:#6FB39C; --blue:#8DB6E0;
  --t-red:#5A3A30; --t-yellow:#5A4C2C; --t-green:#2F4A41; --t-blue:#33465A; --t-lilac:#4D3A4A;
  --on-green:#16241F; --btn-a:#E0653D; --btn-b:#D4552E;
  --sh:0,0,0;
  --clay:0 20px 32px -14px rgba(0,0,0,.6),0 5px 12px rgba(0,0,0,.25),inset 0 2px 5px rgba(255,255,255,.08),inset 0 -6px 12px rgba(0,0,0,.25);
  --clay-sm:0 12px 20px -10px rgba(0,0,0,.6),0 3px 6px rgba(0,0,0,.25),inset 0 2px 4px rgba(255,255,255,.08),inset 0 -4px 8px rgba(0,0,0,.25);
  --clay-xs:0 6px 10px -5px rgba(0,0,0,.6),inset 0 2px 3px rgba(255,255,255,.08),inset 0 -2px 4px rgba(0,0,0,.25);
  --inset:inset 0 3px 8px rgba(0,0,0,.45),inset 0 -2px 3px rgba(255,255,255,.05);
  --blob1:rgba(212,85,46,.16); --blob2:rgba(111,179,156,.14); --blob3:rgba(242,199,90,.12);
}}
.neb[data-theme="dark"]{
  --bg:#2A211C; --surface:#382D26; --ink:#FBEFE0; --soft:#EAD9C6; --muted:#CDBBAA; --line:#4C3E34;
  --red:#D4552E; --red-deep:#7E2A12; --red-text:#FF9A78; --yellow:#F2C75A; --green:#6FB39C; --blue:#8DB6E0;
  --t-red:#5A3A30; --t-yellow:#5A4C2C; --t-green:#2F4A41; --t-blue:#33465A; --t-lilac:#4D3A4A;
  --on-green:#16241F; --btn-a:#E0653D; --btn-b:#D4552E;
  --sh:0,0,0;
  --clay:0 20px 32px -14px rgba(0,0,0,.6),0 5px 12px rgba(0,0,0,.25),inset 0 2px 5px rgba(255,255,255,.08),inset 0 -6px 12px rgba(0,0,0,.25);
  --clay-sm:0 12px 20px -10px rgba(0,0,0,.6),0 3px 6px rgba(0,0,0,.25),inset 0 2px 4px rgba(255,255,255,.08),inset 0 -4px 8px rgba(0,0,0,.25);
  --clay-xs:0 6px 10px -5px rgba(0,0,0,.6),inset 0 2px 3px rgba(255,255,255,.08),inset 0 -2px 4px rgba(0,0,0,.25);
  --inset:inset 0 3px 8px rgba(0,0,0,.45),inset 0 -2px 3px rgba(255,255,255,.05);
  --blob1:rgba(212,85,46,.16); --blob2:rgba(111,179,156,.14); --blob3:rgba(251,213,107,.12);
}

/* ---------- base ---------- */
.neb *,.neb *::before,.neb *::after{box-sizing:border-box}
.neb{margin:0;min-height:100vh;color:var(--ink);font-family:var(--font-body);font-size:18px;line-height:1.75;-webkit-text-size-adjust:100%;
  background-color:var(--bg);
  background-image:radial-gradient(440px 340px at 100% 0,var(--blob1),transparent 70%),
    radial-gradient(400px 320px at 0 26%,var(--blob2),transparent 70%),
    radial-gradient(440px 340px at 100% 58%,var(--blob3),transparent 70%),
    radial-gradient(400px 320px at 0 90%,var(--blob1),transparent 70%)}
.neb img{max-width:100%;display:block}
.neb a{color:inherit}
.neb .wrap{max-width:520px;margin:0 auto;padding:0 20px}
.neb h1,.neb h2,.neb h3{font-family:var(--font-display);font-weight:800;line-height:1.35;margin:0}
.neb p{margin:0}
.neb [hidden]{display:none!important}
.neb .star{width:44px;height:44px;flex:0 0 auto;filter:drop-shadow(0 4px 4px rgba(var(--sh),.25))}

/* candy ribbon taken from the cover's checkered border */
.neb .strip{height:16px;margin:14px 16px 0;border-radius:99px;box-shadow:var(--clay-xs);
  background:linear-gradient(180deg,rgba(255,255,255,.5),rgba(255,255,255,0) 60%),
  repeating-linear-gradient(90deg,#E8765A 0 14px,#FFF9EF 14px 28px,#6FA3D6 28px 42px,#FFF9EF 42px 56px,
  #F9CF55 56px 70px,#FFF9EF 70px 84px,#7DBE9A 84px 98px,#FFF9EF 98px 112px)}

/* ---------- buttons ---------- */
.neb .btn{display:block;width:100%;border:0;cursor:pointer;text-align:center;text-decoration:none;
  font-family:var(--font-display);font-weight:800;font-size:21px;line-height:1.4;color:#fff;
  background:linear-gradient(180deg,var(--btn-a),var(--btn-b));padding:16px 24px;border-radius:99px;
  box-shadow:0 14px 22px -8px rgba(158,56,24,.55),0 3px 6px rgba(158,56,24,.18),inset 0 3px 5px rgba(255,255,255,.4),inset 0 -5px 9px rgba(110,35,8,.28);
  transition:transform .15s,box-shadow .15s}
.neb .btn:active{transform:translateY(2px);box-shadow:0 6px 12px -6px rgba(158,56,24,.5),inset 0 3px 5px rgba(255,255,255,.3),inset 0 -3px 6px rgba(110,35,8,.3)}
@media (hover:hover){.neb .btn:hover{transform:translateY(-2px)}.neb .btn:active{transform:translateY(2px)}}
.neb .btn:focus-visible,.neb .opt:focus-within,.neb summary:focus-visible,.neb input:focus-visible,.neb select:focus-visible,.neb .back:focus-visible{outline:3px solid var(--blue);outline-offset:3px}
.neb .btn small{display:block;font-family:var(--font-body);font-weight:500;font-size:14px;opacity:.92}

/* ---------- top bar ---------- */
.neb .top{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:6px 8px;margin:16px 0 6px;
  background:var(--surface);border-radius:99px;box-shadow:var(--clay-sm)}
.neb .back{display:inline-flex;align-items:center;min-height:44px;background:none;border:0;font:inherit;font-size:16px;font-weight:700;color:var(--muted);cursor:pointer;padding:6px 16px;border-radius:99px}
.neb .phone{display:inline-flex;align-items:center;gap:6px;min-height:44px;padding:6px 18px;border-radius:99px;background:var(--t-red);box-shadow:var(--clay-xs);
  color:var(--red-text);font-weight:800;font-size:16px;text-decoration:none;direction:ltr}
.neb .phone::before{content:"☎";font-size:18px;line-height:1}
.neb .phone:focus-visible{outline:3px solid var(--blue);outline-offset:3px}

/* ---------- hero ---------- */
.neb .offer-hero{text-align:center;padding:20px 0 40px}
.neb .offer-hero h1{font-size:31px;margin-bottom:12px}
.neb .offer-hero .sub{color:var(--soft);font-size:18px;margin-bottom:24px}
.neb .frame{background:var(--surface);border-radius:40px;padding:0 0 24px;overflow:hidden;box-shadow:var(--clay);margin-bottom:26px}
.neb .frame .strip{margin:16px 18px 14px}
.neb .frame > img{width:calc(100% - 36px);height:auto;margin:0 auto;border-radius:28px;box-shadow:var(--clay-sm)}
.neb .product-gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:14px 18px 0}
.neb .product-gallery img{width:100%;height:112px;object-fit:cover;border-radius:22px;border:5px solid var(--t-blue);box-shadow:var(--clay-xs)}
.neb .product-gallery img:nth-child(2){border-color:var(--t-red)}
.neb .product-gallery img:nth-child(3){border-color:var(--t-green)}
.neb .price-line{display:flex;align-items:center;justify-content:center;gap:10px;width:fit-content;max-width:calc(100% - 36px);margin:20px auto 0;padding:6px 28px 6px 24px;
  background:var(--t-yellow);border-radius:99px;box-shadow:var(--clay-sm)}
.neb .price-line .now{font-family:var(--font-display);font-weight:800;font-size:38px;line-height:1.4;color:var(--red-text)}
.neb .price-line .unit{font-weight:700}

/* ---------- sections ---------- */
.neb .section{padding:14px 0 26px}
.neb .section h2{text-align:center;font-size:28px;margin-bottom:20px}
.neb .benefits{display:grid;gap:16px}
.neb .ben{display:flex;gap:16px;align-items:flex-start;border-radius:32px;padding:20px;box-shadow:var(--clay)}
.neb .ben:nth-child(1){background:var(--t-blue)}
.neb .ben:nth-child(2){background:var(--t-red)}
.neb .ben:nth-child(3){background:var(--t-yellow)}
.neb .ben:nth-child(4){background:var(--t-green)}
.neb .ben .ico{flex:0 0 58px;height:58px;border-radius:20px;display:grid;place-items:center;font-size:29px;background:var(--surface);box-shadow:var(--clay-xs)}
.neb .ben h3{font-size:20px;margin-bottom:2px}
.neb .ben p{color:var(--soft);font-size:17px;line-height:1.65}

.neb .steps{display:grid;gap:14px;counter-reset:s;max-width:560px;margin:0 auto;padding:24px 22px;background:var(--t-green);border-radius:36px;box-shadow:var(--clay)}
.neb .step{display:flex;gap:14px;align-items:center;font-weight:700;font-size:19px}
.neb .step::before{counter-increment:s;content:counter(s);flex:0 0 44px;height:44px;border-radius:50%;background:var(--yellow);color:#4A3426;
  display:grid;place-items:center;font-family:var(--font-display);font-size:21px;box-shadow:var(--clay-xs)}
.neb .steps-note{margin-top:18px;color:var(--muted);text-align:center}

/* ---------- order card ---------- */
.neb .order{width:calc(100% - 28px);max-width:560px;margin:10px auto 0;background:var(--surface);border-radius:44px;padding:0 0 42px;box-shadow:var(--clay)}
.neb .order .strip{margin:20px 22px 0}
.neb .order .inner{padding-top:26px}
.neb .order h2{font-size:28px;margin-bottom:6px;text-align:center}
.neb .order .lead{color:var(--muted);margin-bottom:24px;text-align:center}
.neb .opts{display:grid;gap:16px;margin-bottom:24px}
.neb .opt{position:relative;display:flex;align-items:center;gap:14px;border:0;border-radius:28px;padding:18px;cursor:pointer;background:var(--bg);box-shadow:var(--clay-sm);transition:box-shadow .15s,background .15s}
.neb .opt input{position:absolute;opacity:0;inset:0;cursor:pointer}
.neb .opt .dot{flex:0 0 28px;height:28px;border-radius:50%;background:var(--surface);box-shadow:var(--inset);display:grid;place-items:center}
.neb .opt:has(input:checked){background:var(--t-red);box-shadow:0 0 0 3px var(--red),var(--clay-sm)}
.neb .opt:has(input:checked) .dot::after{content:"";width:14px;height:14px;border-radius:50%;background:var(--red);box-shadow:0 2px 3px rgba(var(--sh),.3)}
.neb .opt .name{font-family:var(--font-display);font-weight:800;font-size:20px;line-height:1.3}
.neb .opt .name span{display:block;font-family:var(--font-body);font-weight:500;font-size:15px;color:var(--muted)}
.neb .opt .cost-tag{margin-inline-start:auto;text-align:left;font-family:var(--font-display);font-weight:800;font-size:22px;color:var(--red-text);white-space:nowrap}
.neb .opt .save{position:absolute;top:-14px;inset-inline-end:18px;background:var(--green);color:var(--on-green);font-size:13px;font-weight:700;padding:2px 14px;border-radius:99px;box-shadow:var(--clay-xs)}
.neb label.f{display:block;font-weight:700;margin:0 0 8px;font-size:16px;color:var(--soft)}
.neb .field{margin-bottom:18px}
.neb .field input[type=text],.neb .field input[type=tel],.neb .field select{width:100%;font:inherit;font-size:18px;color:var(--ink);background:var(--bg);border:0;border-radius:22px;padding:14px 20px;min-height:56px;box-shadow:var(--inset)}
.neb .err{color:var(--red-text);font-size:14px;font-weight:700;margin-top:6px;min-height:0}
.neb .row2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.neb .seg{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.neb .seg label{position:relative;border:0;border-radius:22px;padding:13px 8px;text-align:center;font-weight:700;font-size:16px;cursor:pointer;background:var(--bg);box-shadow:var(--clay-xs);min-height:48px}
.neb .seg input{position:absolute;opacity:0;inset:0;cursor:pointer}
.neb .seg label:has(input:checked){background:var(--t-red);box-shadow:0 0 0 3px var(--red),var(--clay-xs)}
.neb .seg label:focus-within{outline:3px solid var(--blue);outline-offset:3px}
.neb .total{display:flex;justify-content:space-between;align-items:center;background:var(--t-yellow);border-radius:26px;padding:16px 22px;margin:8px 0 20px;font-weight:700;box-shadow:var(--clay-sm)}
.neb .total strong{font-family:var(--font-display);font-size:26px;font-weight:800}
.neb .trust{display:grid;gap:10px;margin-top:22px;font-size:16px;color:var(--muted)}
.neb .trust div::before{content:"✓";display:inline-grid;place-items:center;width:26px;height:26px;border-radius:50%;background:var(--t-green);color:var(--green);font-weight:800;font-size:15px;box-shadow:var(--clay-xs);margin-inline-end:10px}
.neb .done{text-align:center;padding:40px 0 20px}
.neb .done .tick{font-size:62px}
.neb .done h2{margin:10px 0 10px}

/* ---------- FAQ ---------- */
.neb details{background:var(--surface);border-radius:28px;padding:4px 22px;margin-bottom:14px;box-shadow:var(--clay-sm)}
.neb summary{cursor:pointer;font-weight:700;font-size:18px;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:56px;padding:10px 0}
.neb summary::-webkit-details-marker{display:none}
.neb summary::after{content:"+";flex:0 0 36px;height:36px;border-radius:50%;display:grid;place-items:center;background:var(--t-red);color:var(--red-text);
  font-family:var(--font-display);font-size:24px;line-height:1;box-shadow:var(--clay-xs)}
.neb details[open] summary::after{content:"–"}
.neb details p{color:var(--muted);padding-bottom:16px;font-size:17px}

/* ---------- footer bar ---------- */
.neb .foot{display:flex;align-items:center;gap:14px;width:calc(100% - 28px);max-width:520px;margin:12px auto 28px;padding:16px 24px;
  background:var(--t-green);border-radius:36px;box-shadow:var(--clay);font-weight:700;font-size:17px;line-height:1.6;text-align:start}

/* ---------- sticky order bar ---------- */
.neb .sticky{position:fixed;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:20;max-width:520px;margin:0 auto;
  background:var(--surface);border-radius:99px;box-shadow:var(--clay);padding:8px 10px 8px 14px;transition:transform .25s,opacity .25s}
.neb .sticky.off{transform:translateY(170%);opacity:0;pointer-events:none}
.neb .sticky .inner{display:flex;align-items:center;gap:14px}
.neb .sticky .p{font-family:var(--font-display);font-weight:800;font-size:22px;color:var(--red-text);white-space:nowrap;line-height:1.2;padding-inline-start:10px}
.neb .sticky .p small{display:block;font-family:var(--font-body);font-weight:500;font-size:12px;color:var(--muted)}
.neb .sticky .btn{font-size:19px;padding:12px 18px;flex:1}

/* ---------- wider screens ---------- */
@media (min-width:880px){
  .neb .wrap.wide{max-width:1040px}
  .neb .offer-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);grid-template-areas:"h f" "s f" "b f";column-gap:56px;text-align:start;padding:30px 0 56px}
  .neb .offer-hero h1{grid-area:h;align-self:end;font-size:44px}
  .neb .offer-hero .sub{grid-area:s;align-self:center;font-size:20px;margin-bottom:0;padding:14px 0 22px}
  .neb .offer-hero .frame{grid-area:f;margin-bottom:0}
  .neb .offer-hero > .btn{grid-area:b;align-self:start;max-width:380px}
  .neb .benefits{grid-template-columns:1fr 1fr}
  .neb .section h2{font-size:32px}
}

@media (prefers-reduced-motion:reduce){.neb *{transition:none!important}}`;

// every rule is scoped to `.neb.eng` (see note at the top of the file)
const CSS = RAW_CSS.replace(/\.neb/g, ".neb.eng");

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

// Decorative smiling star (no text, hidden from screen readers)
function Star({ className = "star" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <polygon
        points="32,10 38.8,24.7 54.8,26.6 42.9,37.6 46.1,53.4 32,45.5 17.9,53.4 21.1,37.6 9.2,26.6 25.2,24.7"
        fill="#FBD56B" stroke="#FBD56B" strokeWidth="8" strokeLinejoin="round"
      />
      <ellipse cx="25" cy="22" rx="5" ry="2.6" fill="#fff" opacity=".55" transform="rotate(-30 25 22)" />
      <circle cx="27" cy="34" r="2" fill="#4A3426" />
      <circle cx="37" cy="34" r="2" fill="#4A3426" />
      <path d="M28.5 38.8 Q32 42.6 35.5 38.8" fill="none" stroke="#4A3426" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="23.4" cy="38" r="2.3" fill="#F59B8A" opacity=".75" />
      <circle cx="40.6" cy="38" r="2.3" fill="#F59B8A" opacity=".75" />
    </svg>
  );
}

export default function NewEngBook({ backHref = "/" }) {
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
    <div className="neb eng" dir="rtl" lang="ar" style={{ paddingBottom: 110 }}>
      <style>{CSS}</style>
      <main>
        <div className="strip" />
        <div className="wrap wide">
          <div className="top">
            <a className="back" href={backHref}>‹ رجوع</a>
            <a className="phone" href="tel:0652651635" aria-label="اتصل بنا على 0652651635">0652651635</a>
          </div>

          <section className="offer-hero">
            <h1>ولدك يتعلم أول كلماتو بالإنجليزية... و هو يلعب</h1>
            <p className="sub">كتاب ناطق فيه +470 صوت و صور حقيقية. لمسة وحدة، و الكلمة تتنطق.</p>
            <div className="frame">
              <div className="strip" />
              <img src={bookCoverImage} alt="First English Words Sound Book cover" width="315" height="351" />
              <div className="product-gallery">
                <img src={bookTransportImage} alt="Transport words inside the English sound book" width="378" height="406" />
                <img src={bookTransportDetailImage} alt="More transport words in the English sound book" width="370" height="401" />
                <img src={bookSportsImage} alt="Sports words inside the English sound book" width="370" height="401" />
              </div>
              <div className="price-line"><Star /><span className="now">7900</span><span className="unit">دج</span></div>
            </div>
            <button className="btn" type="button" onClick={goOrder}>اطلب الآن – الدفع عند الاستلام</button>
          </section>
        </div>

        <section className="section">
          <div className="wrap wide">
            <h2>علاش الأولاد يحبوه؟</h2>
            <div className="benefits">
              <div className="ben"><div className="ico">🙌</div><div><h3>بلا شاشة</h3><p>يلعب بيديه و يلمس الصور، و عينيه بعيدين على التيليفون و التابلت.</p></div></div>
              <div className="ben"><div className="ico">🔊</div><div><h3>نطق صحيح من أول مرة</h3><p>يسمع الكلمة كيما تتنطق، مش كيما نقولوها حنا.</p></div></div>
              <div className="ben"><div className="ico">🧒</div><div><h3>يتعلم وحدو</h3><p>ما تحتاجش تعرف الإنجليزية باش تعلمو. الكتاب يدير الخدمة.</p></div></div>
              <div className="ben"><div className="ico">🦁</div><div><h3>+470 صوت</h3><p>حيوانات، خضر و فواكه، أكلات، أشياء نعرفوها... كل صورة و اصواتها.</p></div></div>
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
            <p className="steps-note">من 2 سنين حتى 13 سنة، كل واحد يبدأ من الكلمات اللي يعجبوه.</p>
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

        <section className="section" style={{ paddingTop: 34 }}>
          <div className="wrap">
            <h2>أسئلة يسقسيو عليها الأولياء</h2>
            {FAQ.map(([q, a]) => (
              <details key={q}><summary>{q}</summary><p>{a}</p></details>
            ))}
          </div>
        </section>

        <div className="foot"><Star />الدفع عند الاستلام · التوصيل مجاني لكل الولايات</div>

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
