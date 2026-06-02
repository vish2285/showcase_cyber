/* global React */
const { useState, useEffect, useRef } = React;

function hexA(hex, a) {
  const h = (hex || '#C2F24A').replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

function fmtTime() {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
}
function useTick(ms = 1000) {
  const [, setT] = useState(0);
  useEffect(() => { const id = setInterval(() => setT((x) => x + 1), ms); return () => clearInterval(id); }, [ms]);
}

// ---- Topographic contour field (the signature) ----
function ContourField({ accent, animate }) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    const resize = () => {
      w = wrap.clientWidth; h = wrap.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(wrap);

    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      mouse.current.x = (e.clientX - r.left) / r.width;
      mouse.current.y = (e.clientY - r.top) / r.height;
    };
    window.addEventListener('mousemove', onMove);

    // layered ridgeline terrain
    const ridge = (x, base, t, mx) => {
      const n =
        Math.sin(x * 0.012 + t * 0.6) * 26 +
        Math.sin(x * 0.026 - t * 0.9 + base) * 16 +
        Math.sin(x * 0.005 + t * 0.3) * 40 +
        Math.cos(x * 0.04 + t + base * 2) * 8;
      // gaussian-ish peak pulled toward mouse x
      const peak = Math.exp(-Math.pow((x / w - mx), 2) * 6) * 60;
      return n - peak;
    };

    let raf, t0 = performance.now(), frozenT = 0.4;
    const draw = () => {
      const t = animate ? (performance.now() - t0) / 1000 : frozenT;
      ctx.clearRect(0, 0, w, h);
      const lines = 46;
      const mx = 0.35 + mouse.current.x * 0.3;
      for (let i = 0; i < lines; i++) {
        const p = i / (lines - 1);
        const baseY = h * 0.12 + p * h * 0.82;
        const phase = i * 0.5;
        const fade = 0.10 + Math.pow(1 - Math.abs(p - 0.5) * 2, 2) * 0.5;
        ctx.beginPath();
        for (let x = -20; x <= w + 20; x += 6) {
          const y = baseY + ridge(x, phase, t, mx) * (0.5 + p * 0.9);
          if (x === -20) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = hexA(accent, fade * 0.55);
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      if (animate) raf = requestAnimationFrame(draw);
    };
    draw();
    if (animate) raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); window.removeEventListener('mousemove', onMove); };
  }, [accent, animate]);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

// ---- Command palette ----
const COMMANDS = [
  { id: 'work', label: 'Work', hint: 'Selected projects', action: () => document.getElementById('work-anchor')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'about', label: 'About', hint: 'Who I am', action: () => document.getElementById('about-anchor')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'experience', label: 'Experience', hint: 'Where I have worked', action: () => document.getElementById('experience-anchor')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'contact', label: 'Contact', hint: 'Get in touch', action: () => document.getElementById('contact-anchor')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'github', label: 'GitHub', hint: 'github.com/vish2285', action: () => window.open('https://github.com/vish2285', '_blank') },
  { id: 'linkedin', label: 'LinkedIn', hint: 'in/vishwas2285', action: () => window.open('https://linkedin.com/in/vishwas2285', '_blank') },
];

