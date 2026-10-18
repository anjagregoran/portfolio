// FORM_ENDPOINT: where the sign-up form sends, for example "https://formsubmit.co/ajax/YOUR@EMAIL"
// or a Formspree address. While it is empty, the form does not send.
const FORM_ENDPOINT = "https://formsubmit.co/ajax/anja.gregoran1@gmail.com";

// English lives in index.html. Croatian lives here, one line per piece of text.
const HR = {
  "meta.title": "Anja Gregoran Jenul | Web dizajn za male poduzetnike",

  "nav.work": "Moji radovi",
  "nav.services": "Što dobivate",
  "nav.start": "Započnimo suradnju",

  "hero.label": "Web dizajn za male poduzetnike",
  "hero.title": "Web stranice koje male poduzetnike predstavljaju u <em>najboljem svjetlu</em>.",
  "hero.work": "Pogledajte moje radove",
  "work.label": "Moji radovi",
  "work.title": "Prije i poslije",
  "work.p": "Odaberite projekt i povucite crtu da vidite kako je stranica izgledala na početku, a kako izgleda sada.",
  "about.p1": "Bok, ja sam Anja. Izrađujem web stranice za male poduzetnike. Pobrinut ću se da vaš posao na internetu izgleda jednako dobro kao i uživo.",

  "why.label": "Zašto je to važno",
  "why.num": "96 %",
  "why.p1": "kupaca smatra da je važno da lokalne tvrtke i obrti aktivno brinu o svojoj prisutnosti na internetu. Kad se neka tvrtka i na internetu predstavlja uredno i promišljeno, ljudi vjeruju da je jednako dobra i uživo.",
  "why.source": "Izvor: BrightLocal, istraživanje o ponašanju potrošača pri pretraživanju, 2026.",

  "p1.type": "Prevoditeljska agencija",
  "p2.type": "Kafić i brunch",
  "p3.type": "Vodiči za razmjenu",
  "p4.type": "Wellness i tečajevi",
  "p5.type": "Gastro vodič za putovanja",
  "p6.type": "Privatni kalendar, prikazan bez osobnih podataka",
  "p6.name": "Zajednički kalendar",

  "ba.before": "Prije",
  "ba.after": "Poslije",
  "ba.hint": "Povucite crtu i usporedite prije i poslije",
  "ba.drag": "Povucite za usporedbu",
  "ba.altNew": "Web stranica poslije",
  "ba.altOld": "Web stranica prije",
  "ba.visit": "Posjetite stranicu",

  "s.more": "Raspitajte se",
  "mq.aria": "Za koga izrađujem stranice",
  "mq.list": "Kafići · Restorani · Pekare · Apartmani · Kuće za odmor · Saloni · Brijačnice · Trgovine · Cvjećarnice · Vinarije · Teretane · Studiji · Fotografi · Agencije · ",
  "ba.dragShort": "Povucite",
  "s1.t": "Izrada stranice",
  "s1.d": "Osmišljavam i izrađujem cijelu stranicu kako bi vaš posao na internetu izgledao jednako dobro kao i uživo.",
  "s2.t": "Mjesečno održavanje",
  "s2.d": "Uz mjesečnu naknadu brinem da vaša stranica besprijekorno radi i uvijek bude ažurna.",
  "s3.t": "Izmjene kad god zatrebaju",
  "s3.d": "Kad god vam zatrebaju nove fotografije, cijene ili stranice, pobrinut ću se za to.",

  "q.text": "Bila sam oduševljena koliko je brzo sve bilo gotovo i koliko stranica izgleda profesionalno i lijepo. Naša stara stranica izgledala je zastarjelo, a sada sve izgleda predivno. I tekstovi su odlično napisani.",
  "q.role": "Vlasnica prevoditeljske agencije",

  "how.label": "Kako radim",
  "how.title": "Tri jednostavna koraka",
  "how.1t": "Razgovaramo",
  "how.1d": "Ispričate mi nešto o svom poslu i o tome što vam treba, a ja vam pošaljem plan i cijenu.",
  "how.2t": "Dizajniram i izrađujem",
  "how.2d": "Izrađujem vašu stranicu i usput vam je pokazujem, pa izmjene možete zatražiti prije nego što je objavimo.",
  "how.3t": "Stranica je online",
  "how.3d": "Povezujem je s vašom domenom, a nakon objave brinem o njoj i mijenjam je kad god vam zatreba.",

  "faq.label": "Pitanja",
  "faq.title": "Dobro je znati",
  "faq.1q": "Koliko traje izrada?",
  "faq.1a": "Rok dogovaramo zajedno. Jednostavna stranica može biti gotova za tjedan dana, ako na vrijeme dobijem vaše tekstove i fotografije.",
  "faq.2q": "Što vam trebam poslati?",
  "faq.2a": "Logotip, ako ga imate, nekoliko fotografija i nešto o svom poslu. Ako još nemate tekstove, pomoći ću vam da ih napišete.",
  "faq.3q": "A što je s mojom domenom?",
  "faq.3a": "Ako je već imate, novu stranicu povezujem s njom, a vaša e-pošta ostaje točno onakva kakva jest. Ako je nemate, pomoći ću vam da je odaberete i registrirate.",
  "faq.4q": "Može li stranica biti na hrvatskom i engleskom?",
  "faq.4a": "Može. Izrađujem stranice na jednom ili na oba jezika, što puno znači ako imate goste ili klijente iz inozemstva.",
  "faq.5q": "Što ako kasnije želim nešto promijeniti?",
  "faq.5a": "Samo mi pošaljite poruku s onim što želite promijeniti, a ja ću se za to pobrinuti u sklopu mjesečnog održavanja.",
  "faq.6q": "Koliko to košta?",
  "faq.6a": "Svakom poslu treba nešto drugo, pa vam nakon kratkog razgovora šaljem jasnu cijenu, bez iznenađenja.",

  "contact.label": "Započnimo suradnju",
  "contact.title": "Želite li profesionalnu web stranicu?",
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

  "contact.timeLabel": "Rok izrade",
  "contact.direct": "Javite mi se izravno",
  "contact.hr": "Hrvatska",
  "contact.us": "SAD",
  "contact.time": "Rok izrade dogovaramo zajedno, a ako vam se žuri, stranica može biti gotova i za tjedan dana."
};

const STATUS = {
  en: {
    missing: "Please fill in your name, your email and a few words about your business.",
    offline: "The form is not connected yet, so your message was not sent.",
    sending: "Sending.",
    sent: "Thank you, I will write back to you soon.",
    error: "The form could not send just now, but you can send the same message by email in one click.",
    mail: "Send by email"
  },
  hr: {
    missing: "Molim vas da upišete ime, e-poštu i nekoliko riječi o svom poslu.",
    offline: "Obrazac još nije povezan, pa vaša poruka nije poslana.",
    sending: "Šaljem.",
    sent: "Hvala vam, javit ću vam se uskoro.",
    error: "Obrazac trenutačno ne može poslati poruku, ali istu poruku možete poslati e-poštom jednim klikom.",
    mail: "Pošaljite e-poštom"
  }
};
