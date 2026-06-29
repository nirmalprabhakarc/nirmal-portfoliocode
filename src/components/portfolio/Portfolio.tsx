import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  Briefcase,
  Code2,
  Cpu,
  Database,
  Github,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Megaphone,
  Phone,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  Wand2,
  Zap,
} from "lucide-react";
import profileImg from "@/assets/nirmal-profile.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("reveal-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.01, rootMargin: "0px 0px 200px 0px" },
    );
    els.forEach((el) => io.observe(el));
    // Safety: if for any reason an element hasn't revealed quickly, force it.
    const t = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.reveal-in)").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight + 400) el.classList.add("reveal-in");
      });
    }, 300);
    return () => {
      window.clearTimeout(t);
      io.disconnect();
    };
  }, []);
}

function Typewriter({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const current = words[idx];
    const t = setTimeout(
      () => {
        if (!del) {
          setSub((s) => s + 1);
          if (sub + 1 === current.length) setTimeout(() => setDel(true), 1400);
        } else {
          setSub((s) => s - 1);
          if (sub === 0) {
            setDel(false);
            setIdx((i) => (i + 1) % words.length);
          }
        }
      },
      del ? 40 : 75,
    );
    return () => clearTimeout(t);
  }, [sub, del, idx, words]);
  return (
    <span className="text-gradient font-semibold">
      {words[idx].slice(0, sub)}
      <span className="animate-blink text-primary">|</span>
    </span>
  );
}

