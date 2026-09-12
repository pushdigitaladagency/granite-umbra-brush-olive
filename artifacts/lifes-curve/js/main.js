(() => {
  const nav = document.getElementById("nav");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const glow = document.querySelector(".cursor-glow");
  const curveSvg = document.getElementById("lifeCurve");
  const curvePath = document.getElementById("curvePath");
  const pathSection = document.getElementById("path");
  const finalLine = document.querySelector(".final-line");
  const form = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");
  const track = document.getElementById("testimonialTrack");
  const particles = document.getElementById("heroParticles");

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 24);
  });

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
  navLinks.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => navLinks.classList.remove("open"));
  });

  document.addEventListener("mousemove", (e) => {
    glow.style.opacity = "1";
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
    document.querySelectorAll(".parallax").forEach((el) => {
      const depth = Number(el.dataset.depth || 10);
      const x = ((e.clientX / window.innerWidth) - 0.5) * depth;
      const y = ((e.clientY / window.innerHeight) - 0.5) * depth;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
  });

  document.querySelectorAll(".magnetic").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });

  for (let i = 0; i < 28; i += 1) {
    const s = document.createElement("span");
    s.style.left = `${Math.random() * 100}%`;
    s.style.top = `${Math.random() * 100}%`;
    s.style.opacity = String(0.15 + Math.random() * 0.4);
    particles.appendChild(s);
  }

  function buildCurve() {
    const w = window.innerWidth;
    const h = document.documentElement.scrollHeight;
    curveSvg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    curveSvg.style.height = `${h}px`;
    curveSvg.style.width = `${w}px`;
    curveSvg.style.position = "absolute";
    curveSvg.style.top = "0";
    curveSvg.style.left = "0";
    curveSvg.style.bottom = "auto";

    const pts = [
      [w * 0.12, 90],
      [w * 0.42, window.innerHeight * 0.28],
      [w * 0.78, window.innerHeight * 0.62],
      [w * 0.22, window.innerHeight * 1.15],
      [w * 0.72, window.innerHeight * 1.7],
      [w * 0.3, window.innerHeight * 2.35],
      [w * 0.68, window.innerHeight * 2.95],
      [w * 0.4, window.innerHeight * 3.5],
      [w * 0.55, window.innerHeight * 4.05],
      [w * 0.5, Math.min(h - 180, window.innerHeight * 4.55)],
    ];

    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length; i += 1) {
      const prev = pts[i - 1];
      const cur = pts[i];
      const cx1 = prev[0] + (cur[0] - prev[0]) * 0.35;
      const cy1 = prev[1] + (cur[1] - prev[1]) * 0.1;
      const cx2 = prev[0] + (cur[0] - prev[0]) * 0.65;
      const cy2 = prev[1] + (cur[1] - prev[1]) * 0.9;
      d += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${cur[0]} ${cur[1]}`;
    }
    curvePath.setAttribute("d", d);
    curvePath.setAttribute("stroke-width", String(Math.max(1.2, w * 0.0016)));

    const length = curvePath.getTotalLength();
    curvePath.style.strokeDasharray = `${length}`;
    curvePath.style.strokeDashoffset = `${length}`;
    return length;
  }

  let curveLength = 0;
  const updateCurveProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? window.scrollY / max : 0;
    curvePath.style.strokeDashoffset = String(curveLength * (1 - p * 0.96));
    if (finalLine) finalLine.style.height = `${Math.min(220, window.scrollY * 0.08)}px`;
  };

  window.addEventListener("resize", () => {
    curveLength = buildCurve();
    updateCurveProgress();
  });
  window.addEventListener("scroll", updateCurveProgress, { passive: true });

  document.querySelectorAll(".path-circle").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      const tone = el.dataset.tone;
      const map = {
        ivory: "radial-gradient(ellipse at 50% 40%, rgba(243,238,230,0.08), transparent 55%)",
        teal: "radial-gradient(ellipse at 50% 40%, rgba(109,144,138,0.16), transparent 55%)",
        rose: "radial-gradient(ellipse at 50% 40%, rgba(196,160,154,0.16), transparent 55%)",
      };
      pathSection.style.background = map[tone] || "";
    });
    el.addEventListener("mouseleave", () => {
      pathSection.style.background = "";
    });
  });

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  track.addEventListener("mousedown", (e) => {
    isDown = true;
    track.classList.add("is-dragging");
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });
  window.addEventListener("mouseup", () => {
    isDown = false;
    track.classList.remove("is-dragging");
  });
  track.addEventListener("mouseleave", () => {
    isDown = false;
    track.classList.remove("is-dragging");
  });
  track.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    track.scrollLeft = scrollLeft - (x - startX);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    formNote.hidden = false;
  });

  if (prefersReduced || typeof gsap === "undefined") {
    document.querySelector(".portrait-mask").style.clipPath = "inset(0)";
    curveLength = buildCurve();
    updateCurveProgress();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  gsap.set(".portrait-mask", { clipPath: "inset(0 0 100% 0)" });

  const titleWords = document.querySelectorAll(".hero-title .word");
  gsap.set(titleWords, { y: 70, opacity: 0 });
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.fromTo(".brand-life", { x: -48, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 }, 0)
    .fromTo(".brand-curve", { x: 60, y: 28, rotate: 8, opacity: 0 }, { x: 0, y: 0, rotate: 0, opacity: 1, duration: 1.05, ease: "power3.inOut" }, 0.18)
    .to(titleWords, { y: 0, opacity: 1, stagger: 0.06, duration: 1.05 }, 0.35)
    .from(".eyebrow", { y: 16, opacity: 0, duration: 0.7 }, 0.28)
    .from(".hero-support, .hero-actions, .trust", { y: 24, opacity: 0, stagger: 0.12, duration: 0.8 }, 0.65)
    .to(".portrait-mask", { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power4.inOut" }, 0.28)
    .from(".hero-portrait .hand", { opacity: 0, y: 10, duration: 0.8 }, 1.1);

  gsap.from(".about-copy > *", {
    scrollTrigger: { trigger: ".about", start: "top 75%" },
    y: 24,
    opacity: 0,
    stagger: 0.08,
    duration: 0.8,
  });
  gsap.from(".course-card", {
    scrollTrigger: { trigger: "#courses", start: "top 78%" },
    y: 40,
    opacity: 0,
    stagger: 0.12,
    duration: 0.9,
  });
  gsap.from(".why-card", {
    scrollTrigger: { trigger: ".why", start: "top 80%" },
    y: 26,
    opacity: 0,
    stagger: 0.1,
    duration: 0.7,
  });
  gsap.from(".path-circle", {
    scrollTrigger: { trigger: ".path", start: "top 80%" },
    scale: 0.86,
    opacity: 0,
    stagger: 0.12,
    duration: 0.8,
  });

  curveLength = buildCurve();
  updateCurveProgress();
})();
