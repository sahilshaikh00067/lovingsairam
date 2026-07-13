import { useState, useEffect, useRef, useCallback } from "react";

/* ================= DATA ================= */
const HERO_SLIDES = [
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1800&auto=format&fit=crop",
];

const NAV_LINKS = ["About", "Academics", "Campus Life", "Gallery", "Events", "FAQ", "Contact"];

const WHY_CARDS = [
  { icon: "🌱", title: "Nurturing Foundations", text: "Pre-primary care built around warmth, play and the confidence to be curious." },
  { icon: "📖", title: "CBSE Curriculum", text: "A rigorous, well-paced academic track from Kindergarten to Grade 12." },
  { icon: "🔬", title: "STEM & Innovation Labs", text: "Robotics, coding and science labs where questions matter more than answers." },
  { icon: "🎨", title: "Arts & Expression", text: "Music, dance and visual arts studios that treat creativity as a core subject." },
  { icon: "🏆", title: "Sports Excellence", text: "Full-size courts, athletics track and coaching that builds discipline and grit." },
  { icon: "🧭", title: "Values & Character", text: "Rooted in the And ethos of compassion — service learning from Grade 1." },
];

const PROGRAMS = [
  { level: "Pre-Primary", age: "Ages 3–5", desc: "Play-based learning, sensory development and the first steps toward independence.", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=900&auto=format&fit=crop" },
  { level: "Primary", age: "Grades 1–5", desc: "Strong literacy and numeracy foundations paired with art, music and EVS exploration.", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=900&auto=format&fit=crop" },
  { level: "Middle School", age: "Grades 6–8", desc: "Subject specialisation begins, alongside robotics, debate and design thinking.", img: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?q=80&w=900&auto=format&fit=crop" },
  { level: "Senior Secondary", age: "Grades 9–12", desc: "Science, Commerce & Humanities streams with dedicated mentorship for board & competitive exams.", img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=900&auto=format&fit=crop" },
];

const GALLERY = [
  { img: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=900&auto=format&fit=crop", label: "Science Labs" },
  { img: "https://images.unsplash.com/photo-1541178735493-479c1a27ed24?q=80&w=900&auto=format&fit=crop", label: "Sports Ground" },
  { img: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=900&auto=format&fit=crop", label: "Library" },
  { img: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=900&auto=format&fit=crop", label: "Campus" },
  { img: "https://images.unsplash.com/photo-1560523159-4a9692d222f8?q=80&w=900&auto=format&fit=crop", label: "Classrooms" },
  { img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=900&auto=format&fit=crop", label: "Teamwork" },
];

const TESTIMONIALS = [
  { name: "Anitha Raghavan", role: "Parent, Grade 4", quote: "STEMSS feels like an extension of home. My daughter runs to school every morning — that says everything.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=facearea&facepad=3" },
  { name: "Karthik Subramanian", role: "Alumnus, Class of 2019", quote: "The mentorship here shaped how I think, not just what I know. I still call my Grade 12 teacher for advice.", img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=facearea&facepad=3" },
  { name: "Meera Prakash", role: "Parent, Grade 8", quote: "The balance between academics, sports and values is rare. It's a school that genuinely sees the whole child.", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=facearea&facepad=3" },
];

const STATS = [
  { end: 32, suffix: "+", label: "Years of Excellence" },
  { end: 2400, suffix: "+", label: "Students Nurtured" },
  { end: 98, suffix: "%", label: "Board Exam Success" },
  { end: 65, suffix: "+", label: "Expert Faculty" },
];

const ACHIEVEMENTS = [
  { icon: "🥇", title: "National Science Olympiad", text: "State Champions, 2025" },
  { icon: "🎖️", title: "CBSE Excellence Award", text: "Top 50 Schools, South Zone" },
  { icon: "🏅", title: "Inter-School Athletics", text: "Overall Championship, 3 years running" },
  { icon: "🌍", title: "Green School Certification", text: "5-Star Eco Rating" },
];

const EVENTS = [
  { day: "18", month: "JUL", title: "Annual Sports Day", desc: "Track & field events across all grades at the main athletics ground.", img: "https://images.unsplash.com/photo-1541178735493-479c1a27ed24?q=80&w=700&auto=format&fit=crop" },
  { day: "02", month: "AUG", title: "Science Exhibition", desc: "Student-led experiments and innovation projects open to parents.", img: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=700&auto=format&fit=crop" },
  { day: "15", month: "AUG", title: "Independence Day Celebration", desc: "Flag hoisting, cultural performances and a community assembly.", img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=700&auto=format&fit=crop" },
];

const FAQS = [
  { q: "What is the admission process for STEMSS School?", a: "Admissions open in January each year. Fill the online enquiry form, submit the required documents, and your child will be scheduled for an age-appropriate interaction session before final confirmation." },
  { q: "What curriculum does the school follow?", a: "We follow the CBSE curriculum from Kindergarten through Grade 12, supplemented with project-based learning, STEM labs and the arts." },
  { q: "Does the school provide transport facilities?", a: "Yes, GPS-tracked bus transport is available across major routes in the city, with trained attendants on every vehicle." },
  { q: "What is the student-to-teacher ratio?", a: "We maintain a ratio of approximately 20:1 to ensure every child receives individual attention." },
  { q: "Are extracurricular activities included in the regular fee?", a: "Core activities like sports, art and music are included. Select specialised clubs (robotics, chess, western dance) carry a nominal additional fee." },
  { q: "Is the campus secure?", a: "Yes — the campus is under 24/7 CCTV surveillance with biometric staff access and a visitor management system at all entry points." },
];

/* ================= GLOBAL STYLES ================= */
const GlobalStyles = () => (
  <style>{`
    :root{
      --navy:#16233f; --navy-deep:#0d1729; --gold:#d4a537; --gold-soft:#e8c874;
      --cream:#fbf7ef; --coral:#e2694f; --forest:#2f5233; --ink:#1b2a4a;
    }
    *{box-sizing:border-box;}
    html{scroll-behavior:smooth;}
    body{font-family:'Plus Jakarta Sans', sans-serif; background:var(--cream); color:var(--ink); overflow-x:hidden;}
    .font-display{font-family:'Fraunces', serif;}
    .font-mono{font-family:'Space Mono', monospace;}
    ::selection{background:var(--gold); color:var(--navy-deep);}
    ::-webkit-scrollbar{width:10px;}
    ::-webkit-scrollbar-track{background:var(--cream);}
    ::-webkit-scrollbar-thumb{background:var(--gold); border-radius:10px;}
    .chalk-mark{position:relative; display:inline-block;}
    .chalk-mark::after{content:''; position:absolute; left:-2%; right:-2%; bottom:0.02em; height:0.32em; background:var(--gold); opacity:0.55; z-index:-1; transform:scaleX(0); transform-origin:left; transition:transform 0.9s cubic-bezier(.16,1,.3,1); border-radius:2px 8px 4px 10px / 6px 2px 8px 3px;}
    .chalk-mark.reveal::after{transform:scaleX(1);}
    .seal-ring{border-radius:50%; border:1.5px solid var(--gold);}
    .glass{background:rgba(255,255,255,0.08); backdrop-filter:blur(18px); -webkit-backdrop-filter:blur(18px); border:1px solid rgba(255,255,255,0.16);}
    .glass-light{background:rgba(255,255,255,0.65); backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px); border:1px solid rgba(255,255,255,0.5);}
    .tilt-card{transform-style:preserve-3d; transition:transform 0.15s ease-out, box-shadow 0.3s ease; will-change:transform;}
    .reveal-up{opacity:0; transform:translateY(40px); transition:opacity 0.9s cubic-bezier(.16,1,.3,1), transform 0.9s cubic-bezier(.16,1,.3,1);}
    .reveal-up.in-view{opacity:1; transform:translateY(0);}
    .reveal-scale{opacity:0; transform:scale(0.92); transition:opacity 0.8s ease, transform 0.8s cubic-bezier(.16,1,.3,1);}
    .reveal-scale.in-view{opacity:1; transform:scale(1);}
    .ring-decor{position:absolute; border:1px solid rgba(212,165,55,0.25); border-radius:50%; pointer-events:none;}
    .marquee-track{display:flex; width:max-content; animation:marquee 28s linear infinite;}
    @keyframes marquee{ from{transform:translateX(0);} to{transform:translateX(-50%);} }
    .slide-img{position:absolute; inset:0; background-size:cover; background-position:center; opacity:0; transition:opacity 1.4s ease-in-out, transform 8s ease-out; transform:scale(1.08);}
    .slide-img.active{opacity:1; transform:scale(1);}
    .btn-gold{background:linear-gradient(135deg, var(--gold-soft), var(--gold)); color:var(--navy-deep); box-shadow:0 8px 24px -6px rgba(212,165,55,0.55); transition:transform 0.35s cubic-bezier(.16,1,.3,1), box-shadow 0.35s ease;}
    .btn-gold:hover{transform:translateY(-3px) scale(1.02); box-shadow:0 14px 32px -6px rgba(212,165,55,0.7);}
    .btn-outline{border:1.5px solid rgba(255,255,255,0.5); color:#fff; transition:all 0.35s ease;}
    .btn-outline:hover{background:rgba(255,255,255,0.12); border-color:#fff;}
    .link-underline{position:relative;}
    .link-underline::after{content:''; position:absolute; left:0; bottom:-3px; width:0; height:2px; background:var(--gold); transition:width 0.35s cubic-bezier(.16,1,.3,1);}
    .link-underline:hover::after{width:100%;}
    .stat-num{font-variant-numeric:tabular-nums;}
    .gallery-item{overflow:hidden; position:relative;}
    .gallery-item img{transition:transform 0.7s cubic-bezier(.16,1,.3,1), filter 0.7s ease;}
    .gallery-item:hover img{transform:scale(1.12); filter:brightness(0.72);}
    .gallery-caption{opacity:0; transform:translateY(14px); transition:opacity 0.5s ease, transform 0.5s ease;}
    .gallery-item:hover .gallery-caption{opacity:1; transform:translateY(0);}
    .dot{width:8px; height:8px; border-radius:50%; background:rgba(255,255,255,0.4); transition:all 0.35s ease; cursor:pointer;}
    .dot.active{background:var(--gold); width:26px; border-radius:6px;}
    @keyframes floaty{ 0%,100%{transform:translateY(0px);} 50%{transform:translateY(-14px);} }
    .floaty{animation:floaty 5s ease-in-out infinite;}
    .floaty-slow{animation:floaty 7s ease-in-out infinite; animation-delay:1s;}
    @keyframes spin-slow{ from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
    .spin-slow{animation:spin-slow 22s linear infinite;}
    .grain-overlay{background-image:radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px); background-size:3px 3px;}
    input:focus, textarea:focus, select:focus{outline:none;}
    .accordion-content{max-height:0; overflow:hidden; transition:max-height 0.5s cubic-bezier(.16,1,.3,1), opacity 0.4s ease; opacity:0;}
    .accordion-content.open{max-height:400px; opacity:1;}
    .accordion-chevron{transition:transform 0.4s cubic-bezier(.16,1,.3,1);}
    .accordion-chevron.open{transform:rotate(180deg);}
    .toc-link{position:relative; padding-left:16px; transition:color 0.3s ease;}
    .toc-link::before{content:''; position:absolute; left:0; top:50%; transform:translateY(-50%); width:6px; height:6px; border-radius:50%; background:rgba(27,42,74,0.2); transition:all 0.3s ease;}
    .toc-link:hover{color:var(--forest);}
    .toc-link:hover::before{background:var(--gold);}
    .back-to-top{transition:opacity 0.4s ease, transform 0.4s ease;}
    @media (prefers-reduced-motion: reduce){ *{animation:none !important; transition:none !important;} }
  `}</style>
);

/* ================= HOOKS ================= */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.unobserve(el); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, className = "", cls = "reveal-up", delay = 0 }) {
  const [ref, inView] = useInView(0.15);
  return (
    <div ref={ref} className={`${cls} ${inView ? "in-view" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function useTilt(maxTilt = 10) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) translateZ(10px)`;
  }, [maxTilt]);
  const onLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = `perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0)`;
  }, []);
  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}

function CountUp({ end, suffix = "" }) {
  const [ref, inView] = useInView(0.4);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = null;
    const dur = 1800;
    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
      else setVal(end);
    }
    requestAnimationFrame(step);
  }, [inView]);
  return <span ref={ref} className="stat-num">{val}{suffix}</span>;
}

function useHashRoute() {
  const [route, setRoute] = useState(() => (typeof window !== "undefined" ? window.location.hash || "#home" : "#home"));
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || "#home");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

/* ================= NAV ================= */
function Navbar({ route }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isLegal = route === "#privacy-policy" || route === "#terms-conditions";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = scrolled || isLegal;

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${dark ? "py-3 glass shadow-lg shadow-black/10 !bg-white/85 !border-black/5" : "py-6 bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full seal-ring flex items-center justify-center bg-[var(--navy-deep)] group-hover:rotate-[20deg] transition-transform duration-500">
            <span className="font-display text-[var(--gold)] text-lg font-bold">LS</span>
          </div>
          <div className="leading-tight">
            <p className={`font-display font-semibold text-lg ${dark ? "text-[var(--ink)]" : "text-white"}`}>STEMSS</p>
            <p className={`font-mono text-[10px] tracking-[0.2em] uppercase ${dark ? "text-[var(--gold)]" : "text-[var(--gold-soft)]"}`}>School</p>
          </div>
        </a>

        {!isLegal && (
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
                 className={`link-underline text-sm font-medium tracking-wide ${dark ? "text-[var(--ink)]" : "text-white/90"}`}>
                {l}
              </a>
            ))}
          </div>
        )}
        {isLegal && (
          <a href="#home" className="hidden lg:flex items-center gap-2 text-sm font-medium text-[var(--ink)] link-underline">← Back to Home</a>
        )}

        <div className="hidden lg:block">
          <a href="#admissions" className="btn-gold px-6 py-2.5 rounded-full text-sm font-semibold">Apply Now</a>
        </div>
        <button onClick={() => setOpen(!open)} className={`lg:hidden text-2xl ${dark ? "text-[var(--ink)]" : "text-white"}`}>☰</button>
      </div>
      {open && (
        <div className="lg:hidden glass-light mt-4 mx-4 rounded-2xl p-6 flex flex-col gap-4">
          {!isLegal && NAV_LINKS.map((l) => (
            <a key={l} onClick={() => setOpen(false)} href={`#${l.toLowerCase().replace(/\s/g, "-")}`} className="text-[var(--ink)] font-medium">{l}</a>
          ))}
          {isLegal && <a onClick={() => setOpen(false)} href="#home" className="text-[var(--ink)] font-medium">← Back to Home</a>}
          <a href="#admissions" className="btn-gold px-6 py-3 rounded-full text-sm font-semibold text-center">Apply Now</a>
        </div>
      )}
    </nav>
  );
}

/* ================= HERO ================= */
function Hero() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % HERO_SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="home" className="relative h-screen min-h-[720px] w-full overflow-hidden bg-[var(--navy-deep)]">
      {HERO_SLIDES.map((src, i) => (
        <div key={i} className={`slide-img ${i === idx ? "active" : ""}`} style={{ backgroundImage: `url(${src})` }} />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy-deep)]/80 via-[var(--navy-deep)]/55 to-[var(--navy-deep)]/95" />
      <div className="absolute inset-0 grain-overlay opacity-30" />
      <div className="ring-decor w-[520px] h-[520px] -top-40 -right-40 spin-slow hidden md:block" />
      <div className="ring-decor w-[340px] h-[340px] top-1/3 -left-24 hidden md:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center pt-20">
        <p className="font-mono text-[var(--gold-soft)] tracking-[0.35em] uppercase text-xs mb-6 floaty">Est. 1992 · CBSE Affiliated</p>
        <h1 className="font-display text-white text-5xl sm:text-6xl md:text-7xl leading-[1.05] font-semibold max-w-3xl">
          Where little minds <span className="chalk-mark reveal text-[var(--gold-soft)]">grow</span> into great futures
        </h1>
        <p className="text-white/75 max-w-xl mt-7 text-lg leading-relaxed">
          STEMSS School blends disciplined academics with compassion, creativity and care — for every child, every single day.
        </p>
        <div className="flex flex-wrap gap-4 mt-10">
          <a href="#admissions" className="btn-gold px-8 py-4 rounded-full font-semibold">Begin Admission</a>
          <a href="#campus-life" className="btn-outline px-8 py-4 rounded-full font-semibold glass">Explore Campus</a>
        </div>
        <div className="flex gap-2 mt-14">
          {HERO_SLIDES.map((_, i) => (<div key={i} className={`dot ${i === idx ? "active" : ""}`} onClick={() => setIdx(i)} />))}
        </div>
      </div>

      <div className="hidden md:flex absolute bottom-10 right-10 z-10 glass rounded-2xl px-7 py-5 gap-8 floaty-slow">
        {STATS.slice(0, 3).map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-display text-2xl text-[var(--gold-soft)] font-semibold"><CountUp end={s.end} suffix={s.suffix} /></p>
            <p className="text-white/70 text-[11px] font-mono mt-1 max-w-[80px]">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="absolute bottom-6 left-6 z-10 text-white/50 text-xs font-mono hidden md:block">Scroll to explore ↓</div>
    </section>
  );
}

/* ================= MARQUEE ================= */
function Marquee() {
  const items = ["Academic Excellence", "Award-Winning Faculty", "Safe & Nurturing Campus", "State-of-the-Art Labs", "97% University Placement", "Holistic Child Development"];
  const doubled = [...items, ...items];
  return (
    <div className="bg-[var(--ink)] py-4 overflow-hidden border-y border-[var(--gold)]/20">
      <div className="marquee-track">
        {doubled.map((it, i) => (
          <div key={i} className="flex items-center gap-3 px-8 shrink-0">
            <span className="text-[var(--gold)]">✦</span>
            <span className="text-white/80 font-mono text-xs tracking-widest uppercase whitespace-nowrap">{it}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= ABOUT ================= */
function About() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-16 items-center">
      <Reveal cls="reveal-scale">
        <div className="relative">
          <div className="rounded-[2rem] overflow-hidden shadow-2xl shadow-black/20">
            <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop" alt="STEMSS School library" className="w-full h-[480px] object-cover" />
          </div>
          <div className="absolute -bottom-8 -left-8 glass-light rounded-2xl p-6 w-52 shadow-xl hidden sm:block">
            <p className="font-display text-3xl text-[var(--forest)] font-semibold"><CountUp end={32} suffix="+" /></p>
            <p className="text-[var(--ink)]/70 text-xs font-mono mt-1">Years shaping compassionate leaders</p>
          </div>
          <div className="ring-decor w-32 h-32 -top-8 -right-8 border-2" />
        </div>
      </Reveal>
      <Reveal delay={100}>
        <p className="font-mono text-[var(--coral)] tracking-[0.3em] uppercase text-xs mb-4">About the School</p>
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-[var(--ink)] leading-tight">
          A name that means <span className="chalk-mark reveal">love</span>, built into every classroom
        </h2>
        <p className="text-[var(--ink)]/70 mt-6 leading-relaxed text-lg">
          Since 1992, STEMSS School has grown from a single-block campus into one of the region's most trusted institutions — never losing sight of the belief that every child deserves to be seen, encouraged and challenged.
        </p>
        <div className="grid sm:grid-cols-2 gap-5 mt-9">
          {["CBSE Curriculum, Grades K–12", "Certified & Experienced Faculty", "Smart Classrooms & STEM Labs", "24/7 Secured, CCTV Campus"].map((f) => (
            <div key={f} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[var(--forest)]/10 text-[var(--forest)] flex items-center justify-center shrink-0 text-xs mt-0.5">✓</span>
              <span className="text-[var(--ink)]/80 text-sm">{f}</span>
            </div>
          ))}
        </div>
        <a href="#campus-life" className="inline-flex items-center gap-2 mt-10 font-semibold text-[var(--forest)] link-underline">Take a campus tour <span>→</span></a>
      </Reveal>
    </section>
  );
}

/* ================= LEADERSHIP ================= */
function Leadership() {
  return (
    <section className="bg-white py-28">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal delay={60} className="order-2 lg:order-1">
          <p className="font-mono text-[var(--coral)] tracking-[0.3em] uppercase text-xs mb-4">From the Principal's Desk</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-[var(--ink)] leading-tight mb-6">
            "Every child walks in with a spark. Our job is to protect it."
          </h2>
          <p className="text-[var(--ink)]/70 leading-relaxed text-lg mb-4">
            Education, to us, is not a race toward marks — it is the slow, patient work of building character alongside competence. Our faculty are trained to notice the quiet child as closely as the confident one.
          </p>
          <p className="text-[var(--ink)]/70 leading-relaxed text-lg mb-8">
            I invite every parent to walk through our classrooms, meet our teachers, and see for yourself the atmosphere we've built — one rooted in warmth, structure, and genuine care.
          </p>
          <div>
            <p className="font-display text-xl font-semibold text-[var(--ink)]">Dr. Radhika Iyer</p>
            <p className="text-[var(--ink)]/50 text-sm font-mono">Principal, STEMSS School</p>
          </div>
        </Reveal>
        <Reveal cls="reveal-scale" className="order-1 lg:order-2">
          <div className="relative">
            <div className="rounded-[2rem] overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=900&auto=format&fit=crop" alt="Principal" className="w-full h-[440px] object-cover" />
            </div>
            <div className="ring-decor w-28 h-28 -bottom-6 -right-6 border-2 hidden sm:block" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= WHY CHOOSE US ================= */
function TiltCard({ card, i }) {
  const tilt = useTilt(9);
  return (
    <Reveal delay={i * 90} cls="reveal-up">
      <div ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}
           className="tilt-card group relative bg-white rounded-3xl p-8 border border-black/5 hover:shadow-2xl hover:shadow-[var(--gold)]/20 h-full">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--gold-soft)] to-[var(--gold)] flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-500">{card.icon}</div>
        <h3 className="font-display text-xl font-semibold text-[var(--ink)] mb-3">{card.title}</h3>
        <p className="text-[var(--ink)]/65 text-sm leading-relaxed">{card.text}</p>
        <div className="absolute top-6 right-7 font-mono text-[10px] text-[var(--ink)]/20">{String(i + 1).padStart(2, "0")}</div>
      </div>
    </Reveal>
  );
}

function WhyChooseUs() {
  return (
    <section className="bg-[var(--navy-deep)] py-28 relative overflow-hidden">
      <div className="ring-decor w-[480px] h-[480px] top-1/4 -left-52 border-white/5 hidden lg:block" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <Reveal>
          <p className="font-mono text-[var(--gold-soft)] tracking-[0.3em] uppercase text-xs mb-4 text-center">Why Families Choose Us</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white text-center max-w-2xl mx-auto leading-tight">Six commitments behind every report card</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-16">
          {WHY_CARDS.map((c, i) => <TiltCard card={c} i={i} key={c.title} />)}
        </div>
      </div>
    </section>
  );
}

/* ================= PROGRAMS ================= */
function Programs() {
  const [active, setActive] = useState(0);
  const p = PROGRAMS[active];
  return (
    <section id="academics" className="max-w-7xl mx-auto px-6 py-28">
      <Reveal>
        <p className="font-mono text-[var(--coral)] tracking-[0.3em] uppercase text-xs mb-4">Academic Journey</p>
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-[var(--ink)] leading-tight max-w-2xl">A curriculum that grows with every child</h2>
      </Reveal>
      <div className="grid lg:grid-cols-[340px_1fr] gap-10 mt-14">
        <Reveal delay={80} className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2">
          {PROGRAMS.map((prog, i) => (
            <button key={prog.level} onClick={() => setActive(i)}
              className={`text-left shrink-0 lg:shrink w-64 lg:w-auto px-6 py-5 rounded-2xl border transition-all duration-400 ${active === i ? "bg-[var(--ink)] border-[var(--ink)] shadow-xl" : "bg-white border-black/5 hover:border-[var(--gold)]"}`}>
              <p className={`font-display text-lg font-semibold ${active === i ? "text-white" : "text-[var(--ink)]"}`}>{prog.level}</p>
              <p className={`font-mono text-xs mt-1 ${active === i ? "text-[var(--gold-soft)]" : "text-[var(--ink)]/50"}`}>{prog.age}</p>
            </button>
          ))}
        </Reveal>
        <Reveal delay={160} cls="reveal-scale">
          <div className="relative rounded-[2rem] overflow-hidden h-full min-h-[420px] shadow-2xl">
            <img src={p.img} className="absolute inset-0 w-full h-full object-cover transition-all duration-700" key={p.img} alt={p.level} />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-deep)]/90 via-[var(--navy-deep)]/20 to-transparent" />
            <div className="absolute bottom-0 p-10">
              <p className="font-mono text-[var(--gold-soft)] text-xs uppercase tracking-widest mb-2">{p.age}</p>
              <h3 className="font-display text-3xl text-white font-semibold mb-3">{p.level}</h3>
              <p className="text-white/75 max-w-md leading-relaxed">{p.desc}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= GALLERY ================= */
function Gallery() {
  return (
    <section id="gallery" className="bg-[var(--cream)] py-28">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="font-mono text-[var(--coral)] tracking-[0.3em] uppercase text-xs mb-4">Campus Gallery</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-[var(--ink)]">Life inside STEMSS</h2>
          </div>
        </Reveal>
        <div id="campus-life" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {GALLERY.map((g, i) => (
            <Reveal key={g.label} delay={i * 70} cls="reveal-scale" className={i === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}>
              <div className="gallery-item rounded-3xl h-full min-h-[220px]">
                <img src={g.img} alt={g.label} className="w-full h-full object-cover min-h-[220px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="gallery-caption absolute bottom-5 left-6"><p className="text-white font-display text-lg font-semibold">{g.label}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= ACHIEVEMENTS ================= */
function Achievements() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-28">
      <Reveal className="text-center">
        <p className="font-mono text-[var(--coral)] tracking-[0.3em] uppercase text-xs mb-4">Recognitions</p>
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-[var(--ink)]">Achievements we're proud of</h2>
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
        {ACHIEVEMENTS.map((a, i) => (
          <Reveal key={a.title} delay={i * 90} cls="reveal-scale">
            <div className="bg-white rounded-3xl p-8 text-center border border-black/5 h-full hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500">
              <div className="text-4xl mb-4">{a.icon}</div>
              <p className="font-display font-semibold text-[var(--ink)] mb-1">{a.title}</p>
              <p className="text-[var(--ink)]/55 text-xs font-mono">{a.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================= STATS BAND ================= */
function StatsBand() {
  return (
    <section className="bg-[var(--forest)] py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 90} className="text-center">
            <p className="font-display text-4xl md:text-5xl text-white font-semibold"><CountUp end={s.end} suffix={s.suffix} /></p>
            <p className="text-white/70 font-mono text-xs uppercase tracking-widest mt-3">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================= EVENTS ================= */
function Events() {
  return (
    <section id="events" className="max-w-7xl mx-auto px-6 py-28">
      <Reveal>
        <p className="font-mono text-[var(--coral)] tracking-[0.3em] uppercase text-xs mb-4">What's Happening</p>
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-[var(--ink)]">Upcoming events</h2>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-7 mt-14">
        {EVENTS.map((e, i) => (
          <Reveal key={e.title} delay={i * 100} cls="reveal-scale">
            <div className="rounded-3xl overflow-hidden bg-white border border-black/5 h-full group hover:shadow-2xl transition-all duration-500">
              <div className="relative h-48 overflow-hidden">
                <img src={e.img} alt={e.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white rounded-xl px-3 py-2 text-center shadow-lg">
                  <p className="font-display font-bold text-lg leading-none text-[var(--ink)]">{e.day}</p>
                  <p className="font-mono text-[9px] text-[var(--coral)] tracking-widest mt-0.5">{e.month}</p>
                </div>
              </div>
              <div className="p-7">
                <h3 className="font-display text-xl font-semibold text-[var(--ink)] mb-2">{e.title}</h3>
                <p className="text-[var(--ink)]/60 text-sm leading-relaxed">{e.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================= TESTIMONIALS ================= */
function Testimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);
  const t = TESTIMONIALS[idx];
  return (
    <section className="bg-white max-w-full px-6 py-28 text-center">
      <Reveal>
        <p className="font-mono text-[var(--coral)] tracking-[0.3em] uppercase text-xs mb-4">Voices of Our Community</p>
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-[var(--ink)] mb-14">What families say</h2>
      </Reveal>
      <div className="relative min-h-[280px] flex items-center justify-center max-w-5xl mx-auto">
        <div key={idx} className="reveal-up in-view">
          <img src={t.img} alt={t.name} className="w-20 h-20 rounded-full object-cover mx-auto ring-4 ring-[var(--gold-soft)]/40" />
          <p className="font-display text-2xl md:text-3xl text-[var(--ink)] leading-snug mt-8 max-w-3xl mx-auto">"{t.quote}"</p>
          <p className="mt-6 font-semibold text-[var(--ink)]">{t.name}</p>
          <p className="text-[var(--ink)]/50 text-sm font-mono">{t.role}</p>
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-10">
        {TESTIMONIALS.map((_, i) => (<div key={i} className={`dot ${i === idx ? "active" : ""}`} style={{ background: i === idx ? "var(--forest)" : "rgba(27,42,74,0.2)" }} onClick={() => setIdx(i)} />))}
      </div>
    </section>
  );
}

/* ================= FAQ ================= */
function FAQItem({ item, isOpen, onClick, index }) {
  return (
    <Reveal delay={index * 60}>
      <div className="border-b border-black/10 py-6 cursor-pointer" onClick={onClick}>
        <div className="flex items-center justify-between gap-4">
          <p className="font-display text-lg font-semibold text-[var(--ink)]">{item.q}</p>
          <span className={`accordion-chevron ${isOpen ? "open" : ""} text-[var(--gold)] text-xl shrink-0`}>⌄</span>
        </div>
        <div className={`accordion-content ${isOpen ? "open" : ""}`}>
          <p className="text-[var(--ink)]/65 leading-relaxed mt-4 max-w-2xl">{item.a}</p>
        </div>
      </div>
    </Reveal>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="max-w-4xl mx-auto px-6 py-28">
      <Reveal className="text-center">
        <p className="font-mono text-[var(--coral)] tracking-[0.3em] uppercase text-xs mb-4">Common Questions</p>
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-[var(--ink)]">Frequently asked questions</h2>
      </Reveal>
      <div className="mt-14">
        {FAQS.map((f, i) => (
          <FAQItem key={f.q} item={f} index={i} isOpen={open === i} onClick={() => setOpen(open === i ? -1 : i)} />
        ))}
      </div>
    </section>
  );
}

/* ================= CONTACT ================= */
function ContactSection() {
  const [sent, setSent] = useState(false);
  const submit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <section id="contact-form" className="bg-[var(--cream)] py-28">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14">
        <Reveal>
          <p className="font-mono text-[var(--coral)] tracking-[0.3em] uppercase text-xs mb-4">Get in Touch</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-[var(--ink)] leading-tight mb-8">Plan your visit or ask us anything</h2>

          {!sent ? (
            <form onSubmit={submit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input required placeholder="Parent's Name" className="bg-white border border-black/10 rounded-xl px-5 py-3.5 text-sm w-full focus:border-[var(--gold)] transition-colors" />
                <input required type="tel" placeholder="Phone Number" className="bg-white border border-black/10 rounded-xl px-5 py-3.5 text-sm w-full focus:border-[var(--gold)] transition-colors" />
              </div>
              <input required type="email" placeholder="Email Address" className="bg-white border border-black/10 rounded-xl px-5 py-3.5 text-sm w-full focus:border-[var(--gold)] transition-colors" />
              <select className="bg-white border border-black/10 rounded-xl px-5 py-3.5 text-sm w-full focus:border-[var(--gold)] transition-colors text-[var(--ink)]/70">
                <option>Interested Grade Level</option>
                <option>Pre-Primary</option>
                <option>Primary (1–5)</option>
                <option>Middle School (6–8)</option>
                <option>Senior Secondary (9–12)</option>
              </select>
              <textarea rows="4" placeholder="Your message" className="bg-white border border-black/10 rounded-xl px-5 py-3.5 text-sm w-full focus:border-[var(--gold)] transition-colors" />
              <button className="btn-gold px-9 py-4 rounded-full font-semibold w-full sm:w-auto">Send Enquiry</button>
            </form>
          ) : (
            <div className="bg-white border border-[var(--forest)]/20 rounded-2xl p-8 reveal-up in-view">
              <p className="font-display text-xl font-semibold text-[var(--forest)] mb-2">Thank you! 🌿</p>
              <p className="text-[var(--ink)]/65">Our admissions team will reach out within one business day.</p>
            </div>
          )}
        </Reveal>

        <Reveal delay={100} cls="reveal-scale">
          <div className="rounded-[2rem] overflow-hidden shadow-2xl h-[420px] lg:h-full">
<iframe
  title="STEMSS School Location"
  className="w-full h-full border-0"
  loading="lazy"
  src="https://www.google.com/maps?q=Gujarat,India&output=embed">
</iframe>
          </div>
          <div className="glass-light rounded-2xl p-6 mt-6 grid grid-cols-2 gap-6">
            <div><p className="text-[var(--ink)]/50 text-xs font-mono uppercase mb-1">Phone</p><p className="font-semibold text-[var(--ink)]">+91 00000 00000</p></div>
            <div><p className="text-[var(--ink)]/50 text-xs font-mono uppercase mb-1">Email</p><p className="font-semibold text-[var(--ink)] text-sm">admissions@SkoolgateAnd.edu.in</p></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= ADMISSION CTA ================= */
function AdmissionCTA() {
  return (
    <section id="admissions" className="max-w-7xl mx-auto px-6 pb-28">
      <Reveal cls="reveal-scale">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-[var(--navy-deep)] px-8 md:px-16 py-16 md:py-20 text-center">
          <div className="absolute inset-0 grain-overlay opacity-20" />
          <div className="ring-decor w-72 h-72 -top-20 -left-20 spin-slow hidden md:block" />
          <div className="ring-decor w-56 h-56 -bottom-16 -right-10 hidden md:block" />
          <div className="relative">
            <p className="font-mono text-[var(--gold-soft)] tracking-[0.3em] uppercase text-xs mb-5">Admissions Open — 2026–27</p>
            <h2 className="font-display text-4xl md:text-6xl font-semibold text-white leading-tight max-w-3xl mx-auto">
              Give your child a place to <span className="chalk-mark reveal text-[var(--gold-soft)]">belong</span>
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mt-6 text-lg">Limited seats available across Pre-Primary to Grade 12. Schedule a campus tour and meet our faculty this week.</p>
            <div className="flex flex-wrap gap-4 justify-center mt-10">
              <a href="#contact-form" className="btn-gold px-9 py-4 rounded-full font-semibold">Apply for Admission</a>
              <a href="tel:+910000000000" className="btn-outline px-9 py-4 rounded-full font-semibold glass">Call the Office</a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ================= FOOTER ================= */
function Footer() {
  return (
    <footer id="contact" className="bg-[var(--ink)] pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-full seal-ring flex items-center justify-center bg-[var(--navy-deep)]"><span className="font-display text-[var(--gold)] text-lg font-bold">LS</span></div>
            <p className="font-display text-white text-lg font-semibold">STEMSS</p>
          </div>
          <p className="text-white/50 text-sm leading-relaxed">Nurturing every child with excellence, compassion and care since 1992.</p>
          <div className="flex gap-3 mt-6">
            {["f", "in", "yt", "ig"].map((s) => (<a key={s} href="#" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/60 text-xs hover:bg-[var(--gold)] hover:text-[var(--navy-deep)] hover:border-[var(--gold)] transition-all duration-300">{s}</a>))}
          </div>
        </div>
        <div>
          <p className="text-white font-semibold mb-5 font-display">Quick Links</p>
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((l) => (<a key={l} href={`#${l.toLowerCase().replace(/\s/g, "-")}`} className="text-white/50 text-sm hover:text-[var(--gold-soft)] transition-colors">{l}</a>))}
          </div>
        </div>
        <div>
          <p className="text-white font-semibold mb-5 font-display">Contact</p>
          <div className="flex flex-col gap-3 text-white/50 text-sm">
            <p>📍 12th Cross, Anna Nagar, Gujrat</p>
            <p>📞 +91 8381845550</p>
            <p>✉️ admissions@Skoolgate.edu.in</p>
            <p>🕐 Mon – Sat, 8:00 AM – 4:00 PM</p>
          </div>
        </div>
        <div>
          <p className="text-white font-semibold mb-5 font-display">Newsletter</p>
          <p className="text-white/50 text-sm mb-4">Get admission updates and school news in your inbox.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Your email" className="bg-white/5 border border-white/15 rounded-full px-4 py-2.5 text-sm text-white placeholder-white/30 flex-1 focus:border-[var(--gold)] transition-colors" />
            <button className="btn-gold px-5 rounded-full text-sm font-semibold">→</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 border-t border-white/10 mt-16 pt-8 flex flex-col sm:flex-row justify-between gap-3">
        <p className="text-white/35 text-xs font-mono">© Skoolgate RFID. All rights reserved.</p>
        <div className="flex gap-6 text-xs font-mono text-white/35">
          <a href="#privacy-policy" className="hover:text-[var(--gold-soft)] transition-colors">Privacy Policy</a>
          <a href="#terms-conditions" className="hover:text-[var(--gold-soft)] transition-colors">Terms & Conditions</a>
          <span>School Code LS-1992</span>
        </div>
      </div>
    </footer>
  );
}

/* ================= BACK TO TOP ================= */
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a href="#home" className={`back-to-top fixed bottom-7 right-7 z-40 w-12 h-12 rounded-full bg-[var(--ink)] text-[var(--gold)] flex items-center justify-center shadow-xl hover:bg-[var(--navy-deep)] ${show ? "opacity-100" : "opacity-0 pointer-events-none translate-y-4"}`}>↑</a>
  );
}

/* ================= HOME PAGE ================= */
function Home() {
  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (id && id !== "home") {
      const el = document.getElementById(id);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 80);
    }
  }, []);
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Leadership />
      <WhyChooseUs />
      <Programs />
      <Gallery />
      <Achievements />
      <StatsBand />
      <Events />
      <Testimonials />
      <FAQ />
      <ContactSection />
      <AdmissionCTA />
    </>
  );
}

/* ================= LEGAL PAGE TEMPLATE ================= */
function LegalPage({ title, updated, intro, sections }) {
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);
  return (
    <div className="pt-32 pb-28 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <p className="font-mono text-[var(--coral)] tracking-[0.3em] uppercase text-xs mb-4">Legal</p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-[var(--ink)]">{title}</h1>
          <p className="text-[var(--ink)]/50 text-sm font-mono mt-4">Last updated: {updated}</p>
          <p className="text-[var(--ink)]/70 leading-relaxed text-lg mt-6 max-w-3xl">{intro}</p>
        </Reveal>

        <div className="grid lg:grid-cols-[260px_1fr] gap-16 mt-16">
          <div className="hidden lg:block">
            <div className="sticky top-32">
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--ink)]/40 mb-4">On this page</p>
              <div className="flex flex-col gap-3">
                {sections.map((s) => (
                  <a key={s.id} href={`#${s.id}`} className="toc-link text-sm text-[var(--ink)]/60">{s.title}</a>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-14">
            {sections.map((s, i) => (
              <Reveal key={s.id} delay={i * 40}>
                <div id={s.id} className="scroll-mt-32">
                  <h2 className="font-display text-2xl font-semibold text-[var(--ink)] mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[var(--gold)]/15 text-[var(--gold)] flex items-center justify-center text-xs font-mono">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </h2>
                  <div className="space-y-4">
                    {s.content.map((p, j) => (<p key={j} className="text-[var(--ink)]/70 leading-relaxed">{p}</p>))}
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal>
              <div className="bg-[var(--cream)] rounded-2xl p-8 border border-black/5">
                <p className="font-display text-lg font-semibold text-[var(--ink)] mb-2">Questions about this document?</p>
                <p className="text-[var(--ink)]/65 text-sm">Write to us at <span className="text-[var(--forest)] font-medium">admissions@SkoolgateAnd.edu.in</span> or call +91 00000 00000.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrivacyPolicy() {
  const sections = [
    { id: "introduction", title: "Introduction", content: [
      "STEMSS School (\"the School\", \"we\", \"us\") respects the privacy of every parent, student and visitor who interacts with our website and admissions process. This Privacy Policy explains what information we collect, why we collect it, and how it is used and protected.",
      "By using this website or submitting an enquiry, you agree to the practices described here." ] },
    { id: "information-we-collect", title: "Information We Collect", content: [
      "We may collect personal information you voluntarily provide, including the name, contact number, email address and grade of interest submitted through our enquiry and admission forms.",
      "We may also collect non-personal technical data such as browser type, device information and pages visited, used to improve website performance." ] },
    { id: "how-we-use-information", title: "How We Use Your Information", content: [
      "Information collected is used to respond to admission enquiries, process applications, share school updates and events, and improve our website experience.",
      "We do not use personal information for purposes unrelated to the School's academic or administrative operations without your consent." ] },
    { id: "cookies", title: "Cookies & Tracking", content: [
      "Our website may use cookies to remember preferences and understand how visitors use the site. You can disable cookies through your browser settings, though some features may not function as intended." ] },
    { id: "data-sharing", title: "Data Sharing & Disclosure", content: [
      "We do not sell or rent personal information to third parties. Limited data may be shared with trusted service providers (such as transport or ID-card vendors) strictly for operational purposes, under confidentiality obligations.",
      "We may disclose information where required by law or to protect the safety of our students and staff." ] },
    { id: "data-security", title: "Data Security", content: [
      "We implement reasonable administrative and technical safeguards to protect personal information from unauthorised access, alteration or disclosure. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security." ] },
    { id: "childrens-privacy", title: "Children's Privacy", content: [
      "As an educational institution, we handle information relating to minors with additional care. Information about students is collected primarily through parents or guardians during the admission process and is used solely for educational and administrative purposes." ] },
    { id: "your-rights", title: "Your Rights", content: [
      "You may request access to, correction of, or deletion of personal information you have shared with us by contacting the school administration office. We will respond to reasonable requests within a reasonable timeframe." ] },
    { id: "third-party-links", title: "Third-Party Links", content: [
      "Our website may contain links to third-party websites (such as social media platforms). We are not responsible for the privacy practices or content of these external sites." ] },
    { id: "changes", title: "Changes to This Policy", content: [
      "We may update this Privacy Policy periodically to reflect changes in our practices. The revised version will be posted on this page with an updated date." ] },
  ];
  return <LegalPage title="Privacy Policy" updated="July 2026" intro="This policy describes how STEMSS School collects, uses and safeguards information shared with us by parents, students and website visitors." sections={sections} />;
}

function TermsConditions() {
  const sections = [
    { id: "acceptance", title: "Acceptance of Terms", content: [
      "By accessing this website or engaging with STEMSS School's admission process, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please discontinue use of this website." ] },
    { id: "admissions", title: "Admission & Enrollment Terms", content: [
      "Submission of an admission enquiry or application does not guarantee a seat. Admission is subject to seat availability, document verification, and the School's evaluation process.",
      "Fees, once paid, are subject to the School's refund policy as communicated at the time of enrollment and are non-transferable between academic years." ] },
    { id: "website-use", title: "Use of Website", content: [
      "This website is intended to provide information about the School and facilitate admission enquiries. You agree not to misuse the site, attempt unauthorised access, or use it for any unlawful purpose." ] },
    { id: "intellectual-property", title: "Intellectual Property", content: [
      "All content on this website, including text, images, the school logo and design elements, is the property of STEMSS School unless otherwise credited, and may not be reproduced without written permission." ] },
    { id: "fees-payments", title: "Fees & Payments", content: [
      "Tuition and other fees are payable as per the schedule communicated by the School's accounts office. Late payments may attract charges as per the School's fee policy in effect at the time." ] },
    { id: "code-of-conduct", title: "Code of Conduct", content: [
      "Students and parents are expected to adhere to the School's code of conduct, as detailed in the student handbook shared at the time of admission. The School reserves the right to take appropriate disciplinary action for violations." ] },
    { id: "media-consent", title: "Photography & Media Consent", content: [
      "The School may photograph or record students during events and activities for use in newsletters, the website, or promotional material. Parents may opt out of this by informing the school office in writing." ] },
    { id: "liability", title: "Limitation of Liability", content: [
      "While the School takes reasonable care to ensure student safety and accurate information on this website, it shall not be liable for indirect or incidental damages arising from use of the website or reliance on its content." ] },
    { id: "governing-law", title: "Governing Law", content: [
      "These Terms & Conditions are governed by the laws of India, and any disputes shall be subject to the jurisdiction of the courts in Chennai, Tamil Nadu." ] },
    { id: "changes-terms", title: "Changes to These Terms", content: [
      "The School reserves the right to update these Terms & Conditions at any time. Continued use of the website after changes are posted constitutes acceptance of the revised terms." ] },
  ];
  return <LegalPage title="Terms & Conditions" updated="July 2026" intro="These terms govern your use of the STEMSS School website and outline the conditions related to admissions, fees and conduct." sections={sections} />;
}

/* ================= APP ================= */
export default function App() {
  const route = useHashRoute();
  let page;
  if (route === "#privacy-policy") page = <PrivacyPolicy />;
  else if (route === "#terms-conditions") page = <TermsConditions />;
  else page = <Home />;

  return (
    <>
      <GlobalStyles />
      <Navbar route={route} />
      {page}
      <Footer />
      <BackToTop />
    </>
  );
}