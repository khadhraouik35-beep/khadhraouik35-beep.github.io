document.addEventListener("DOMContentLoaded", async ()=>{

/* =====================================================
   GET USER COUNTRY (OPEN & FREE)
   ===================================================== */
async function getCountryLang(){
  try{
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();

    const countryLangMap = {
      TN:"ar", DZ:"ar", MA:"ar", EG:"ar", SA:"ar",
      FR:"fr", BE:"fr", CA:"fr",
      ES:"es", MX:"es",
      DE:"de",
      IT:"it",
      TR:"tr",
      RU:"ru"
    };

    return countryLangMap[data.country] || data.languages?.split(",")[0]?.substring(0,2) || "en";
  }catch(e){
    return (navigator.language || "en").substring(0,2);
  }
}

const lang = await getCountryLang();

/* ===== TRANSLATIONS ===== */
const i18n = {
  en:{home:"Home",trends:"Trends",weather:"Weather",football:"Football",
      markets:"Markets",currency:"Currency",maps:"Maps",about:"About",privacy:"Privacy",
      title:"Daily News Hub",time:"Local time"},
  fr:{home:"Accueil",trends:"Tendances",weather:"Météo",football:"Football",
      markets:"Marchés",currency:"Devises",maps:"Cartes",about:"À propos",privacy:"Confidentialité",
      title:"Centre d’actualités",time:"Heure locale"},
  ar:{home:"الرئيسية",trends:"الترند",weather:"الطقس",football:"كرة القدم",
      markets:"الأسواق",currency:"العملات",maps:"الخرائط",about:"من نحن",privacy:"الخصوصية",
      title:"مركز الأخبار اليومي",time:"الوقت المحلي"}
};

const L = i18n[lang] || i18n.en;

/* ===== APPLY STATIC TEXT ===== */
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

/* ===== TIME ===== */
const clock = document.getElementById("clock");
if(clock){
  setInterval(()=>{
    const now = new Date();
    clock.innerText =
      `${L.time}: ${now.toLocaleTimeString(lang)} | ${now.toLocaleDateString(lang)}`;
  },1000);
}

/* =====================================================
   AUTO TRANSLATION BY COUNTRY LANGUAGE
   ===================================================== */

if(lang !== "en"){

  const API = "https://api.mymemory.translated.net/get";

  const nodes = [];
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  while(walker.nextNode()){
    const node = walker.currentNode;
    if(
      node.nodeValue.trim().length > 2 &&
      !node.parentElement.closest("script,style,textarea")
    ){
      nodes.push(node);
    }
  }

  for(const node of nodes){
    try{
      const text = node.nodeValue;
      const res = await fetch(
        `${API}?q=${encodeURIComponent(text)}&langpair=en|${lang}`
      );
      const data = await res.json();
      if(data.responseData){
        node.nodeValue = data.responseData.translatedText;
      }
    }catch(e){}
  }
}

});