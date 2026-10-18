(function () {
  // A refresh always opens the page at the top, even after jumping to a section.
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  if (location.hash) history.replaceState(null, "", location.pathname + location.search);
  scrollTo(0, 0);
  addEventListener("pageshow", () => scrollTo(0, 0));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

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
  EN["p4.type"] = "Wellness and courses";
  EN["p5.type"] = "Food travel guide";
  EN["p6.type"] = "Private calendar app, shown without personal details";

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
    document.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
    try { localStorage.setItem("lang", lang); } catch (e) {}
  }

  document.querySelectorAll("[data-lang]").forEach((b) => {
    b.addEventListener("click", () => setLang(b.dataset.lang));
  });

  // Before and after slider.
  const compare = document.querySelector(".compare");
  const range = compare.querySelector("input[type=range]");
  const setPos = (v) => { range.value = v; compare.style.setProperty("--pos", v + "%"); };
  range.addEventListener("input", () => { stopSweep(); setPos(range.value); });

  // A short sweep shows visitors that the picture can be dragged.
  let sweepFrame = null;
  function stopSweep() { if (sweepFrame) cancelAnimationFrame(sweepFrame); sweepFrame = null; }
  function sweep() {
    stopSweep();
    if (reduce) { setPos(50); return; }
    const keys = [50, 22, 78, 50];
    const seg = 650;
    const start = performance.now();
    const ease = (x) => 0.5 - Math.cos(Math.PI * x) / 2;
    const step = (now) => {
      const el = now - start;
      const i = Math.min(Math.floor(el / seg), keys.length - 2);
      const f = Math.min((el - i * seg) / seg, 1);
      setPos((keys[i] + (keys[i + 1] - keys[i]) * ease(f)).toFixed(1));
      if (el < seg * (keys.length - 1)) sweepFrame = requestAnimationFrame(step);
      else sweepFrame = null;
    };
    sweepFrame = requestAnimationFrame(step);
  }
  ["pointerdown", "keydown"].forEach((ev) => range.addEventListener(ev, stopSweep));

  // Project tabs swap the two pictures in place with a soft fade.
  const tabs = document.querySelectorAll(".tabs [role=tab]");
  const type = document.getElementById("ba-type");
  const visit = document.getElementById("ba-visit");
  const newImg = compare.querySelector(".compare-new");
  const oldImg = compare.querySelector(".compare-old img");
  tabs.forEach((tab) => {
    [tab.dataset.old, tab.dataset.new].forEach((src) => { new Image().src = src; });
    tab.addEventListener("click", async () => {
      if (tab.getAttribute("aria-selected") === "true") return;
      tabs.forEach((x) => x.setAttribute("aria-selected", String(x === tab)));
      type.dataset.i18n = tab.dataset.type;
      type.innerHTML = t(tab.dataset.type);
      visit.href = tab.dataset.href || "#";
      visit.hidden = !tab.dataset.href;
      document.getElementById("ba-visit-dot").hidden = !tab.dataset.href;
      compare.classList.add("swapping");
      await new Promise((r) => setTimeout(r, reduce ? 0 : 220));
      newImg.src = tab.dataset.new;
      oldImg.src = tab.dataset.old;
      try { await Promise.all([newImg.decode(), oldImg.decode()]); } catch (e) {}
      compare.classList.remove("swapping");
      sweep();
    });
  });

  // A small "Drag" label follows the pointer over the pictures.
  const bubble = compare.querySelector(".drag-bubble");
  if (finePointer) {
    compare.addEventListener("pointermove", (e) => {
      const r = compare.getBoundingClientRect();
      bubble.style.transform = `translate(${e.clientX - r.left}px, ${e.clientY - r.top}px)`;
      compare.classList.add("hovering");
    });
    compare.addEventListener("pointerleave", () => compare.classList.remove("hovering"));
  }

  // Services open the form with the matching choice already selected.
  const form = document.getElementById("contact-form");
  document.querySelectorAll(".service").forEach((card) => {
    card.addEventListener("click", () => {
      const radio = form.querySelector(`input[name=need][value="${card.dataset.need}"]`);
      if (radio) radio.checked = true;
    });
  });

  // Sign-up form.
  const status = document.getElementById("form-status");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const s = STATUS[lang];
    if (!form.checkValidity()) { status.textContent = s.missing; return; }
    if (!FORM_ENDPOINT) {
      const d = new FormData(form);
      const subject = `Website building offer: ${d.get("need")} from ${d.get("name")}`;
      const body = `${d.get("message")}\n\n${d.get("name")}\n${d.get("email")}`;
      location.href = `mailto:anja.gregoran1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      status.textContent = s.opened;
      return;
    }
    status.textContent = s.sending;
    try {
      const data = new FormData(form);
      // Every enquiry arrives with the same subject start, so Gmail can sort them.
      data.append("_subject", `Website building offer: ${data.get("need")} from ${data.get("name")}`);
      data.append("_replyto", data.get("email"));
      data.append("_template", "table");
      data.append("_captcha", "false");
      data.append("language", lang === "hr" ? "Croatian" : "English");
      const res = await fetch(FORM_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: data });
      const reply = await res.json().catch(() => ({}));
      if (!res.ok || String(reply.success) === "false") throw new Error(reply.message || res.status);
      form.reset();
      status.textContent = s.sent;
    } catch (err) {
      // If the form service fails, nothing is lost: offer the same message as a ready email.
      const d = new FormData(form);
      const subject = `Website building offer: ${d.get("need")} from ${d.get("name")}`;
      const body = `${d.get("message")}\n\n${d.get("name")}\n${d.get("email")}`;
      const href = `mailto:anja.gregoran1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      status.innerHTML = `${s.error} <a href="${href}">${s.mail}</a>`;
    }
  });

  // Buttons lean a little towards the pointer.
  if (finePointer && !reduce) {
    document.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.22;
        const y = (e.clientY - r.top - r.height / 2) * 0.35;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      });
      btn.addEventListener("pointerleave", () => { btn.style.transform = ""; });
    });
  }

  // A soft light follows the pointer across the panels.
  if (finePointer) {
    document.querySelectorAll(".work, .form, .service").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", e.clientX - r.left + "px");
        el.style.setProperty("--my", e.clientY - r.top + "px");
      });
    });
  }

  // "Back to top" in the footer.
  document.querySelector(".to-top")?.addEventListener("click", (e) => { e.preventDefault(); scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); });

  // Header: reading progress and a shadow once the page moves.
  const top = document.querySelector(".top");
  const bar = document.querySelector(".progress");
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    top.classList.toggle("scrolled", scrollY > 8);
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // The 77 counts up when it comes into view.
  const num = document.querySelector(".why-num");
  function countUp() {
    const final = t("why.num");
    const target = parseInt(final, 10);
    const suffix = final.replace(String(target), "");
    if (reduce || !target) { num.textContent = final; return; }
    const start = performance.now();
    const step = (now) => {
      const f = Math.min((now - start) / 1400, 1);
      num.textContent = Math.round(target * (1 - Math.pow(1 - f, 3))) + suffix;
      if (f < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // Sections rise in as they come into view.
  const io = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("in");
      if (en.target.classList.contains("why")) countUp();
      if (en.target.classList.contains("work")) sweep();
      io.unobserve(en.target);
    });
  }, { rootMargin: "0px 0px -12% 0px" }) : null;
  if (io && !reduce) {
    document.querySelectorAll(".why, .service, .work-text, .work, .how li, .faq-list, .contact-text, .form").forEach((el) => {
      el.classList.add("reveal");
      io.observe(el);
    });
  }

  let saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  setLang(saved || ((navigator.language || "").toLowerCase().startsWith("hr") ? "hr" : "en"));

  // Opening entrance.
  requestAnimationFrame(() => document.body.classList.add("loaded"));
})();
