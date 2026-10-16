// "Change it live": a small pretend website next to the headline that visitors can restyle and extend.
(function () {
  const root = document.getElementById("demo");
  if (!root) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const PALETTES = {
    sage: { bg: "#f6f4ee", ink: "#23402f", accent: "#2f5a43", soft: "#dbe6d3", sky: "#eef3e8" },
    sea: { bg: "#f3f6f8", ink: "#1d3b53", accent: "#2f6f8f", soft: "#d4e5ee", sky: "#e8f1f6" },
    terracotta: { bg: "#faf3ee", ink: "#4a2a1e", accent: "#c0643f", soft: "#f1d9cb", sky: "#f8e9df" },
    lavender: { bg: "#f6f3f8", ink: "#3a2d4a", accent: "#7a5c9a", soft: "#e4dbef", sky: "#efe9f6" }
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
      url: "villa-lavanda.hr", name: "Villa Lavanda",
      en: { tag: "Sea view apartments in Opatija", title: "Wake up to the sea.", links: ["Apartments", "Location", "Contact"], cta: "Book now",
        fields: ["Check in", "Check out", "Guests"], go: "Check availability",
        quote: "The view from the terrace was even better than the photos.", who: "Guest from Vienna", mapT: "Find us", mapD: "Five minutes from the beach" },
      hr: { tag: "Apartmani s pogledom na more u Opatiji", title: "Probudite se uz more.", links: ["Apartmani", "Lokacija", "Kontakt"], cta: "Rezervirajte",
        fields: ["Dolazak", "Odlazak", "Gosti"], go: "Provjerite dostupnost",
        quote: "Pogled s terase bio je još ljepši nego na fotografijama.", who: "Gost iz Beča", mapT: "Kako do nas", mapD: "Pet minuta od plaže" }
    },
    cafe: {
      url: "kavaikruh.hr", name: "Kava & Kruh",
      en: { tag: "Coffee and fresh bread in Kastav", title: "Slow mornings start here.", links: ["Menu", "About", "Visit"], cta: "Reserve a table",
        fields: ["Date", "Time", "People"], go: "Reserve",
        quote: "The best croissant I have had outside Paris.", who: "Guest from Rijeka", mapT: "Find us", mapD: "On the old town square" },
      hr: { tag: "Kava i svježi kruh u Kastvu", title: "Ovdje počinju opuštena jutra.", links: ["Jelovnik", "O nama", "Posjetite nas"], cta: "Rezervirajte stol",
        fields: ["Datum", "Vrijeme", "Osobe"], go: "Rezervirajte",
        quote: "Najbolji kroasan koji sam jela izvan Pariza.", who: "Gošća iz Rijeke", mapT: "Kako do nas", mapD: "Na glavnom trgu starog grada" }
    },
    salon: {
      url: "studiobloom.com", name: "Studio Bloom",
      en: { tag: "Hair and beauty in Marcellus", title: "Feel like yourself again.", links: ["Services", "Prices", "Contact"], cta: "Book a visit",
        fields: ["Service", "Date", "Time"], go: "Find a time",
        quote: "Friendly, calm and always on time.", who: "Regular client", mapT: "Visit us", mapD: "Free parking at the door" },
      hr: { tag: "Frizerski i kozmetički salon u Marcellusu", title: "Ponovno se osjećajte kao svoji.", links: ["Usluge", "Cijene", "Kontakt"], cta: "Rezervirajte termin",
        fields: ["Usluga", "Datum", "Vrijeme"], go: "Pronađite termin",
        quote: "Ljubazno, opušteno i uvijek na vrijeme.", who: "Stalna klijentica", mapT: "Posjetite nas", mapD: "Besplatno parkiralište ispred ulaza" }
    }
  };

  // Simple drawn scenes in the colours of the chosen palette.
  const SCENES = {
    apartments: (v) => `
      <rect width="400" height="220" fill="url(#sky-${v})"/>
      <circle cx="300" cy="78" r="30" fill="#fff" opacity=".85"/>
      <rect y="150" width="400" height="70" fill="var(--m-accent)" opacity=".55"/>
      <rect y="150" width="400" height="6" fill="#fff" opacity=".35"/>
      <path d="M40 220V112l70-38 70 38v108z" fill="var(--m-bg)"/>
      <path d="M30 116l80-46 80 46" fill="none" stroke="var(--m-ink)" stroke-width="5" stroke-linejoin="round"/>
      <path d="M86 220v-46a24 24 0 0 1 48 0v46" fill="var(--m-soft)"/>
      <rect x="58" y="122" width="22" height="28" rx="3" fill="var(--m-accent)" opacity=".8"/>
      <rect x="140" y="122" width="22" height="28" rx="3" fill="var(--m-accent)" opacity=".8"/>
      <path d="M352 220c-14-40-10-92 2-120 12 28 16 80 2 120z" fill="var(--m-ink)" opacity=".8"/>`,
    cafe: (v) => `
      <rect width="400" height="220" fill="url(#sky-${v})"/>
      <path d="M0 0h400v34H0z" fill="var(--m-soft)"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => `<path d="M${i * 40} 34h40v14a20 20 0 0 1-40 0z" fill="${i % 2 ? "var(--m-bg)" : "var(--m-accent)"}"/>`).join("")}
      <rect x="40" y="168" width="320" height="10" rx="5" fill="var(--m-ink)" opacity=".85"/>
      <path d="M150 112h64v34a22 22 0 0 1-22 22h-20a22 22 0 0 1-22-22z" fill="#fff"/>
      <path d="M214 120h8a12 12 0 0 1 0 24h-8" fill="none" stroke="#fff" stroke-width="6"/>
      <path d="M170 98c-6-10 6-14 0-24M186 98c-6-10 6-14 0-24M202 98c-6-10 6-14 0-24" fill="none" stroke="var(--m-ink)" stroke-width="3" stroke-linecap="round" opacity=".5"/>
      <path d="M254 166c4-26 60-26 64 0z" fill="var(--m-accent)" opacity=".75"/>
      <path d="M262 160c8-14 40-14 48 0" fill="none" stroke="#fff" stroke-width="3" opacity=".6"/>`,
    salon: (v) => `
      <rect width="400" height="220" fill="url(#sky-${v})"/>
      <path d="M150 196V80a50 50 0 0 1 100 0v116z" fill="#fff" stroke="var(--m-ink)" stroke-width="5"/>
      <path d="M166 186V84a34 34 0 0 1 68 0v102z" fill="var(--m-soft)"/>
      <rect x="120" y="196" width="160" height="10" rx="5" fill="var(--m-ink)" opacity=".85"/>
      <path d="M306 196h28l-4-40h-20z" fill="var(--m-accent)"/>
      <circle cx="308" cy="138" r="11" fill="var(--m-accent)" opacity=".7"/>
      <circle cx="330" cy="130" r="13" fill="#fff"/>
      <circle cx="322" cy="112" r="10" fill="var(--m-accent)" opacity=".5"/>
      <path d="M320 156c0-10 2-18 8-26" fill="none" stroke="var(--m-ink)" stroke-width="3" opacity=".6"/>
      <path d="M60 196c0-30 14-44 34-44s34 14 34 44" fill="var(--m-accent)" opacity=".55"/>`
  };

  let lang = document.documentElement.lang === "hr" ? "hr" : "en";
  const state = { type: "apartments", palette: "sage", addons: new Set() };
  let uid = 0;

  function scene(type, cls) {
    const v = ++uid;
    return `<svg class="${cls}" viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs><linearGradient id="sky-${v}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="var(--m-sky)"/><stop offset="1" stop-color="var(--m-soft)"/></linearGradient></defs>
      ${SCENES[type](v)}</svg>`;
  }

  function render() {
    const ui = UI[lang];
    const site = SITES[state.type];
    const c = site[lang];
    const others = Object.keys(SITES).filter((k) => k !== state.type);
    root.innerHTML = `
      <div class="demo-frame">
        <div class="demo-bar"><i></i><i></i><i></i><span>${site.url}</span><b>${ui.demo}</b></div>
        <div class="demo-site" data-font="serif">
          <div class="m-nav">
            <strong>${site.name}</strong>
            <nav>${c.links.map((l) => `<span>${l}</span>`).join("")}</nav>
            <span class="m-cta m-addon-inline ${state.addons.has("booking") ? "on" : ""}">${c.cta}</span>
          </div>
          <div class="m-hero">
            ${scene(state.type, "m-scene")}
            <div class="m-hero-text"><p>${c.tag}</p><h3>${c.title}</h3></div>
          </div>
          <div class="m-block ${state.addons.has("booking") ? "on" : ""}" data-addon="booking"><div>
            <div class="m-booking">${c.fields.map((f) => `<label><span>${f}</span><i></i></label>`).join("")}<span class="m-btn">${c.go}</span></div>
          </div></div>
          <div class="m-block ${state.addons.has("gallery") ? "on" : ""}" data-addon="gallery"><div>
            <p class="m-h">${ui.gallery}</p>
            <div class="m-gallery">${scene(state.type, "")}${scene(others[0], "")}${scene(others[1], "")}</div>
          </div></div>
          <div class="m-block ${state.addons.has("reviews") ? "on" : ""}" data-addon="reviews"><div>
            <div class="m-review"><span class="m-stars">★★★★★</span><p>“${c.quote}”</p><small>${c.who}</small></div>
          </div></div>
          <div class="m-block ${state.addons.has("map") ? "on" : ""}" data-addon="map"><div>
            <div class="m-map">
              <svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <rect width="400" height="120" fill="var(--m-soft)"/>
                <path d="M0 86c60-20 120 10 180-6s110-40 220-20v60H0z" fill="var(--m-accent)" opacity=".35"/>
                <path d="M40 0l60 120M0 40l400 30M220 0l-30 120" stroke="#fff" stroke-width="6" opacity=".8"/>
                <path d="M196 40a14 14 0 0 1 28 0c0 12-14 26-14 26s-14-14-14-26z" fill="var(--m-ink)"/>
                <circle cx="210" cy="40" r="5" fill="#fff"/>
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
        <div class="demo-row"><span>${ui.colour}</span><div>${Object.keys(PALETTES).map((k) =>
          `<button type="button" class="swatch" data-palette="${k}" aria-pressed="${k === state.palette}" aria-label="${k}" style="--sw:${PALETTES[k].accent}"></button>`).join("")}</div></div>
        <div class="demo-row"><span>${ui.add}</span><div>${Object.keys(ui.addons).map((k) =>
          `<button type="button" class="addon" data-addon="${k}" aria-pressed="${state.addons.has(k)}">${ui.addons[k]}</button>`).join("")}</div></div>
        <p class="demo-note">${ui.note}</p>
      </div>`;
    applyPalette();
  }

  function applyPalette() {
    const p = PALETTES[state.palette];
    const s = root.style;
    s.setProperty("--m-bg", p.bg); s.setProperty("--m-ink", p.ink); s.setProperty("--m-accent", p.accent);
    s.setProperty("--m-soft", p.soft); s.setProperty("--m-sky", p.sky);
  }

  function setPressed(sel, attr, val) {
    root.querySelectorAll(sel).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset[attr] === val)));
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
    const siteEl = root.querySelector(".demo-site");
    siteEl.classList.add("fading");
    setTimeout(() => { render(); const s = root.querySelector(".demo-site"); s.classList.add("fading"); requestAnimationFrame(() => s.classList.remove("fading")); }, reduce ? 0 : 200);
  }

  function setPalette(k) { state.palette = k; applyPalette(); setPressed(".swatch", "palette", k); }

  // A short tour shows what the buttons do, and stops as soon as the visitor clicks anything.
  let tour = [];
  function stopTour() { tour.forEach(clearTimeout); tour = []; }
  function playTour() {
    if (reduce) return;
    const steps = [
      [1200, () => toggleAddon("booking", true)],
      [2600, () => setPalette("sea")],
      [4000, () => toggleAddon("gallery", true)],
      [5600, () => setPalette("terracotta")],
      [7000, () => toggleAddon("reviews", true)],
      [8800, () => { root.querySelector(".demo-site").scrollTo({ top: 0, behavior: "smooth" }); setPalette("sage"); }]
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

  render();
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((en) => { if (en[0].isIntersecting) { playTour(); io.disconnect(); } });
    io.observe(root);
  }
})();
