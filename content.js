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

  "hero.label": "Web dizajn za male poduzetnike",
  "hero.title": "Dizajniram i izrađujem web stranice za <em>male poduzetnike</em> koji na internetu žele izgledati jednako dobro kao i uživo.",
  "hero.cta": "Javite mi se",
  "hero.place1": "Kastav, Hrvatska",
  "hero.place2": "Marcellus, Michigan, SAD",
  "hero.note": "Živim i radim na obje adrese, pa surađujem s klijentima i ovdje i ondje.",

  "work.label": "Odabrani radovi",
  "work.title": "Tri web stranice koje sam osmislila i izradila, od prve skice do posljednjeg detalja.",
  "work.need": "Što je klijentu trebalo",
  "work.needOwn": "Što je stranici trebalo",
  "work.built": "Što sam izradila",
  "work.visit": "Posjetite stranicu",

  "p1.type": "Prevoditeljska agencija · Redizajn",
  "p1.before": "Prije",
  "p1.after": "Poslije",
  "p1.hint": "Povucite crtu i usporedite staru stranicu s novom.",
  "p1.altNew": "Nova web stranica agencije Orbita prijevodi",
  "p1.altOld": "Stara web stranica agencije Orbita prijevodi",
  "p1.need": "Orbita je prevoditeljska agencija s uredima u Kastvu i Zagrebu. Željeli su stranicu koja izgleda jednako profesionalno kao i posao koji obavljaju te na kojoj klijent lako može zatražiti ponudu.",
  "p1.built": "Novu sam stranicu osmislila oko interaktivnog globusa koji putuje od jezika do jezika. Svih osam usluga i više od trideset jezika sada se lako pregledava, a obrazac za ponudu sam pripremi upit umjesto klijenta.",

  "p2.type": "Kafić i brunch · Konceptna stranica",
  "p2.alt": "Web stranica More Café & Brunch na zaslonu računala",
  "p2.need": "More je koncept kafića s brunchem, zamišljen za dvije adrese: Marcellus u Michiganu i Kastav u Hrvatskoj. Trebala mu je stranica koja već prije otvorenja dočarava ugođaj samog mjesta, opušten, topao i gostoljubiv.",
  "p2.built": "Osmislila sam smirenu stranicu u krem tonovima i zelenoj boji kadulje, s cijelim jelovnikom na jednom mjestu i zasebnom stranicom koja priča priču o dvama domovima, tako da gost zna što ga čeka i prije nego što uđe.",

  "p3.type": "Osobni brend · Vodiči i trgovina",
  "p3.alt": "Web stranica Abroad Life with Anja na zaslonu računala",
  "p3.need": "Ovo je moja vlastita stranica za učenike koji sanjaju o godini srednjoškolske razmjene u SAD-u. Trebala je na jednom mjestu okupiti moje vodiče, moju priču i moju zajednicu, na hrvatskom i na engleskom jeziku.",
  "p3.built": "Izradila sam dvojezičnu stranicu koja učenika korak po korak vodi od prve ideje do same razmjene. Vodiči stižu e-poštom, a uz njih su tu i stranica s paketom vodiča, trgovina te stranica za buduće host obitelji.",

  "inc.label": "Što je uključeno",
  "inc.title": "Sve što malom poduzetniku treba za internet, a o svemu brine jedna osoba.",
  "inc.1t": "Dizajn",
  "inc.1d": "Stranicu oblikujem prema vašem poslu, vašim bojama i načinu na koji razgovarate sa svojim kupcima, tako da nikada ne izgleda kao gotov predložak.",
  "inc.2t": "Izrada",
  "inc.2d": "Svaku stranicu izrađujem sama i pazim da se na mobitelu čita jednako dobro kao na računalu.",
  "inc.3t": "Vaša domena",
  "inc.3d": "Stranicu povezujem s vašom adresom, bez obzira na to imate li već domenu ili vam treba pomoć pri odabiru.",
  "inc.4t": "Kontakt obrazac",
  "inc.4d": "Kupci vam mogu pisati izravno sa stranice, a njihova poruka stiže ravno u vašu e-poštu.",
  "inc.5t": "Održavanje nakon objave",
  "inc.5d": "I nakon objave ostajem uz vas i brinem o izmjenama, novim fotografijama, novim cijenama i svemu ostalom što treba osvježiti.",

  "price.label": "Okvirne cijene",
  "price.title": "Cijenu svake stranice dogovaramo nakon kratkog razgovora.",
  "price.1t": "Nova web stranica",
  "price.1d": "Dizajn, izrada, povezivanje domene i kontakt obrazac.",
  "price.2t": "Mjesečno održavanje",
  "price.2d": "Izmjene i novi sadržaj nakon objave.",
  "price.request": "Na upit",
  "price.note": "Napišite mi nekoliko riječi o svom poslu i odgovorit ću vam s jasnom cijenom.",

  "about.label": "O meni",
  "about.title": "Bok, ja sam Anja.",
  "about.p1": "Dolazim iz Hrvatske, jednu sam srednjoškolsku godinu provela na razmjeni u SAD-u, a danas godinu dijelim između Kastva i Marcellusa u Michiganu. Zato jednako lako radim na hrvatskom i na engleskom, s klijentima s obiju strana oceana.",
  "about.p2": "Volim stranice koje djeluju smireno, izgledaju promišljeno i na kojima vas kupac lako pronađe i jednostavno vam se javi.",

  "contact.label": "Kontakt",
  "contact.title": "Recite mi nešto o svom poslu.",
  "contact.lead": "Za početak je dovoljno nekoliko rečenica, a ja ću vam odgovoriti osobno.",
  "contact.social": "Društvene mreže",

  "form.name": "Ime i prezime",
  "form.email": "E-pošta",
  "form.business": "Naziv tvrtke ili obrta (nije obavezno)",
  "form.message": "Poruka",
  "form.send": "Pošaljite poruku",

  "ph.price": "Privremeno: početna cijena",
  "ph.fee": "Privremeno: mjesečna naknada",
  "ph.photo": "Privremeno: Anjina fotografija",
  "ph.social": "Privremeno: Instagram ili TikTok profil",
  "ph.form": "Privremeno: obrazac još nije povezan s adresom e-pošte, pa se poruke ne šalju.",

  "foot.line": "Web dizajn za male poduzetnike · Kastav i Marcellus"
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
