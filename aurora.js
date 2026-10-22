// Dithered aurora behind the first section: soft flowing shapes drawn as tiny green dots,
// brighter around the mouse and drifting after it.
import { ShaderMount, ditheringFragmentShader, DitheringShapes, DitheringTypes }
  from "https://cdn.jsdelivr.net/npm/@paper-design/shaders@0.0.72/+esm";

const el = document.querySelector(".dither-bg");
const home = document.querySelector(".home");
if (el && home) {
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const speed = reduceMotion ? 0 : 0.15;
  const rgba = (hex, a) => {
    const n = parseInt(hex.replace("#", ""), 16);
    return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255, a];
  };
  const css = getComputedStyle(document.documentElement);
  const dot = css.getPropertyValue("--dither").trim() || "#3f6b4f";
  const alpha = parseFloat(css.getPropertyValue("--dither-alpha")) || 0.5;

  let mount;
  try {
    mount = new ShaderMount(el, ditheringFragmentShader, {
      u_colorBack: [0, 0, 0, 0],
      u_colorFront: rgba(dot, alpha),
      u_shape: DitheringShapes.warp,
      u_type: DitheringTypes["4x4"],
      u_pxSize: 2, u_scale: 0.9, u_rotation: 0, u_offsetX: 0, u_offsetY: 0,
    }, undefined, speed);
    mount.setMaxPixelCount(1920 * 1080);
  } catch (e) {
    el.classList.add("static");
  }

  // Spotlight and drift follow the pointer, measured inside the first section
  let tx = 0, ty = 0, ox = 0, oy = 0;
  addEventListener("pointermove", (e) => {
    if (e.pointerType === "touch") return;
    const r = home.getBoundingClientRect();
    if (e.clientY > r.bottom + 200) return;
    el.style.setProperty("--mx", e.clientX - r.left + "px");
    el.style.setProperty("--my", e.clientY - r.top + "px");
    tx = ((e.clientX - r.left) / r.width - 0.5) * 0.25;
    ty = ((e.clientY - r.top) / r.height - 0.5) * -0.25;
  }, { passive: true });

  // Only animate while the first section is on screen, to save battery
  let visible = true, ticking = false;
  const tick = () => {
    if (!visible) { ticking = false; return; }
    ox += (tx - ox) * 0.05;
    oy += (ty - oy) * 0.05;
    mount.setUniforms({ u_offsetX: ox, u_offsetY: oy });
    requestAnimationFrame(tick);
  };
  const start = () => { if (!ticking) { ticking = true; requestAnimationFrame(tick); } };
  if (mount && !reduceMotion) {
    start();
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      mount.setSpeed(visible ? speed : 0);
      if (visible) start();
    }).observe(home);
  }
}
