// "Change it live": a small pretend website next to the headline that visitors can restyle and extend.
// Each business has its own look: fonts, colours and layout.
(function () {
  const root = document.getElementById("demo");
  if (!root) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Colour sets per business. card is the colour of boxes like the booking form.
  const PALETTES = {
    apartments: {
      sea: { bg: "#f4f7f9", ink: "#14324a", accent: "#1f6f9a", soft: "#dde9f1", card: "#ffffff" },
      sand: { bg: "#f8f4ec", ink: "#3a3226", accent: "#a9824a", soft: "#ece2cf", card: "#ffffff" },
      olive: { bg: "#f4f4ec", ink: "#2f3a24", accent: "#6b7b3a", soft: "#e1e5cf", card: "#ffffff" },
      night: { bg: "#e9ecf2", ink: "#0f1d33", accent: "#0f1d33", soft: "#d3d9e5", card: "#ffffff" }
    },
    cafe: {
      terracotta: { bg: "#fbf1e6", ink: "#3d1f12", accent: "#c4562c", soft: "#f3dcc7", card: "#fffaf4" },
      mint: { bg: "#eef6f0", ink: "#1d3a2a", accent: "#2f8a5b", soft: "#d3eadb", card: "#ffffff" },
      butter: { bg: "#fdf6dc", ink: "#3b2f10", accent: "#d99a17", soft: "#f6e7b0", card: "#fffdf3" },
      berry: { bg: "#fbeff2", ink: "#3e1424", accent: "#b23a62", soft: "#f2d3dd", card: "#ffffff" }
    },
    salon: {
      blush: { bg: "#fbf3f1", ink: "#1a1414", accent: "#1a1414", soft: "#f1dcd7", card: "#ffffff" },
      sage: { bg: "#f2f4ef", ink: "#1b211b", accent: "#4f6b55", soft: "#dfe6db", card: "#ffffff" },
      stone: { bg: "#f3f1ee", ink: "#222222", accent: "#8a7a68", soft: "#e3ded6", card: "#ffffff" },
      noir: { bg: "#161414", ink: "#f4efe9", accent: "#e8c9bf", soft: "#2a2524", card: "#221e1d" }
    }
  };

  const UI = {
    en: {
      title: "Change it live", type: "Business", colour: "Colour", add: "Add",
      types: { apartments: "Apartments", cafe: "Café", salon: "Salon" },
      addons: { booking: "Booking", gallery: "Gallery", reviews: "Reviews", map: "Map" },
      note: "A demo site. Yours is built around your own business.", gallery: "Gallery", demo: "Demo"
    },
    hr: {
      title: "Promijenite je uživo", type: "Djelatnost", colour: "Boja", add: "Dodajte",
      types: { apartments: "Apartmani", cafe: "Kafić", salon: "Salon" },
      addons: { booking: "Rezervacije", gallery: "Galerija", reviews: "Recenzije", map: "Karta" },
      note: "Ovo je primjer stranice. Vaša se izrađuje po mjeri vašeg posla.", gallery: "Galerija", demo: "Primjer"
    }
  };

  const SITES = {
    apartments: {
      url: "villa-lavanda.hr", name: "Villa Lavanda", img: "apt",
      en: { tag: "Sea view apartments in Opatija", title: "Wake up to the sea.", links: ["Apartments", "Location", "Contact"], cta: "Book now",
        fields: ["Check in", "Check out", "Guests"], go: "Check availability",
        quote: "The view from the terrace was even better than the photos.", who: "Guest from Vienna", mapT: "Find us", mapD: "Five minutes from the beach" },
      hr: { tag: "Apartmani s pogledom na more u Opatiji", title: "Probudite se uz more.", links: ["Apartmani", "Lokacija", "Kontakt"], cta: "Rezervirajte",
        fields: ["Dolazak", "Odlazak", "Gosti"], go: "Provjerite dostupnost",
        quote: "Pogled s terase bio je još ljepši nego na fotografijama.", who: "Gost iz Beča", mapT: "Kako do nas", mapD: "Pet minuta od plaže" }
    },
    cafe: {
      url: "kavaikruh.hr", name: "Kava & Kruh", img: "cafe",
      en: { tag: "Coffee and fresh bread in Kastav", title: "Slow mornings start here.", links: ["Menu", "About", "Visit"], cta: "Reserve a table",
        fields: ["Date", "Time", "People"], go: "Reserve",
        quote: "The best croissant I have had outside Paris.", who: "Guest from Rijeka", mapT: "Find us", mapD: "On the old town square" },
      hr: { tag: "Kava i svježi kruh u Kastvu", title: "Ovdje počinju opuštena jutra.", links: ["Jelovnik", "O nama", "Posjetite nas"], cta: "Rezervirajte stol",
        fields: ["Datum", "Vrijeme", "Osobe"], go: "Rezervirajte",
        quote: "Najbolji kroasan koji sam jela izvan Pariza.", who: "Gošća iz Rijeke", mapT: "Kako do nas", mapD: "Na glavnom trgu starog grada" }
    },
    salon: {
      url: "studiobloom.com", name: "studio bloom", img: "salon",
      en: { tag: "Hair and beauty in Marcellus", title: "Feel like yourself again.", links: ["Services", "Prices", "Contact"], cta: "Book a visit",
        fields: ["Service", "Date", "Time"], go: "Find a time",
        quote: "Friendly, calm and always on time.", who: "Regular client", mapT: "Visit us", mapD: "Free parking at the door" },
      hr: { tag: "Frizerski i kozmetički salon u Marcellusu", title: "Ponovno se osjećajte kao svoji.", links: ["Usluge", "Cijene", "Kontakt"], cta: "Rezervirajte termin",
        fields: ["Usluga", "Datum", "Vrijeme"], go: "Pronađite termin",
        quote: "Ljubazno, opušteno i uvijek na vrijeme.", who: "Stalna klijentica", mapT: "Posjetite nas", mapD: "Besplatno parkiralište ispred ulaza" }
    }
  };

  const photo = (site, n) => `img/demo/${site.img}-${n}.jpg`;

  // Small hand-drawn line symbols.
  const ICON = {
    cup: '<path d="M4 9h12v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16"/><path d="M7.5 6c0-1 1-1.4 1-2.4M11.5 6c0-1 1-1.4 1-2.4"/><path d="M3 21h15"/>',
    croissant: '<path d="M2.5 14.5C4 9 8 6 12 6s8 3 9.5 8.5c-1.8 1-3.6 1-5 0-1 2-2.8 3-4.5 3s-3.5-1-4.5-3c-1.4 1-3.2 1-5 0z"/><path d="M9 8.6l1.4 7.4M15 8.6l-1.4 7.4"/>',
    wheat: '<path d="M12 21V7"/><path d="M12 7c-1.8-.8-2.8-2.6-2.8-4.6 1.8 0 2.8 1.8 2.8 4.6zM12 7c1.8-.8 2.8-2.6 2.8-4.6-1.8 0-2.8 1.8-2.8 4.6z"/><path d="M12 12c-2-.8-3.6-2.2-3.6-4.6 2 0 3.6 1.8 3.6 4.6zM12 12c2-.8 3.6-2.2 3.6-4.6-2 0-3.6 1.8-3.6 4.6z"/><path d="M12 17c-2-.8-3.6-2.2-3.6-4.6 2 0 3.6 1.8 3.6 4.6zM12 17c2-.8 3.6-2.2 3.6-4.6-2 0-3.6 1.8-3.6 4.6z"/>',
    bean: '<path d="M12 3c4 0 7 4 7 9s-3 9-7 9-7-4-7-9 3-9 7-9z"/><path d="M12 3c-2 3 2 6 0 9s2 6 0 9"/>',
    loaf: '<path d="M4 13a8 5.5 0 0 1 16 0v6H4z"/><path d="M8 9.5l1.2 3M12 8.5l1.2 3M16 9.5l1.2 3"/>',
    spark: '<path d="M12 3l1.6 6.4L20 11l-6.4 1.6L12 19l-1.6-6.4L4 11l6.4-1.6z"/>',
    waves: '<path d="M3 10c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0M3 15c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0"/><path d="M8 4v6M16 4v6M8 6h8"/>',
    sun: '<circle cx="12" cy="11" r="4"/><path d="M2 17h20M5 20.5h14M12 3V2M5.5 5.5l-.7-.7M18.5 5.5l.7-.7"/>',
    car: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M10 16V8h3a2.5 2.5 0 0 1 0 5h-3"/>',
    scissors: '<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M8.2 15L18 3M15.8 15L6 3"/>',
    drop: '<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>',
    wind: '<path d="M3 9h11a3 3 0 1 0-3-3M3 15h15a3 3 0 1 1-3 3M3 12h8"/>'
  };
  const icon = (k) => `<svg class="m-icon" viewBox="0 0 24 24" aria-hidden="true">${ICON[k]}</svg>`;

  // What each business shows right under its hero.
  const EXTRA = {
    apartments: {
      en: [["waves", "Private pool"], ["sun", "Sea view terrace"], ["car", "Free parking"]],
      hr: [["waves", "Privatni bazen"], ["sun", "Terasa s pogledom na more"], ["car", "Besplatno parkiralište"]]
    },
    cafe: {
      en: { head: "Today at the counter", items: [["cup", "Cappuccino", "2.50 €"], ["croissant", "Butter croissant", "1.80 €"], ["loaf", "Sourdough loaf", "4.20 €"]], badge: "FRESH BREAD EVERY MORNING · BAKED IN KASTAV · " },
      hr: { head: "Danas na pultu", items: [["cup", "Cappuccino", "2,50 €"], ["croissant", "Kroasan s maslacem", "1,80 €"], ["loaf", "Kruh s kiselim tijestom", "4,20 €"]], badge: "SVJEŽI KRUH SVAKO JUTRO · PEČEMO U KASTVU · " }
    },
    salon: {
      en: { items: [["scissors", "Cut and style", "from $45"], ["drop", "Colour", "from $90"], ["wind", "Blow dry", "$35"]], b1: "Book now", b2: "Our services", offer: "New clients get 15% off their first visit" },
      hr: { items: [["scissors", "Šišanje i styling", "od 45 $"], ["drop", "Bojanje", "od 90 $"], ["wind", "Feniranje", "35 $"]], b1: "Rezervirajte", b2: "Naše usluge", offer: "Novi klijenti imaju 15 % popusta na prvi posjet" }
    }
  };

  function extraBelowHero(type) {
    const x = EXTRA[type][lang];
    if (type === "apartments") return `<div class="m-perks">${x.map(([i, t]) => `<span>${icon(i)}${t}</span>`).join("")}</div>`;
    if (type === "cafe") return `<div class="m-menu"><p class="m-h">${icon("wheat")}${x.head}</p>${x.items.map(([i, t, pr]) =>
      `<div class="m-item">${icon(i)}<span>${t}</span><i></i><b>${pr}</b></div>`).join("")}</div>`;
    return `<div class="m-prices">${x.items.map(([i, t, pr]) => `<div>${icon(i)}<span>${t}</span><b>${pr}</b></div>`).join("")}</div>`;
  }

  function extraInHero(type) {
    const x = EXTRA[type][lang];
    if (type === "cafe") return `
      <div class="m-badge" aria-hidden="true">
        <svg viewBox="0 0 120 120"><defs><path id="m-circle" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0"/></defs>
          <text><textPath href="#m-circle">${x.badge}</textPath></text></svg>
        ${icon("croissant")}
      </div>
      <span class="m-doodle d1">${icon("bean")}</span><span class="m-doodle d2">${icon("spark")}</span><span class="m-doodle d3">${icon("wheat")}</span>`;
    return "";
  }
  let lang = document.documentElement.lang === "hr" ? "hr" : "en";
  const state = { type: "apartments", palette: {}, addons: new Set() };
  Object.keys(PALETTES).forEach((t) => { state.palette[t] = Object.keys(PALETTES[t])[0]; });

  function render() {
    const ui = UI[lang];
    const site = SITES[state.type];
    const c = site[lang];
    const pals = PALETTES[state.type];
    root.innerHTML = `
      <div class="demo-frame">
        <div class="demo-bar"><i></i><i></i><i></i><span>${site.url}</span><b>${ui.demo}</b></div>
        <div class="demo-site" data-style="${state.type}">
          ${state.type === "salon" ? `<p class="m-announce">${EXTRA.salon[lang].offer}</p>` : ""}
          <div class="m-hero">
            <img src="${photo(site, "hero")}" alt="" width="1400" height="875">
            <div class="m-nav">
              <strong>${site.name}</strong>
              <nav>${c.links.map((l) => `<span>${l}</span>`).join("")}</nav>
              <span class="m-cta ${state.addons.has("booking") ? "on" : ""}">${c.cta}</span>
            </div>
            <div class="m-hero-text"><p>${c.tag}</p><h3>${c.title}</h3>${state.type === "salon" ? `<div class="m-hero-btns"><span>${EXTRA.salon[lang].b1}</span><span>${EXTRA.salon[lang].b2}</span></div>` : ""}</div>
            ${extraInHero(state.type)}
          </div>
          <div class="m-block ${state.addons.has("booking") ? "on" : ""}" data-addon="booking"><div>
            <div class="m-booking">${c.fields.map((f) => `<label><span>${f}</span><i></i></label>`).join("")}<span class="m-btn">${c.go}</span></div>
          </div></div>
          ${extraBelowHero(state.type)}
          <div class="m-block ${state.addons.has("gallery") ? "on" : ""}" data-addon="gallery"><div>
            <p class="m-h">${ui.gallery}</p>
            <div class="m-gallery">${[1, 2, 3].map((n) => `<img src="${photo(site, n)}" alt="" width="700" height="700" loading="lazy">`).join("")}</div>
          </div></div>
          <div class="m-block ${state.addons.has("reviews") ? "on" : ""}" data-addon="reviews"><div>
            <div class="m-review"><span class="m-stars">★★★★★</span><p>“${c.quote}”</p><small>${c.who}</small></div>
          </div></div>
          <div class="m-block ${state.addons.has("map") ? "on" : ""}" data-addon="map"><div>
            <div class="m-map">
              <svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <rect width="400" height="120" fill="var(--m-soft)"/>
                <path d="M0 86c60-20 120 10 180-6s110-40 220-20v60H0z" fill="var(--m-accent)" opacity=".3"/>
                <path d="M40 0l60 120M0 40l400 30M220 0l-30 120" stroke="var(--m-card)" stroke-width="6" opacity=".9"/>
                <path d="M196 40a14 14 0 0 1 28 0c0 12-14 26-14 26s-14-14-14-26z" fill="var(--m-accent)"/>
                <circle cx="210" cy="40" r="5" fill="var(--m-card)"/>
              </svg>
              <div><strong>${c.mapT}</strong><span>${c.mapD}</span></div>
            </div>
          </div></div>
        </div>
      </div>
      <div class="demo-controls">
        <p class="demo-title">${ui.title}</p>
        <div class="demo-row"><span>${ui.type}</span><div>${Object.keys(SITES).map((k) =>
          `<button type="button" data-type="${k}" aria-pressed="${k === state.type}">${ui.types[k]}</button>`).join("")}</div></div>
        <div class="demo-row"><span>${ui.colour}</span><div>${Object.keys(pals).map((k) =>
          `<button type="button" class="swatch" data-palette="${k}" aria-pressed="${k === state.palette[state.type]}" aria-label="${k}" style="--sw:${pals[k].accent};--sw2:${pals[k].bg}"></button>`).join("")}</div></div>
        <div class="demo-row"><span>${ui.add}</span><div>${Object.keys(ui.addons).map((k) =>
          `<button type="button" class="addon" data-addon="${k}" aria-pressed="${state.addons.has(k)}">${ui.addons[k]}</button>`).join("")}</div></div>
        <p class="demo-note">${ui.note}</p>
      </div>`;
    applyPalette();
  }

  function applyPalette() {
    const p = PALETTES[state.type][state.palette[state.type]];
    const s = root.style;
    ["bg", "ink", "accent", "soft", "card"].forEach((k) => s.setProperty(`--m-${k}`, p[k]));
  }

  function toggleAddon(k, force) {
    const on = force ?? !state.addons.has(k);
    on ? state.addons.add(k) : state.addons.delete(k);
    root.querySelector(`.m-block[data-addon="${k}"]`).classList.toggle("on", on);
    root.querySelector(`.addon[data-addon="${k}"]`).setAttribute("aria-pressed", String(on));
    if (k === "booking") root.querySelector(".m-cta").classList.toggle("on", on);
    const siteEl = root.querySelector(".demo-site");
    if (on) {
      const block = root.querySelector(`.m-block[data-addon="${k}"]`);
      block.classList.remove("flash"); void block.offsetWidth; block.classList.add("flash");
      setTimeout(() => siteEl.scrollTo({ top: block.offsetTop - 40, behavior: reduce ? "auto" : "smooth" }), 180);
    }
  }

  function setType(k) {
    if (k === state.type) return;
    state.type = k;
    root.querySelector(".demo-site").classList.add("fading");
    setTimeout(() => {
      render();
      const s = root.querySelector(".demo-site");
      s.classList.add("fading");
      requestAnimationFrame(() => requestAnimationFrame(() => s.classList.remove("fading")));
    }, reduce ? 0 : 220);
  }

  function setPalette(k) {
    state.palette[state.type] = k;
    applyPalette();
    root.querySelectorAll(".swatch").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.palette === k)));
  }
  const paletteAt = (i) => Object.keys(PALETTES[state.type])[i];

  // A short tour shows what the buttons do, and stops as soon as the visitor clicks anything.
  let tour = [];
  let touched = false;
  function stopTour() { touched = true; tour.forEach(clearTimeout); tour = []; }
  function playTour() {
    if (reduce || touched) return;
    const steps = [
      [1200, () => toggleAddon("booking", true)],
      [2600, () => setPalette(paletteAt(1))],
      [4000, () => setType("cafe")],
      [5400, () => toggleAddon("gallery", true)],
      [7000, () => setType("salon")],
      [8400, () => setPalette(paletteAt(3))],
      [10000, () => { setPalette(paletteAt(0)); setType("apartments"); }]
    ];
    tour = steps.map(([ms, fn]) => setTimeout(fn, ms));
  }

  root.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    stopTour();
    if (b.dataset.type) setType(b.dataset.type);
    else if (b.dataset.palette) setPalette(b.dataset.palette);
    else if (b.dataset.addon) toggleAddon(b.dataset.addon);
  });
  root.addEventListener("pointerdown", stopTour, { once: true });

  document.addEventListener("langchange", (e) => { lang = e.detail; render(); });

  Object.values(SITES).forEach((s) => ["hero", 1, 2, 3].forEach((n) => { new Image().src = photo(s, n); }));
  render();
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((en) => { if (en[0].isIntersecting) { playTour(); io.disconnect(); } });
    io.observe(root);
  }
})();
