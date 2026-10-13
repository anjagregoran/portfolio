(function () {
  // Language switch. English is read from the page once, Croatian comes from content.js.
  const EN = {};
  const nodes = document.querySelectorAll("[data-i18n]");
  const altNodes = document.querySelectorAll("[data-i18n-alt]");
  const ariaNodes = document.querySelectorAll("[data-i18n-aria]");
  nodes.forEach((n) => { if (!(n.dataset.i18n in EN)) EN[n.dataset.i18n] = n.innerHTML; });
  altNodes.forEach((n) => { EN[n.dataset.i18nAlt] = n.alt; });
  EN["meta.title"] = document.title;

  let lang = "en";

  function setLang(next) {
    lang = next === "hr" ? "hr" : "en";
    const dict = lang === "hr" ? HR : EN;
    nodes.forEach((n) => { n.innerHTML = dict[n.dataset.i18n] ?? EN[n.dataset.i18n]; });
    altNodes.forEach((n) => { n.alt = dict[n.dataset.i18nAlt] ?? EN[n.dataset.i18nAlt]; });
    ariaNodes.forEach((n) => { n.setAttribute("aria-label", dict[n.dataset.i18nAria] ?? EN[n.dataset.i18nAria]); });
    document.title = dict["meta.title"];
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-lang]").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
    status.textContent = "";
    try { localStorage.setItem("lang", lang); } catch (e) {}
  }

  const status = document.getElementById("form-status");
  document.querySelectorAll("[data-lang]").forEach((b) => {
    b.addEventListener("click", () => setLang(b.dataset.lang));
  });

  let saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  setLang(saved || ((navigator.language || "").toLowerCase().startsWith("hr") ? "hr" : "en"));

  // Before and after slider.
  document.querySelectorAll(".compare").forEach((box) => {
    const range = box.querySelector("input[type=range]");
    const update = () => box.style.setProperty("--pos", range.value + "%");
    range.addEventListener("input", update);
    update();
  });

  // Project tabs swap the two pictures in place.
  const tabs = document.querySelectorAll(".tabs [role=tab]");
  const compare = document.querySelector(".compare");
  const visit = document.getElementById("ba-visit");
  tabs.forEach((tab) => {
    [tab.dataset.old, tab.dataset.new].forEach((src) => { new Image().src = src; });
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.setAttribute("aria-selected", String(t === tab)));
      compare.querySelector(".compare-new").src = tab.dataset.new;
      compare.querySelector(".compare-old img").src = tab.dataset.old;
      visit.href = tab.dataset.href;
      const range = compare.querySelector("input");
      range.value = 50;
      range.dispatchEvent(new Event("input"));
    });
  });

  // Contact form.
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const t = STATUS[lang];
    if (!form.checkValidity()) { status.textContent = t.missing; return; }
    if (!FORM_ENDPOINT) { status.textContent = t.offline; return; }
    status.textContent = t.sending;
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      status.textContent = t.sent;
    } catch (err) {
      status.textContent = t.error;
    }
  });

  // Quiet fade in as sections come into view.
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".before-after, .included, .prices, .about, .contact").forEach((el) => {
      el.classList.add("reveal");
      io.observe(el);
    });
  }
})();
