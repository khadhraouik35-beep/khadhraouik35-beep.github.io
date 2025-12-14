const lang = (navigator.language || "en").substring(0,2);

/* ===== TRANSLATIONS ===== */
const i18n = {
  en:{
    home:"Home",trends:"Trends",weather:"Weather",football:"Football",
    markets:"Markets",currency:"Currency",maps:"Maps",about:"About",privacy:"Privacy",
    title:"Daily News Hub",
    time:"Local time"
  },
  fr:{
    home:"Accueil",trends:"Tendances",weather:"Météo",football:"Football",
    markets:"Marchés",currency:"Devises",maps:"Cartes",about:"À propos",privacy:"Confidentialité",
    title:"Centre d’actualités",
    time:"Heure locale"
  },
  ar:{
    home:"الرئيسية",trends:"الترند",weather:"الطقس",football:"كرة القدم",
    markets:"الأسواق",currency:"العملات",maps:"الخرائط",about:"من نحن",privacy:"الخصوصية",
    title:"مركز الأخبار اليومي",
    time:"الوقت المحلي"
  }
};

const L = i18n[lang] || i18n.en;

/* ===== APPLY TEXT ===== */
document.querySelectorAll("[data-i18n]").forEach(el=>{
  const key = el.dataset.i18n;
  if(L[key]) el.innerText = L[key];
});

/* ===== RTL ===== */
if(lang==="ar"){
  document.body.dir="rtl";
  document.documentElement.lang="ar";
}else{
  document.body.dir="ltr";
  document.documentElement.lang=lang;
}

/* ===== TIME (INDEX ONLY) ===== */
const clock = document.getElementById("clock");
if(clock){
  setInterval(()=>{
    const now = new Date();
    clock.innerText =
      `${L.time}: ${now.toLocaleTimeString(lang)} | ${now.toLocaleDateString(lang)}`;
  },1000);
}