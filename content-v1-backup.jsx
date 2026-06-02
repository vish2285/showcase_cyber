/* global React */

const I = {
  github: (p) => (<svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="currentColor" {...p}><path d="M12 .5C5.6.5.5 5.6.5 12c0 5.1 3.3 9.4 7.8 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.7.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.5-1.5 7.8-5.8 7.8-10.9C23.5 5.6 18.4.5 12 .5z"/></svg>),
  linkedin: (p) => (<svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="currentColor" {...p}><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3v9zM6.5 8.7a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5zM19 19h-3v-4.5c0-1.1-.02-2.5-1.5-2.5S13 13.2 13 14.4V19h-3v-9h2.9v1.2h.04a3.2 3.2 0 0 1 2.9-1.6c3.1 0 3.7 2 3.7 4.7V19z"/></svg>),
  mail: (p) => (<svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>),
  arrow: (p) => (<svg viewBox="0 0 24 24" width={p.size||14} height={p.size||14} fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M7 17 17 7M9 7h8v8"/></svg>),
  cap: (p) => (<svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M2 10 12 5l10 5-10 5-10-5z"/><path d="M6 12v5c0 1 2.7 3 6 3s6-2 6-3v-5"/><path d="M22 10v6"/></svg>),
};

function hexA(hex, a) {
  const h = hex.replace('#', '');
  return `rgba(${parseInt(h.substring(0,2),16)},${parseInt(h.substring(2,4),16)},${parseInt(h.substring(4,6),16)},${a})`;
}

function SectionHead({ num, kicker, title, accent }) {
  return (
    <div className="mb-14">
      <div className="flex items-baseline gap-4 mb-5">
        <span className="font-mono text-[11px] uppercase tracking-[0.35em]" style={{ color: accent }}>§ {num}</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-white/50">{kicker}</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.05] tracking-tight">{title}</h2>
    </div>
  );
}

function AboutSection({ accent }) {
  return (
    <section id="about-anchor" className="py-28 px-6 md:px-14 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <SectionHead num="01" kicker="About" title={<>CS student at UC Davis.<br/>I build things, then try to <span style={{ color: accent }}>break them</span>.</>} accent={accent} />

        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-start">
          <div className="space-y-6 text-white/75 leading-relaxed text-lg max-w-2xl">
            <p>Most of what I work on sits at the edge of AI and security. The fun stuff, the stuff that breaks in weird ways.</p>
            <p>Lately that's been auth pipelines, anomaly detection on large logs, and research tooling that actually helps students. I like writing code that's fast, small, and hard to mess up.</p>
            <p>When I'm not shipping, I'm tutoring in the CS Tutoring Club at Davis. Best way to learn something is to explain it to someone else.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:w-64 lg:shrink-0">
            {[
              { k: 'Based in', v: 'Davis, CA' },
              { k: 'School', v: 'UC Davis — CS' },
              { k: 'Focus', v: 'AI Security' },
            ].map((it, i) => (
              <div key={i} className="p-4 rounded-lg" style={{ background: 'rgba(19,19,27,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1">{it.k}</div>
                <div className="text-white text-sm">{it.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const PROJECTS = [
  { n: '01', title: 'LabLink', tag: 'Research matching for UC Davis',
    desc: 'A tool that helps students find faculty research that actually fits them. Ranking combines BM25, semantic embeddings, skill overlap, and publication recency.',
    stack: ['TypeScript', 'React', 'FastAPI', 'Postgres', 'sentence-transformers'],
    github: 'https://github.com/vish2285/LabLink' },
  { n: '02', title: 'xpenza', tag: 'Expense tracker',
    desc: 'Simple dashboard for tracking where my money goes. Category breakdowns, month-over-month trends. Built it because every other one annoyed me.',
    stack: ['Next.js', 'React', 'Tailwind', 'Postgres', 'Vercel'],
    github: 'https://github.com/vish2285/xpenza--', live: 'https://xpenza.vercel.app' },
  { n: '03', title: 'FinLit', tag: 'Secure auth, done right',
    desc: 'Financial literacy app. What makes it interesting: the backend validates Clerk JWTs locally using the signing key — no network roundtrip per request.',
    stack: ['JavaScript', 'Python', 'Clerk', 'JWT', 'FastAPI'],
    github: 'https://github.com/vish2285/FinLit', live: 'https://finlit-ten.vercel.app' },
];

function ProjectsSection({ accent }) {
  return (
    <section id="projects-anchor" className="py-28 px-6 md:px-14 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-14">
          <div>
            <div className="flex items-baseline gap-4 mb-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.35em]" style={{ color: accent }}>§ 02</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-white/50">Work</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.05] tracking-tight">Things I've shipped.</h2>
          </div>
          <a href="https://github.com/vish2285" target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/15 text-white/80 hover:text-white hover:border-white/30 text-sm font-mono">
            <I.github size={14} /> github <I.arrow size={12} />
          </a>
        </div>

        <div className="space-y-4">
          {PROJECTS.map((p) => (
            <article key={p.n} className="group grid md:grid-cols-[80px_1fr_auto] gap-6 items-start p-6 md:p-7 rounded-xl transition-colors hover:border-white/15"
              style={{ background: 'rgba(19,19,27,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="font-mono text-5xl font-black leading-none" style={{ color: hexA(accent, 0.25) }}>{p.n}</div>
              <div className="min-w-0">
                <div className="flex items-baseline gap-3 flex-wrap mb-2">
                  <h3 className="text-2xl font-bold text-white">{p.title}</h3>
                  <span className="text-sm" style={{ color: hexA(accent, 0.85) }}>{p.tag}</span>
                </div>
                <p className="text-white/60 leading-relaxed mb-4 max-w-2xl">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map(s => (<span key={s} className="text-[11px] font-mono px-2 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.55)' }}>{s}</span>))}
                </div>
              </div>
              <div className="flex md:flex-col gap-2 md:items-end shrink-0">
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white transition-colors" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <I.github size={14} /> source
                </a>
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#0a0a12] font-medium" style={{ background: accent }}>
                    live <I.arrow size={12} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const EDUCATION = [
  { school: 'University of California, Davis', degree: 'B.S. Computer Science', period: '2023 — 2027 (expected)',
    points: ['Focus: AI, Cybersecurity, Systems.', 'Coursework: Algorithms, OS, Machine Learning, Probability & Stats.'] },
];

function EducationSection({ accent }) {
  return (
    <section className="py-28 px-6 md:px-14 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <SectionHead num="03" kicker="Education" title="School." accent={accent} />
        <div className="space-y-4">
          {EDUCATION.map((e, i) => (
            <div key={i} className="grid md:grid-cols-[56px_1fr_auto] gap-5 items-start p-6 rounded-xl" style={{ background: 'rgba(19,19,27,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="w-12 h-12 rounded-lg grid place-items-center" style={{ background: hexA(accent, 0.1), color: accent, border: `1px solid ${hexA(accent, 0.2)}` }}>
                <I.cap size={20} />
              </div>
              <div>
                <div className="text-white font-semibold text-lg">{e.school}</div>
                <div style={{ color: hexA(accent, 0.85) }} className="text-sm mb-3">{e.degree}</div>
                <ul className="space-y-1.5">
                  {e.points.map((p, j) => (
                    <li key={j} className="flex gap-3 text-sm text-white/60"><span style={{ color: accent }}>›</span> {p}</li>
                  ))}
                </ul>
              </div>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full self-start" style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}>{e.period}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const TIMELINE = [
  { title: 'Software Developer', org: 'CS Tutoring Club, UC Davis', period: 'Sept 2025 — Now', type: 'Work',
    points: ['Built internal web tools, cleaned up scheduling.', 'Migrated the frontend off React Context to Zustand. Fewer re-renders, simpler state.'] },
  { title: 'Engineering Intern', org: 'City of Sacramento', period: 'Dec 2024 — Oct 2025', type: 'Work',
    points: ['Wrote Python that spat out 1,000+ project PDFs in minutes instead of days.', 'Killed a lot of manual data-entry errors in the process.'] },
  { title: 'AV / IT Volunteer', org: 'BAPS', period: 'Dec 2024 — Mar 2025', type: 'Volunteer',
    points: ['Ran AV, networking, and livestream for weekly events (100+ people).'] },
  { title: 'Freelance Developer', org: 'Self-employed', period: 'Jan 2024 — Feb 2025', type: 'Work',
    points: ['Shipped 5+ client sites. Responsive, fast, not hideous.'] },
];

function ExperienceSection({ accent }) {
  return (
    <section className="py-28 px-6 md:px-14 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <SectionHead num="04" kicker="Experience" title="What I've worked on." accent={accent} />
        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px hidden md:block" style={{ background: `linear-gradient(to bottom, ${hexA(accent, 0.4)}, rgba(255,255,255,0.05))` }} />
          <div className="space-y-6">
            {TIMELINE.map((it, i) => (
              <div key={i} className="relative md:pl-10">
                <div className="hidden md:block absolute left-0 top-2 w-[15px] h-[15px] rounded-full" style={{ background: '#0a0a12', border: `2px solid ${accent}` }} />
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                  <h3 className="text-white font-semibold text-lg">{it.title}</h3>
                  <span className="text-sm" style={{ color: hexA(accent, 0.85) }}>{it.org}</span>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-white/35 ml-auto">{it.period}</span>
                </div>
                <ul className="space-y-1.5">
                  {it.points.map((pt, j) => (<li key={j} className="text-white/60 leading-relaxed">{pt}</li>))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Skills, editorial-style feature grid ----
const SKILL_GROUPS = [
  { cat: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'C++', 'SQL'] },
  { cat: 'Frontend',  items: ['React', 'Next.js', 'Tailwind', 'Framer Motion'] },
  { cat: 'Backend',   items: ['FastAPI', 'Node.js', 'PostgreSQL', 'REST'] },
  { cat: 'AI / ML',   items: ['PyTorch', 'scikit-learn', 'Pandas', 'Transformers'] },
  { cat: 'Security',  items: ['Threat Modeling', 'OWASP Top 10', 'OAuth / JWT', 'CTF'] },
  { cat: 'Infra',     items: ['Docker', 'Git', 'Vercel', 'Jupyter'] },
];

function SkillsSection({ accent }) {
  return (
    <section className="py-28 px-6 md:px-14 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <SectionHead num="05" kicker="Stack" title="What I reach for." accent={accent} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          {SKILL_GROUPS.map((g, i) => (
            <div key={g.cat} className="p-8 flex flex-col gap-5" style={{ background: '#0a0a12' }}>
              <div className="flex items-center justify-between">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: accent }}>
                  {g.cat}
                </div>
                <div className="font-mono text-[10px] text-white/25">0{i + 1}</div>
              </div>
              <ul className="space-y-2">
                {g.items.map((s) => (
                  <li key={s} className="text-white/85 text-[17px] leading-snug font-light tracking-tight">{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection({ accent }) {
  const [form, setForm] = React.useState({ name: '', email: '', message: '' });
  const [sent, setSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const socials = [
    { icon: I.github, label: 'GitHub', handle: '@vish2285', href: 'https://github.com/vish2285' },
    { icon: I.linkedin, label: 'LinkedIn', handle: 'in/vishwas2285', href: 'https://linkedin.com/in/vishwas2285' },
    { icon: I.mail, label: 'Email', handle: 'vishwas2284@gmail.com', href: 'mailto:vishwas2284@gmail.com' },
  ];

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    setSent(true);
  };

  return (
    <section id="contact-anchor" className="py-28 px-6 md:px-14 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <SectionHead num="06" kicker="Contact" title={<>Let's build something <span style={{ color: accent }}>worth securing.</span></>} accent={accent} />

        <div className="grid lg:grid-cols-[1fr_1fr] gap-10">
          <div className="space-y-8">
            <p className="text-white/65 leading-relaxed max-w-md">
              Internship, project idea, or just want to talk AI and security? Inbox is open.
            </p>
            <div className="space-y-2.5">
              {socials.map(({ icon: Icon, label, handle, href }) => (
                <a key={label} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
                   className="flex items-center gap-4 p-4 rounded-xl transition-all group"
                   style={{ background: 'rgba(19,19,27,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="w-10 h-10 rounded-lg grid place-items-center shrink-0" style={{ background: hexA(accent, 0.1), color: accent, border: `1px solid ${hexA(accent, 0.2)}` }}><Icon size={18} /></div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">{label}</div>
                    <div className="text-sm text-white/90 truncate">{handle}</div>
                  </div>
                  <div className="ml-auto text-white/30 group-hover:text-white transition-colors"><I.arrow size={14} /></div>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-7" style={{ background: 'rgba(19,19,27,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}>
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full py-10 text-center gap-3">
                <div className="w-12 h-12 rounded-full grid place-items-center" style={{ background: hexA(accent, 0.15), color: accent }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m5 12 5 5L20 7"/></svg>
                </div>
                <h3 className="text-white font-semibold">Message sent.</h3>
                <p className="text-white/50 text-sm">Thanks — I'll get back to you soon.</p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }} className="text-sm mt-2 hover:underline" style={{ color: accent }}>Send another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <Field label="Name" name="name" value={form.name} onChange={v => setForm({ ...form, name: v })} accent={accent} />
                <Field label="Email" name="email" type="email" value={form.email} onChange={v => setForm({ ...form, email: v })} accent={accent} />
                <Field label="Message" name="message" textarea value={form.message} onChange={v => setForm({ ...form, message: v })} accent={accent} />
                <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-medium text-[#0a0a12] disabled:opacity-60" style={{ background: accent }}>
                  {loading ? (<><span className="w-4 h-4 rounded-full border-2 border-[#0a0a12]/30 border-t-[#0a0a12] animate-spin" />Sending</>) : (<>Send message <I.arrow size={14} /></>)}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = 'text', textarea, value, onChange, accent }) {
  const base = { background: 'rgba(10,10,18,0.6)', border: '1px solid rgba(255,255,255,0.08)', color: 'white' };
  return (
    <div>
      <label className="block text-[10px] font-mono uppercase tracking-widest text-white/50 mb-2">{label}</label>
      {textarea ? (
        <textarea name={name} value={value} onChange={e => onChange(e.target.value)} rows={5} required
          placeholder={`Your ${label.toLowerCase()}…`}
          className="w-full rounded-lg px-4 py-3 text-sm outline-none resize-none" style={base}
          onFocus={e => e.target.style.borderColor = accent} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
      ) : (
        <input name={name} type={type} value={value} onChange={e => onChange(e.target.value)} required
          placeholder={type === 'email' ? 'you@email.com' : `Your ${label.toLowerCase()}`}
          className="w-full rounded-lg px-4 py-3 text-sm outline-none" style={base}
          onFocus={e => e.target.style.borderColor = accent} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
      )}
    </div>
  );
}

function Footer({ accent, name }) {
  return (
    <footer className="border-t border-white/5 py-10 px-6 md:px-14">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-white/40">
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded grid place-items-center font-bold text-[11px]" style={{ background: accent, color: '#0a0a12' }}>{(name || 'V')[0]}</span>
          <span>© {new Date().getFullYear()} {name || 'Vish'} Patel · Davis, CA</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://github.com/vish2285" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="GitHub"><I.github size={15} /></a>
          <a href="https://linkedin.com/in/vishwas2285" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn"><I.linkedin size={15} /></a>
          <a href="mailto:vishwas2284@gmail.com" className="hover:text-white transition-colors" aria-label="Email"><I.mail size={15} /></a>
        </div>
      </div>
    </footer>
  );
}

function SiteContent({ tweaks }) {
  const accent = tweaks.accent;
  return (
    <>
      <AboutSection accent={accent} />
      <ProjectsSection accent={accent} />
      <EducationSection accent={accent} />
      <ExperienceSection accent={accent} />
      <SkillsSection accent={accent} />
      <ContactSection accent={accent} />
      <Footer accent={accent} name={tweaks.name} />
    </>
  );
}

Object.assign(window, { SiteContent });
