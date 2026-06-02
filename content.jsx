/* global React */

const I = {
  github: (p) => (<svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="currentColor" {...p}><path d="M12 .5C5.6.5.5 5.6.5 12c0 5.1 3.3 9.4 7.8 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.7.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.5-1.5 7.8-5.8 7.8-10.9C23.5 5.6 18.4.5 12 .5z"/></svg>),
  linkedin: (p) => (<svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="currentColor" {...p}><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3v9zM6.5 8.7a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5zM19 19h-3v-4.5c0-1.1-.02-2.5-1.5-2.5S13 13.2 13 14.4V19h-3v-9h2.9v1.2h.04a3.2 3.2 0 0 1 2.9-1.6c3.1 0 3.7 2 3.7 4.7V19z"/></svg>),
  mail: (p) => (<svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 7 9 6 9-6"/></svg>),
  arrow: (p) => (<svg viewBox="0 0 24 24" width={p.size||14} height={p.size||14} fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M7 17 17 7M9 7h8v8"/></svg>),
};

const ax = (a) => window.hexA(a, 1);

function Reveal({ children, delay = 0, className = '' }) {
  return <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function SectionHead({ num, kicker, title, accent, right, ghost }) {
  return (
    <div className="relative mb-16">
      {ghost && (
        <span data-parallax="0.06" className="absolute -top-10 -left-2 font-display font-bold pointer-events-none select-none" style={{ fontSize: 'clamp(120px, 22vw, 300px)', color: 'rgba(236,233,224,0.025)', lineHeight: 0.8, zIndex: 0 }}>{num}</span>
      )}
      <div className="relative flex items-end justify-between gap-6 flex-wrap">
        <div>
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <span className="mono text-[11px] uppercase tracking-[0.4em]" style={{ color: accent }}>§ {num}</span>
              <span className="h-px w-10" style={{ background: window.hexA(accent, 0.5) }} />
              <span className="mono text-[11px] uppercase tracking-[0.4em] text-[var(--faint)]">{kicker}</span>
            </div>
          </Reveal>
          <div className="r-mask">
            <h2 className="r-inner font-display font-bold text-[var(--text)] leading-[0.98] tracking-[-0.025em]" style={{ fontSize: 'clamp(40px, 6vw, 76px)', transitionDelay: '90ms' }}>{title}</h2>
          </div>
        </div>
        {right && <Reveal delay={140}>{right}</Reveal>}
      </div>
    </div>
  );
}

function Divider() {
  return <div className="max-w-6xl mx-auto px-8 md:px-14"><div className="h-px" style={{ background: 'var(--line)' }} /></div>;
}

// ============================ ABOUT ============================
function AboutSection({ accent }) {
  const specs = [
    { k: 'Based in', v: 'Davis, CA' },
    { k: 'School', v: 'UC Davis CS' },
    { k: 'Focus', v: 'AI Security' },
    { k: 'Status', v: 'Open to internships' },
  ];
  return (
    <section id="about-anchor" className="py-28 md:py-36 px-8 md:px-14">
      <div className="max-w-6xl mx-auto">
        <SectionHead num="01" kicker="About" ghost accent={accent} title={<>I build things, then<br/><span className="serif-i" style={{ color: accent }}>try to break them.</span></>} />

        <div className="grid lg:grid-cols-[1fr_300px] gap-x-20 gap-y-12 items-start">
          <div className="max-w-2xl">
            <Reveal>
              <p className="font-display font-light text-[var(--text)] tracking-tight mb-9" style={{ fontSize: 'clamp(22px, 2.4vw, 30px)', lineHeight: 1.4 }}>
                Most of what I work on lives at the edge of AI and security. The fun stuff. The parts that break in interesting ways.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <div className="space-y-5 text-[var(--muted)] leading-relaxed text-[17px]">
                <p>Lately that means auth pipelines, anomaly detection across large logs, and research tooling that genuinely helps students. I like code that is fast, small, and hard to break.</p>
                <p>When I am not shipping, I tutor at the CS club at Davis. The best way to learn something is to explain it to someone else.</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <div className="lg:border-l lg:pl-10" style={{ borderColor: 'var(--line)' }}>
              <div className="mono text-[10px] uppercase tracking-[0.35em] text-[var(--faint)] mb-4">Spec sheet</div>
              <dl>
                {specs.map((it) => (
                  <div key={it.k} className="flex items-baseline justify-between gap-4 py-3.5 border-t" style={{ borderColor: 'var(--line)' }}>
                    <dt className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--faint)]">{it.k}</dt>
                    <dd className="text-[var(--text)] text-[15px] text-right">{it.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ============================ WORK ============================
const PROJECTS = [
  { n: '01', title: 'LabLink', cat: 'Research Matching', year: '2025',
    desc: 'A tool that helps students find faculty research that actually fits them. Ranking blends BM25, semantic embeddings, skill overlap, and publication recency.',
    stack: ['TypeScript', 'React', 'FastAPI', 'Postgres', 'sentence-transformers'],
    github: 'https://github.com/vish2285/LabLink' },
  { n: '02', title: 'xpenza', cat: 'Personal Finance', year: '2025',
    desc: 'A clean dashboard for tracking where my money goes. Category breakdowns and month over month trends. I built it because every other one annoyed me.',
    stack: ['Next.js', 'React', 'Tailwind', 'Postgres', 'Vercel'],
    github: 'https://github.com/vish2285/xpenza--', live: 'https://xpenza.vercel.app' },
  { n: '03', title: 'FinLit', cat: 'Secure Auth', year: '2024',
    desc: 'A financial literacy app. The interesting part is the backend validating Clerk JWTs locally with the signing key, so there is no network roundtrip per request.',
    stack: ['JavaScript', 'Python', 'Clerk', 'JWT', 'FastAPI'],
    github: 'https://github.com/vish2285/FinLit', live: 'https://finlit-ten.vercel.app' },
];

function WorkSection({ accent }) {
  return (
    <section id="work-anchor" className="py-28 md:py-36 px-8 md:px-14">
      <div className="max-w-6xl mx-auto">
        <SectionHead num="02" kicker="Selected Work" ghost accent={accent} title="Things I have shipped."
          right={
            <a href="https://github.com/vish2285" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 px-4 py-2.5 mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)] hover:text-[var(--text)] transition-colors border rounded-full" style={{ borderColor: 'var(--line-strong)' }}>
              <I.github size={14} /> All repos <I.arrow size={12} />
            </a>
          } />

        <div className="border-t" style={{ borderColor: 'var(--line-strong)' }}>
          {PROJECTS.map((p, i) => (
            <Reveal key={p.n} delay={i * 60}>
              <article className="wk-row group relative grid md:grid-cols-[1fr_auto] gap-x-10 gap-y-6 items-start py-10 px-4 -mx-4 border-b" style={{ borderColor: 'var(--line)' }}>
                <span className="wk-bar absolute left-0 top-0 h-px" style={{ background: accent, width: 0 }} />
                <div className="min-w-0">
                  <div className="flex items-baseline gap-5 mb-4 flex-wrap">
                    <span className="wk-num font-display font-bold leading-none" style={{ fontSize: 'clamp(40px, 5vw, 64px)', color: window.hexA(accent, 0.22) }}>{p.n}</span>
                    <div>
                      <h3 className="font-display font-bold text-[var(--text)] tracking-tight" style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', lineHeight: 1 }}>{p.title}</h3>
                      <span className="mono text-[11px] uppercase tracking-[0.25em]" style={{ color: window.hexA(accent, 0.9) }}>{p.cat}</span>
                    </div>
                  </div>
                  <p className="text-[var(--muted)] leading-relaxed mb-5 max-w-2xl text-[16px] md:pl-[clamp(56px,7vw,88px)]">{p.desc}</p>
                  <div className="flex flex-wrap gap-x-5 gap-y-1.5 md:pl-[clamp(56px,7vw,88px)]">
                    {p.stack.map(s => (<span key={s} className="mono text-[12px] text-[var(--faint)]">{s}</span>))}
                  </div>
                </div>
                <div className="flex md:flex-col gap-x-5 gap-y-3 md:items-end shrink-0 md:text-right">
                  <span className="mono text-[11px] uppercase tracking-[0.2em] text-[var(--faint)]">{p.year}</span>
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mono text-[12px] uppercase tracking-[0.18em] text-[var(--muted)] hover:text-[var(--text)] transition-colors">
                    <I.github size={14} /> Source
                  </a>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mono text-[12px] uppercase tracking-[0.18em] transition-opacity hover:opacity-75" style={{ color: accent }}>
                      Live <I.arrow size={12} />
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================ EDUCATION ============================
function EducationSection({ accent }) {
  return (
    <section id="education-anchor" className="py-28 md:py-36 px-8 md:px-14">
      <div className="max-w-6xl mx-auto">
        <SectionHead num="03" kicker="Education" ghost accent={accent} title="School." />
        <Reveal>
          <div className="grid md:grid-cols-[1fr_auto] gap-x-10 gap-y-6 items-start py-10 border-t border-b" style={{ borderColor: 'var(--line-strong)' }}>
            <div className="max-w-2xl">
              <h3 className="font-display font-bold text-[var(--text)] tracking-tight mb-2" style={{ fontSize: 'clamp(26px, 3.2vw, 40px)', lineHeight: 1.02 }}>University of California, Davis</h3>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-7">
                <span className="mono text-[12px] uppercase tracking-[0.22em]" style={{ color: window.hexA(accent, 0.9) }}>B.S. Computer Science</span>
                <span className="mono text-[12px] uppercase tracking-[0.18em] text-[var(--faint)]">GPA 3.94 / 4.00</span>
              </div>
              <ul className="flex flex-wrap gap-x-7 gap-y-2.5 mb-6">
                {['Data Structures & Algorithms', 'Object-Oriented Programming', 'Discrete Math', 'Software Engineering'].map((p) => (
                  <li key={p} className="mono text-[12px] uppercase tracking-[0.12em] text-[var(--muted)]">{p}</li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="mono text-[10px] uppercase tracking-[0.28em] text-[var(--faint)]">Certs in progress</span>
                {['CompTIA Security+ SY0-701', 'TryHackMe SOC Level 1'].map((c) => (
                  <span key={c} className="mono text-[11px] uppercase tracking-[0.12em] self-start px-2.5 py-0.5 rounded-full text-[var(--muted)]" style={{ border: '1px solid var(--line-strong)' }}>{c}</span>
                ))}
              </div>
            </div>
            <span className="mono text-[12px] uppercase tracking-[0.2em] text-[var(--faint)] md:text-right whitespace-nowrap md:pt-2">2023 → 2027</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============================ EXPERIENCE ============================
const TIMELINE = [
  { title: 'Full-Stack Software Engineer', org: 'CS Tutoring Club, UC Davis', period: 'SEP 2025 → NOW', type: 'Work',
    points: [
      'Enhanced a full-stack Next.js app serving 1,000+ active users, improving speed, usability, and access to tutoring resources.',
      'Optimized performance by 40% through frontend updates, infrastructure improvements, and cleaner application logic.',
      'Shipped features, fixed production bugs, and improved platform reliability for tutor coordination and club operations.',
    ] },
  { title: 'Software Engineering Intern', org: 'City of Sacramento', period: 'DEC 2024 → OCT 2025', type: 'Work',
    points: [
      'Built a Python automation pipeline (pandas, openpyxl, ReportLab) turning spreadsheet data into 1,000+ PDF reports.',
      'Added error handling and debugging logic to catch missing fields and formatting issues before report generation.',
      'Improved reliability and maintainability with reusable code, cutting manual review time for reporting tasks.',
    ] },
  { title: 'Development Engineering Intern', org: 'City of Sacramento', period: 'DEC 2024 → OCT 2025', type: 'Work',
    points: [
      'Supported city engineering staff with map records, abandonment files, and infrastructure docs used for project review.',
      'Reviewed and organized engineering record data across maps, spreadsheets, and project files to improve accuracy.',
      'Wrote documentation so teams could follow repeatable steps for records, PDF review, and long-term file maintenance.',
    ] },
  { title: 'AV / IT Support Specialist', org: 'BAPS', period: 'DEC 2024 → MAR 2025', type: 'Volunteer',
    points: [
      'Ran AV/IT infrastructure for weekly 100+ attendee events: projectors, audio, livestream, and networking.',
      'Troubleshot networking, hardware, and software issues live, maintaining 99%+ uptime over 12 weeks.',
      'Built troubleshooting runbooks with a 5-person team, standardizing setup and cutting setup time 30%.',
    ] },
  { title: 'Freelance Software Developer', org: 'Self-employed', period: 'JAN 2024 → FEB 2025', type: 'Work',
    points: [
      'Shipped 5+ production sites (React, Next.js) with HTTPS enforcement, input sanitization, and CSP headers.',
      'Hit 90+ Lighthouse scores on performance, accessibility, and SEO with mobile-first design and optimized assets.',
    ] },
];

function ExperienceSection({ accent }) {
  return (
    <section id="experience-anchor" className="py-28 md:py-36 px-8 md:px-14">
      <div className="max-w-6xl mx-auto">
        <SectionHead num="04" kicker="Experience" ghost accent={accent} title="Where I have worked." />
        <div className="border-t" style={{ borderColor: 'var(--line-strong)' }}>
          {TIMELINE.map((it, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="wk-row group grid md:grid-cols-[210px_1fr] gap-x-10 gap-y-4 items-start py-9 px-4 -mx-4 border-b" style={{ borderColor: 'var(--line)' }}>
                <div className="flex flex-col gap-2.5">
                  <span className="mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">{it.period}</span>
                  <span className="mono text-[10px] uppercase tracking-[0.22em] self-start px-2 py-0.5 rounded-full" style={{ color: it.type === 'Work' ? accent : 'var(--faint)', border: `1px solid ${it.type === 'Work' ? window.hexA(accent, 0.35) : 'var(--line-strong)'}` }}>{it.type}</span>
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                    <h3 className="font-display font-semibold text-[var(--text)] tracking-tight" style={{ fontSize: 'clamp(20px, 2.2vw, 26px)' }}>{it.title}</h3>
                    <span className="mono text-[12px] uppercase tracking-[0.14em]" style={{ color: window.hexA(accent, 0.85) }}>{it.org}</span>
                  </div>
                  <ul className="space-y-2">
                    {it.points.map((pt, j) => (
                      <li key={j} className="flex gap-3 text-[var(--muted)] leading-relaxed text-[16px]">
                        <span className="mt-2.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: window.hexA(accent, 0.7) }} />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================ SKILLS ============================
const SKILL_GROUPS = [
  { cat: 'Languages', items: ['Python', 'C / C++', 'SQL', 'JavaScript', 'HTML / CSS', 'Bash'] },
  { cat: 'Security', items: ['OAuth 2.0', 'JWT', 'RBAC', 'Input Validation', 'OWASP Top 10', 'HTTPS / TLS', 'CSP Headers'] },
  { cat: 'Frameworks & Tools', items: ['React', 'Next.js', 'Node.js', 'FastAPI', 'Git', 'Linux', 'pandas'] },
  { cat: 'IT & Infra', items: ['Networking', 'Hardware Troubleshooting', 'AV Systems', 'Livestream Config'] },
];

function SkillsSection({ accent }) {
  return (
    <section id="skills-anchor" className="py-28 md:py-36 px-8 md:px-14">
      <div className="max-w-6xl mx-auto">
        <SectionHead num="05" kicker="Toolkit" ghost accent={accent} title={<>What I <span className="serif-i" style={{ color: accent }}>reach for.</span></>} />
        <div className="border-t" style={{ borderColor: 'var(--line-strong)' }}>
          {SKILL_GROUPS.map((g, i) => (
            <Reveal key={g.cat} delay={i * 50}>
              <div className="wk-row group grid md:grid-cols-[230px_1fr] gap-x-10 gap-y-3 items-baseline py-7 px-4 -mx-4 border-b" style={{ borderColor: 'var(--line)' }}>
                <div className="flex items-baseline gap-3">
                  <span className="mono text-[10px] text-[var(--faint)]">0{i + 1}</span>
                  <span className="mono text-[11px] uppercase tracking-[0.32em]" style={{ color: accent }}>{g.cat}</span>
                </div>
                <div className="flex flex-wrap gap-x-8 gap-y-2.5">
                  {g.items.map((s) => (
                    <span key={s} className="font-display text-[var(--text)] font-light tracking-tight" style={{ fontSize: 'clamp(18px, 1.9vw, 22px)' }}>{s}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================ CONTACT ============================
function ContactSection({ accent }) {
  const [form, setForm] = React.useState({ name: '', email: '', message: '' });
  const [sent, setSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const socials = [
    { icon: I.github, label: 'GitHub', handle: 'github.com/vish2285', href: 'https://github.com/vish2285' },
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
    <section id="contact-anchor" className="py-28 md:py-36 px-8 md:px-14">
      <div className="max-w-6xl mx-auto">
        <SectionHead num="06" kicker="Contact" ghost accent={accent} title={<>Let's build something<br/><span className="serif-i" style={{ color: accent }}>worth securing.</span></>} />

        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16">
          <Reveal>
            <div className="space-y-9">
              <p className="text-[var(--muted)] leading-relaxed max-w-md text-[17px]">
                Internship, a project idea, or you just want to trade notes on AI and security. My inbox is open.
              </p>
              <div className="border-t" style={{ borderColor: 'var(--line)' }}>
                {socials.map(({ icon: Icon, label, handle, href }) => (
                  <a key={label} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
                     className="wk-row group flex items-center gap-5 py-5 px-3 -mx-3 border-b" style={{ borderColor: 'var(--line)' }}>
                    <span className="grid place-items-center shrink-0" style={{ color: accent }}><Icon size={20} /></span>
                    <div className="min-w-0">
                      <div className="mono text-[10px] uppercase tracking-[0.25em] text-[var(--faint)] mb-0.5">{label}</div>
                      <div className="text-[15px] text-[var(--text)] truncate">{handle}</div>
                    </div>
                    <span className="ml-auto text-[var(--faint)] group-hover:text-[var(--text)] transition-colors"><I.arrow size={16} /></span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="p-8" style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 4 }}>
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center gap-3">
                  <div className="w-12 h-12 rounded-full grid place-items-center" style={{ background: window.hexA(accent, 0.15), color: accent }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m5 12 5 5L20 7"/></svg>
                  </div>
                  <h3 className="font-display text-[var(--text)] font-semibold text-lg">Message sent.</h3>
                  <p className="text-[var(--muted)] text-sm">Thanks. I will get back to you soon.</p>
                  <button onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }} className="mono text-xs uppercase tracking-widest mt-2 hover:underline" style={{ color: accent }}>Send another</button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <Field label="Name" name="name" value={form.name} onChange={v => setForm({ ...form, name: v })} accent={accent} />
                  <Field label="Email" name="email" type="email" value={form.email} onChange={v => setForm({ ...form, email: v })} accent={accent} />
                  <Field label="Message" name="message" textarea value={form.message} onChange={v => setForm({ ...form, message: v })} accent={accent} />
                  <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3.5 mono text-[12px] uppercase tracking-[0.2em] font-medium text-[#08080A] disabled:opacity-60 transition-opacity hover:opacity-90" style={{ background: accent, borderRadius: 3 }}>
                    {loading ? (<><span className="w-4 h-4 rounded-full border-2 border-[#08080A]/30 border-t-[#08080A] animate-spin" />Sending</>) : (<>Send message <I.arrow size={14} /></>)}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = 'text', textarea, value, onChange, accent }) {
  const base = { background: 'var(--bg)', border: '1px solid var(--line-strong)', color: 'var(--text)', borderRadius: 3 };
  const common = {
    name, value, onChange: e => onChange(e.target.value), required: true,
    className: 'w-full px-4 py-3 text-[15px] outline-none transition-colors',
    style: base,
    onFocus: e => e.target.style.borderColor = accent,
    onBlur: e => e.target.style.borderColor = 'var(--line-strong)',
  };
  return (
    <div>
      <label className="block mono text-[10px] uppercase tracking-[0.25em] text-[var(--faint)] mb-2">{label}</label>
      {textarea
        ? <textarea {...common} rows={5} placeholder={`Your ${label.toLowerCase()}`} style={{ ...base, resize: 'none' }} />
        : <input {...common} type={type} placeholder={type === 'email' ? 'you@email.com' : `Your ${label.toLowerCase()}`} />}
    </div>
  );
}

// ============================ FOOTER ============================
function Footer({ accent, name, last }) {
  return (
    <footer className="border-t py-10 px-8 md:px-14" style={{ borderColor: 'var(--line)' }}>
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 mono text-[11px] uppercase tracking-[0.15em] text-[var(--faint)]">
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 grid place-items-center font-display font-bold text-[12px]" style={{ background: accent, color: '#08080A', borderRadius: 2 }}>{(name || 'V')[0]}</span>
          <span>© {new Date().getFullYear()} {name || 'Vishwas'} {last || 'Patel'}. Davis, CA</span>
        </div>
        <div className="flex items-center gap-5">
          <a href="https://github.com/vish2285" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text)] transition-colors" aria-label="GitHub"><I.github size={16} /></a>
          <a href="https://linkedin.com/in/vishwas2285" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text)] transition-colors" aria-label="LinkedIn"><I.linkedin size={16} /></a>
          <a href="mailto:vishwas2284@gmail.com" className="hover:text-[var(--text)] transition-colors" aria-label="Email"><I.mail size={16} /></a>
        </div>
      </div>
    </footer>
  );
}

function SiteContent({ tweaks }) {
  const accent = tweaks.accent;
  return (
    <div style={{ '--accent': accent }}>
      <style>{`
        .wk-row { transition: background-color .4s ease; border-radius: 6px; }
        .wk-row:hover { background: rgba(236,233,224,0.022); }
        .wk-row:hover .wk-num { color: ${accent}; }
        .wk-num { transition: color .4s ease; }
        .wk-bar { transition: width .5s cubic-bezier(0.16,1,0.3,1); }
        .wk-row:hover .wk-bar { width: 100%; }
      `}</style>
      <AboutSection accent={accent} />
      <Divider />
      <WorkSection accent={accent} />
      <Divider />
      <EducationSection accent={accent} />
      <Divider />
      <ExperienceSection accent={accent} />
      <Divider />
      <SkillsSection accent={accent} />
      <Divider />
      <ContactSection accent={accent} />
      <Footer accent={accent} name={tweaks.name} last={tweaks.last} />
    </div>
  );
}

Object.assign(window, { SiteContent });
