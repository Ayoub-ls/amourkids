/*
  womenTheme.js  -  styling for the women pages (soft, warm, berry accent).
  Used by: woman-connectbaf  (cleanprob.jsx + cleanbook.jsx)
  Change the colors in the first block only.
*/
export const CSS = `@import url("https://fonts.googleapis.com/css2?family=Almarai:wght@400;700;800&family=Readex+Pro:wght@500;600;700&display=swap");
.cl{
  --bg:#FFF7F2; --bg2:#FFEDE6; --surface:#FFFFFF;
  --ink:#3A1B31; --soft:#503C49; --muted:#755F6F; --line:#F1DBD2;
  --accent:#B4235A; --accent-deep:#7C1240; --rose:#FFE0EA; --rose-soft:#FFF0F5;
  --peach:#FFE8D8; --mint:#DDF4EC; --gold:#FFD27F; --ok:#1E8F77; --err:#C2361B;
  --font-display:"Readex Pro","Almarai","Segoe UI",Tahoma,sans-serif;
  --font-body:"Almarai","Segoe UI",Tahoma,Arial,sans-serif;
  color-scheme:light;
}
.cl *,.cl *::before,.cl *::after{box-sizing:border-box}
.cl{margin:0;min-height:100vh;background:var(--bg);color:var(--soft);font-family:var(--font-body);font-size:18px;line-height:1.9;-webkit-text-size-adjust:100%;-webkit-font-smoothing:antialiased}
.cl img{max-width:100%;display:block}
.cl a{color:inherit}
.cl .wrap{max-width:520px;margin:0 auto;padding:0 20px}
.cl h1,.cl h2,.cl h3{font-family:var(--font-display);font-weight:700;line-height:1.55;margin:0;color:var(--ink)}
.cl p{margin:0}
.cl [hidden]{display:none!important}

/* divider: soft dots */
.cl .pills{height:12px;background:linear-gradient(90deg,#B4235A,#F08FB0,#FFC46B);
  -webkit-mask:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='22' height='12'><circle cx='6' cy='6' r='4.5'/></svg>") repeat-x;
  mask:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='22' height='12'><circle cx='6' cy='6' r='4.5'/></svg>") repeat-x}

/* buttons */
.cl .btn{display:block;width:100%;border:0;cursor:pointer;text-align:center;text-decoration:none;
  font-family:var(--font-display);font-weight:700;font-size:19px;line-height:1.6;color:#fff;
  background:var(--accent);padding:16px 22px;border-radius:999px;
  box-shadow:0 8px 22px rgba(180,35,90,.32);transition:transform .12s,box-shadow .12s}
.cl .btn:active{transform:translateY(3px);box-shadow:0 3px 10px rgba(180,35,90,.3)}
.cl .btn:disabled{opacity:.65}
.cl .btn:focus-visible,.cl .opt:focus-within,.cl summary:focus-visible,.cl input:focus-visible,.cl select:focus-visible,.cl .back:focus-visible{outline:3px solid var(--accent);outline-offset:3px}
.cl .btn small{display:block;font-family:var(--font-body);font-weight:400;font-size:14px;opacity:.92}

.cl .section{padding:46px 0}
.cl .section h2{font-size:27px;margin-bottom:24px}
.cl .section h2::after{content:"";display:block;width:46px;height:5px;border-radius:4px;background:linear-gradient(90deg,#B4235A,#F08FB0);margin-top:10px}
.cl .foot{padding:26px 0 40px;text-align:center;color:var(--muted);font-size:14px}

/* ===== page 1 ===== */
.cl .hero{padding:34px 0 42px;background:linear-gradient(180deg,#FFDDE8 0%,var(--bg) 100%);border-radius:0 0 40px 40px}
.cl .hero .chip{display:inline-block;background:#fff;color:var(--accent);border:1.5px solid #F6B9CD;font-family:var(--font-display);font-weight:600;font-size:15px;line-height:1.7;padding:2px 16px;border-radius:99px;margin-bottom:20px;box-shadow:0 4px 12px rgba(180,35,90,.12)}
.cl .hero h1{font-size:clamp(26px,7.6vw,34px);margin-bottom:18px}
.cl .hero .flip{color:var(--soft);font-size:18px;margin-bottom:28px}
@media (prefers-reduced-motion:no-preference){.cl .hero .btn{animation:nudge 2.4s ease-in-out 1.2s 2}
@keyframes nudge{0%,100%{transform:none}50%{transform:translateY(-5px)}}}
.cl .cards{display:grid;gap:14px}
.cl .card{display:flex;gap:14px;align-items:flex-start;background:var(--surface);border-radius:24px;padding:18px 16px;box-shadow:0 8px 24px rgba(120,50,80,.09);color:var(--soft)}
.cl .card .e{flex:0 0 52px;height:52px;display:grid;place-items:center;font-size:27px;line-height:1;border-radius:50%;background:var(--rose)}
.cl .card b{font-family:var(--font-display);font-weight:700;display:block;font-size:19px;line-height:1.6;margin-bottom:2px;color:var(--ink)}
.cl .reframe{background:linear-gradient(135deg,#B4235A,#8A1A4A);color:#fff;padding:46px 0;text-align:center;margin:0 16px;border-radius:36px}
.cl .reframe .big{font-family:var(--font-display);font-weight:700;font-size:clamp(25px,7vw,31px);line-height:1.65;margin-bottom:10px;color:#fff}
.cl .reframe .big em{font-style:normal;color:var(--gold)}
.cl .reframe p{font-size:18px;color:#FFE9F0}
.cl .cost p{margin-bottom:16px}
.cl .cost .hl{background:var(--peach);border:1.5px dashed #F0B79B;color:var(--ink);padding:16px 18px;border-radius:22px;font-weight:700}
.cl .peek{text-align:center}
.cl .peek figure{margin:0 0 28px}
.cl .peek img{width:100%;margin:0 auto;border-radius:28px;border:6px solid #fff;box-shadow:0 16px 36px rgba(120,50,80,.2)}
.cl .peek figcaption{margin-top:20px;font-size:17px;color:var(--muted)}

/* ===== page 2 ===== */
.cl .top{display:flex;align-items:center;justify-content:space-between;padding:14px 0}
.cl .back{background:none;border:0;font:inherit;font-size:15px;color:var(--muted);cursor:pointer;padding:6px 2px;text-decoration:none}
.cl .offer-hero{text-align:center;padding:6px 0 40px}
.cl .offer-hero h1{font-size:clamp(25px,7vw,31px);margin-bottom:14px}
.cl .offer-hero .sub{color:var(--soft);font-size:18px;margin-bottom:26px}
.cl .frame{background:var(--surface);border-radius:30px;overflow:hidden;box-shadow:0 16px 40px rgba(120,50,80,.18);margin-bottom:26px;padding-bottom:16px}
.cl .frame img{width:100%}
.cl .price-line{display:flex;align-items:baseline;justify-content:center;gap:10px;padding-top:12px}
.cl .price-line .now{font-family:var(--font-display);font-weight:700;font-size:42px;line-height:1.4;color:var(--accent)}
.cl .price-line .unit{font-weight:700;color:var(--ink)}
.cl .kit{display:grid;gap:12px}
.cl .item{display:flex;gap:14px;align-items:flex-start;background:var(--surface);border-radius:22px;padding:16px;box-shadow:0 6px 18px rgba(120,50,80,.08)}
.cl .item .ico{flex:0 0 52px;height:52px;border-radius:50%;display:grid;place-items:center;font-size:25px;background:var(--rose)}
.cl .item:nth-child(even) .ico{background:var(--peach)}
.cl .item h3{font-size:19px;margin-bottom:0}
.cl .item p{color:var(--muted);font-size:16.5px;line-height:1.8}
.cl .steps{display:grid;gap:16px;counter-reset:s}
.cl .step{display:flex;gap:14px;align-items:flex-start;font-weight:700;font-size:18px;line-height:1.8;color:var(--ink)}
.cl .step::before{counter-increment:s;content:counter(s);flex:0 0 42px;height:42px;border-radius:50%;background:var(--accent);color:#fff;display:grid;place-items:center;font-family:var(--font-display);font-size:20px}
.cl .steps-note{margin-top:18px;background:var(--peach);border-radius:18px;padding:12px 16px;font-size:16.5px;color:var(--ink)}

.cl .order{background:var(--bg2);padding:0 0 48px;border-radius:36px 36px 0 0}
.cl .order .pills{margin-top:22px}
.cl .order .inner{padding-top:30px}
.cl .order h2{font-size:28px;margin-bottom:6px}
.cl .order .lead{color:var(--soft);margin-bottom:24px}
.cl .opts{display:grid;gap:18px;margin-bottom:24px}
.cl .opt{position:relative;display:flex;align-items:center;gap:14px;border:2px solid transparent;border-radius:22px;padding:16px;cursor:pointer;background:var(--surface);box-shadow:0 6px 18px rgba(120,50,80,.08)}
.cl .opt input{position:absolute;opacity:0;inset:0;cursor:pointer}
.cl .opt .dot{flex:0 0 26px;height:26px;border-radius:50%;border:3px solid #D9B9C6;display:grid;place-items:center}
.cl .opt:has(input:checked){border-color:var(--accent);background:var(--rose-soft)}
.cl .opt:has(input:checked) .dot{border-color:var(--accent)}
.cl .opt:has(input:checked) .dot::after{content:"";width:12px;height:12px;border-radius:50%;background:var(--accent)}
.cl .opt .name{font-family:var(--font-display);font-weight:700;font-size:19px;line-height:1.6;color:var(--ink)}
.cl .opt .name span{display:block;font-family:var(--font-body);font-weight:400;font-size:15px;line-height:1.7;color:var(--muted)}
.cl .opt .cost-tag{flex:none;margin-inline-start:auto;text-align:left;font-family:var(--font-display);font-weight:700;font-size:22px;line-height:1.4;color:var(--accent);white-space:nowrap}
.cl .opt .save{position:absolute;top:-13px;inset-inline-end:16px;background:var(--ok);color:#fff;font-size:13px;font-weight:700;padding:2px 14px;border-radius:99px}
.cl label.f{display:block;font-weight:700;margin:0 0 6px;font-size:16.5px;color:var(--ink)}
.cl .field{margin-bottom:18px}
.cl .field input[type=text],.cl .field input[type=tel],.cl .field select{width:100%;font:inherit;font-size:17px;color:var(--ink);background:#fff;border:2px solid var(--line);border-radius:18px;padding:13px 16px;min-height:56px}
.cl .field select{height:56px}
.cl .field input:focus,.cl .field select:focus{border-color:var(--accent)}
.cl .field input::placeholder{color:#A58F9D}
.cl .err{color:var(--err);font-size:14px;font-weight:700;margin-top:4px}
.cl .row2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.cl .seg{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.cl .seg label{position:relative;border:2px solid var(--line);border-radius:18px;padding:13px 8px;text-align:center;font-weight:700;font-size:16px;cursor:pointer;background:#fff;color:var(--ink)}
.cl .seg input{position:absolute;opacity:0;inset:0;cursor:pointer}
.cl .seg label:has(input:checked){border-color:var(--accent);background:var(--rose-soft)}
.cl .seg label:focus-within{outline:3px solid var(--accent);outline-offset:2px}
.cl .total{display:flex;justify-content:space-between;align-items:center;background:var(--peach);border-radius:20px;padding:14px 18px;margin:8px 0 20px;font-weight:700;color:var(--ink)}
.cl .total strong{font-family:var(--font-display);font-size:26px;font-weight:700;color:var(--accent)}
.cl .trust{display:grid;gap:8px;margin-top:22px;font-size:16.5px;color:var(--soft)}
.cl .trust div::before{content:"✓";color:var(--ok);font-weight:800;margin-inline-end:8px}
.cl .done{text-align:center;padding:40px 0 20px}
.cl .done .tick{font-size:62px}
.cl .done h2{margin:10px 0 10px}
.cl details{border-bottom:1.5px solid var(--line);padding:16px 0}
.cl summary{cursor:pointer;font-weight:700;font-size:18px;line-height:1.7;list-style:none;display:flex;justify-content:space-between;gap:12px;color:var(--ink)}
.cl summary::-webkit-details-marker{display:none}
.cl summary::after{content:"+";font-family:var(--font-display);font-size:26px;line-height:1;color:var(--accent)}
.cl details[open] summary::after{content:"–"}
.cl details p{color:var(--soft);margin-top:8px;font-size:17px}
.cl .sticky{position:fixed;left:0;right:0;bottom:0;z-index:20;background:rgba(255,255,255,.96);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);box-shadow:0 -8px 24px rgba(120,50,80,.12);padding:10px 16px calc(10px + env(safe-area-inset-bottom,0px));transition:transform .25s}
.cl .sticky.off{transform:translateY(110%)}
.cl .sticky .inner{max-width:520px;margin:0 auto;display:flex;align-items:center;gap:14px}
.cl .sticky .p{font-family:var(--font-display);font-weight:700;font-size:22px;color:var(--accent);white-space:nowrap;line-height:1.4}
.cl .sticky .p small{display:block;font-family:var(--font-body);font-weight:400;font-size:12px;color:var(--muted)}
.cl .sticky .btn{font-size:17px;padding:12px 16px}`;
