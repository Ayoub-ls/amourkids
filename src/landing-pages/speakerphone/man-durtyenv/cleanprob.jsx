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
            <span className="chip">⚠️ خدمتك فيها غبار؟ تيليفونك يخلص</span>
            <h1>تخدم في بلاصة فيها غبار و تيليفونك معاك؟...<br />😮 الكونكتور و الباف راهم يتعمرو بالوسخ</h1>
            <p className="flip">كل نهار غبار و تراب يدخل في الكونكتور و الباف، و انت ما تشوفوش. و بعد مدة يولي التيليفون يحبس ما يشارجي و الصوت يولي ضعيف</p>
            <a className="btn" href={ctaHref}>شوف كيفاش تنقيه و تحميه من الغبار 👈</a>
          </div>
        </section>

        <div className="pills" />

        <section className="section">
          <div className="wrap">
            <h2>عندك واحدة من هاذ الحالات؟</h2>
            <div className="cards">
              <div className="card"><span className="e">🏗️</span><div><b>تيليفونك ديما معاك</b>في الجيب، في الخدمة، في وسط الغبار. تمسح الشاشة، و الداخل ما تنقيهش.</div></div>
              <div className="card"><span className="e">🔌</span><div><b>الشارجور ما يشدش</b>تحطو يشارجي، تحرك فيه شوية يحبس. و تولي تلوي في الكابل.</div></div>
              <div className="card"><span className="e">🔊</span><div><b>الصوت ضعيف</b>تهدر في التيليفون و ما تسمعش مليح، و تولي تقول لللي يهدر معاك: عاود، عاود.</div></div>
              <div className="card"><span className="e">🛠️</span><div><b>الريباراتور</b>تروح، تستنى، و تخلص . و كي ترجع للخدمة، الغبار يرجع يعمر التيليفون من جديد.</div></div>
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
            <p>وكي يخسر، لازم تخلص دراهم باش تريباريه: من 1500 حتى 10000 دج على حساب التيليفون و العطل.</p>
            <p className="hl">الخبر المليح؟ التنظيف ساهل، و تقدر ديرو في الدار. و كي تغطي الكونكتور و الباف، الغبار ما يدخلش بسهولة.</p>
          </div>
        </section>

        <section className="section peek">
          <div className="wrap">
            <figure>
              <img src={kitImage} alt="كيت تنظيف الهاتف: فرشات، ملقط، ملصقات و سدادات" width="660" height="495" />
              <figcaption>كيت واحد ينقي و يحمي: فرشات، ملقط، سدادات و ملصقات.</figcaption>
            </figure>
            <a className="btn" href={ctaHref}>اكتشف الكيت اللي ينقي و يحمي تيليفونك من الغبار 👈</a>
          </div>
        </section>

        <div className="pills" />
        <div className="foot wrap">الدفع عند الاستلام · التوصيل مجاني لكل الولايات</div>
      </main>
    </div>
  );
}
