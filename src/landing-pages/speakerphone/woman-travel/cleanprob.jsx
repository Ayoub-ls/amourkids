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
            <span className="chip">👜 تيليفونك ديما في الصاك؟</span>
            <h1>تيليفونك يدخل معاك للسوق، للطرونسبور، و يقعد في الصاك...<br />😮 الكونكتور و الباف راهم يتوسخو من كل هذا</h1>
            <p className="flip">في الصاك، التيليفون يخالط الدراهم، المفاتح، البودرة، و التراب تاع الطريق. كل هذا يدخل في الكونكتور و الباف بلا ما تحسي. و مع الوقت التيليفون يحبس ما يشارجي و الصوت يولي ضعيف.</p>
            <a className="btn" href={ctaHref}>شوفي كيفاش تنقيه بعد كل خرجة 👈</a>
          </div>
        </section>

        <div className="pills" />

        <section className="section">
          <div className="wrap">
            <h2>عندك واحدة من هاذ الحالات؟</h2>
            <div className="cards">
              <div className="card"><span className="e">👛</span><div><b>الصاك</b>التيليفون يخالط الدراهم و المفاتح و روجاليف، و هادو كامل يقعدو يتحككو في تيليفونك.</div></div>
              <div className="card"><span className="e">🚌</span><div><b>الطرونسبور</b>تركبي الحافلة ولا التاكسي، و التيليفون يقعد في يدك ولا في الصاك وسط الغاشي و التراب.</div></div>
              <div className="card"><span className="e">🛍️</span><div><b>المارشي</b>تمشي، تشري، و التيليفون يدخل معاك لكل بلاصة فيها غبار.</div></div>
              <div className="card"><span className="e">🛠️</span><div><b>الريباراتور</b>تروحي، تستناي، و تخلصي. و بعد شهر، نفس المشكل يرجع.</div></div>
            </div>
          </div>
        </section>

        <section className="reframe">
          <div className="wrap">
            <div className="big">المشكل مش دايماً في <em>التليفون</em>.</div>
            <p>الوسخ يدخل من الصاك و الطريق، و ماراهش رايح يخرجش وحدو</p>
          </div>
        </section>

        <section className="section cost">
          <div className="wrap">
            <h2>و لوكان ما تنقيهش و ما تغطيهش؟</h2>
            <p>الوسخ يزيد يتراكم مع كل مرة يلعبو بيه، و التيليفون يتعمر لداخل بالوسخ.</p>
            <p>وكي يخسر، لازم تخلصي دراهم باش تريباريه: من 1500 حتى 10000 دج على حساب التيليفون و العطل.</p>
            <p className="hl">الخبر المليح؟ التنظيف ساهل، و تقدري ديريه في الدار. و كي تغطي الكونكتور و الباف، الوسخ تاعهم ما يوصلش بسهولة.</p>
          </div>
        </section>

        <section className="section peek">
          <div className="wrap">
            <figure>
              <img src={kitImage} alt="كيت تنظيف الهاتف: فرشات، ملقط، ملصقات و سدادات" width="660" height="495" />
              <figcaption>كيت واحد ينقي و يحمي: فرشات، ملقط، سدادات و ملصقات.</figcaption>
            </figure>
            <a className="btn" href={ctaHref}>اكتشفي الكيت اللي ينقي و يحمي تيليفونك في التنقل 👈</a>
          </div>
        </section>

        <div className="pills" />
        <div className="foot wrap">الدفع عند الاستلام · التوصيل مجاني لكل الولايات</div>
      </main>
    </div>
  );
}
