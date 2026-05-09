import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [gameData, setGameData] = useState({ word: '', meaning: '' });
  const [currentKey, setCurrentKey] = useState('');
  const [score, setScore] = useState(0);
  const [bgImage, setBgImage] = useState(`${process.env.PUBLIC_URL}/background.png`);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const pub = process.env.PUBLIC_URL;

  const bgOptions = {
    yes: [
      `${pub}/backgrounds/3.png`,
      `${pub}/backgrounds/5.png`,
      `${pub}/backgrounds/7.png`,
      `${pub}/backgrounds/11.png`,
      `${pub}/backgrounds/12.png`,
      `${pub}/backgrounds/16.png`,
    ],
    no: [
      `${pub}/backgrounds/4.png`,
      `${pub}/backgrounds/13.png`,
      `${pub}/backgrounds/14.png`,
      `${pub}/backgrounds/15.png`,
      `${pub}/backgrounds/17.png`,
      `${pub}/backgrounds/18.png`,
      `${pub}/backgrounds/19.png`,
    ],
  };

  const words = {
       شامخة: ["عالية", "عزيزة"],
    تلين: ["تذل", "تضعف"],
    الأطواد: "الجبال الشاهقة",
    العتاد: "الكل ما يستعد به",
    جمع_عتاد:["الأعتاد","الأعتدة"],
    شداد: "أقوياء",
    مضاد_شداد:"ضعفاء",
    مفرد_شداد:"شديد",
    القوى: ["الرماح", "السيوف"],
    مراد_القوى:"ما يعد للحرب من أسلحة",
    استعصموا: "استمسكوا",
    رقاد:"نوم عميق",
    مراد_رقاد:["كسل","راحة"],
    مضاد_رقاد:"يقظة",
    مراد_البناة:["المؤسسون","المشيدون للمجتمع"],
    مضاد_البناة:"الهادمون",
    مفرد_البناة:"الباني",
    مفرد_الشم:"الأشم و هو عالي",
    مؤنث_الشم:"الشماء",
    الذرا:"القمم",
    مضاد_الذرا:"السفوح",
    مفرد_الذرا:"الذرة",
    رواسخ:"ثوابت",
    مفرد_رواسخ:"راسخ",
    مضاد_الأطواد:"السهول",
    مفرد_الأطواد:"الطود",
    الجليلة: "العظيمة",
    السبق: ["التقدم", "التفوق"],
    غزارة: ["كثرة", "وفرة"],
    يعتريها: "يصيبها",
    مراد_المعمورة: "الأرض",
    تستوقد_جذورها: "تشتعل جذورها",
    تحاك: "تنسج",
    البساط: "السجادة",
    بهائها: ["جمالها", "حسنها"],
    مراد_النشء: "الجيل الجديد",
    مراد_روافد: "مصادر",
    الصبية: "الصغار",
    زبد: ["رغوة بيضاء تتكون على سطح الماء", "رغوة بيضاء"],
    ثغر: "فم",
    بسام: ["الكثير الابتسام", "الضحك بصوت عالي"],
    مائه_الضحل:"مائه القليل الذي لا عمق فيه",
    غورا: "عميقا",
    مزهوة: ["معجب ب", "معجب", "مفتخر ب", "فخور ب", "مفتخر", "فخور"],
    لطمة: "ضربة",
    يظفر: "ينال",
    ثغرة: ["فتحة", "ثقب"],
    صدعة: "شق",
    النوتية: "البحارة",
    الربابنة: "قادة السفن",
    نرهمبه: ["نخافه", "نخشاه"],
    نستوثق: ["نتثبت", "نتأكد"],
    متانة: "قوة",
    الفناء: "الهلاك",
    هوج: ["شديدة", "عنيفة", "متتابعة"],
    تنثرنا: ["تفرنا", "تلتقينا"],
    هباء: "غبارا",
    ولديها: ["طفلها", "طفلها حديث الولادة"],
    تحتوي: "تضم",
    السذج: "البسطاء",
    وردت:["جنت","أتيت الى"],
    ذمامي:["عهدي"],
    ثرى:["ترابا مبللا","أرضا","أرض","أرض مبللة"],
    جمع_ثرى:"أثراء",
    حواك:["أحاط بك","شملت"],
    مراد_ريان:["متفائلا","ممتلئا بالحياه","ممتلأ بالحياه"],
    أفقت:["استيقظط"],
    مضاد_أفقت:["نمت","غفوت"],
    مراد_أغز:"مشرق",
    طواك:"غطاك",
    مراد_سهمان:["حائرا","مهموما","حائر","مهموم"],
    سادرا:["متحيرا","مشتتا"],
    مراد_نبا_جنبي:"لم يطمئن",
    رقودي:"نومي",
    صفوا:"نقيا",
    مضاد_صفوا:["كدرا","عكرا"],
    زكت:["طابت","حسنت"],
    مضاد_زكت:"خبثت",
    خمائل:"أشجار ملتفة",
    مفرد_خمائل:"خميلة",
    نبعه:"مصدره",
    قصب:"سكر",
    مضاد_شامخة:["ذليلة","خاضعة"],
    مضاد_تلين:"تشتد",
    مفرد:"ملمح",
    مضاض_إنجاز:"بدء",
    مراد_مفادها:["خلاصتها","مضمونها"],
    الأصلية:["الكريمة","العريقة"],
    ملامحهم:"سماتهم المميزة",
    إتاحة:"توفير",
    إنجاز:["إكمال","إنهاء"],
    استعادة:"استرجاع",
    مضاد_جليلة:"حقيرة",
    مضاد_السبق:"المتأخر",
    مضاد_غزارة:["قلة","نذرة"],
    مراد_تستوقد_جذورها:"تستعيد مكانتها",
    مراد_تحاك:"تدبر",
    مراد_البساط:"المكانة",
    جمع_البساط:["البسط","الأبسطة"],
    مضاد_بهاءها:"قبحها",
    مفرد_روافد:"رافد",
    مفرد_الصبية:"الصبي",
    جمع_زبد:"أزباد",
    جمع_ثغر:"ثغور",
    مضاد_مائه_الضحل:"القليل",
    جمع_ضحل:["الأضحال","الصحال","الصحول"],
    جمع_غورا:"أغوارا",
    مضاد_يظفر:"يفقد",
    جمع_ثغرة:"ثغرات",
    جمع_صدعة:"صدعات",
    مفرد_النوتية:"النوتي",
    مفرد_الربابنة:"الربان",
    مضاد_نرهبه:"نأمنه",
    جمع_لطمة:"لطمات",
    مضاد_الفناء:["البقاء","النجاه"],
    مفرد_هوج:"هوجاء",
    جمع_أرجوحة:"أراجيح",
    جمع_وليدها:"ولدان",
    مفرد_السذج:"الساذج"
  };

  const pickNewWord = () => {
    const keys = Object.keys(words);
    const actualKey = keys[Math.floor(Math.random() * keys.length)];
    const displayWord = actualKey.replace(/_/g, ' ');

    setCurrentKey(actualKey);
    setGameData({
      word: displayWord,
      meaning: words[actualKey]
    });
  };

  useEffect(() => {
    pickNewWord();
  }, []);

  const checkAnswer = () => {
    const rawAnswers = words[currentKey];
    const validAnswers = Array.isArray(rawAnswers)
      ? rawAnswers
      : [rawAnswers];

    const isCorrect = validAnswers.includes(userInput.trim());

    if (userInput.trim() === '') {
      alert("Please enter an answer!");
      return;
    }

    const answerSource = rawAnswers ?? gameData.meaning;

    const correctText = Array.isArray(answerSource)
      ? answerSource.join(' أو ')
      : answerSource;

    if (isCorrect) {
      setScore(prev => prev + 1);

      setBgImage(
        bgOptions.yes[
          Math.floor(Math.random() * bgOptions.yes.length)
        ]
      );

      setFeedbackMessage('الإجابة صحيحة!');
    } else {
      setScore(prev => prev - 1);

      setBgImage(
        bgOptions.no[
          Math.floor(Math.random() * bgOptions.no.length)
        ]
      );

      setFeedbackMessage(`الإجابة الصحيحة: ${correctText}`);
    }

    setShowFeedback(true);
    setUserInput('');

    setTimeout(() => {
      setShowFeedback(false);
      setFeedbackMessage('');

      setBgImage(`${pub}/backgrounds/10.png`);

      pickNewWord();
    }, 2000);
  };

  return (
    <div
      className="game-container"
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >

      {/* FIRST SCREEN BACKGROUND (ABOVE EVERYTHING) */}
      {!isGameStarted && (
        <div
          style={{
            position: 'absolute',
      inset: 0,
      backgroundImage: `url(${pub}/background.png)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      zIndex: 60,
      pointerEvents: 'none',
          }}
        />
      )}

      {/* GAMEPLAY BACKGROUNDS (BEHIND CARD) */}
      {isGameStarted && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1,
            transition: '0.3s ease',
          }}
        />
      )}

      {/* FEEDBACK */}
      {showFeedback && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            backgroundColor: 'rgba(0,0,0,0.10)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              background: 'rgba(255,255,255,0.95)',
              padding: '30px 28px',
              borderRadius: '18px',
              maxWidth: '90%',
              color: '#262452',
              fontSize: '1.6rem',
              fontWeight: '700',
              lineHeight: 1.4,
              boxShadow: '0 14px 35px rgba(0,0,0,0.25)',
            }}
          >
            {feedbackMessage}
          </div>
        </div>
      )}

      {/* GAME CARD */}
      <div
        className="game-card"
        style={{
          position: 'relative',
    zIndex: isGameStarted ? 50 : 40,
    display: showFeedback ? 'none' : 'block',

        }}
      >
        {!isGameStarted ? (
          <div className="fade-in">
            <h1 className="title">معجمم</h1>

            <h2 className="brief">
              هنا هتلاقي كل معجب الصف الثامن
            </h2>

            <p className="note">
              خلي بالك عشان الهمزات بتتحسب فالكلمات اللي انت بتكتبها
            </p>

            <button
              className="btn-primary"
              style={{ marginTop: '20px' }}
              onClick={() => {
                setBgImage(`${pub}/backgrounds/10.png`);
                setIsGameStarted(true);
              }}
            >
              يلا ابدأ
            </button>
          </div>
        ) : (
          <div className="fade-in">
            <h1
              className="title"
              style={{ fontSize: '0.7rem' }}
            >
              Score: {score}
            </h1>

            <h1
              className="title"
              style={{ fontSize: '1.5rem' }}
            >
              {gameData.word}
            </h1>

            <input
              className="game-input"
              type="text"
              placeholder="اكتب هنا....."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) =>
                e.key === 'Enter' && checkAnswer()
              }
            />

            <button
              className="btn-primary"
              onClick={checkAnswer}
            >
              شوف صح ولا
            </button>

            <br />

            <button
              className="btn-secondary"
              onClick={() => {
                setIsGameStarted(false);
                setScore(0);
                setBgImage(`${pub}/background.png`);
              }}
            >
              ارجع من الأول
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;