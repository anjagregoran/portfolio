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
          <div class="m-hero">
            <img src="${photo(site, "hero")}" alt="" width="1400" height="875">
            <div class="m-nav">
              <strong>${site.name}</strong>
              <nav>${c.links.map((l) => `<span>${l}</span>`).join("")}</nav>
              <span class="m-cta ${state.addons.has("booking") ? "on" : ""}">${c.cta}</span>
            </div>
            <div class="m-hero-text"><p>${c.tag}</p><h3>${c.title}</h3></div>
          </div>
          <div class="m-block ${state.addons.has("booking") ? "on" : ""}" data-addon="booking"><div>
            <div class="m-booking">${c.fields.map((f) => `<label><span>${f}</span><i></i></label>`).join("")}<span class="m-btn">${c.go}</span></div>
          </div></div>
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
