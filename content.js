// FORM_ENDPOINT: where the sign-up form sends, for example "https://formsubmit.co/ajax/YOUR@EMAIL"
// or a Formspree address. While it is empty, the form does not send.
const FORM_ENDPOINT = "";

// English lives in index.html. Croatian lives here, one line per piece of text.
const HR = {
  "meta.title": "Anja Gregoran Jenul | Web dizajn za male poduzetnike",

  "nav.work": "Radovi",
  "nav.services": "Usluge",
  "nav.start": "Započnimo suradnju",

  "hero.label": "Web dizajn · Kastav i Marcellus",
  "hero.title": "Web stranice koje male poduzetnike predstavljaju u <em>najboljem svjetlu</em>.",
  "hero.services": "Što nudim",
  "about.p1": "Bok, ja sam Anja. Izrađujem web stranice za male poduzetnike, a vrijeme dijelim između Kastva i Marcellusa u Michiganu. Pobrinut ću se da vaš posao na internetu izgleda jednako dobro kao i uživo.",

  "why.label": "Zašto je to važno",
  "why.num": "77 %",
  "why.p1": "gostiju pogleda web stranicu restorana prije nego što ga posjeti, a gotovo 70 % njih odustalo je od nekog mjesta upravo zbog njegove web stranice. Kad neko mjesto i na internetu djeluje uredno i dobro vođeno, ljudi vjeruju da je jednako dobro i uživo.",
  "why.source": "Izvor: istraživanje tvrtke MGH na uzorku od 1101 odrasle osobe u SAD-u, 2019.",

  "p1.type": "Prevoditeljska agencija",
  "p2.type": "Kafić i brunch",
  "p3.type": "Vodiči za razmjenu",

  "ba.before": "Prije",
  "ba.after": "Poslije",
  "ba.hint": "Povucite crtu i usporedite prije i poslije",
  "ba.drag": "Povucite za usporedbu",
  "ba.altNew": "Web stranica poslije",
  "ba.altOld": "Web stranica prije",
  "ba.visit": "Posjetite stranicu",

  "s1.t": "Izrada stranice",
  "s1.d": "Osmišljavam i izrađujem cijelu stranicu tako da jednako dobro izgleda na mobitelu i na računalu.",
  "s2.t": "Mjesečno održavanje",
  "s2.d": "Uz mjesečnu naknadu brinem da vaša stranica besprijekorno radi i uvijek bude ažurna.",
  "s3.t": "Izmjene kad god zatrebaju",
  "s3.d": "Kad god vam zatrebaju nove fotografije, cijene ili stranice, pobrinut ću se za to.",

  "contact.label": "Započnimo suradnju",
  "contact.title": "Želite li i vi ovakvu stranicu?",
  "contact.p1": "Recite mi što vam treba, a ja ću vam odgovoriti s planom i cijenom.",

  "form.need": "Što vam treba?",
  "form.n1": "Nova web stranica",
  "form.n2": "Izmjene postojeće stranice",
  "form.n3": "Mjesečno održavanje",
  "form.n4": "Nešto drugo",
  "form.name": "Ime i prezime",
  "form.email": "E-pošta",
  "form.message": "Napišite mi nešto o svom poslu",
  "form.send": "Pošaljite",

  "ph.photo": "Foto",
  "ph.time": "Privremeno: koliko tjedana traje izrada stranice",
  "ph.form": "Privremeno: adresa e-pošte na koju stižu upiti"
};

const STATUS = {
  en: {
    missing: "Please fill in your name, your email and a few words about your business.",
    offline: "The form is not connected yet, so your message was not sent.",
    sending: "Sending.",
    sent: "Thank you, I will write back to you soon.",
    error: "Something went wrong, so please try again in a moment."
  },
  hr: {
    missing: "Molim vas da upišete ime, e-poštu i nekoliko riječi o svom poslu.",
    offline: "Obrazac još nije povezan, pa vaša poruka nije poslana.",
    sending: "Šaljem.",
    sent: "Hvala vam, javit ću vam se uskoro.",
    error: "Nešto je pošlo po zlu, pa vas molim da pokušate ponovno za koji trenutak."
  }
};
