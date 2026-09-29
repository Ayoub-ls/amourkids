import React from "react";

/*
  engprob.jsx  -  Page 1 of the funnel (the problem).
  Props:
    ctaHref   where the buttons go (your product page)   default "/book"
    bookImage product photo used in the teaser            default "/book.jpg"
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
.eng .hero{padding:34px 0 30px}
.eng .hero .age{display:inline-block;background:var(--yellow);color:#1B2A5C;font-weight:700;font-size:15px;padding:4px 14px;border-radius:99px;margin-bottom:18px;transform:rotate(-2deg)}
.eng .hero h1{font-size:34px;margin-bottom:16px}
.eng .hero .flip{font-family:var(--font-display);font-weight:700;font-size:22px;color:var(--red);margin-bottom:26px}
@media (prefers-reduced-motion:no-preference){.eng .hero .btn{animation:nudge 2.4s ease-in-out 1.2s 2}
@keyframes nudge{0%,100%{transform:none}50%{transform:translateY(-5px)}}}
.eng .section{padding:44px 0}
.eng .section h2{font-size:27px;margin-bottom:22px}
.eng .bubbles{display:grid;gap:14px}
.eng .bubble{padding:16px 18px;border-radius:20px;border-inline-start:8px solid;font-size:18px}
.eng .bubble b{font-family:var(--font-display);display:block;font-size:19px;margin-bottom:2px}
.eng .bubble:nth-child(1){background:var(--t-red);border-color:var(--red)}
.eng .bubble:nth-child(2){background:var(--t-blue);border-color:var(--blue)}
.eng .bubble:nth-child(3){background:var(--t-yellow);border-color:var(--yellow)}
.eng .bubble:nth-child(4){background:var(--t-green);border-color:var(--green)}
.eng .reframe{background:var(--ink);color:var(--bg);padding:44px 0;text-align:center}
.eng .reframe .big{font-family:var(--font-display);font-weight:800;font-size:30px;line-height:1.45;margin-bottom:14px}
.eng .reframe p{font-size:19px;opacity:.92}
.eng .cost p{margin-bottom:14px}
.eng .cost .hl{background:var(--t-yellow);padding:14px 18px;border-radius:16px;font-weight:700}
.eng .peek{text-align:center}
.eng .peek figure{margin:0 0 26px}
.eng .peek img{width:78%;margin:0 auto;border-radius:14px;transform:rotate(-3deg);box-shadow:0 14px 30px rgba(20,30,70,.28);border:6px solid #fff}
.eng .peek figcaption{margin-top:22px;font-size:18px;color:var(--muted)}
.eng .foot{padding:26px 0 40px;text-align:center;color:var(--muted);font-size:14px}`;

export default function EngProb({ ctaHref = "/book", bookImage = "/book.jpg" }) {
  return (
    <div className="eng" dir="rtl" lang="ar">
      <style>{CSS}</style>
      <main>
        <div className="strip" />

        <section className="hero">
          <div className="wrap">
            <span className="age">للأولاد من 2 حتى 12 سنة</span>
            <h1>
              جبتلو الكارطات، جبتلو الكتب...
              <br />
              و مازال ما يحبش الإنجليزية؟
            </h1>
            <p className="flip">المشكل ماشي فيه. المشكل في الطريقة.</p>
            <a className="btn" href={ctaHref}>
              شوف الطريقة اللي تخلي ولدك يطلبها بروحو 👈
            </a>
          </div>
        </section>

        <div className="strip" />

        <section className="section">
          <div className="wrap">
            <h2>تعرف هاذ المشاهد؟</h2>
            <div className="bubbles">
              <div className="bubble"><b>📇 مشهد الكارطات</b>قلتلو "عاود معايا". عاد 3 مرات... و بعدها راح يجري للعب و خلاك تحكي وحدك.</div>
              <div className="bubble"><b>📱 مشهد التابلت</b>عطيتو التابلت باش "يتعلم". ولا يتفرج ساعتين و ما يعرف حتى كلمة زيادة.</div>
              <div className="bubble"><b>🌙 مشهد الليل</b>و هو ناعس، تقعد تفكر: واش راني نقصر معاه؟ و الوقت راه يفوت...</div>
              <div className="bubble"><b>👀 مشهد القرابة</b>ولد خالتك أصغر منو، و يقولك Butterfly و Watermelon كيما واحد كبير.</div>
            </div>
          </div>
        </section>

        <section className="reframe">
          <div className="wrap">
            <div className="big">الطفل ما يتعلمش بالتلقين.</div>
            <p>يتعلم كي يلمس، و يسمع، و يعاود من روحو... لأنو حب اللعبة.</p>
          </div>
        </section>

        <section className="section cost">
          <div className="wrap">
            <h2>و كل شهر يفوت هكاك؟</h2>
            <p>كل شهر بلا طريقة تناسب ولدك هو شهر زايد من الملل، من الشاشة، و من الإحساس بالذنب.</p>
            <p>و الإنجليزية ما راهيش تستنى: في القراية، في الأنترنت، و في الخدمة غدوة.</p>
            <p className="hl">الخبر الزوين؟ ما تحتاجش تكون أستاذ، و لا تقعد معاه ساعات.</p>
          </div>
        </section>

        <section className="section peek">
          <div className="wrap">
            <figure>
              <img src={bookImage} alt="كتاب First English Words Sound Book: 470+ صوت" width="469" height="545" />
              <figcaption>
                تلمس الصورة... تسمع الكلمة بنطق صحيح.
                <br />
                هكاك بلا تلقين.
              </figcaption>
            </figure>
            <a className="btn" href={ctaHref}>
              اكتشف كيفاش يتعلم ولدك بالمتعة 👈
            </a>
          </div>
        </section>

        <div className="strip" />
        <div className="foot wrap">الدفع عند الاستلام · التوصيل مجاني لكل الولايات</div>
      </main>
    </div>
  );
}
