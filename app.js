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
    document.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
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

  // Booking a call: Cal.com when the link is set, otherwise an email asking for a call.
  const callBtn = document.getElementById("call-btn");
  const callNote = document.getElementById("call-note");
  function setCallLink() {
    if (CALL_URL) { callBtn.href = CALL_URL; callNote.hidden = false; return; }
    const subject = lang === "hr" ? "Besplatan razgovor o web stranici" : "Free website call";
    const body = lang === "hr"
      ? "Pozdrav Anja,\n\nželim(o) dogovoriti besplatan razgovor o web stranici.\n\nNaziv posla:\nGdje se nalazimo:\nPostojeća stranica (ako je imamo):\nŠto nam treba:\nKada nam odgovara razgovor:\n"
      : "Hi Anja,\n\nI would like to book a free website call.\n\nBusiness name:\nWhere we are:\nCurrent website (if any):\nWhat we need:\nWhen a call suits me:\n";
    callBtn.href = `mailto:anja.gregoran1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    callBtn.removeAttribute("target");
    callNote.hidden = true;
  }
  document.addEventListener("langchange", setCallLink);
  setCallLink();

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

  // Phone menu.
  const menuBtn = document.querySelector(".menu-btn");
  const menu = document.getElementById("mobile-menu");
  const setMenu = (open) => { menu.hidden = !open; menuBtn.setAttribute("aria-expanded", String(open)); document.body.classList.toggle("menu-open", open); };
  menuBtn.addEventListener("click", () => setMenu(menu.hidden));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

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
    document.querySelectorAll(".why, .service, .work-text, .work, .faq-list, .contact-text, .form").forEach((el) => {
      el.classList.add("reveal");
      io.observe(el);
    });
  }

  // "Your business deserves..." types itself in, typewriter style, across the top of the hero.
  const heroLine = document.querySelector(".hero-line-text");
  let lineTimer, lineSeen = false;
  function typeLine(delay) {
    clearTimeout(lineTimer);
    if (!heroLine) return;
    const full = heroLine.textContent;
    heroLine.parentElement.classList.remove("typing");
    if (reduce) return;
    heroLine.textContent = "";
    let n = 0;
    const step = () => {
      heroLine.textContent = full.slice(0, ++n);
      if (n < full.length) lineTimer = setTimeout(step, 34 + Math.random() * 46);
      else lineTimer = setTimeout(() => heroLine.parentElement.classList.remove("typing"), 2400);
    };
    lineTimer = setTimeout(() => { heroLine.parentElement.classList.add("typing"); step(); }, delay);
  }
  // It now sits below the first section, so it types when it scrolls into view
  if (heroLine && !reduce && "IntersectionObserver" in window) {
    heroLine.parentElement.classList.add("waiting");
    const seen = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      seen.disconnect(); lineSeen = true;
      heroLine.parentElement.classList.remove("waiting");
      typeLine(150);
    }, { rootMargin: "0px 0px -15% 0px" });
    seen.observe(heroLine.parentElement);
  }
  document.addEventListener("langchange", () => { if (lineSeen) typeLine(200); });

  setLang("hr");
  // The site no longer remembers a language choice, so clear the old one
  try { localStorage.removeItem("lang"); } catch (e) {}

  // Fine-line drawings of Kvarner draw themselves when they scroll into view
  const sketches = document.querySelectorAll(".sketch");
  sketches.forEach((s) => s.querySelectorAll("path, ellipse, circle").forEach((el) => el.setAttribute("pathLength", "1")));
  if (!reduce && "IntersectionObserver" in window) {
    const so = new IntersectionObserver((list) => list.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("drawn"); so.unobserve(en.target); }
    }), { rootMargin: "0px 0px -10% 0px" });
    sketches.forEach((s) => so.observe(s));
  } else sketches.forEach((s) => s.classList.add("drawn"));

  // Links within the page glide slowly, so visitors see the sections pass on the way down.
  const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  let glide = null;
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || reduce) return;
    const id = a.getAttribute("href");
    const target = id.length > 1 ? document.querySelector(id) : null;
    if (id.length > 1 && !target) return;
    e.preventDefault();
    const offset = target ? parseFloat(getComputedStyle(target).scrollMarginTop) || 0 : 0;
    const from = scrollY;
    const to = target ? target.getBoundingClientRect().top + scrollY - offset : 0;
    const dist = Math.abs(to - from);
    const duration = Math.min(3600, 1000 + dist * 0.45);
    const html = document.documentElement;
    html.style.scrollBehavior = "auto";
    cancelAnimationFrame(glide);
    const t0 = performance.now();
    const step = (now) => {
      const k = Math.min(1, (now - t0) / duration);
      scrollTo(0, from + (to - from) * ease(k));
      if (k < 1) glide = requestAnimationFrame(step);
      else html.style.scrollBehavior = "";
    };
    glide = requestAnimationFrame(step);
    ["wheel", "touchstart", "keydown"].forEach((ev) => addEventListener(ev, () => { cancelAnimationFrame(glide); html.style.scrollBehavior = ""; }, { once: true, passive: true }));
  });

  // Opening entrance.
  requestAnimationFrame(() => document.body.classList.add("loaded"));
})();
