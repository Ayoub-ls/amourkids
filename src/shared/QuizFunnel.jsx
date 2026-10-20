import React, { useEffect, useState } from "react";
import OrderFormQuiz from "./OrderFormQuiz";
import quizVideo from "./images/eng/QUIZ.mp4";

const PRICE = { 1: 7900, 2: 6900, 4: 5900 };
const OFFERS = [
  { q: 1, title: "كتاب واحد", note: "باش تبدأو", per: false },
  { q: 2, title: "كتابين", note: "6900 دج للكتاب • 13800 دج", save: "وفّر 2000 دج", per: true },
  { q: 4, title: "4 كتب", note: "5900 دج للكتاب • 23600 دج", save: "وفّر 8000 دج", per: true },
];

function buildQuestions(gender) {
  const isGirl = gender === "بنت 👧";

  return [
    {
      key: "age",
      question: "شحال من عام عند طفلك؟",
      answers: ["2–3 سنين", "4–5 سنين", "6–7 سنين", "8–10 سنين", "أكثر من 10 سنين"],
    },
    {
      key: "gender",
      question: "ولد ولا بنت؟",
      answers: ["ولد 👦", "بنت 👧"],
    },
    {
      key: "level",
      question: isGirl ? "كيفاش راه مستوى بنتك في الإنجليزية؟" : "كيفاش راه مستوى ولدك في الإنجليزية؟",
      answers: isGirl
        ? ["ما تعرفش تقريباً كلمات بالإنجليزية", "تعرف شوية كلمات بسيطة", "تفهم بعض الكلمات بصح صعيب عليها تنطقهم", "تعرف بزاف كلمات بالإنجليزية"]
        : ["ما يعرفش تقريباً كلمات بالإنجليزية", "يعرف شوية كلمات بسيطة", "يفهم بعض الكلمات بصح صعيب عليه ينطقهم", "يعرف بزاف كلمات بالإنجليزية"],
    },
    {
      key: "goal",
      question: isGirl ? "وش حابة أكثر تتعلم بنتك في الإنجليزية؟" : "وش حاب أكثر يتعلم ولدك في الإنجليزية؟",
      answers: isGirl
        ? ["كلمات جديدة", "النطق الصحيح", "الحفظ بطريقة أسهل", "تبدأ تتعلم الإنجليزية من الصفر", "تحضر للمدرسة"]
        : ["كلمات جديدة", "النطق الصحيح", "الحفظ بطريقة أسهل", "يبدأ يتعلم الإنجليزية من الصفر", "يحضر للمدرسة"],
    },
    {
      key: "learningStyle",
      question: isGirl ? "كيفاش تحب بنتك تتعلم أكثر؟" : "كيفاش يحب ولدك يتعلم أكثر؟",
      answers: ["بالصور 👀", "بالسماع 👂", "باللعب والضغط على الأشياء 🎮", "بالكتابة ✍️", "ما نعرفش"],
    },
    {
      key: "problem",
      question: isGirl
        ? "وش هي أكبر حاجة تصعّب عليك تعليم الإنجليزية لبنتك؟"
        : "وش هي أكبر حاجة تصعّب عليك تعليم الإنجليزية لولدك؟",
      answers: isGirl
        ? ["ما نعرفش من وين نبدأ", "ما عنديش الوقت بزاف", "بنتي تتشتت بسرعة", "تحفظ الكلمة وبعد تنساها", "أنا ما نهدرش الإنجليزية مليح"]
        : ["ما نعرفش من وين نبدأ", "ما عنديش الوقت بزاف", "ولدي يتشتت بسرعة", "يحفظ الكلمة وبعد ينساها", "أنا ما نهدرش الإنجليزية مليح"],
    },
  ];
}

/*
  Style: clean and calm. Indigo accent, soft borders, light shadows, Tajawal only.
  OrderForm class names (.opts .opt .field .f .row2 .seg .total .btn .trust .err .done) are kept.
*/
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');
.qf{--ink:#332B21;--muted:#8A7A68;--bg:#F6F1E7;--line:#E6DCC8;--brand:#A9733B;--brand-dark:#8A5B2A;--brand-soft:#F1E3CC;--green:#5F7A52;--green-soft:#EEF2E6;--amber:#F3DDA8;
  min-height:100vh;background:var(--bg);color:var(--ink);font-family:Tajawal,"Segoe UI",Tahoma,sans-serif;line-height:1.7;padding:28px 16px 64px}
.qf *{box-sizing:border-box}
.qf-shell{max-width:540px;margin:0 auto}

