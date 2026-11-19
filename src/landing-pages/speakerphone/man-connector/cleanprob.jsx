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
            <h1>كل مرة تروح للريباراتور علاجال الكونكتور?...<br />😮 المشكل ممكن يكون غير الوسخ </h1>
            <p className="flip">الغبار يتراكم في الكونكتور مرة على مرة، و يولي التيليفون ما يشارجيش مليح. و انت تقول راه تخسر</p>
            <a className="btn" href={ctaHref}>شوف كيفاش تنقيه بيدك وبلا ريباراتور 👈</a>
          </div>
        </section>

        <div className="pills" />

        <section className="section">
          <div className="wrap">
            <h2>عندك واحدة من هاذ الحالات؟</h2>
            <div className="cards">
              <div className="card"><span className="e">🔌</span><div><b>الشارجور ما يشدش</b>تحطو يشارجي، تحرك فيه شوية يحبس. و تولي تلوي في الكابل .</div></div>
              <div className="card"><span className="e">🔌</span><div><b>تبدل الكابل</b>تشري كابل جديد و مازال نفس المشكل. الكابل ما كانش هو المشكل</div></div>
              <div className="card"><span className="e">🛠️</span><div><b>الريباراتور</b>تروح، تستنى، و تخلص. الريباراتور ينيطواييه، بعد مدة يعاود يولي لنفس المشكل</div></div>
              <div className="card"><span className="e">📌</span><div><b>الدبوس</b>تدخل دبوس ولا عود في الكونكتور بروحك، و قلبك يدق: ان شاء الله مانخربوش.</div></div>
            </div>
          </div>
        </section>

        <section className="reframe">
          <div className="wrap">
            <div className="big">المشكل مش دايماً في <em>التليفون</em>.</div>
            <p>الوسخ يتراكم في الكونكتور، و الشاحن ما يوصلش مليح.</p>
          </div>
        </section>

        <section className="section cost">
          <div className="wrap">
            <h2>و لوكان ما تنقيهش؟</h2>
            <p>الوسخ يزيد يتراكم مع الوقت، و كل مرة تلوي في الشاحن بالقوة تزيد تخسر الكونكتور.</p>
            <p>وكي يخسر, التنظيف يولي مايكفيش, لازم تخلص دراهم أكثر باش تريباريه</p>
            <p className="hl">الخبر المليح؟ التنظيف ساهل، و تقدر ديرو في الدار.</p>
          </div>
        </section>

        <section className="section peek">
          <div className="wrap">
            <figure>
              <img src={kitImage} alt="كيت تنظيف الهاتف: فرشات، ملقط، ملصقات و سدادات" width="660" height="495" />
              <figcaption>كيت واحد ينقي و يحمي: فرشات، ملقط، سدادات و ملصقات.</figcaption>
            </figure>
            <a className="btn" href={ctaHref}>اكتشف الكيت اللي ينظف تليفونك 👈</a>
          </div>
        </section>

        <div className="pills" />
        <div className="foot wrap">الدفع عند الاستلام · التوصيل لكل الولايات</div>
      </main>
    </div>
  );
}
