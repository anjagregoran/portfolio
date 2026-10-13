// Settings Anja still needs to fill in.
// FORM_ENDPOINT: the address of a form service (for example Formspree or Web3Forms)
// that forwards messages to her email. While it is empty, the form does not send.
const FORM_ENDPOINT = "";

// English lives in index.html. Croatian lives here, one line per piece of text.
const HR = {
  "meta.title": "Anja Gregoran Jenul | Web dizajn za male poduzetnike",

  "nav.work": "Radovi",
  "nav.included": "Što je uključeno",
  "nav.prices": "Cijene",
  "nav.about": "O meni",
  "nav.contact": "Kontakt",

  "hero.label": "Kastav, Hrvatska · Marcellus, Michigan",
  "hero.title": "Dizajniram i izrađujem web stranice za <em>male poduzetnike</em> koji na internetu žele izgledati jednako dobro kao i uživo.",
  "hero.cta": "Javite mi se",

  "work.label": "Odabrani radovi",

  "p1.type": "Prevoditeljska agencija",
  "p1.line": "Prevoditeljska agencija željela je stranicu jednako profesionalnu kao i njezin rad, pa sam je iznova izgradila oko interaktivnog globusa i jednostavnog obrasca za ponudu.",
  "p1.before": "Prije",
  "p1.after": "Poslije",
  "p1.hint": "Povucite crtu i usporedite staru stranicu s novom",
  "p1.altNew": "Nova web stranica agencije Orbita prijevodi",
  "p1.altOld": "Stara web stranica agencije Orbita prijevodi",

  "p2.type": "Koncept kafića",
  "p2.line": "Koncept kafića na dvije adrese trebao je i prije otvorenja djelovati toplo i opušteno, pa sam osmislila smirenu stranicu s cijelim jelovnikom na jednom mjestu.",

  "p3.type": "Vodiči i trgovina",
  "p3.line": "Ovo je moja vlastita stranica za buduće učenike na razmjeni, izrađena na hrvatskom i engleskom, s vodičima korak po korak i trgovinom.",

  "ba.title": "Prije i poslije",

  "inc.label": "Što je uključeno",
  "inc.1t": "Dizajn",
  "inc.1d": "Oblikujem je prema vašem poslu, a nikada iz predloška.",
  "inc.2t": "Izrada",
  "inc.2d": "Svaku stranicu izrađujem tako da se dobro čita i na mobitelu i na računalu.",
  "inc.3t": "Vaša domena",
  "inc.3d": "Stranicu povezujem s vašom web adresom.",
  "inc.4t": "Kontakt obrazac",
  "inc.4d": "Poruke vaših kupaca stižu ravno u vašu e-poštu.",
  "inc.5t": "Održavanje",
  "inc.5d": "Nakon objave brinem o izmjenama i novom sadržaju.",

  "price.label": "Cijene",
  "price.1t": "Nova web stranica",
  "price.2t": "Mjesečno održavanje",
  "price.request": "Na upit",

  "about.label": "O meni",
  "about.p1": "Ja sam Anja. Dolazim iz Hrvatske, srednjoškolsku sam godinu razmjene provela u SAD-u, a danas godinu dijelim između Kastva i Marcellusa u Michiganu, pa radim i na hrvatskom i na engleskom.",

  "contact.label": "Kontakt",
  "contact.lead": "Napišite mi nekoliko riječi o svom poslu, a ja ću vam odgovoriti osobno.",

  "form.name": "Ime i prezime",
  "form.email": "E-pošta",
  "form.message": "Poruka",
  "form.send": "Pošaljite poruku",

  "ph.price": "Privremeno: početna cijena",
  "ph.fee": "Privremeno: mjesečna naknada",
  "ph.photo": "Privremeno: Anjina fotografija",
  "ph.social": "Privremeno: Instagram ili TikTok profil",
  "ph.form": "Privremeno: obrazac još nije povezan s adresom e-pošte, pa se poruke ne šalju.",

  "foot.line": "Kastav · Marcellus"
};

const STATUS = {
  en: {
    missing: "Please fill in your name, your email and a short message.",
    offline: "The form is not connected yet, so your message was not sent.",
    sending: "Sending your message.",
    sent: "Thank you, your message is on its way to me.",
    error: "Something went wrong, so please try again in a moment."
  },
  hr: {
    missing: "Molim vas da upišete ime, e-poštu i kratku poruku.",
    offline: "Obrazac još nije povezan, pa vaša poruka nije poslana.",
    sending: "Šaljem vašu poruku.",
    sent: "Hvala vam, vaša je poruka na putu do mene.",
    error: "Nešto je pošlo po zlu, pa vas molim da pokušate ponovno za koji trenutak."
  }
};