.qf-head{text-align:center;margin:0 0 26px}
.qf-badge{display:inline-block;background:var(--amber);color:#6B4700;border-radius:999px;padding:3px 14px;font-size:14px;font-weight:700}
.qf-head h1{font-size:25px;font-weight:800;line-height:1.5;margin:12px auto 0;max-width:440px;text-wrap:balance}

.qf-progress-copy{display:flex;justify-content:space-between;color:var(--muted);font-size:14px;font-weight:500;margin:0 2px 8px}
.qf-progress{display:grid;grid-auto-flow:column;grid-auto-columns:1fr;gap:5px}
.qf-progress span{height:6px;border-radius:999px;background:#E8DEC9;transition:background .3s}
.qf-progress span.is-done,.qf-progress span.is-now{background:var(--brand)}
.qf-progress span.is-now{opacity:.55}

.qf-card{background:#FFFDF8;border:1px solid var(--line);border-radius:24px;box-shadow:0 12px 32px rgba(60,45,20,.08);padding:28px 20px 22px;margin-top:20px;animation:qf-in .25s ease both}
.qf-question{font-size:24px;font-weight:800;line-height:1.55;margin:0 0 22px;text-wrap:balance}

.qf-answers{display:grid;gap:12px}
.qf-answer{position:relative;display:block;width:100%;min-height:58px;padding:15px 18px;padding-inline-end:48px;border:1.5px solid var(--line);border-radius:16px;background:#FFFDF8;color:var(--ink);font:inherit;font-size:17px;font-weight:500;line-height:1.5;text-align:start;cursor:pointer;transition:border-color .15s,background .15s,box-shadow .15s}
.qf-answer:hover{border-color:var(--brand);background:#FBF6EC}
.qf-answer:active{background:var(--brand-soft)}
.qf-answer:focus-visible,.qf .btn:focus-visible,.qf .opt:has(input:focus-visible),.qf .seg label:has(input:focus-visible){outline:3px solid var(--brand);outline-offset:3px}
.qf-answer[disabled]{cursor:wait}
.qf-answer--selected{border-color:var(--brand);background:var(--brand-soft);font-weight:700}
.qf-answer--selected::after{content:"✓";position:absolute;inset-inline-end:14px;top:50%;transform:translateY(-50%);display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:var(--brand);color:#fff;font-size:14px;font-weight:800}

.qf-result{padding:30px 20px 24px}
.qf-result h2{font-size:26px;font-weight:800;line-height:1.5;margin:0 0 8px;text-wrap:balance}
.qf-result>p{margin:0;color:var(--muted);font-size:17px}
.qf-summary{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:22px 0}
.qf-summary div{background:#FBF3E6;border-radius:14px;padding:10px 14px;font-size:15px;font-weight:700;line-height:1.55}
.qf-summary b{display:block;color:var(--muted);font-size:13px;font-weight:500}
.qf-match{background:var(--green-soft);border-radius:14px;padding:14px 16px;margin:12px 0;font-weight:500;color:#35492B}
.qf-section-title{font-size:21px;font-weight:800;line-height:1.5;margin:28px 0 6px}
.qf-demo-video{display:block;width:100%;margin:18px 0;border:1px solid var(--line);border-radius:16px;background:#000;box-shadow:0 8px 20px rgba(60,45,20,.1)}
.qf-routine{font-size:16px!important;background:var(--brand-soft);border-radius:14px;padding:13px 16px;color:var(--brand-dark)!important;font-weight:500}

.qf-cta{background:#FBF3E6;border:1px solid #E6DCC8;border-radius:20px;margin-top:30px;padding:24px 16px 20px}
.qf-cta h3{font-size:23px;font-weight:800;margin:0 0 6px}
.qf-cta p{margin:0 0 20px;color:var(--muted)}

.qf .opts{display:grid;gap:14px;margin-bottom:20px}
.qf .opt{position:relative;display:flex;align-items:center;gap:12px;border:1.5px solid var(--line);border-radius:15px;padding:14px;cursor:pointer;background:#FFFDF8;transition:border-color .15s,background .15s}
.qf .opt input{position:absolute;opacity:0;inset:0;cursor:pointer}
.qf .opt .dot{width:22px;height:22px;border:2px solid #C9B99A;border-radius:50%;flex:0 0 22px;background:#fff}
.qf .opt:has(input:checked){border-color:var(--brand);background:var(--brand-soft)}
.qf .opt:has(input:checked) .dot{border:7px solid var(--brand)}
.qf .opt .name{font-weight:700}
.qf .opt .name span{display:block;color:var(--muted);font-size:13px;font-weight:400}
.qf .opt .cost-tag{margin-inline-start:auto;color:var(--brand-dark);font-weight:800}
.qf .opt .save{position:absolute;top:-11px;inset-inline-end:14px;background:var(--green);color:#fff;border-radius:99px;padding:0 10px;font-size:12px;font-weight:700}
.qf .field{margin-bottom:14px}
.qf .f{display:block;font-weight:700;margin-bottom:5px}
.qf input[type=text],.qf input[type=tel],.qf select{width:100%;font:inherit;font-size:16px;min-height:50px;border:1.5px solid var(--line);border-radius:12px;padding:10px 14px;background:#FFFDF8;color:var(--ink)}
.qf input[type=text]:focus,.qf input[type=tel]:focus,.qf select:focus{outline:none;border-color:var(--brand);box-shadow:0 0 0 3px rgba(169,115,59,.2)}
.qf .row2,.qf .seg{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.qf .seg label{position:relative;border:1.5px solid var(--line);border-radius:12px;padding:11px;text-align:center;font-weight:700;cursor:pointer;background:#FFFDF8}
.qf .seg input{position:absolute;opacity:0;inset:0}
.qf .seg label:has(input:checked){border-color:var(--brand);background:var(--brand-soft);color:var(--brand-dark)}
.qf .total{display:flex;justify-content:space-between;align-items:center;background:#FFFDF8;border:1px solid var(--line);border-radius:13px;padding:13px 16px;margin:8px 0 16px;font-weight:700}
.qf .total strong{font-size:23px;font-weight:800;color:var(--brand-dark)}
.qf .btn{width:100%;min-height:56px;border:0;border-radius:14px;padding:12px;background:var(--brand);color:#fff;font:inherit;font-size:18px;font-weight:800;cursor:pointer;box-shadow:0 8px 18px rgba(169,115,59,.32);transition:background .15s,transform .1s}
.qf .btn:hover{background:var(--brand-dark)}
.qf .btn:active{transform:scale(.99)}
.qf .btn:disabled{opacity:.6;cursor:wait}
.qf .trust{display:grid;gap:5px;color:var(--muted);font-size:14px;margin-top:16px}
.qf .trust div::before{content:"✓";color:var(--green);font-weight:900;margin-inline-end:6px}
.qf .err{color:#B3412B;font-size:13px;font-weight:700;min-height:17px}
.qf .done{text-align:center;padding:20px}
.qf .done .tick{font-size:52px}
.qf .done h2{margin:5px 0}
.qf .done p{color:var(--muted)}
.text-black{color:black}

@keyframes qf-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@media(max-width:420px){.qf{padding:22px 12px 56px}.qf-card{padding:24px 16px 18px}.qf-question{font-size:22px}.qf-answer{font-size:16.5px}.qf-head h1{font-size:22px}.qf-summary{grid-template-columns:1fr}.qf-step{font-size:14px}}
@media(prefers-reduced-motion:reduce){.qf *{animation:none!important;transition:none!important}}
`;

function personalizedNotes(answers) {
  const notes = [];
  if (answers.learningStyle === "بالصور 👀") notes.push("بما أن طفلك يحب يتعلم بالصور، طريقة الكتاب مناسبة له لأنها تربط كل كلمة بصورة واضحة.");
  if (answers.learningStyle === "بالسماع 👂") notes.push("بما أن طفلك يتعلم مليح بالسماع، سماع النطق مباشرة يساعده يسمع الكلمة الإنجليزية ويرجع يعاودها.");
  if (answers.learningStyle === "باللعب والضغط على الأشياء 🎮") notes.push("الضغط على الصور يخلي التعلم نشاط تفاعلي وممتع، ماشي غير حفظ.");
  if (answers.problem === "ما نعرفش من وين نبدأ") notes.push("ما تحتاجش تكون خبير في الإنجليزية. الكتاب يعطي الطفل كلمات بسيطة بطريقة منظمة وسهلة.");
  if (answers.problem === "طفلي يتشتت بسرعة") notes.push("بدل درس طويل، تقدر تخلي التعلم نشاط قصير: صورة → ضغطة → كلمة → تكرار.");
  if (answers.level === "ما يعرفش تقريباً كلمات بالإنجليزية") notes.push("إذا طفلك مازال في البداية، يقدر يبدأ بكلمات إنجليزية بسيطة مرتبطة بالصور.");
  if (answers.level === "يعرف شوية كلمات بسيطة" || answers.level === "يعرف بزاف كلمات بالإنجليزية") notes.push("إذا طفلك يعرف شوية كلمات، الكتاب يقدر يكون طريقة بسيطة باش يزيد يراجع ويكتسب كلمات جديدة.");
  return notes.length ? notes : ["الكتاب يجمع الصورة والصوت والتكرار بطريقة بسيطة تساعد الطفل يتعرف على كلمات جديدة."];
}

export default function QuizFunnel() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isAdvancing, setIsAdvancing] = useState(false);
  const QUESTIONS = buildQuestions(answers.gender);
  const question = QUESTIONS[step];
  const isResult = step === QUESTIONS.length;

  useEffect(() => {
    if (!isAdvancing) return undefined;
    const timer = window.setTimeout(() => {
      setStep((current) => current + 1);
      setIsAdvancing(false);
    }, 320);
    return () => window.clearTimeout(timer);
  }, [isAdvancing]);

  // jump back to the top when the result screen appears
  useEffect(() => {
    if (isResult) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [isResult]);

  function chooseAnswer(answer) {
    if (isAdvancing) return;
    setAnswers((current) => ({ ...current, [question.key]: answer }));
    setIsAdvancing(true);
  }

  const notes = personalizedNotes(answers);

  return (
    <div className="qf" dir="rtl" lang="ar">
      <style>{CSS}</style>
      <div className="qf-shell">
        <header className="qf-head">
          <div className="qf-badge">🇬🇧 اختبار صغير ومرح</div>
          <h1 className="text-black">اختبار صغير باش نعرفو كيفاش نعاونوا طفلك يتعلم الإنجليزية</h1>
        </header>

        {!isResult ? (
          <>
            <div className="qf-progress-copy">
              <span>السؤال {step + 1} من {QUESTIONS.length}</span>
              <span>{Math.round(((step + 1) / QUESTIONS.length) * 100)}%</span>
            </div>
            <div
              className="qf-progress"
              role="progressbar"
              aria-valuemin={1}
              aria-valuemax={QUESTIONS.length}
              aria-valuenow={step + 1}
              aria-label={`التقدم: السؤال ${step + 1} من ${QUESTIONS.length}`}
            >
              {QUESTIONS.map((q, i) => (
                <span key={q.key} className={i < step ? "is-done" : i === step ? "is-now" : ""} />
              ))}
            </div>
            <section className="qf-card" key={question.key} aria-live="polite">
              <h2 className="qf-question text-black">{question.question}</h2>
              <div className="qf-answers">
                {question.answers.map((answer) => (
                  <button
                    key={answer}
                    className={`qf-answer${answers[question.key] === answer ? " qf-answer--selected" : ""}`}
                    type="button"
                    onClick={() => chooseAnswer(answer)}
                    disabled={isAdvancing}
                  >
                    {answer}
                  </button>
                ))}
              </div>
            </section>
          </>
        ) : (
          <section className="qf-card qf-result" aria-live="polite">
            <h2 className="text-black">مليح! هذي طريقة بسيطة تقدر تناسب طفلك 🌟</h2>
            <p>حسب إجاباتك، طفلك يقدر يستافد بزاف من طريقة تعلم تعتمد على الصور + السماع + التكرار.</p>

            <div className="qf-summary">
              <div><b>عمر الطفل</b>{answers.age}</div>
              <div><b>مستواه الحالي</b>{answers.level}</div>
              <div><b>الهدف الرئيسي</b>{answers.goal}</div>
              <div><b>كيف يحب يتعلم</b>{answers.learningStyle}</div>
            </div>

            {notes.map((note) => <div className="qf-match" key={note}>{note}</div>)}

            <h3 className="qf-section-title">📖 علاش هذا الكتاب مناسب لطفلك؟</h3>
            <p>الكتاب يخلي الطفل يشوف الصورة، يضغط عليها، ويسمع الكلمة بالإنجليزية. هكذا يقدر يربط بين الصورة والكلمة والصوت بطريقة بسيطة وممتعة.</p>
            <video className="qf-demo-video" controls playsInline preload="metadata">
              <source src={quizVideo} type="video/mp4" />
              متصفحك لا يدعم تشغيل الفيديو.
            </video>
            <p className="qf-routine">تقدروا تستعملوه حتى غير 5–10 دقايق في اليوم كروتين صغير لتعلم كلمات جديدة.</p>

            <div className="qf-cta">
              <h3>جاهزين نبدأو؟ 🇬🇧</h3>
              <p>📚 إذا حبيت تبدأ مع طفلك، هذا هو الكتاب اللي صممناه باش يخليه يتعلم الكلمات الإنجليزية بالصور والسماع.</p>
              <OrderFormQuiz
                product="english-sound-book"
                variant="quiz"
                offers={OFFERS}
                price={PRICE}
                unitLabel="دج"
                defaultQty={1}
                quizAnswers={answers}
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
