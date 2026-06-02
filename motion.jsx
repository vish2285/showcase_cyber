/* global React */
// Premium motion layer: custom cursor, magnetic targets, scroll parallax,
// scroll-progress bar. Mounted once. No external libraries.

function MotionLayer() {
  React.useEffect(() => {
    const fine = window.matchMedia('(pointer:fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups = [];

    // ---------- scroll progress ----------
    // A framed "window" around the viewport with a dot that rides the
    // perimeter as you scroll: starts bottom-left, travels up → right → down → left.
    const frame = document.createElement('div');
    frame.className = 'vp-frame';
    frame.innerHTML = '<span class="vp-corner tl"></span><span class="vp-corner tr"></span><span class="vp-corner bl"></span><span class="vp-corner br"></span>';
    const pdot = document.createElement('div');
    pdot.className = 'vp-dot';
    const phint = document.createElement('div');
    phint.className = 'vp-hint';
    phint.textContent = '[ scroll ]';
    document.body.append(frame, pdot, phint);
    cleanups.push(() => { frame.remove(); pdot.remove(); phint.remove(); });

    // ---------- custom cursor ----------
    let dot, ring, rafCur;
    if (fine) {
      document.body.classList.add('has-cursor');
      dot = document.createElement('div'); dot.className = 'cur-dot';
      ring = document.createElement('div'); ring.className = 'cur-ring';
      document.body.append(dot, ring);
      let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
      const onMove = (e) => {
        mx = e.clientX; my = e.clientY;
        dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      };
      window.addEventListener('mousemove', onMove);
      const loop = () => {
        rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
        ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
        rafCur = requestAnimationFrame(loop);
      };
      loop();
      const HOT = 'a,button,input,textarea,[data-magnetic],.wk-row';
      const onOver = (e) => { if (e.target.closest && e.target.closest(HOT)) document.body.classList.add('cur-hot'); };
      const onOut = (e) => { if (e.target.closest && e.target.closest(HOT)) document.body.classList.remove('cur-hot'); };
      document.addEventListener('mouseover', onOver);
      document.addEventListener('mouseout', onOut);
      const onLeave = () => { dot.style.opacity = 0; ring.style.opacity = 0; };
      const onEnter = () => { dot.style.opacity = ''; ring.style.opacity = ''; };
      document.addEventListener('mouseleave', onLeave);
      document.addEventListener('mouseenter', onEnter);
      cleanups.push(() => {
        cancelAnimationFrame(rafCur);
        window.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseover', onOver);
        document.removeEventListener('mouseout', onOut);
        document.removeEventListener('mouseleave', onLeave);
        document.removeEventListener('mouseenter', onEnter);
        dot.remove(); ring.remove();
        document.body.classList.remove('has-cursor', 'cur-hot');
      });
    }

    // ---------- magnetic targets ----------
    if (fine && !reduce) {
      const mags = [];
      const onMagMove = (e) => {
        document.querySelectorAll('[data-magnetic]').forEach((el) => {
          const r = el.getBoundingClientRect();
          const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
          const dx = e.clientX - cx, dy = e.clientY - cy;
          const dist = Math.hypot(dx, dy);
          const radius = Math.max(r.width, r.height) * 1.6;
          if (dist < radius) {
            const pull = (1 - dist / radius) * 0.4;
            el.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;
          } else if (el.style.transform) {
            el.style.transform = '';
          }
        });
      };
      window.addEventListener('mousemove', onMagMove);
      cleanups.push(() => { window.removeEventListener('mousemove', onMagMove); document.querySelectorAll('[data-magnetic]').forEach((el) => el.style.transform = ''); });
    }

    // ---------- scroll parallax + progress ----------
    // ---------- continuous loop: progress + reveals + parallax ----------
    // Driven by rAF (not scroll events) so it never gets stuck if the host
    // dispatches scrolling in a way that doesn't emit window 'scroll' events.
    let rafLoop = null;
    const update = () => {
      const st = -(document.body.getBoundingClientRect().top) || 0;
      const max = (document.body.scrollHeight || 0) - innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, st / max)) : 0;

      // perimeter dot on the window frame
      const M = innerWidth < 640 ? 13 : 18;
      const left = M, right = innerWidth - M, top = M, bottom = innerHeight - M;
      const W = right - left, H = bottom - top, P = 2 * (W + H);
      let d = p * P, x, y;
      if (d < H) { x = left; y = bottom - d; }
      else if (d < H + W) { x = left + (d - H); y = top; }
      else if (d < 2 * H + W) { x = right; y = top + (d - (H + W)); }
      else { x = right - (d - (2 * H + W)); y = bottom; }
      pdot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      phint.style.opacity = p > 0.015 ? 0 : 0.5;

      // reveal anything in view
      document.querySelectorAll('.reveal:not(.in), .r-mask:not(.in)').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < innerHeight * 0.9 && r.bottom > 0) el.classList.add('in');
      });
      if (!reduce) {
        const vc = innerHeight / 2;
        document.querySelectorAll('[data-parallax]').forEach((el) => {
          const sp = parseFloat(el.getAttribute('data-parallax')) || 0;
          const r = el.getBoundingClientRect();
          const off = (r.top + r.height / 2) - vc;
          el.style.transform = `translate3d(0, ${(-off * sp).toFixed(1)}px, 0)`;
        });
      }
    };
    // Driven by BOTH rAF (smooth) and scroll/resize events (so the dot never
    // freezes if rAF gets throttled while the document isn't focused).
    const loop = () => { update(); rafLoop = requestAnimationFrame(loop); };
    loop();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    cleanups.push(() => {
      if (rafLoop) cancelAnimationFrame(rafLoop);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}

Object.assign(window, { MotionLayer });