function CommandPalette({ open, setOpen, accent }) {
  const [q, setQ] = useState('');
  const [idx, setIdx] = useState(0);
  const inputRef = useRef(null);
  const filtered = COMMANDS.filter((c) => c.label.toLowerCase().includes(q.toLowerCase()) || c.id.includes(q.toLowerCase()));

  useEffect(() => { if (open) { setQ(''); setIdx(0); setTimeout(() => inputRef.current?.focus(), 40); } }, [open]);
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen((o) => !o); }
      else if (e.key === 'Escape' && open) setOpen(false);
      else if (open) {
        if (e.key === 'ArrowDown') { e.preventDefault(); setIdx((i) => Math.min(i + 1, filtered.length - 1)); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)); }
        else if (e.key === 'Enter') { e.preventDefault(); const c = filtered[idx]; if (c) { c.action(); setOpen(false); } }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, filtered, idx, setOpen]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[16vh] px-4" onClick={() => setOpen(false)}>
      <div className="absolute inset-0" style={{ background: 'rgba(4,4,6,0.8)', backdropFilter: 'blur(6px)' }} />
      <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-lg overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--line-strong)', borderRadius: 4 }}>
        <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: 'var(--line)' }}>
          <span className="mono text-xs" style={{ color: accent }}>/</span>
          <input ref={inputRef} value={q} onChange={(e) => { setQ(e.target.value); setIdx(0); }} placeholder="Jump to…" className="flex-1 bg-transparent outline-none text-base text-[var(--text)] placeholder:text-[var(--faint)] mono" />
          <kbd className="text-[10px] mono px-1.5 py-0.5 rounded border" style={{ borderColor: 'var(--line)', color: 'var(--faint)' }}>esc</kbd>
        </div>
        <ul className="max-h-[48vh] overflow-y-auto py-2">
          {filtered.map((c, i) => (
            <li key={c.id} onMouseEnter={() => setIdx(i)} onClick={() => { c.action(); setOpen(false); }} className="flex items-center gap-4 px-5 py-2.5 cursor-pointer" style={{ background: i === idx ? hexA(accent, 0.10) : 'transparent' }}>
              <span className="text-[var(--text)] text-[15px]">{c.label}</span>
              <span className="mono text-[11px] text-[var(--faint)]">{c.hint}</span>
              <span className="ml-auto mono text-xs text-[var(--faint)]">↵</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ---- Landing / cover ----
function Landing({ tweaks }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const accent = tweaks.accent;
  const animate = tweaks.motion !== false;
  useTick(1000);

  const first = (tweaks.name || 'Vishwas').toUpperCase();
  const last = (tweaks.last || 'Patel').toUpperCase();
  const role = tweaks.role || 'Security & ML Engineer';
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        @keyframes cover-rise { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
        @keyframes cover-wipe { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes blink { 50% { opacity: 0.25; } }
        @keyframes mq { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .cv { animation: cover-rise 1s cubic-bezier(0.16,1,0.3,1) forwards; }
        @media (prefers-reduced-motion: reduce) { .cv { animation: none; } }
        .outline-txt { color: transparent; -webkit-text-stroke: 1.4px var(--text); }
      `}</style>

      <section id="hero-anchor" className="relative overflow-hidden flex flex-col" style={{ background: 'var(--bg)', minHeight: 'max(740px, 100svh)' }}>
        {/* contour backdrop */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.9 }}>
          <ContourField accent={accent} animate={animate} />
        </div>
        {/* vignette so text reads */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(120% 90% at 20% 30%, rgba(8,8,10,0.94) 0%, rgba(8,8,10,0.6) 45%, rgba(8,8,10,0.2) 100%)' }} />
        {/* accent glow */}
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full pointer-events-none" style={{ background: hexA(accent, 0.10), filter: 'blur(120px)' }} />

        {/* top bar */}
        <header className="relative z-20 flex items-center justify-between px-8 md:px-14 pt-8 md:pt-11">
          <div className="flex items-center gap-3 mono text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">
            <span className="w-2 h-2 rounded-full" style={{ background: accent, animation: 'blink 1.6s infinite' }} />
            <span>Portfolio</span>
            <span className="text-[var(--faint)]">/ Vol.02 · {year}</span>
          </div>
          <button onClick={() => setPaletteOpen(true)} data-magnetic className="flex items-center gap-2 mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)] hover:text-[var(--text)] transition-colors px-3 py-1.5 border rounded" style={{ borderColor: 'var(--line)' }}>
            <span className="hidden sm:inline">Menu</span><kbd className="text-[10px]">⌘K</kbd>
          </button>
        </header>

        {/* center lockup */}
        <div className="relative z-10 flex-1 flex items-center px-8 md:px-14">
          <div className="w-full max-w-[1200px]">
            <div className="cv flex items-center gap-4 mb-7" style={{ animationDelay: '0.05s' }}>
              <span className="mono text-[11px] uppercase tracking-[0.35em]" style={{ color: accent }}>§ 00</span>
              <span className="h-px w-10" style={{ background: hexA(accent, 0.5) }} />
              <span className="mono text-[11px] uppercase tracking-[0.3em] text-[var(--faint)]">AI · Security · Systems</span>
            </div>

            <h1 className="font-display font-bold leading-[0.84] tracking-[-0.03em]">
              <span className="cv block text-[var(--text)]" style={{ fontSize: 'clamp(64px, 13vw, 220px)', animationDelay: '0.12s' }}>{first}</span>
              <span className="cv block outline-txt" style={{ fontSize: 'clamp(64px, 13vw, 220px)', animationDelay: '0.22s' }}>{last}</span>
            </h1>

            <p className="cv serif-i text-[var(--muted)] mt-7 max-w-xl" style={{ fontSize: 'clamp(22px, 2.6vw, 34px)', lineHeight: 1.25, animationDelay: '0.34s' }}>
              I build things, then break them on purpose. Currently obsessed with the seam where <span style={{ color: accent }}>machine learning</span> meets <span style={{ color: accent }}>security</span>.
            </p>

            <div className="cv flex flex-wrap items-center gap-x-8 gap-y-3 mt-9" style={{ animationDelay: '0.46s' }}>
              <button onClick={() => document.getElementById('work-anchor')?.scrollIntoView({ behavior: 'smooth' })} data-magnetic className="group flex items-center gap-3">
                <span className="w-12 h-12 rounded-full grid place-items-center transition-transform group-hover:translate-y-1" style={{ background: accent }}>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 3v14M4 12l6 6 6-6" stroke="#08080A" strokeWidth="2" strokeLinecap="square" /></svg>
                </span>
                <span className="mono text-[11px] uppercase tracking-[0.25em] text-[var(--muted)] group-hover:text-[var(--text)] transition-colors">View work</span>
              </button>
              <span className="hidden sm:block w-px h-8" style={{ background: 'var(--line-strong)' }} />
              <div className="mono text-[11px] uppercase tracking-[0.2em] text-[var(--faint)]">
                <span className="text-[var(--text)]">{role}</span> · Davis, CA
              </div>
            </div>
          </div>
        </div>

        {/* bottom marquee strip */}
        <div className="relative z-20 border-t mx-8 md:mx-14 mb-8 md:mb-11 overflow-hidden" style={{ borderColor: 'var(--line)' }}>
          <div className="flex items-center">
            <span className="mono text-[10px] uppercase tracking-[0.35em] py-3 pr-6 shrink-0" style={{ color: accent }}>Now →</span>
            <div className="flex-1 overflow-hidden">
              <div className="flex whitespace-nowrap mono text-[11px] uppercase tracking-[0.28em] text-[var(--faint)]" style={{ animation: 'mq 48s linear infinite' }}>
                {Array(2).fill(0).map((_, k) => (
                  <span key={k} className="flex items-center">
                    {['Training anomaly detection on 14M auth events', 'Reading applied cryptography', 'UC Davis Computer Science', 'Open to summer internships', 'Tutoring at the CS club'].map((s, i) => (
                      <span key={i} className="flex items-center">
                        <span className="mx-6 py-3">{s}</span>
                        <span className="w-1 h-1 rounded-full" style={{ background: accent }} />
                      </span>
                    ))}
                  </span>
                ))}
              </div>
            </div>
            <span className="mono text-[10px] tracking-[0.2em] py-3 pl-6 shrink-0 text-[var(--faint)] hidden md:block">{fmtTime()} PT</span>
          </div>
        </div>
      </section>

      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} accent={accent} />
    </>
  );
}

Object.assign(window, { Landing, hexA });