function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.65_0.2_260/0.18),transparent_60%),radial-gradient(ellipse_at_bottom_right,oklch(0.6_0.22_295/0.15),transparent_55%)]" />
      <div className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-primary/20 blur-3xl animate-float-slow" />
      <div className="absolute top-1/3 -right-40 h-[520px] w-[520px] rounded-full bg-purple/20 blur-3xl animate-float-medium" />
      <div className="absolute bottom-0 left-1/4 h-[420px] w-[420px] rounded-full bg-accent/15 blur-3xl animate-float-slow" />
      <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:48px_48px]" />
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all ${
            scrolled ? "glass-strong shadow-glow" : "glass"
          }`}
        >
          <a href="#home" className="flex items-center gap-2 font-display font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-sm shadow-glow">
              NC
            </span>
            <span className="hidden sm:inline">Nirmal<span className="text-gradient">.dev</span></span>
          </a>
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/5"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#contact" className="hidden md:inline-flex">
              <Button size="sm" className="bg-gradient-primary border-0 shadow-glow hover:opacity-90">
                Hire Me
              </Button>
            </a>
            <button
              aria-label="Toggle menu"
              className="lg:hidden rounded-lg p-2 hover:bg-white/5"
              onClick={() => setOpen((v) => !v)}
            >
              <div className="space-y-1.5">
                <span className="block h-0.5 w-5 bg-foreground" />
                <span className="block h-0.5 w-5 bg-foreground" />
                <span className="block h-0.5 w-5 bg-foreground" />
              </div>
            </button>
          </div>
        </div>
        {open && (
          <div className="mt-2 lg:hidden glass-strong rounded-2xl p-2">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="block px-4 py-2 text-sm rounded-lg hover:bg-white/5"
              >
                {n.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

function Hero() {
  const imgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!imgRef.current) return;
      const r = imgRef.current.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / r.width;
      const y = (e.clientY - (r.top + r.height / 2)) / r.height;
      imgRef.current.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div data-reveal className="reveal">
            <Badge className="mb-6 glass border-primary/30 text-primary gap-2 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Open to Work · Berlin, Germany
            </Badge>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05]">
              Hi, I'm <span className="text-gradient">Nirmal</span>
              <br />
              Prabhakar <span className="text-gradient-accent">Chirukui</span>
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-muted-foreground">
              I'm a <Typewriter words={["Full-Stack Developer", "AI Automation Specialist", "Google Ads Expert", "Data Analyst"]} />
            </p>
            <p className="mt-5 max-w-xl text-muted-foreground leading-relaxed">
              I build modern websites and web applications while helping businesses grow through
              AI automation, Google Ads, and data-driven marketing strategies. Currently open to
              new opportunities and freelance projects.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact">
                <Button size="lg" className="bg-gradient-primary border-0 shadow-glow hover:opacity-90 gap-2">
                  <Sparkles className="h-4 w-4" /> Hire Me
                </Button>
              </a>
              <a href="#projects">
                <Button size="lg" variant="outline" className="glass border-white/15 hover:bg-white/5 gap-2">
                  <Briefcase className="h-4 w-4" /> View Portfolio
                </Button>
              </a>
              <a href="/resume.pdf" download>
                <Button size="lg" variant="outline" className="glass border-white/15 hover:bg-white/5 gap-2">
                  <Download className="h-4 w-4" /> Download Resume
                </Button>
              </a>
              <a href="#contact">
                <Button size="lg" variant="ghost" className="hover:bg-white/5 gap-2">
                  <Mail className="h-4 w-4" /> Contact Me
                </Button>
              </a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {[
                { k: "20+", v: "Projects" },
                { k: "3+", v: "Years Exp" },
                { k: "100%", v: "Client Focus" },
              ].map((s) => (
                <div key={s.v} className="glass rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-gradient">{s.k}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div data-reveal className="reveal relative mx-auto w-full max-w-md">
            {/* floating shapes */}
            <div className="absolute -top-8 -left-6 h-20 w-20 rounded-2xl bg-gradient-primary opacity-80 animate-float-slow shadow-glow rotate-12" />
            <div className="absolute -bottom-6 -right-4 h-16 w-16 rounded-full bg-gradient-accent opacity-80 animate-float-medium shadow-glow-purple" />
            <div className="absolute top-1/2 -right-8 h-12 w-12 rounded-xl border-2 border-accent/60 animate-float-slow" />

            <div
              ref={imgRef}
              className="relative rounded-[2rem] p-1 bg-gradient-accent animate-gradient shadow-glow-purple transition-transform duration-200"
              style={{ willChange: "transform" }}
            >
              <div className="relative overflow-hidden rounded-[1.85rem] bg-card">
                <img
                  src={profileImg}
                  alt="Nirmal Prabhakar Chirukui — Full-Stack Developer"
                  width={896}
                  height={1152}
                  className="block w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 glass-strong rounded-xl px-4 py-3 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-primary">
                    <Code2 className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold truncate">Available for hire</div>
                    <div className="text-xs text-muted-foreground truncate">Freelance · Remote · On-site</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center mb-14" data-reveal>
      <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-widest text-primary">
        <span className="h-1 w-1 rounded-full bg-primary" /> {eyebrow}
      </div>
      <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
        {title}
      </h2>
      {desc && <p className="mt-3 text-muted-foreground">{desc}</p>}
    </div>
  );
}

function About() {
  const tags = ["Open to Work", "Based in Berlin, Germany", "Freelance Developer", "Problem Solver", "Continuous Learner"];
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="About me" title="Developer. Strategist. Builder." />
        <div className="grid md:grid-cols-3 gap-6">
          <div data-reveal className="reveal md:col-span-2 glass rounded-2xl p-8">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nirmal is a passionate developer specializing in modern web development, AI
              automation, digital marketing, and analytics. He enjoys building scalable
              applications, automating business workflows, and helping companies grow through
              technology and performance marketing.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span key={t} className="rounded-full glass-strong px-3 py-1.5 text-xs">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div data-reveal className="reveal grid gap-4">
            {[
              { icon: MapPin, label: "Location", value: "Berlin, Germany" },
              { icon: Briefcase, label: "Status", value: "Open to Work" },
              { icon: GraduationCap, label: "Education", value: "M.Sc. in AI & Data" },
            ].map((c) => (
              <div key={c.label} className="glass rounded-2xl p-5 flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                  <c.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">{c.label}</div>
                  <div className="font-semibold truncate">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Education() {
  const items = [
    {
      title: "M.Sc. in Data Analysis, AI and Digital Business",
      org: "GISMA University of Applied Sciences",
      meta: "Currently Pursuing",
      icon: Sparkles,
    },
    {
      title: "B.Tech — Computer Science & Engineering (AI)",
      org: "Karunya University of Technology and Sciences",
      meta: "Graduated 2025",
      icon: GraduationCap,
    },
  ];
  return (
    <section id="education" className="py-24">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader eyebrow="Education" title="Academic Journey" />
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-purple/40 to-transparent md:-translate-x-1/2" />
          <div className="space-y-10">
            {items.map((it, i) => (
              <div
                key={it.title}
                data-reveal
                className={`reveal relative md:grid md:grid-cols-2 md:gap-10 ${
                  i % 2 ? "md:[&>*:first-child]:col-start-2" : ""
                }`}
              >
                <div className={`pl-12 md:pl-0 ${i % 2 ? "md:text-left" : "md:text-right"}`}>
                  <div className={`absolute left-4 md:left-1/2 -translate-x-1/2 grid h-8 w-8 place-items-center rounded-full bg-gradient-primary shadow-glow`}>
                    <it.icon className="h-4 w-4" />
                  </div>
                  <div className="glass rounded-2xl p-6">
                    <div className="text-xs uppercase tracking-widest text-accent">{it.meta}</div>
                    <h3 className="mt-2 font-semibold text-lg">{it.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{it.org}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const roles = [
    {
      title: "Freelance Web Developer",
      org: "Clients incl. Krishikan",
      icon: Code2,
      bullets: ["Website Development", "Responsive Design", "WordPress Development", "Client Consultation", "Performance Optimization"],
    },
    {
      title: "Freelance Google Ads Specialist",
      org: "Zamindar Eye Clinic Center · Dex Co Work",
      icon: Megaphone,
      bullets: ["Google Ads Campaign Management", "Campaign Optimization", "Lead Generation", "Analytics Reporting", "ROI Improvement"],
    },
  ];
  return (
    <section id="experience" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="Experience" title="Work that delivers results" />
        <div className="grid md:grid-cols-2 gap-6">
          {roles.map((r) => (
            <div key={r.title} data-reveal className="reveal glass rounded-2xl p-8 hover:shadow-glow transition-shadow">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                  <r.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-semibold text-lg truncate">{r.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{r.org}</p>
                </div>
              </div>
              <ul className="mt-6 grid gap-2">
                {r.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const tech = ["AI", "Data Analysis", "Web Design", "Website Development", "Web App Development", "WordPress", "Wix", "Pipedream", "GitHub"];
  const marketing = ["Google Ads", "Google Analytics", "Digital Marketing", "Campaign Optimization", "Marketing Strategy"];
  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="Skills" title="Toolbox & Expertise" />
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "Technical", icon: Cpu, items: tech },
            { title: "Marketing", icon: TrendingUp, items: marketing },
          ].map((g) => (
            <div key={g.title} data-reveal className="reveal glass rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-accent shadow-glow-purple">
                  <g.icon className="h-5 w-5" />
                </span>
                <h3 className="font-semibold text-xl">{g.title} Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span
                    key={s}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-gradient-primary hover:border-transparent transition-all cursor-default"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const items = [
    { icon: Globe, title: "Website Development", desc: "Professional, responsive business websites." },
    { icon: Code2, title: "Web App Development", desc: "Modern, scalable web applications." },
    { icon: Wand2, title: "WordPress Development", desc: "Custom WordPress sites and ongoing maintenance." },
    { icon: Sparkles, title: "AI Automation", desc: "Business workflow automation using AI tools." },
    { icon: Target, title: "Google Ads Management", desc: "Campaign creation, optimization, lead generation." },
    { icon: Database, title: "Data Analytics", desc: "Business insights using analytics and reporting." },
    { icon: Megaphone, title: "Marketing Consultation", desc: "Improve online presence and marketing performance." },
  ];
  return (
    <section id="services" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="Services" title="What I do for clients" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((s) => (
            <div
              key={s.title}
              data-reveal
              className="reveal group relative glass rounded-2xl p-6 hover:-translate-y-1 hover:shadow-glow transition-all"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-primary/10 pointer-events-none" />
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-semibold text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const items = [
    {
      title: "Krishikan Website",
      desc: "Developed a responsive business website using WordPress.",
      tags: ["WordPress", "Responsive Design"],
      live: "https://krishikan.com/",
      gh: null,
      accent: "from-primary to-accent",
    },
    {
      title: "AI Sales Assistant",
      desc: "Built an AI chatbot for customer support using OpenAI and Pipedream.",
      tags: ["OpenAI", "Pipedream", "AI Automation"],
      live: null,
      gh: "https://github.com/nirmalprabhakarc",
      accent: "from-accent to-purple",
    },
    {
      title: "Zamindar Eye Clinic Ads",
      desc: "Optimized Google Ads campaigns that increased qualified leads and improved performance.",
      tags: ["Google Ads", "Google Analytics"],
      live: null,
      gh: null,
      accent: "from-purple to-primary",
    },
  ];
  return (
    <section id="projects" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="Featured Projects" title="Selected work" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p) => (
            <article key={p.title} data-reveal className="reveal group glass rounded-2xl overflow-hidden hover:shadow-glow transition-all">
              <div className={`relative h-44 bg-gradient-to-br ${p.accent} overflow-hidden`}>
                <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:14px_14px]" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="glass-strong rounded-2xl p-5">
                    {p.title.includes("AI") ? <Cpu className="h-10 w-10" /> : p.title.includes("Ads") ? <Target className="h-10 w-10" /> : <Globe className="h-10 w-10" />}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-md bg-white/5 border border-white/10 px-2 py-1 text-xs">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex gap-2">
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer">
                      <Button size="sm" className="bg-gradient-primary border-0 gap-1.5">
                        <Globe className="h-3.5 w-3.5" /> Live
                      </Button>
                    </a>
                  )}
                  {p.gh && (
                    <a href={p.gh} target="_blank" rel="noreferrer">
                      <Button size="sm" variant="outline" className="border-white/15 gap-1.5">
                        <Github className="h-3.5 w-3.5" /> GitHub
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyMe() {
  const items = [
    "Professional Website Development",
    "AI-Driven Solutions",
    "Data-Based Decision Making",
    "Performance Marketing Expertise",
    "Reliable Communication",
    "Fast Project Delivery",
    "Client-Centric Approach",
  ];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="Why work with me" title="Built for outcomes, not just output" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((t) => (
            <div key={t} data-reveal className="reveal glass rounded-xl p-5 flex items-center gap-3 hover:bg-white/[0.06] transition">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-primary shadow-glow">
                <Zap className="h-4 w-4" />
              </span>
              <span className="font-medium">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sending, setSending] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setSending(true);
    try {
      const res = await fetch("https://formsubmit.co/ajax/nirmalprabhakarc@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          subject: (fd.get("subject") as string) || "Portfolio inquiry",
          message: fd.get("message"),
          _subject: `Portfolio: ${(fd.get("subject") as string) || "New inquiry"}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      toast.success("Message sent! I'll get back to you soon.");
      form.reset();
    } catch {
      toast.error("Could not send. Please email me directly.");
    } finally {
      setSending(false);
    }
  };
  const cards = [
    { icon: Mail, label: "Email", value: "nirmalprabhakarc@gmail.com", href: "mailto:nirmalprabhakarc@gmail.com" },
    { icon: Phone, label: "Phone", value: "+91 7032730167", href: "tel:+917032730167" },
    { icon: MapPin, label: "Location", value: "Berlin, Germany", href: "#" },
    { icon: Linkedin, label: "LinkedIn", value: "/in/nirmal-prabhakar-chirukuri", href: "https://www.linkedin.com/in/nirmal-prabhakar-chirukuri-8a1827419/" },
    { icon: Github, label: "GitHub", value: "@nirmalprabhakarc", href: "https://github.com/nirmalprabhakarc" },
  ];
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="Contact" title="Let's build something great" desc="Available for freelance projects, collaborations and full-time roles." />
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6">
          <div data-reveal className="reveal grid gap-3">
            {cards.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="glass rounded-2xl p-5 flex items-center gap-4 hover:shadow-glow hover:-translate-y-0.5 transition-all"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                  <c.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">{c.label}</div>
                  <div className="font-medium truncate">{c.value}</div>
                </div>
              </a>
            ))}
          </div>
          <form data-reveal onSubmit={onSubmit} className="reveal glass-strong rounded-2xl p-6 lg:p-8 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground">Name</label>
                <Input name="name" required placeholder="Your name" className="mt-1 bg-white/5 border-white/10" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Email</label>
                <Input name="email" type="email" required placeholder="you@email.com" className="mt-1 bg-white/5 border-white/10" />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Subject</label>
              <Input name="subject" placeholder="Project, role or collaboration" className="mt-1 bg-white/5 border-white/10" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Message</label>
              <Textarea name="message" required rows={6} placeholder="Tell me about your project…" className="mt-1 bg-white/5 border-white/10" />
            </div>
            <Button type="submit" disabled={sending} size="lg" className="w-full bg-gradient-primary border-0 shadow-glow hover:opacity-90 gap-2">
              <Send className="h-4 w-4" /> {sending ? "Sending…" : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 border-t border-white/5 mt-10">
      <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Nirmal Prabhakar Chirukui. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <a href="https://github.com/nirmalprabhakarc" target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-lg glass hover:bg-white/10 transition">
            <Github className="h-4 w-4" />
          </a>
          <a href="https://www.linkedin.com/in/nirmal-prabhakar-chirukuri-8a1827419/" target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-lg glass hover:bg-white/10 transition">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href="mailto:nirmalprabhakarc@gmail.com" className="grid h-9 w-9 place-items-center rounded-lg glass hover:bg-white/10 transition">
            <Mail className="h-4 w-4" />
          </a>
          <a href="#home" className="ml-2 grid h-9 w-9 place-items-center rounded-lg bg-gradient-primary shadow-glow hover:opacity-90 transition" aria-label="Back to top">
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export function Portfolio() {
  useReveal();
  return (
    <div className="relative min-h-screen text-foreground">
      <AnimatedBackground />
      <Nav />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Services />
        <Projects />
        <WhyMe />
        <Contact />
      </main>
      <Footer />
      <Toaster />
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          [data-reveal]:not(.reveal-in) {
            opacity: 0;
            transform: translateY(24px);
          }
          [data-reveal] {
            transition: opacity .3s ease, transform .3s ease;
          }
        }
        .reveal-in { opacity: 1 !important; transform: none !important; }
      `}</style>
    </div>
  );
}