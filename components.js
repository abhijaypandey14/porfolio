/* ===== SHARED COMPONENTS ===== */
const ArrowSVG = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
);

function CharSplit({ text }) {
  return text.split('').map((c, i) => (
    <span key={i} className="char" style={{ display: 'inline-block', opacity: 0, transform: 'translateY(50px) rotate(8deg)' }}>
      {c === ' ' ? '\u00A0' : c}
    </span>
  ));
}

function LineReveal({ children }) {
  return (
    <span className="split-text" data-animation="slide-up">
      <span className="line"><span className="line-inner">{children}</span></span>
    </span>
  );
}

function SectionDivider({ type = 'glow' }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current, {
      opacity: 0, scaleX: 0.3, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 92%' }
    });
  }, []);

  if (type === 'glow') {
    return (
      <div ref={ref} className="section-divider divider-glow">
        <div className="divider-line"><div className="divider-dot"></div></div>
      </div>
    );
  }
  if (type === 'cosmic') {
    const stars = Array.from({ length: 20 }, (_, i) => (
      <div key={i} className="star-particle" style={{
        left: (Math.random() * 100) + '%', top: (Math.random() * 100) + '%',
        '--dur': (2 + Math.random() * 3) + 's', animationDelay: (Math.random() * 2) + 's'
      }}/>
    ));
    return (
      <div ref={ref} className="section-divider divider-cosmic">
        <div className="divider-line"></div>
        {stars}
      </div>
    );
  }
  if (type === 'ember') {
    const embers = Array.from({ length: 15 }, (_, i) => (
      <div key={i} className="ember-dot" style={{
        left: (Math.random() * 100) + '%', bottom: '0',
        '--dur': (2 + Math.random() * 4) + 's', animationDelay: (Math.random() * 3) + 's'
      }}/>
    ));
    return (
      <div ref={ref} className="section-divider divider-ember">
        <div className="divider-line ember-line"></div>
        {embers}
      </div>
    );
  }
  if (type === 'neon') {
    return (
      <div ref={ref} className="section-divider divider-neon">
        <div className="divider-line"></div>
      </div>
    );
  }
  return <div ref={ref} className="section-divider divider-gradient" />;
}
