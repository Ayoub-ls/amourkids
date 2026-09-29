import React from "react";
import kitImage from '../images/kit.jpeg'
import { CSS } from "../themes/womenTheme";

/*
  cleanprob.jsx  -  Page 1 of the funnel (the problem).
  Props:
    ctaHref    where the buttons go (your product page)   default "/kit"
    kitImage   product photo used in the teaser           default "/kit.jpg"
*/


export default function CleanProb({ ctaHref = "/kit" }) {
  return (
    <div className="cl" dir="rtl" lang="ar">
      <style>{CSS}</style>
      <main>
        <div className="pills" />

        <section className="hero">
          <div className="wrap">
            <span className="chip">✨ تحبي كلش يكون نقي؟</span>
            <h1>تنضفي التيليفون من برا كل يوم، الكاش، الشاشة...<br />😮 و الكونكتور و الباف كيفاش؟</h1>
            <p className="flip">لوسخ اللي ما تشوفيهش يتراكم في الكونكتور و الباف بالوقت، بلا ما تحسي بيه. و مع الوقت يولي التيليفون يحبس ما يشارجي و الصوت يولي ضعيف.</p>
            <a className="btn" href={ctaHref}>شوفي كيفاش تنقي تيليفونك من الداخل 👈</a>
          </div>
        </section>

        <div className="pills" />

        <section className="section">
          <div className="wrap">
            <h2>عندك واحدة من هاذ الحالات؟</h2>
            <div className="cards">
              <div className="card"><span className="e">🧴</span><div><b>من برا نقي</b>تمسحي الشاشة، الغلاف، الكاميرا مرة على مرة. تيليفونك يلمع من برا.</div></div>
              <div className="card"><span className="e">🔍</span><div><b>و من داخل؟</b>كي تشوفي في الكونكتور بالضو، ممكن تلقايه معمر بالوسخ و الغبار. و الباف ثاني.</div></div>
              <div className="card"><span className="e">📌</span><div><b>البرا</b>تحبي تنقيه، بصح تخافي تدخلي البرا ولا الدبوس و تخربيه.</div></div>
              <div className="card"><span className="e">🛠️</span><div><b>الريباراتور</b>و ما تحبيش تستناي حتى يحبس الشحن، و تروحي للريباراتور و تخلصي.</div></div>
            </div>
          </div>
        </section>

        <section className="reframe">
          <div className="wrap">
            <div className="big">المشكل مش دايماً في <em>التليفون</em>.</div>
            <p>الوسخ اللي ما تشوفيهش ماراهش رايح يخرجش وحدو</p>
          </div>
        </section>

        <section className="section cost">
          <div className="wrap">
            <h2>و لوكان ما تنقيهش و ما تغطيهش؟</h2>
            <p>الوسخ يزيد يتراكم، و التيليفون يتعمر لداخل بالوسخ.</p>
            <p>وكي يخسر، لازم تخلصي دراهم باش تريباريه: من 1500 حتى 10000 دج على حساب التيليفون و العطل.</p>
            <p className="hl">الخبر المليح؟ التنظيف ساهل، و تقدري ديريه في الدار. و كي تغطي الكونكتور و الباف، الوسخ تاعهم ما يوصلش بسهولة.</p>
          </div>
        </section>

        <section className="section peek">
          <div className="wrap">
            <figure>
              <img src={kitImage} alt="كيت تنظيف الهاتف: فرشات، ملقط، ملصقات و سدادات" width="660" height="495" />
              <figcaption>كيت واحد ينقي و يحمي: فرشات، ملقط، سدادات و ملصقات .</figcaption>
            </figure>
            <a className="btn" href={ctaHref}>اكتشفي الكيت اللي ينقي و يحمي تيليفونك 👈</a>
          </div>
        </section>

        <div className="pills" />
        <div className="foot wrap">الدفع عند الاستلام · التوصيل مجاني لكل الولايات</div>
      </main>
    </div>
  );
}
