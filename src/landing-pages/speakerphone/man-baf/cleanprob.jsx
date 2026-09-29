import React from "react";
import kitImage from '../images/kit.jpeg'
import { CSS } from "../themes/menThemeLight";

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
            <span className="chip">⚠️ قبل ما تشري تليفون جديد</span>
            <h1>كل مرة تروح للريباراتور على الباف؟...<br />😮 المشكل ممكن يكون غير الوسخ </h1>
            <p className="flip">الغبار يتراكم في الباف مرة على مرة، و يولي الصوت ضعيف و ما تسمعش مليح. و تولي تقول راه خسر</p>
            <a className="btn" href={ctaHref}>شوف كيفاش تنقيه بيدك وبلا ريباراتور 👈</a>
          </div>
        </section>

        <div className="pills" />

        <section className="section">
          <div className="wrap">
            <h2>عندك واحدة من هاذ الحالات؟</h2>
            <div className="cards">
              <div className="card"><span className="e">🔊</span><div><b>الصوت ضعيف</b>تهدر في التيليفون و ما تسمعش مليح، و تولي تقول لللي يهدر معاك: عاود، عاود.</div></div>
              <div className="card"><span className="e">📌</span><div><b>البرا</b> تحك في الباف بدبوس ولا بعود بروحك، و قلبك يدق: ان شاء الله مانخربوش.</div></div>
              <div className="card"><span className="e">🛠️</span><div><b>الريباراتور</b>تروح، تستنى، و تخلص باش يبدلك الباف. بعد مدة يعاود يولي لنفس المشكل.</div></div>
            </div>
          </div>
        </section>

        <section className="reframe">
          <div className="wrap">
            <div className="big">المشكل مش دايماً في <em>التليفون</em>.</div>
            <p>الوسخ يتراكم في الباف، و الصوت ما يخرجش مليح.</p>
          </div>
        </section>

        <section className="section cost">
          <div className="wrap">
            <h2>و لوكان ما تنقيهش؟</h2>
            <p>الوسخ يزيد يتراكم مع الوقت، و الباف يتسد أكثر و أكثر.</p>
            <p>وكي يخسر، لازم تخلص دراهم باش تريباريه: من 1500 حتى 5000 دج على حسب التيليفون.</p>
            <p className="hl">الخبر المليح؟ التنظيف ساهل، و تقدر ديرو في الدار.</p>
          </div>
        </section>

        <section className="section peek">
          <div className="wrap">
            <figure>
              <img src={kitImage} alt="كيت تنظيف الهاتف: فرشات، ملقط، ملصقات و سدادات" width="660" height="495" />
              <figcaption>كيت واحد ينقي و يحمي: فرشات، ملقط، سدادات و ملصقات.</figcaption>
            </figure>
            <a className="btn" href={ctaHref}>اكتشف الكيت اللي ينقي الباف تاعك 👈</a>
          </div>
        </section>

        <div className="pills" />
        <div className="foot wrap">الدفع عند الاستلام · التوصيل مجاني لكل الولايات</div>
      </main>
    </div>
  );
}
