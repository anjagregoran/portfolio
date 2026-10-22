// FORM_ENDPOINT: a form service address (for example Web3Forms). While it is empty,
// pressing Send opens the visitor's email app with the whole enquiry already filled in.
const FORM_ENDPOINT = "";

// CALL_URL: Anja's Cal.com booking link. While it is empty, "Choose a time" opens an email asking for a call.
const CALL_URL = "https://cal.com/anjawebsitedesign/30min";

// English lives in index.html. Croatian lives here, one line per piece of text.
const HR = {
  "meta.title": "Anja Gregoran Jenul | Web dizajn za male poduzetnike",

  "nav.work": "Moji radovi",
  "nav.services": "Kako radim",
  "nav.start": "Rezervirajte besplatan razgovor",
  "nav.menu": "Izbornik",

  "hero.label": "Web dizajn za male poduzetnike",
  "hero.title": "Web stranice koje <span class=\"alt\">male<br> poduzetnike</span> predstavljaju<br> u <em class=\"mark\">najboljem svjetlu</em>.",
  "hero.work": "Pogledajte moje radove",
  "work.label": "Moji radovi",
  "work.title": "Prije i poslije",
  "work.p": "Odaberite projekt i povucite crtu da vidite kako je stranica izgledala na početku, a kako izgleda sada.",
  "about.p1": "Pozdrav! Ja sam Anja iz Kastva, malog grada pokraj Rijeke, a obrazujem se u području poduzetništva na riječkom Ekonomskom fakultetu.",
  "about.p2": "Spajam znanje iz poduzetništva s kreativnošću i ljubavlju prema web dizajnu kako bih malim poduzetnicima pomogla izgraditi kvalitetnu i prepoznatljivu prisutnost na internetu. Izrađujem moderne i funkcionalne web stranice koje ističu ono što vaš posao čini posebnim.",

  "goal.main": "Izrađujem web stranice koje ne samo da izgledaju odlično, već i vjerno predstavljaju vaš posao, privlače nove klijente i ostavljaju <em>snažan prvi dojam</em>.",
  "goal.close": "Vaš posao zaslužuje izgledati jednako dobro na internetu kao i uživo.",

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
  "mq.list": "Konobe · Kafići · Pekare · Apartmani · Kuće za odmor · OPG-ovi · Slastičarnice · Frizerski saloni · Brijačnice · Cvjećarnice · Vinarije · Obrti · Teretane · Fotografi · Agencije · ",
  "ba.dragShort": "Povucite",
  "s1.t": "Razgovaramo",
  "s1.d": "Ispričate mi nešto o svom poslu i o tome što vam treba, a ja vam pošaljem plan i cijenu.",
  "s2.t": "Dizajniram i izrađujem",
  "s2.d": "Osmišljavam i izrađujem cijelu stranicu i usput vam je pokazujem, pa izmjene možete zatražiti prije objave.",
  "s3.t": "Stranica je online",
  "s3.d": "Povezujem je s vašom domenom i brinem da besprijekorno radi i na mobitelu i na računalu.",
  "s4.t": "Održavanje i izmjene",
  "s4.d": "Uz mjesečnu naknadu brinem da stranica uvijek bude ažurna, a nove fotografije, cijene ili stranice dodajem kad god vam zatrebaju.",

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

  "proof.1": "izrađenih web stranica",
  "proof.2": "jezika, hrvatski i engleski",
  "proof.3": "osoba, od prve ideje do objave",
  "svc.label": "Kako radim",
  "svc.title": "Od prvog razgovora do objave i nakon nje",
  "foot.tag": "Dizajn koji doživite, a ne samo vidite.",
  "intro.langs": "Stranice izrađujem na hrvatskom, engleskom ili na oba jezika.",
  "foot.nav": "Istražite",
  "foot.privacy": "Vaše podatke koristim isključivo kako bih vam odgovorila.",
  "foot.top": "Natrag na vrh",

  "contact.label": "Započnimo suradnju",
  "contact.title": "Želite li profesionalnu web stranicu?",
  "contact.p1": "Rezervirajte besplatan razgovor od 30 minuta.",

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
  "contact.direct": "Kontakt",
  "call.title": "Besplatan razgovor o web stranici",
  "call.meta": "30 min · Google Meet · Besplatno",
  "call.sub": "O čemu ćemo razgovarati",
  "call.l1": "Upoznamo vaš posao, ciljeve i ono što vam je najvažnije",
  "call.l2": "Pregledamo vašu prisutnost na internetu i pokažem vam što bi vam donijelo <em>više klijenata</em>",
  "call.l3": "Dobivate PDF s prijedlozima stilova i boja, kako biste lakše odabrali izgled koji vam odgovara",
  "call.l4": "Dogovorimo cijenu, rok i sljedeće korake, bez ikakve obveze",
  "call.btn": "Odaberite termin",
  "call.coffee": "Ako ste iz Rijeke ili okolice, možemo i na kavu.",
  "foot.made": "Izrađeno s ljubavlju u Kastvu",
  "local.label": "Razglednice s Kvarnera",
  "local.title": "Iz Kastva, za male poduzetnike <em>diljem Hrvatske</em>",
  "local.p": "Vjerujem da su mali obrti i tvrtke srce naših gradova i želim im pomoći da rastu i ostanu jaki, kako naše ulice ne bi preuzeli veliki lanci. Radim s konobama, salonima, apartmanima i obrtima od Kvarnera do Slavonije, a ako ste u blizini, rado dođem do vas.",
  "local.note": "Kvarner očima slikara Mencija Clementa Crnčića, prije više od sto godina.",
  "svc.tools": "Pratim što danas najbolje funkcionira na internetu i radim s najnovijim alatima, uključujući alate umjetne inteligencije, kako bi vaša stranica bila moderna i brza, a vas kupci lakše pronašli na Googleu.",
  "demo.label": "Primjer uživo",
  "demo.title": "Isprobajte kako bi <em>vaša stranica</em> mogla izgledati",
  "demo.p": "Odaberite djelatnost, boje i dodatke i pogledajte kako se stranica mijenja pred vama.",
  "contact.wa": "WhatsApp",
  "contact.viber": "Viber",
  "call.note": "Odaberete termin koji vam odgovara, a poveznicu za Google Meet dobivate e-poštom.",
  "contact.hr": "Hrvatska",
  "contact.us": "SAD",
  "contact.time": "Rok izrade dogovaramo <em>zajedno</em>, a ako vam se žuri, stranica može biti gotova i za tjedan dana."
};

const STATUS = {
  en: {
    missing: "Please fill in your name, your email and a few words about your business.",
    offline: "The form is not connected yet, so your message was not sent.",
    sending: "Sending.",
    sent: "Thank you, I will write back to you soon.",
    opened: "Your email app has opened with your message ready. Just press send and I will write back soon.",
    error: "The form could not send just now, but you can send the same message by email in one click.",
    mail: "Send by email"
  },
  hr: {
    missing: "Molim vas da upišete ime, e-poštu i nekoliko riječi o svom poslu.",
    offline: "Obrazac još nije povezan, pa vaša poruka nije poslana.",
    sending: "Šaljem.",
    sent: "Hvala vam, javit ću vam se uskoro.",
    opened: "Otvorila se vaša aplikacija za e-poštu s već pripremljenom porukom. Samo je pošaljite, a ja ću vam se uskoro javiti.",
    error: "Obrazac trenutačno ne može poslati poruku, ali istu poruku možete poslati e-poštom jednim klikom.",
    mail: "Pošaljite e-poštom"
  }
};
