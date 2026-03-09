/* ===== PORTFOLIO — MEDIEVAL / FIRE THEME ===== */
function PortfolioSection() {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    el.querySelectorAll('[data-animation="char"]').forEach(row => {
      gsap.to(row.querySelectorAll('.char'), {
        y: 0, opacity: 1, rotation: 0, stagger: 0.02, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: row, start: 'top 85%' }
      });
    });
    el.querySelectorAll('[data-animation="slide-up"] .line-inner').forEach(li => {
      gsap.to(li, { y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: li.closest('.split-text'), start: 'top 88%' } });
    });

    const track = el.querySelector('.horizontal-track');
    if (track) {
      const cards = track.querySelectorAll('.folio-card');
      let totalW = 0;
      cards.forEach(c => totalW += c.offsetWidth);
      totalW += (cards.length - 1) * 32;
      const moveX = Math.max(0, totalW - window.innerWidth + 80);
      gsap.to(track, {
        x: () => -moveX, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: () => '+=' + moveX, scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true }
      });
    }

    el.querySelectorAll('.folio-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left, y = e.clientY - rect.top;
        const midX = rect.width/2, midY = rect.height/2;
        gsap.to(card, { rotateX: ((y-midY)/midY)*-12, rotateY: ((x-midX)/midX)*12, y: -10, duration: 0.3, ease: 'power2.out', transformPerspective: 800 });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.4)' });
      });
    });
  }, []);

  return (
    <section className="full-section folio-section medieval-theme" id="projects" ref={ref}>
      <div className="medieval-overlay" aria-hidden="true"></div>
      <div className="torch-glow torch-left" aria-hidden="true"></div>
      <div className="torch-glow torch-right" aria-hidden="true"></div>
      <div className="section-grain"></div>
      <div className="wrapper">
        <div className="folio-header">
          <h2 className="mega-heading">
            <span className="mh-row" data-animation="char"><CharSplit text="PORT" /><span className="stroke-text-inline"><CharSplit text="FOLIO" /></span></span>
          </h2>
          <div className="folio-icon icon-bounce"><span>&lt;/&gt;</span></div>
        </div>
        <div className="folio-intro">
          <div className="folio-words">
            <span><LineReveal>PROJECTS THAT YOU</LineReveal></span>
            <span><LineReveal>MIGHT WANT TO SEE</LineReveal></span>
          </div>
          <div className="folio-label"><span className="label-dot"></span> WHAT HAVE I DONE?</div>
        </div>
        <div className="folio-desc">
          <p><LineReveal>Building scalable applications covering diverse domains — from system-level programming in C to interactive web applications and cloud-native deployments.</LineReveal></p>
          <a href="https://github.com/abhijaypandey14?tab=repositories" target="_blank" rel="noopener noreferrer" className="link-arrow magnetic-wrap">
            <span className="magnetic-area" data-strength="10">SEE ALL PROJECTS <ArrowSVG /></span>
          </a>
        </div>
      </div>
      <div className="horizontal-wrap">
        <div className="horizontal-track">
          {PROJECTS.map((p, i) => (
            <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" className="folio-card" data-cursor="View">
              <div className="fc-preview"><div className="fc-distort" data-text={p.code}></div><span>{p.code}</span></div>
              <div className="fc-info">
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <span className="fc-tags">{p.tags}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
