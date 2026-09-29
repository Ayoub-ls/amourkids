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
            <span className="chip">⚠️ تعبتي من الريباراتور؟</span>
            <h1>كل مرة تروحي للريباراتور علاجال الصوت ولا الشحن؟...<br />😮 😮 المشكل ممكن يكون غير الوسخ</h1>
            <p className="flip">الغبار يتراكم في الباف و الميكرو و الكونكتور مرة على مرة، و يولي التيليفون ما يشارجيش مليح و الصوت ضعيف. و تولي تقولي راه خسر</p>
            <a className="btn" href={ctaHref}>شوفي كيفاش تنقيه بيدك وبلا ريباراتور 👈</a>
          </div>
        </section>

        <div className="pills" />

        <section className="section">
          <div className="wrap">
            <h2>عندك واحدة من هاذ الحالات؟</h2>
            <div className="cards">
              <div className="card"><span className="e">🔌</span><div><b>الشارجور ما يشدش</b> تحطيه يشارجي، تحركي فيه شوية يحبس. و تولي تلوي في الكابل.</div></div>
              <div className="card"><span className="e">🔊</span><div><b>الصوت ضعيف</b>تهدري في التيليفون و ما تسمعيش مليح، و تولي تقولي لللي يهدر معاك: عاود، عاود.</div></div>
              <div className="card"><span className="e">🎤</span><div><b>الميكرو</b>اللي يهدر معاك يقولك ما نسمعكش، و تعاودي كلامك مرتين.</div></div>
              <div className="card"><span className="e">🛠️</span><div><b>الريباراتور</b>تروحي، تستناي، و تخلصي. بعد مدة يعاود يولي لنفس المشكل.</div></div>
            </div>
          </div>
        </section>

        <section className="reframe">
          <div className="wrap">
            <div className="big">المشكل مش دايماً في <em>التليفون</em>.</div>
            <p>الغبار يدخل كل نهار في الكونكتور و الباف، و ماراهش رايح يخرجش وحدو</p>
          </div>
        </section>

        <section className="section cost">
          <div className="wrap">
            <h2>و لوكان ما تنقيهش و ما تغطيهش؟</h2>
            <p>الغبار يزيد يتراكم كل نهار، و التيليفون يتعمر لداخل بالوسخ.</p>
            <p>وكي يخسر، لازم تخلصي دراهم باش تريباريه: من 1500 حتى 10000 دج على حساب التيليفون و العطل.</p>
            <p className="hl">الخبر المليح؟ التنظيف ساهل، و تقدري ديريه في الدار. و كي تغطي الكونكتور و الباف، الغبار ما يدخلش بسهولة.</p>
          </div>
        </section>

        <section className="section peek">
          <div className="wrap">
            <figure>
              <img src={kitImage} alt="كيت تنظيف الهاتف: فرشات، ملقط، ملصقات و سدادات" width="660" height="495" />
              <figcaption>كيت واحد ينقي و يحمي: فرشات، ملقط، سدادات و ملصقات.</figcaption>
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
