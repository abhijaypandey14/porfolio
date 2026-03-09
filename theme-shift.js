/* ===== THEME SHIFT — SPACE→MEDIEVAL ===== */
function ThemeShiftSection() {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const emberC = el.querySelector('.ember-particles');
    if (emberC) {
      for (let i = 0; i < 35; i++) {
        const e = document.createElement('div');
        e.classList.add('ember');
        e.style.left = Math.random()*100+'%';
        e.style.bottom = '-10px';
        e.style.animationDuration = (3+Math.random()*5)+'s';
        e.style.animationDelay = (Math.random()*4)+'s';
        const sz = (2+Math.random()*4)+'px';
        e.style.width = sz; e.style.height = sz;
        emberC.appendChild(e);
      }
    }

    ScrollTrigger.create({
      trigger: el, start: 'top 60%', end: 'bottom 40%',
      onEnter: () => el.classList.add('shifted'),
      onLeaveBack: () => el.classList.remove('shifted')
    });

    el.querySelectorAll('[data-animation="char"]').forEach(row => {
      gsap.to(row.querySelectorAll('.char'), {
        y: 0, opacity: 1, rotation: 0, stagger: 0.02, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: row, start: 'top 85%' }
      });
    });
    el.querySelectorAll('[data-animation="slide-up"] .line-inner').forEach(li => {
      gsap.to(li, { y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: li.closest('.split-text'), start: 'top 88%' } });
    });
  }, []);

  return (
    <section className="full-section trans-section theme-shift-section" ref={ref}>
      <div className="animated-gradient-bg"></div>
      <div className="floating-shapes" aria-hidden="true">
        <div className="shape shape-1"></div><div className="shape shape-2"></div>
        <div className="shape shape-3"></div><div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
      </div>
      <div className="theme-shift-overlay"></div>
      <div className="ember-particles" aria-hidden="true"></div>
      <div className="section-grain"></div>
      <div className="wrapper">
        <h2 className="mega-heading center">
          <span className="mh-row mh-small"><LineReveal>THE STARS FADE... THE FORGE IGNITES</LineReveal></span>
          <span className="mh-row" data-animation="char"><CharSplit text="LET'S TALK " /><span className="stroke-text-inline"><CharSplit text="ABOUT WORK:" /></span></span>
        </h2>
      </div>
    </section>
  );
}
