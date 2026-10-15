(function () {
  // Language switch. English is read from the page once, Croatian comes from content.js.
  const EN = {};
  const nodes = document.querySelectorAll("[data-i18n]");
  const altNodes = document.querySelectorAll("[data-i18n-alt]");
  const ariaNodes = document.querySelectorAll("[data-i18n-aria]");
  nodes.forEach((n) => { if (!(n.dataset.i18n in EN)) EN[n.dataset.i18n] = n.innerHTML; });
  altNodes.forEach((n) => { EN[n.dataset.i18nAlt] = n.alt; });
  ariaNodes.forEach((n) => { EN[n.dataset.i18nAria] = n.getAttribute("aria-label"); });
  EN["meta.title"] = document.title;
  // Project types that are not on the page until their tab is chosen.
  EN["p2.type"] = "Café and brunch";
  EN["p3.type"] = "Exchange guides";

  let lang = "en";
  const t = (key) => (lang === "hr" ? HR[key] : null) ?? EN[key];

  function setLang(next) {
    lang = next === "hr" ? "hr" : "en";
    nodes.forEach((n) => { n.innerHTML = t(n.dataset.i18n); });
    altNodes.forEach((n) => { n.alt = t(n.dataset.i18nAlt); });
    ariaNodes.forEach((n) => { n.setAttribute("aria-label", t(n.dataset.i18nAria)); });
    document.title = t("meta.title");
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-lang]").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
    document.getElementById("form-status").textContent = "";
    try { localStorage.setItem("lang", lang); } catch (e) {}
  }

  document.querySelectorAll("[data-lang]").forEach((b) => {
    b.addEventListener("click", () => setLang(b.dataset.lang));
  });

  // Before and after slider.
  const compare = document.querySelector(".compare");
  const range = compare.querySelector("input[type=range]");
  const update = () => compare.style.setProperty("--pos", range.value + "%");
  range.addEventListener("input", update);
  update();

  // Project tabs swap the two pictures in place.
  const tabs = document.querySelectorAll(".tabs [role=tab]");
  const type = document.getElementById("ba-type");
  const visit = document.getElementById("ba-visit");
  tabs.forEach((tab) => {
    [tab.dataset.old, tab.dataset.new].forEach((src) => { new Image().src = src; });
    tab.addEventListener("click", () => {
      tabs.forEach((x) => x.setAttribute("aria-selected", String(x === tab)));
      compare.querySelector(".compare-new").src = tab.dataset.new;
      compare.querySelector(".compare-old img").src = tab.dataset.old;
      type.dataset.i18n = tab.dataset.type;
      type.innerHTML = t(tab.dataset.type);
      visit.href = tab.dataset.href;
      range.value = 50;
      update();
    });
  });

  // Sign-up form.
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const s = STATUS[lang];
    if (!form.checkValidity()) { status.textContent = s.missing; return; }
    if (!FORM_ENDPOINT) { status.textContent = s.offline; return; }
    status.textContent = s.sending;
    try {
      const res = await fetch(FORM_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      status.textContent = s.sent;
    } catch (err) {
      status.textContent = s.error;
    }
  });

  let saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  setLang(saved || ((navigator.language || "").toLowerCase().startsWith("hr") ? "hr" : "en"));
})();
