// FORM_ENDPOINT: where the sign-up form sends, for example "https://formsubmit.co/ajax/YOUR@EMAIL"
// or a Formspree address. While it is empty, the form does not send.
const FORM_ENDPOINT = "";

// English lives in index.html. Croatian lives here, one line per piece of text.
const HR = {
  "meta.title": "Anja Gregoran Jenul | Web dizajn za male poduzetnike",

  "about.title": "Bok, ja sam <em>Anja</em>.",
  "about.p1": "Izrađujem web stranice za male poduzetnike, a vrijeme dijelim između Kastva i Marcellusa u Michiganu. Ispod pogledajte kako su neke od mojih stranica izgledale prije, a kako izgledaju sada.",

  "p1.type": "Prevoditeljska agencija",
  "p2.type": "Kafić i brunch",
  "p3.type": "Vodiči za razmjenu",

  "ba.before": "Prije",
  "ba.after": "Poslije",
  "ba.hint": "Povucite crtu i usporedite prije i poslije",
  "ba.altNew": "Web stranica poslije",
  "ba.altOld": "Web stranica prije",
  "ba.visit": "Posjetite stranicu",

  "contact.title": "Želite li i vi ovakvu stranicu?",
  "contact.p1": "Osmislit ću i izraditi cijelu stranicu, brinuti o njoj uz mjesečnu naknadu i mijenjati je kad god vam zatreba.",

  "form.need": "Što vam treba?",
  "form.n1": "Nova web stranica",
  "form.n2": "Izmjene postojeće stranice",
  "form.n3": "Mjesečno održavanje",
  "form.n4": "Nešto drugo",
  "form.name": "Ime i prezime",
  "form.email": "E-pošta",
  "form.message": "Napišite mi nešto o svom poslu",
  "form.send": "Pošaljite",

  "ph.photo": "Fotografija",
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
