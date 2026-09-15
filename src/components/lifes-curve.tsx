import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53) % 100}%`,
  opacity: 0.18 + (i % 5) * 0.08,
}));

const STORY_WORDS = ["Life", "doesn’t", "always", "move", "in", "a", "straight", "line."];

const MARQUEE = [
  "Life’s Curve",
  "Tarot",
  "Numerology",
  "Energy Healing",
  "Manisha’s Cosmic Academy",
  "Trust your intuition",
];

export function LifesCurveSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sent, setSent] = useState(false);
  const [whyOn, setWhyOn] = useState<number | null>(null);
  const [pathTone, setPathTone] = useState("");
  const glowRef = useRef<HTMLDivElement>(null);
  const curveSvgRef = useRef<SVGSVGElement>(null);
  const curvePathRef = useRef<SVGPathElement>(null);
  const gridPathRef = useRef<SVGPathElement>(null);
  const wavePathRef = useRef<SVGPathElement>(null);
  const finalLineRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const curveLength = useRef(0);
  const [years, setYears] = useState(0);
  const [storyN, setStoryN] = useState(0);

  const pathBg = useMemo(() => {
    if (pathTone === "ivory") {
      return "radial-gradient(ellipse at 50% 40%, rgba(243,238,230,0.08), transparent 55%)";
    }
    if (pathTone === "teal") {
      return "radial-gradient(ellipse at 50% 40%, rgba(109,144,138,0.16), transparent 55%)";
    }
    if (pathTone === "rose") {
      return "radial-gradient(ellipse at 50% 40%, rgba(196,160,154,0.16), transparent 55%)";
    }
    return "";
  }, [pathTone]);

  useEffect(() => {
    const curveSvg = curveSvgRef.current;
    const curvePath = curvePathRef.current;
    const gridPath = gridPathRef.current;
    const wavePath = wavePathRef.current;
    if (!curveSvg || !curvePath) return;

    const pagePoint = (el: Element | null, ox = 0.5, oy = 0.5) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return [r.left + r.width * ox + window.scrollX, r.top + r.height * oy + window.scrollY] as [
        number,
        number,
      ];
    };

    const buildCurve = () => {
      const w = window.innerWidth;
      const h = document.documentElement.scrollHeight;
      curveSvg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      curveSvg.style.height = `${h}px`;
      curveSvg.style.width = `${w}px`;
      curveSvg.style.position = "absolute";
      curveSvg.style.top = "0";
      curveSvg.style.left = "0";

      const pts = [
        pagePoint(document.querySelector(".brand-intro"), 0, 0.5) ?? [w * 0.12, 90],
        pagePoint(document.querySelector(".scroll-story-pin"), 0.5, 0.5) ?? [w * 0.5, window.innerHeight * 0.9],
        pagePoint(document.getElementById("about"), 0.22, 0.4) ?? [w * 0.22, window.innerHeight * 1.2],
        pagePoint(document.querySelector(".keywords"), 0.8, 0.5) ?? [w * 0.7, window.innerHeight * 1.5],
        pagePoint(document.getElementById("course-tarot"), 0.5, 0.2) ?? [w * 0.25, window.innerHeight * 2.1],
        pagePoint(document.getElementById("course-numerology"), 0.5, 0.45) ?? [w * 0.5, window.innerHeight * 2.2],
        pagePoint(document.getElementById("course-energy"), 0.5, 0.7) ?? [w * 0.75, window.innerHeight * 2.3],
        pagePoint(document.querySelector(".why-grid"), 0.5, 0.2) ?? [w * 0.5, window.innerHeight * 3],
        pagePoint(document.getElementById("path"), 0.5, 0.5) ?? [w * 0.5, window.innerHeight * 3.5],
        pagePoint(document.querySelector(".final-cta .btn-gold"), 0.1, 0.5) ?? [w * 0.5, h - 220],
      ].filter(Boolean) as [number, number][];

      let d = `M ${pts[0][0]} ${pts[0][1]}`;
      for (let i = 1; i < pts.length; i += 1) {
        const prev = pts[i - 1];
        const cur = pts[i];
        const cx1 = prev[0] + (cur[0] - prev[0]) * 0.28;
        const cy1 = prev[1] + (cur[1] - prev[1]) * 0.08;
        const cx2 = prev[0] + (cur[0] - prev[0]) * 0.72;
        const cy2 = prev[1] + (cur[1] - prev[1]) * 0.92;
        d += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${cur[0]} ${cur[1]}`;
      }
      curvePath.setAttribute("d", d);
      curvePath.setAttribute("stroke-width", String(Math.max(1.4, w * 0.0018)));
      const length = curvePath.getTotalLength();
      curvePath.style.strokeDasharray = `${length}`;
      curvePath.style.strokeDashoffset = `${length}`;
      curveLength.current = length;

      const num = pagePoint(document.getElementById("course-numerology"), 0.5, 0.35);
      if (num && gridPath) {
        const s = 28;
        let gd = "";
        for (let r = 0; r < 3; r += 1) {
          for (let c = 0; c < 3; c += 1) {
            const x = num[0] - s * 1.5 + c * s;
            const y = num[1] - s * 1.5 + r * s;
            gd += `M ${x} ${y} h ${s} v ${s} h ${-s} z `;
          }
        }
        gridPath.setAttribute("d", gd);
      }

      const energy = pagePoint(document.getElementById("course-energy"), 0.5, 0.55);
      if (energy && wavePath) {
        let wd = `M ${energy[0] - 90} ${energy[1]}`;
        for (let i = 0; i <= 18; i += 1) {
          const x = energy[0] - 90 + i * 10;
          const y = energy[1] + Math.sin(i * 0.7) * 18;
          wd += ` L ${x} ${y}`;
        }
        wavePath.setAttribute("d", wd);
      }
    };

    const updateCurve = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      curvePath.style.strokeDashoffset = String(curveLength.current * (1 - p * 0.98));
      if (finalLineRef.current) {
        finalLineRef.current.style.height = `${Math.min(240, Math.max(0, (p - 0.72) * 1400))}px`;
      }
      curveSvg.classList.toggle("show-grid", p > 0.28 && p < 0.52);
      curveSvg.classList.toggle("show-wave", p > 0.34 && p < 0.58);
    };

    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      updateCurve();
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pageP = max > 0 ? window.scrollY / max : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${pageP})`;
      }
      if (storyRef.current) {
        const el = storyRef.current;
        const total = Math.max(1, el.offsetHeight - window.innerHeight);
        const p = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / total));
        setStoryN(Math.min(STORY_WORDS.length, Math.floor(p * (STORY_WORDS.length + 0.35))));
      }
    };

    const onMove = (e: MouseEvent) => {
      const glow = glowRef.current;
      if (glow) {
        glow.style.opacity = "1";
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
      }
      document.querySelectorAll<HTMLElement>(".parallax").forEach((el) => {
        const depth = Number(el.dataset.depth || 10);
        const x = (e.clientX / window.innerWidth - 0.5) * depth;
        const y = (e.clientY / window.innerHeight - 0.5) * depth;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    const magnetics = Array.from(document.querySelectorAll<HTMLElement>(".magnetic"));
    const onMag = (e: MouseEvent) => {
      const btn = e.currentTarget as HTMLElement;
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    };
    const onMagOut = (e: MouseEvent) => {
      (e.currentTarget as HTMLElement).style.transform = "";
    };
    magnetics.forEach((btn) => {
      btn.addEventListener("mousemove", onMag);
      btn.addEventListener("mouseleave", onMagOut);
    });

    const track = trackRef.current;
    const drag = { down: false, startX: 0, scrollLeft: 0 };
    const onDown = (e: MouseEvent) => {
      if (!track) return;
      drag.down = true;
      track.classList.add("is-dragging");
      drag.startX = e.pageX - track.offsetLeft;
      drag.scrollLeft = track.scrollLeft;
    };
    const onUp = () => {
      drag.down = false;
      track?.classList.remove("is-dragging");
    };
    const onDrag = (e: MouseEvent) => {
      if (!drag.down || !track) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      track.scrollLeft = drag.scrollLeft - (x - drag.startX);
    };
    track?.addEventListener("mousedown", onDown);
    track?.addEventListener("mousemove", onDrag);
    track?.addEventListener("mouseleave", onUp);
    window.addEventListener("mouseup", onUp);

    buildCurve();
    updateCurve();
    const onResize = () => {
      buildCurve();
      updateCurve();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    onScroll();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view");
          if (entry.target.id === "about") {
            io.unobserve(entry.target);
            let n = 0;
            const tick = window.setInterval(() => {
              n += 1;
              setYears(n);
              if (n >= 10) window.clearInterval(tick);
            }, 90);
          }
          if (entry.target.classList.contains("loshu")) {
            entry.target.classList.add("is-on");
          }
        });
      },
      { threshold: 0.28 },
    );
    if (aboutRef.current) io.observe(aboutRef.current);
    document.querySelectorAll(".loshu").forEach((el) => io.observe(el));
    const whyEl = document.getElementById("why");
    if (whyEl) io.observe(whyEl);
    document
      .querySelectorAll(
        ".section-intro, .course-card, .consult-card, .path-circle, .testimonials blockquote, .about-copy, .about-portrait, .final-cta, .contact-grid > div",
      )
      .forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      io.disconnect();
      magnetics.forEach((btn) => {
        btn.removeEventListener("mousemove", onMag);
        btn.removeEventListener("mouseleave", onMagOut);
      });
    };
  }, []);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="lc">
      <div className="grain" aria-hidden="true" />
      <div className="cursor-glow" ref={glowRef} aria-hidden="true" />
      <svg
        className="life-curve"
        ref={curveSvgRef}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c4a574" stopOpacity="0.15" />
            <stop offset="40%" stopColor="#6a8f8a" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#c4a574" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#c4a09a" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path
          ref={curvePathRef}
          fill="none"
          stroke="url(#curveGrad)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path ref={gridPathRef} className="curve-grid" />
        <path ref={wavePathRef} className="curve-wave" />
      </svg>

      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
      <header className={scrolled ? "nav scrolled" : "nav"}>
        <a className="logo" href="#top">
          Life’s Curve
        </a>
        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#courses" onClick={() => setMenuOpen(false)}>
            Courses
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About Manisha
          </a>
          <a href="#consultations" onClick={() => setMenuOpen(false)}>
            Consultations
          </a>
          <a href="#testimonials" onClick={() => setMenuOpen(false)}>
            Testimonials
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </nav>
        <a className="btn btn-gold magnetic" href="#courses">
          Explore Courses
        </a>
        <button className="menu-toggle" aria-label="Open menu" onClick={() => setMenuOpen((v) => !v)}>
          <span />
          <span />
        </button>
      </header>

      <main id="top">
        <section className="hero" id="hero">
          <div className="hero-orbit" aria-hidden="true" />
          <svg className="hero-curve" viewBox="0 0 1200 800" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="heroCurveGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#c4a574" stopOpacity="0.15" />
                <stop offset="40%" stopColor="#c4a574" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#6d908a" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path
              className="hero-curve-path"
              id="heroDrawPath"
              d="M 30 480 C 240 80, 500 720, 780 250 S 1080 90, 1200 340"
              fill="none"
            />
            <circle className="hero-curve-dot" r="5" fill="#d8c09a">
              <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
                <mpath href="#heroDrawPath" />
              </animateMotion>
            </circle>
          </svg>
          <div className="hero-particles" aria-hidden="true">
            {PARTICLES.map((p, i) => (
              <span key={i} style={{ left: p.left, top: p.top, opacity: p.opacity }} />
            ))}
          </div>
          <div className="hero-symbols" aria-hidden="true">
            <div className="float-card parallax" data-depth="18">
              <img src="/tarot-card.jpg" alt="" />
            </div>
            <div className="float-grid parallax" data-depth="12">
              <span>4</span>
              <span>9</span>
              <span>2</span>
              <span>3</span>
              <span>5</span>
              <span>7</span>
            </div>
            <div className="float-rings parallax" data-depth="24" />
          </div>

          <div className="hero-copy">
            <div className="brand-intro" aria-hidden="true">
              <span className="brand-life">Life’s</span>
              <span className="brand-curve">Curve</span>
            </div>
            <p className="eyebrow">Manisha’s Cosmic Academy</p>
            <h1 className="hero-title">
              <span className="line">
                <span className="word">Learn</span> <span className="word">to</span>{" "}
                <span className="word">Read</span> <span className="word">the</span>{" "}
                <span className="word">Signs.</span>
              </span>
              <span className="line">
                <span className="word">Understand</span> <span className="word">the</span>{" "}
                <span className="word">Patterns.</span>
              </span>
              <span className="line italic">
                <span className="word">Trust</span> <span className="word">Your</span>{" "}
                <span className="word">Intuition.</span>
              </span>
            </h1>
            <p className="hero-support">
              Structured, practical learning in Tarot, Numerology and Energy Healing with Manisha.
            </p>
            <div className="hero-actions">
              <a className="btn btn-gold magnetic" href="#courses">
                Explore the Courses
              </a>
              <a className="btn btn-ghost magnetic" href="#about">
                Meet Manisha
              </a>
            </div>
            <p className="trust">10+ Years of Guidance & Practice</p>
            <p className="hand script">Life doesn’t always move in a straight line</p>
          </div>
        </section>

        <section className="scroll-story" id="idea" ref={storyRef}>
          <div className="scroll-story-pin">
            <p className="eyebrow">As you move through the page</p>
            <h2 className="scroll-words">
              {STORY_WORDS.map((word, i) => (
                <span key={`${word}-${i}`} className={i < storyN ? (i === STORY_WORDS.length - 1 ? "on accent" : "on") : ""}>
                  {word}
                </span>
              ))}
            </h2>
            <p className="scroll-story-note script">Keep scrolling. The line keeps moving.</p>
          </div>
        </section>

        <section className="about" id="about" ref={aboutRef}>
          <div className="about-portrait">
            <div className="portrait-frame">
              <img src="/manisha-about.jpg" alt="Editorial portrait of Manisha" />
            </div>
          </div>
          <svg className="discipline-line" viewBox="0 0 800 600" preserveAspectRatio="none" aria-hidden="true">
            <path d="M 180 220 C 280 180, 420 260, 620 120" />
          </svg>
          <div className="about-copy">
            <p className="eyebrow">The Guide Behind Life’s Curve</p>
            <h2>Meet Manisha</h2>
            <p className="subhead">Guidance shaped by experience. Perspective backed by 10+ years.</p>
            <ol className="timeline">
              <li>
                <span>The beginning</span>
                Navigating uncertainty, change and unexpected turns
              </li>
              <li>
                <span>A decade of practice</span>
                Analytical work meeting spiritual study
              </li>
              <li>
                <span>Today</span>
                Life’s Curve is that space for you
              </li>
            </ol>
            <p>
              My journey into Tarot, Numerology and Energy Healing began with my own experiences of
              navigating uncertainty, change and life’s unexpected turns.
            </p>
            <p>
              Over the past 10+ years, I’ve combined my analytical background with spiritual
              practices and intuitive guidance to help people approach their own crossroads with
              greater awareness.
            </p>
            <p>Today, Life’s Curve is that space for you.</p>
            <div className="stat">
              <span className="stat-num">{years}+</span>
              <span className="stat-label">Years</span>
            </div>
            <div className="keywords">
              <span>Tarot</span>
              <span>Numerology</span>
              <span>Energy Healing</span>
            </div>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={`${item}-${i}`}>{item}</span>
            ))}
          </div>
        </div>

        <section className="courses" id="courses">
          <div className="section-intro">
            <p className="eyebrow">Manisha’s Cosmic Academy</p>
            <h2>Choose What You Want to Master</h2>
            <p className="lede">
              Take your interest in Tarot, Numerology or Energy Healing further through structured,
              practical learning with Manisha.
            </p>
          </div>
          <div className="course-track">
            <article className="course-card" id="course-tarot">
              <div className="course-visual">
                <span className="course-no">01</span>
                <div className="arch-grid" aria-hidden="true" />
                <img className="tilt-card" src="/tarot-card.jpg" alt="Elegant tarot card" />
              </div>
              <div className="course-body">
                <h3>The Elite Tarot Architect</h3>
                <p className="meta">4 Weeks · Live</p>
                <p className="price">
                  ₹15,000 <span>/ $249</span>
                </p>
                <a className="text-link" href="#contact">
                  Explore Tarot Course <span>→</span>
                </a>
              </div>
            </article>
            <article className="course-card" id="course-numerology">
              <div className="course-visual">
                <span className="course-no">02</span>
                <div className="loshu" aria-hidden="true">
                  <span>4</span>
                  <span>9</span>
                  <span>2</span>
                  <span>3</span>
                  <span>5</span>
                  <span>7</span>
                  <span>8</span>
                  <span>1</span>
                  <span>6</span>
                </div>
              </div>
              <div className="course-body">
                <h3>Premium Vedic & Loshu Grid Numerology</h3>
                <p className="meta">6 Weeks · Live</p>
                <p className="price">
                  ₹21,000 <span>/ $349</span>
                </p>
                <a className="text-link" href="#contact">
                  Explore Numerology <span>→</span>
                </a>
              </div>
            </article>
            <article className="course-card" id="course-energy">
              <div className="course-visual">
                <span className="course-no">03</span>
                <div className="energy-anim" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="course-body">
                <h3>Quantum Chakra & Bio-Energy Healer</h3>
                <p className="meta">3 Weeks</p>
                <p className="price">
                  ₹11,000 <span>/ $199</span>
                </p>
                <a className="text-link" href="#contact">
                  Explore Energy Healing <span>→</span>
                </a>
              </div>
            </article>
          </div>
        </section>

        <section className="why" id="why">
          <div className="section-intro">
            <p className="eyebrow">The Difference</p>
            <h2>More Than Learning the Technique</h2>
          </div>
          <div className="why-grid">
            <svg className="why-line" viewBox="0 0 1000 28" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="whyLineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#c4a574" stopOpacity="0" />
                  <stop offset="20%" stopColor="#c4a574" />
                  <stop offset="50%" stopColor="#6d908a" />
                  <stop offset="80%" stopColor="#c4a09a" />
                  <stop offset="100%" stopColor="#c4a574" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M 20 18 C 180 4, 320 26, 500 12 S 820 4, 980 18" />
            </svg>
            {[
              {
                n: "01",
                t: "Practical Learning",
                p: "Structured guidance designed to be understood and applied.",
              },
              {
                n: "02",
                t: "Live Guidance",
                p: "Learn directly with Manisha rather than relying only on recorded content.",
              },
              {
                n: "03",
                t: "Intuitive Development",
                p: "Develop your understanding while building confidence in your own interpretation.",
              },
              {
                n: "04",
                t: "Personal Perspective",
                p: "Learn from more than a decade of experience across Tarot, Numerology and Energy Healing.",
              },
            ].map((item, i) => (
              <article
                key={item.n}
                className={whyOn === i ? "why-card is-on" : "why-card"}
                onMouseEnter={() => setWhyOn(i)}
                onMouseLeave={() => setWhyOn(null)}
                onFocus={() => setWhyOn(i)}
                onBlur={() => setWhyOn(null)}
                tabIndex={0}
              >
                <span className="why-index">{item.n}</span>
                <h3>{item.t}</h3>
                <p>{item.p}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="path" id="path" style={{ background: pathBg }}>
          <div className="section-intro">
            <p className="eyebrow">Begin Where You Are</p>
            <h2>Where Does Your Curiosity Lead?</h2>
          </div>
          <div className="path-circles">
            <a
              className="path-circle"
              href="#course-tarot"
              onMouseEnter={() => setPathTone("ivory")}
              onMouseLeave={() => setPathTone("")}
            >
              <span className="circle-label">Tarot</span>
              <p>“I want to understand intuition and guidance.”</p>
            </a>
            <a
              className="path-circle"
              href="#course-numerology"
              onMouseEnter={() => setPathTone("teal")}
              onMouseLeave={() => setPathTone("")}
            >
              <span className="circle-label">Numerology</span>
              <p>“I want to understand numbers and patterns.”</p>
            </a>
            <a
              className="path-circle"
              href="#course-energy"
              onMouseEnter={() => setPathTone("rose")}
              onMouseLeave={() => setPathTone("")}
            >
              <span className="circle-label">Energy Healing</span>
              <p>“I want to understand balance and energy.”</p>
            </a>
          </div>
        </section>

        <section className="consults" id="consultations">
          <div className="section-intro">
            <p className="eyebrow">Looking for Personal Guidance?</p>
            <h2>Your Questions. Your Journey. Your Session.</h2>
          </div>
          <div className="consult-grid">
            <article className="consult-card">
              <h3>Life-Alignment Tarot</h3>
              <p className="meta">60 Minutes</p>
              <p className="price">
                ₹5,100 <span>/ $99</span>
              </p>
            </article>
            <article className="consult-card">
              <h3>Destiny Blueprint</h3>
              <p className="meta">Loshu Grid + Vedic Numerology</p>
              <p className="price">
                ₹7,500 <span>/ $149</span>
              </p>
            </article>
            <article className="consult-card">
              <h3>Ultimate Cosmic Fusion</h3>
              <p className="meta">90-Minute VIP Session</p>
              <p className="price">
                ₹15,000 <span>/ $249</span>
              </p>
            </article>
          </div>
          <div className="center">
            <a className="btn btn-ghost magnetic" href="#contact">
              Enquire About a Session
            </a>
          </div>
        </section>

        <section className="testimonials" id="testimonials">
          <div className="section-intro">
            <h2>
              Different Journeys.
              <br />
              One Thing in Common — Clarity.
            </h2>
          </div>
          <div className="testimonial-scroller" ref={trackRef}>
            <blockquote>
              <p>“I finally had clarity about the decision I was struggling with.”</p>
              <cite>— Neha Sharma, Noida</cite>
            </blockquote>
            <blockquote>
              <p>“The guidance helped me approach my business decision differently.”</p>
              <cite>— Amit Sharma, Mumbai</cite>
            </blockquote>
            <blockquote>
              <p>“It gave me a safe space to talk about what I was going through.”</p>
              <cite>— Kiran Yadav, Jaipur</cite>
            </blockquote>
            <blockquote>
              <p>“I finally had clarity about the decision I was struggling with.”</p>
              <cite>— Neha Sharma, Noida</cite>
            </blockquote>
            <blockquote>
              <p>“The guidance helped me approach my business decision differently.”</p>
              <cite>— Amit Sharma, Mumbai</cite>
            </blockquote>
          </div>
          <p className="drag-hint">Drag to move through the stories</p>
        </section>

        <section className="final-cta" id="final">
          <div className="final-line" ref={finalLineRef} aria-hidden="true" />
          <p className="eyebrow light">Your next curve could become your new direction.</p>
          <h2>Ready to Learn With Manisha?</h2>
          <p className="lede">
            Choose the path that speaks to you and begin your journey through Tarot, Numerology or
            Energy Healing.
          </p>
          <div className="hero-actions">
            <a className="btn btn-gold magnetic" href="#courses">
              Explore Courses
            </a>
            <a className="btn btn-ghost magnetic" href="#contact">
              Chat with Manisha
            </a>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-grid">
            <div>
              <p className="eyebrow">Contact</p>
              <h2>Begin the Conversation</h2>
              <p>
                Share which course or session you are drawn to. A member of the academy will respond
                with next steps.
              </p>
              <ul className="contact-meta">
                <li>
                  WhatsApp — <span>Add number</span>
                </li>
                <li>
                  Phone — <span>Add number</span>
                </li>
                <li>
                  Email — <span>Add address</span>
                </li>
              </ul>
            </div>
            <form className="contact-form" onSubmit={onSubmit}>
              <label>
                Name
                <input type="text" name="name" required />
              </label>
              <label>
                Email
                <input type="email" name="email" required />
              </label>
              <label>
                Interest
                <select name="interest">
                  <option>The Elite Tarot Architect</option>
                  <option>Premium Vedic & Loshu Grid Numerology</option>
                  <option>Quantum Chakra & Bio-Energy Healer</option>
                  <option>Private Consultation</option>
                </select>
              </label>
              <label>
                Message
                <textarea name="message" rows={4} />
              </label>
              <button className="btn btn-gold" type="submit">
                Send Enquiry
              </button>
              {sent ? (
                <p className="form-note">
                  Thank you. Your enquiry has been noted. Please add WhatsApp, phone and email
                  details when they are available.
                </p>
              ) : null}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p className="footer-mark">Life’s Curve</p>
        <p className="footer-sub">Tarot • Numerology • Energy Healing • Cosmic Academy</p>
        <nav>
          <a href="#courses">Courses</a>
          <a href="#about">About Manisha</a>
          <a href="#consultations">Consultations</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#contact">Contact</a>
        </nav>
        <p className="placeholders">WhatsApp · Phone · Email</p>
        <p className="disclaimer">
          Tarot, numerology and energy healing are spiritual and complementary practices intended
          for personal guidance and wellbeing. They should not be considered a substitute for
          professional medical, legal, financial or mental-health advice.
        </p>
      </footer>
    </div>
  );
}
