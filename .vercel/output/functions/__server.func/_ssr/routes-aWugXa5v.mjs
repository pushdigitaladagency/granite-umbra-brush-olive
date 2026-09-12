import { i as __toESM } from "../_runtime.mjs";
import { L as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-aWugXa5v.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PARTICLES = Array.from({ length: 28 }, (_, i) => ({
	left: `${i * 37 % 100}%`,
	top: `${i * 53 % 100}%`,
	opacity: .18 + i % 5 * .08
}));
function LifesCurveSite() {
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [sent, setSent] = (0, import_react.useState)(false);
	const [whyOn, setWhyOn] = (0, import_react.useState)(null);
	const [pathTone, setPathTone] = (0, import_react.useState)("");
	const glowRef = (0, import_react.useRef)(null);
	const curveSvgRef = (0, import_react.useRef)(null);
	const curvePathRef = (0, import_react.useRef)(null);
	const gridPathRef = (0, import_react.useRef)(null);
	const wavePathRef = (0, import_react.useRef)(null);
	const finalLineRef = (0, import_react.useRef)(null);
	const trackRef = (0, import_react.useRef)(null);
	const aboutRef = (0, import_react.useRef)(null);
	const curveLength = (0, import_react.useRef)(0);
	const [years, setYears] = (0, import_react.useState)(0);
	const pathBg = (0, import_react.useMemo)(() => {
		if (pathTone === "ivory") return "radial-gradient(ellipse at 50% 40%, rgba(243,238,230,0.08), transparent 55%)";
		if (pathTone === "teal") return "radial-gradient(ellipse at 50% 40%, rgba(109,144,138,0.16), transparent 55%)";
		if (pathTone === "rose") return "radial-gradient(ellipse at 50% 40%, rgba(196,160,154,0.16), transparent 55%)";
		return "";
	}, [pathTone]);
	(0, import_react.useEffect)(() => {
		const curveSvg = curveSvgRef.current;
		const curvePath = curvePathRef.current;
		const gridPath = gridPathRef.current;
		const wavePath = wavePathRef.current;
		if (!curveSvg || !curvePath) return;
		const pagePoint = (el, ox = .5, oy = .5) => {
			if (!el) return null;
			const r = el.getBoundingClientRect();
			return [r.left + r.width * ox + window.scrollX, r.top + r.height * oy + window.scrollY];
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
				pagePoint(document.querySelector(".brand-intro"), 0, .5) ?? [w * .12, 90],
				pagePoint(document.querySelector(".hero-portrait"), .15, .55) ?? [w * .72, window.innerHeight * .5],
				pagePoint(document.getElementById("about"), .22, .4) ?? [w * .22, window.innerHeight * 1.2],
				pagePoint(document.querySelector(".keywords"), .8, .5) ?? [w * .7, window.innerHeight * 1.5],
				pagePoint(document.getElementById("course-tarot"), .5, .2) ?? [w * .25, window.innerHeight * 2.1],
				pagePoint(document.getElementById("course-numerology"), .5, .45) ?? [w * .5, window.innerHeight * 2.2],
				pagePoint(document.getElementById("course-energy"), .5, .7) ?? [w * .75, window.innerHeight * 2.3],
				pagePoint(document.querySelector(".why-grid"), .5, .2) ?? [w * .5, window.innerHeight * 3],
				pagePoint(document.getElementById("path"), .5, .5) ?? [w * .5, window.innerHeight * 3.5],
				pagePoint(document.querySelector(".final-cta .btn-gold"), .1, .5) ?? [w * .5, h - 220]
			].filter(Boolean);
			let d = `M ${pts[0][0]} ${pts[0][1]}`;
			for (let i = 1; i < pts.length; i += 1) {
				const prev = pts[i - 1];
				const cur = pts[i];
				const cx1 = prev[0] + (cur[0] - prev[0]) * .28;
				const cy1 = prev[1] + (cur[1] - prev[1]) * .08;
				const cx2 = prev[0] + (cur[0] - prev[0]) * .72;
				const cy2 = prev[1] + (cur[1] - prev[1]) * .92;
				d += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${cur[0]} ${cur[1]}`;
			}
			curvePath.setAttribute("d", d);
			curvePath.setAttribute("stroke-width", String(Math.max(1.4, w * .0018)));
			const length = curvePath.getTotalLength();
			curvePath.style.strokeDasharray = `${length}`;
			curvePath.style.strokeDashoffset = `${length}`;
			curveLength.current = length;
			const num = pagePoint(document.getElementById("course-numerology"), .5, .35);
			if (num && gridPath) {
				const s = 28;
				let gd = "";
				for (let r = 0; r < 3; r += 1) for (let c = 0; c < 3; c += 1) {
					const x = num[0] - s * 1.5 + c * s;
					const y = num[1] - s * 1.5 + r * s;
					gd += `M ${x} ${y} h ${s} v ${s} h -28 z `;
				}
				gridPath.setAttribute("d", gd);
			}
			const energy = pagePoint(document.getElementById("course-energy"), .5, .55);
			if (energy && wavePath) {
				let wd = `M ${energy[0] - 90} ${energy[1]}`;
				for (let i = 0; i <= 18; i += 1) {
					const x = energy[0] - 90 + i * 10;
					const y = energy[1] + Math.sin(i * .7) * 18;
					wd += ` L ${x} ${y}`;
				}
				wavePath.setAttribute("d", wd);
			}
		};
		const updateCurve = () => {
			const max = document.documentElement.scrollHeight - window.innerHeight;
			const p = max > 0 ? window.scrollY / max : 0;
			curvePath.style.strokeDashoffset = String(curveLength.current * (1 - p * .98));
			if (finalLineRef.current) finalLineRef.current.style.height = `${Math.min(240, Math.max(0, (p - .72) * 1400))}px`;
			curveSvg.classList.toggle("show-grid", p > .28 && p < .52);
			curveSvg.classList.toggle("show-wave", p > .34 && p < .58);
		};
		const onScroll = () => {
			setScrolled(window.scrollY > 24);
			updateCurve();
		};
		const onMove = (e) => {
			const glow = glowRef.current;
			if (glow) {
				glow.style.opacity = "1";
				glow.style.left = `${e.clientX}px`;
				glow.style.top = `${e.clientY}px`;
			}
			document.querySelectorAll(".parallax").forEach((el) => {
				const depth = Number(el.dataset.depth || 10);
				const x = (e.clientX / window.innerWidth - .5) * depth;
				const y = (e.clientY / window.innerHeight - .5) * depth;
				el.style.transform = `translate(${x}px, ${y}px)`;
			});
		};
		const magnetics = Array.from(document.querySelectorAll(".magnetic"));
		const onMag = (e) => {
			const btn = e.currentTarget;
			const r = btn.getBoundingClientRect();
			const x = e.clientX - r.left - r.width / 2;
			const y = e.clientY - r.top - r.height / 2;
			btn.style.transform = `translate(${x * .18}px, ${y * .18}px)`;
		};
		const onMagOut = (e) => {
			e.currentTarget.style.transform = "";
		};
		magnetics.forEach((btn) => {
			btn.addEventListener("mousemove", onMag);
			btn.addEventListener("mouseleave", onMagOut);
		});
		const track = trackRef.current;
		const drag = {
			down: false,
			startX: 0,
			scrollLeft: 0
		};
		const onDown = (e) => {
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
		const onDrag = (e) => {
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
		const io = new IntersectionObserver((entries) => {
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
				if (entry.target.classList.contains("loshu")) entry.target.classList.add("is-on");
			});
		}, { threshold: .28 });
		if (aboutRef.current) io.observe(aboutRef.current);
		document.querySelectorAll(".loshu").forEach((el) => io.observe(el));
		const whyEl = document.getElementById("why");
		if (whyEl) io.observe(whyEl);
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
	function onSubmit(e) {
		e.preventDefault();
		setSent(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "lc",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grain",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "cursor-glow",
				ref: glowRef,
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				className: "life-curve",
				ref: curveSvgRef,
				viewBox: "0 0 100 100",
				preserveAspectRatio: "none",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "curveGrad",
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0%",
								stopColor: "#c4a574",
								stopOpacity: "0.15"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "40%",
								stopColor: "#6a8f8a",
								stopOpacity: "0.55"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "70%",
								stopColor: "#c4a574",
								stopOpacity: "0.7"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "100%",
								stopColor: "#c4a09a",
								stopOpacity: "0.4"
							})
						]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						ref: curvePathRef,
						fill: "none",
						stroke: "url(#curveGrad)",
						strokeWidth: "1.6",
						strokeLinecap: "round"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						ref: gridPathRef,
						className: "curve-grid"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						ref: wavePathRef,
						className: "curve-wave"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: scrolled ? "nav scrolled" : "nav",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "logo",
						href: "#top",
						children: "Life’s Curve"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: menuOpen ? "nav-links open" : "nav-links",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#courses",
								onClick: () => setMenuOpen(false),
								children: "Courses"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#about",
								onClick: () => setMenuOpen(false),
								children: "About Manisha"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#consultations",
								onClick: () => setMenuOpen(false),
								children: "Consultations"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#testimonials",
								onClick: () => setMenuOpen(false),
								children: "Testimonials"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#contact",
								onClick: () => setMenuOpen(false),
								children: "Contact"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "btn btn-gold magnetic",
						href: "#courses",
						children: "Explore Courses"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "menu-toggle",
						"aria-label": "Open menu",
						onClick: () => setMenuOpen((v) => !v),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "top",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "hero",
						id: "hero",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "hero-orbit",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "hero-particles",
								"aria-hidden": "true",
								children: PARTICLES.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
									left: p.left,
									top: p.top,
									opacity: p.opacity
								} }, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hero-symbols",
								"aria-hidden": "true",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "float-card parallax",
										"data-depth": "18",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: "/tarot-card.jpg",
											alt: ""
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "float-grid parallax",
										"data-depth": "12",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "4" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "9" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "2" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "3" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "5" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "7" })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "float-rings parallax",
										"data-depth": "24"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hero-copy",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "brand-intro",
										"aria-hidden": "true",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "brand-life",
											children: "Life’s"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "brand-curve",
											children: "Curve"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "eyebrow",
										children: "Manisha’s Cosmic Academy"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
										className: "hero-title",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "line",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "word",
														children: "Learn"
													}),
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "word",
														children: "to"
													}),
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "word",
														children: "Read"
													}),
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "word",
														children: "the"
													}),
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "word",
														children: "Signs."
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "line",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "word",
														children: "Understand"
													}),
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "word",
														children: "the"
													}),
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "word",
														children: "Patterns."
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "line italic",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "word",
														children: "Trust"
													}),
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "word",
														children: "Your"
													}),
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "word",
														children: "Intuition."
													})
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "hero-support",
										children: "Structured, practical learning in Tarot, Numerology and Energy Healing with Manisha."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "hero-actions",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											className: "btn btn-gold magnetic",
											href: "#courses",
											children: "Explore the Courses"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											className: "btn btn-ghost magnetic",
											href: "#about",
											children: "Meet Manisha"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "trust",
										children: "10+ Years of Guidance & Practice"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hero-portrait",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "portrait-mask",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: "/manisha-hero.jpg",
										alt: "Manisha, founder of Life’s Curve and Manisha’s Cosmic Academy"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "hand script",
									children: "Life doesn’t always move in a straight line"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "about",
						id: "about",
						ref: aboutRef,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "about-portrait",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "portrait-frame",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: "/manisha-about.jpg",
										alt: "Editorial portrait of Manisha"
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								className: "discipline-line",
								viewBox: "0 0 800 600",
								preserveAspectRatio: "none",
								"aria-hidden": "true",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M 180 220 C 280 180, 420 260, 620 120" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "about-copy",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "eyebrow",
										children: "The Guide Behind Life’s Curve"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Meet Manisha" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "subhead",
										children: "Guidance shaped by experience. Perspective backed by 10+ years."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
										className: "timeline",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "The beginning" }), "Navigating uncertainty, change and unexpected turns"] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "A decade of practice" }), "Analytical work meeting spiritual study"] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Today" }), "Life’s Curve is that space for you"] })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "My journey into Tarot, Numerology and Energy Healing began with my own experiences of navigating uncertainty, change and life’s unexpected turns." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Over the past 10+ years, I’ve combined my analytical background with spiritual practices and intuitive guidance to help people approach their own crossroads with greater awareness." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Today, Life’s Curve is that space for you." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "stat",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "stat-num",
											children: [years, "+"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "stat-label",
											children: "Years"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "keywords",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Tarot" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Numerology" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Energy Healing" })
										]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "courses",
						id: "courses",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "section-intro",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "Manisha’s Cosmic Academy"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Choose What You Want to Master" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "lede",
									children: "Take your interest in Tarot, Numerology or Energy Healing further through structured, practical learning with Manisha."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "course-track",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "course-card",
									id: "course-tarot",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "course-visual",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "course-no",
												children: "01"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "arch-grid",
												"aria-hidden": "true"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												className: "tilt-card",
												src: "/tarot-card.jpg",
												alt: "Elegant tarot card"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "course-body",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "The Elite Tarot Architect" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "meta",
												children: "4 Weeks · Live"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "price",
												children: ["₹15,000 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "/ $249" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												className: "text-link",
												href: "#contact",
												children: ["Explore Tarot Course ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "course-card",
									id: "course-numerology",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "course-visual",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "course-no",
											children: "02"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "loshu",
											"aria-hidden": "true",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "4" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "9" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "2" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "3" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "5" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "7" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "8" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "1" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "6" })
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "course-body",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Premium Vedic & Loshu Grid Numerology" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "meta",
												children: "6 Weeks · Live"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "price",
												children: ["₹21,000 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "/ $349" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												className: "text-link",
												href: "#contact",
												children: ["Explore Numerology ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "course-card",
									id: "course-energy",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "course-visual",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "course-no",
											children: "03"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "energy-anim",
											"aria-hidden": "true",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "course-body",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Quantum Chakra & Bio-Energy Healer" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "meta",
												children: "3 Weeks"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "price",
												children: ["₹11,000 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "/ $199" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												className: "text-link",
												href: "#contact",
												children: ["Explore Energy Healing ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
											})
										]
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "why",
						id: "why",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "section-intro",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "The Difference"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "More Than Learning the Technique" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "why-grid",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								className: "why-line",
								viewBox: "0 0 1000 28",
								preserveAspectRatio: "none",
								"aria-hidden": "true",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
									id: "whyLineGrad",
									x1: "0",
									y1: "0",
									x2: "1",
									y2: "0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "0%",
											stopColor: "#c4a574",
											stopOpacity: "0"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "20%",
											stopColor: "#c4a574"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "50%",
											stopColor: "#6d908a"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "80%",
											stopColor: "#c4a09a"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "100%",
											stopColor: "#c4a574",
											stopOpacity: "0"
										})
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M 20 18 C 180 4, 320 26, 500 12 S 820 4, 980 18" })]
							}), [
								{
									n: "01",
									t: "Practical Learning",
									p: "Structured guidance designed to be understood and applied."
								},
								{
									n: "02",
									t: "Live Guidance",
									p: "Learn directly with Manisha rather than relying only on recorded content."
								},
								{
									n: "03",
									t: "Intuitive Development",
									p: "Develop your understanding while building confidence in your own interpretation."
								},
								{
									n: "04",
									t: "Personal Perspective",
									p: "Learn from more than a decade of experience across Tarot, Numerology and Energy Healing."
								}
							].map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: whyOn === i ? "why-card is-on" : "why-card",
								onMouseEnter: () => setWhyOn(i),
								onMouseLeave: () => setWhyOn(null),
								onFocus: () => setWhyOn(i),
								onBlur: () => setWhyOn(null),
								tabIndex: 0,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "why-index",
										children: item.n
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: item.t }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.p })
								]
							}, item.n))]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "path",
						id: "path",
						style: { background: pathBg },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "section-intro",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "Begin Where You Are"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Where Does Your Curiosity Lead?" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "path-circles",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									className: "path-circle",
									href: "#course-tarot",
									onMouseEnter: () => setPathTone("ivory"),
									onMouseLeave: () => setPathTone(""),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "circle-label",
										children: "Tarot"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "“I want to understand intuition and guidance.”" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									className: "path-circle",
									href: "#course-numerology",
									onMouseEnter: () => setPathTone("teal"),
									onMouseLeave: () => setPathTone(""),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "circle-label",
										children: "Numerology"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "“I want to understand numbers and patterns.”" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									className: "path-circle",
									href: "#course-energy",
									onMouseEnter: () => setPathTone("rose"),
									onMouseLeave: () => setPathTone(""),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "circle-label",
										children: "Energy Healing"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "“I want to understand balance and energy.”" })]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "consults",
						id: "consultations",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "section-intro",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "Looking for Personal Guidance?"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Your Questions. Your Journey. Your Session." })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "consult-grid",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
										className: "consult-card",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Life-Alignment Tarot" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "meta",
												children: "60 Minutes"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "price",
												children: ["₹5,100 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "/ $99" })]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
										className: "consult-card",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Destiny Blueprint" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "meta",
												children: "Loshu Grid + Vedic Numerology"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "price",
												children: ["₹7,500 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "/ $149" })]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
										className: "consult-card",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Ultimate Cosmic Fusion" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "meta",
												children: "90-Minute VIP Session"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "price",
												children: ["₹15,000 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "/ $249" })]
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									className: "btn btn-ghost magnetic",
									href: "#contact",
									children: "Enquire About a Session"
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "testimonials",
						id: "testimonials",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "section-intro",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
									"Different Journeys.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"One Thing in Common — Clarity."
								] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "testimonial-scroller",
								ref: trackRef,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "“I finally had clarity about the decision I was struggling with.”" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cite", { children: "— Neha Sharma, Noida" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "“The guidance helped me approach my business decision differently.”" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cite", { children: "— Amit Sharma, Mumbai" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "“It gave me a safe space to talk about what I was going through.”" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cite", { children: "— Kiran Yadav, Jaipur" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "“I finally had clarity about the decision I was struggling with.”" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cite", { children: "— Neha Sharma, Noida" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "“The guidance helped me approach my business decision differently.”" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cite", { children: "— Amit Sharma, Mumbai" })] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "drag-hint",
								children: "Drag to move through the stories"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "final-cta",
						id: "final",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "final-line",
								ref: finalLineRef,
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow light",
								children: "Your next curve could become your new direction."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Ready to Learn With Manisha?" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "lede",
								children: "Choose the path that speaks to you and begin your journey through Tarot, Numerology or Energy Healing."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hero-actions",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									className: "btn btn-gold magnetic",
									href: "#courses",
									children: "Explore Courses"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									className: "btn btn-ghost magnetic",
									href: "#contact",
									children: "Chat with Manisha"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "contact",
						id: "contact",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "contact-grid",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "Contact"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Begin the Conversation" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Share which course or session you are drawn to. A member of the academy will respond with next steps." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "contact-meta",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["WhatsApp — ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Add number" })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Phone — ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Add number" })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Email — ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Add address" })] })
									]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "contact-form",
								onSubmit,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										name: "name",
										required: true
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "email",
										name: "email",
										required: true
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Interest", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										name: "interest",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "The Elite Tarot Architect" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Premium Vedic & Loshu Grid Numerology" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Quantum Chakra & Bio-Energy Healer" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Private Consultation" })
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Message", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										name: "message",
										rows: 4
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "btn btn-gold",
										type: "submit",
										children: "Send Enquiry"
									}),
									sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "form-note",
										children: "Thank you. Your enquiry has been noted. Please add WhatsApp, phone and email details when they are available."
									}) : null
								]
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "footer",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "footer-mark",
						children: "Life’s Curve"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "footer-sub",
						children: "Tarot • Numerology • Energy Healing • Cosmic Academy"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#courses",
							children: "Courses"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#about",
							children: "About Manisha"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#consultations",
							children: "Consultations"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#testimonials",
							children: "Testimonials"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#contact",
							children: "Contact"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "placeholders",
						children: "WhatsApp · Phone · Email"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "disclaimer",
						children: "Tarot, numerology and energy healing are spiritual and complementary practices intended for personal guidance and wellbeing. They should not be considered a substitute for professional medical, legal, financial or mental-health advice."
					})
				]
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifesCurveSite, {});
}
//#endregion
export { Home as component };
