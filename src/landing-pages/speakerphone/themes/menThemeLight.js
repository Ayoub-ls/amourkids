/*
  menThemeLight.js  -  light variant of the men theme (same lime accent, light background).
  Same class names and structure as menTheme.js, so it's a drop-in swap:
  just import from "./menThemeLight" instead of "./menTheme" for an A/B test.
*/
export const CSS = `@import url("https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;800&family=Tajawal:wght@400;500;700&display=swap");
.cl{
  --bg:#F5F6F1; --bg2:#ECEFE3; --surface:#FFFFFF; --surface2:#F0F3E8;
  --ink:#12151C; --soft:#31363F; --muted:#5C6472; --line:#DCE0D2;
  --accent:#7A9A00; --accent-ink:#FFFFFF; --accent-deep:#5A7300;
  --alert:#D14A1F; --alert-tint:#FDEAE2; --lime-tint:#EFF6D8; --ok:#0E9F6E; --err:#C23A1B;
  --font-display:"Cairo","Tajawal","Segoe UI",Tahoma,sans-serif;
  --font-body:"Tajawal","Segoe UI",Tahoma,Arial,sans-serif;
  color-scheme:light;
}
.cl *,.cl *::before,.cl *::after{box-sizing:border-box}
.cl{margin:0;min-height:100vh;background:var(--bg);color:var(--soft);font-family:var(--font-body);font-size:19px;line-height:1.85;-webkit-text-size-adjust:100%;-webkit-font-smoothing:antialiased}
.cl img{max-width:100%;display:block}
.cl a{color:inherit}
.cl .wrap{max-width:520px;margin:0 auto;padding:0 20px}
.cl h1,.cl h2,.cl h3{font-family:var(--font-display);font-weight:800;line-height:1.45;margin:0;color:var(--ink)}
.cl p{margin:0}
.cl [hidden]{display:none!important}

/* divider: the kit's mesh pills, in lime */
.cl .pills{height:10px;background:var(--accent);
  -webkit-mask:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='10'><rect width='24' height='10' rx='5'/></svg>") repeat-x;
  mask:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='10'><rect width='24' height='10' rx='5'/></svg>") repeat-x}

/* buttons */
.cl .btn{display:block;width:100%;border:0;cursor:pointer;text-align:center;text-decoration:none;
  font-family:var(--font-display);font-weight:800;font-size:21px;line-height:1.5;color:var(--accent-ink);
  background:var(--accent);padding:16px 20px;border-radius:16px;
  box-shadow:0 6px 0 var(--accent-deep),0 12px 24px rgba(122,154,0,.22);transition:transform .12s,box-shadow .12s}
.cl .btn:active{transform:translateY(4px);box-shadow:0 2px 0 var(--accent-deep)}
.cl .btn:disabled{opacity:.65}
.cl .btn:focus-visible,.cl .opt:focus-within,.cl summary:focus-visible,.cl input:focus-visible,.cl select:focus-visible,.cl .back:focus-visible{outline:3px solid var(--accent-deep);outline-offset:3px}
.cl .btn small{display:block;font-family:var(--font-body);font-weight:500;font-size:14px;opacity:.9}

.cl .section{padding:46px 0}
.cl .section h2{font-size:28px;margin-bottom:24px}
.cl .section h2::after{content:"";display:block;width:46px;height:5px;border-radius:4px;background:var(--accent);margin-top:10px}
.cl .foot{padding:26px 0 40px;text-align:center;color:var(--muted);font-size:14px}

/* ===== page 1 ===== */
.cl .hero{padding:34px 0 38px;background:linear-gradient(180deg,#EAF0D4 0%,var(--bg) 100%)}
.cl .hero .chip{display:inline-block;background:var(--alert-tint);color:var(--alert);border:1.5px solid var(--alert);font-family:var(--font-display);font-weight:800;font-size:15px;line-height:1.6;padding:2px 14px;border-radius:99px;margin-bottom:20px}
.cl .hero h1{font-size:clamp(28px,8.4vw,37px);margin-bottom:18px}
.cl .hero .flip{color:var(--soft);font-size:19px;margin-bottom:28px}
@media (prefers-reduced-motion:no-preference){.cl .hero .btn{animation:nudge 2.4s ease-in-out 1.2s 2}
@keyframes nudge{0%,100%{transform:none}50%{transform:translateY(-5px)}}}
.cl .cards{display:grid;gap:14px}
.cl .card{display:flex;gap:14px;align-items:flex-start;background:var(--surface);border:1px solid var(--line);border-inline-start:6px solid var(--alert);border-radius:20px;padding:18px 16px;color:var(--soft);box-shadow:0 6px 18px rgba(20,25,10,.05)}
.cl .card .e{flex:0 0 52px;height:52px;display:grid;place-items:center;font-size:28px;line-height:1;border-radius:14px;background:var(--alert-tint)}
.cl .card b{font-family:var(--font-display);display:block;font-size:20px;line-height:1.5;margin-bottom:2px;color:var(--ink)}
.cl .reframe{background:var(--ink);color:var(--bg);padding:50px 0;text-align:center}
.cl .reframe .big{font-family:var(--font-display);font-weight:800;font-size:clamp(27px,7.6vw,33px);line-height:1.6;margin-bottom:10px;color:var(--bg)}
.cl .reframe .big em{font-style:normal;color:var(--accent);background:none;padding:0}
.cl .reframe p{font-size:19px;font-weight:500;color:#C7CEBB}
.cl .cost p{margin-bottom:16px}
.cl .cost .hl{background:var(--lime-tint);border:1.5px solid var(--accent);color:var(--ink);padding:16px 18px;border-radius:18px;font-weight:700}
.cl .peek{text-align:center}
.cl .peek figure{margin:0 0 28px}
.cl .peek img{width:100%;margin:0 auto;border-radius:22px;border:4px solid var(--surface);box-shadow:0 18px 40px rgba(20,25,10,.16)}
.cl .peek figcaption{margin-top:20px;font-size:18px;color:var(--muted)}

/* ===== page 2 ===== */
.cl .top{display:flex;align-items:center;justify-content:space-between;padding:14px 0}
.cl .back{background:none;border:0;font:inherit;font-size:15px;color:var(--muted);cursor:pointer;padding:6px 2px;text-decoration:none}
.cl .offer-hero{text-align:center;padding:6px 0 38px}
.cl .offer-hero h1{font-size:clamp(27px,7.6vw,33px);margin-bottom:14px}
.cl .offer-hero .sub{color:var(--soft);font-size:19px;margin-bottom:26px}
.cl .frame{background:var(--surface);border:1px solid var(--line);border-radius:24px;overflow:hidden;box-shadow:0 14px 32px rgba(20,25,10,.12);margin-bottom:26px;padding-bottom:16px}
.cl .frame img{width:100%}
.cl .price-line{display:flex;align-items:baseline;justify-content:center;gap:10px;padding-top:12px}
.cl .price-line .now{font-family:var(--font-display);font-weight:800;font-size:44px;line-height:1.3;color:var(--alert)}
.cl .price-line .unit{font-weight:700;color:var(--ink)}
.cl .kit{display:grid;gap:12px}
.cl .item{display:flex;gap:14px;align-items:flex-start;background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:16px;box-shadow:0 4px 14px rgba(20,25,10,.05)}
.cl .item .ico{flex:0 0 52px;height:52px;border-radius:14px;display:grid;place-items:center;font-size:26px;background:var(--lime-tint)}
.cl .item h3{font-size:20px;margin-bottom:0}
.cl .item p{color:var(--muted);font-size:17px;line-height:1.7}
.cl .steps{display:grid;gap:16px;counter-reset:s}
.cl .step{display:flex;gap:14px;align-items:flex-start;font-weight:700;font-size:19px;line-height:1.7;color:var(--ink)}
.cl .step::before{counter-increment:s;content:counter(s);flex:0 0 42px;height:42px;border-radius:50%;background:var(--accent);color:#fff;display:grid;place-items:center;font-family:var(--font-display);font-size:21px}
.cl .steps-note{margin-top:18px;background:var(--alert-tint);border:1px solid var(--alert);border-radius:14px;padding:12px 16px;font-size:17px;color:var(--soft)}

.cl .order{background:var(--bg2);padding:0 0 48px}
.cl .order .inner{padding-top:36px}
.cl .order h2{font-size:29px;margin-bottom:6px}
.cl .order .lead{color:var(--soft);margin-bottom:24px}
.cl .opts{display:grid;gap:16px;margin-bottom:24px}
.cl .opt{position:relative;display:flex;align-items:center;gap:14px;border:2px solid var(--line);border-radius:18px;padding:16px;cursor:pointer;background:var(--surface)}
.cl .opt input{position:absolute;opacity:0;inset:0;cursor:pointer}
.cl .opt .dot{flex:0 0 26px;height:26px;border-radius:50%;border:3px solid var(--muted);display:grid;place-items:center}
.cl .opt:has(input:checked){border-color:var(--accent);background:var(--lime-tint)}
.cl .opt:has(input:checked) .dot{border-color:var(--accent)}
.cl .opt:has(input:checked) .dot::after{content:"";width:12px;height:12px;border-radius:50%;background:var(--accent)}
.cl .opt .name{font-family:var(--font-display);font-weight:800;font-size:20px;line-height:1.5;color:var(--ink)}
.cl .opt .name span{display:block;font-family:var(--font-body);font-weight:500;font-size:15px;line-height:1.6;color:var(--muted)}
.cl .opt .cost-tag{flex:none;margin-inline-start:auto;text-align:left;font-family:var(--font-display);font-weight:800;font-size:23px;line-height:1.3;color:var(--alert);white-space:nowrap}
.cl .opt .save{position:absolute;top:-13px;inset-inline-end:14px;background:var(--ok);color:#fff;font-size:13px;font-weight:800;padding:2px 12px;border-radius:99px}
.cl label.f{display:block;font-weight:700;margin:0 0 6px;font-size:17px;color:var(--ink)}
.cl .field{margin-bottom:18px}
.cl .field input[type=text],.cl .field input[type=tel],.cl .field select{width:100%;font:inherit;font-size:18px;color:var(--ink);background:var(--surface);border:2px solid var(--line);border-radius:14px;padding:13px 14px;min-height:56px}
.cl .field select{height:56px}
.cl .field input:focus,.cl .field select:focus{border-color:var(--accent)}
.cl .field input::placeholder{color:var(--muted);opacity:.8}
.cl .err{color:var(--err);font-size:14px;font-weight:700;margin-top:4px}
.cl .row2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.cl .seg{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.cl .seg label{position:relative;border:2px solid var(--line);border-radius:14px;padding:13px 8px;text-align:center;font-weight:700;font-size:17px;cursor:pointer;background:var(--surface);color:var(--ink)}
.cl .seg input{position:absolute;opacity:0;inset:0;cursor:pointer}
.cl .seg label:has(input:checked){border-color:var(--accent);background:var(--lime-tint)}
.cl .seg label:focus-within{outline:3px solid var(--accent);outline-offset:2px}
.cl .total{display:flex;justify-content:space-between;align-items:center;background:var(--surface2);border-radius:16px;padding:14px 18px;margin:8px 0 20px;font-weight:700;color:var(--ink)}
.cl .total strong{font-family:var(--font-display);font-size:27px;font-weight:800;color:var(--alert)}
.cl .trust{display:grid;gap:8px;margin-top:22px;font-size:17px;color:var(--soft)}
.cl .trust div::before{content:"✓";color:var(--ok);font-weight:800;margin-inline-end:8px}
.cl .done{text-align:center;padding:40px 0 20px}
.cl .done .tick{font-size:62px}
.cl .done h2{margin:10px 0 10px}
.cl details{border-bottom:1px solid var(--line);padding:16px 0}
.cl summary{cursor:pointer;font-weight:700;font-size:19px;line-height:1.6;list-style:none;display:flex;justify-content:space-between;gap:12px;color:var(--ink)}
.cl summary::-webkit-details-marker{display:none}
.cl summary::after{content:"+";font-family:var(--font-display);font-size:26px;line-height:1;color:var(--accent-deep)}
.cl details[open] summary::after{content:"–"}
.cl details p{color:var(--soft);margin-top:8px;font-size:18px}
.cl .sticky{position:fixed;left:0;right:0;bottom:0;z-index:20;background:rgba(245,246,241,.94);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);border-top:1px solid var(--line);padding:10px 16px calc(10px + env(safe-area-inset-bottom,0px));transition:transform .25s}
.cl .sticky.off{transform:translateY(110%)}
.cl .sticky .inner{max-width:520px;margin:0 auto;display:flex;align-items:center;gap:14px}
.cl .sticky .p{font-family:var(--font-display);font-weight:800;font-size:23px;color:var(--alert);white-space:nowrap;line-height:1.3}
.cl .sticky .p small{display:block;font-family:var(--font-body);font-weight:500;font-size:12px;color:var(--muted)}
.cl .sticky .btn{font-size:18px;padding:12px 14px}`;
