/* ===== EXPERTISE — CYBER / NEON THEME ===== */
function ExpertiseSection() {
  const [activeTab, setActiveTab] = React.useState('dev');
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
  }, []);

  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const panel = el.querySelector('.skill-panel.active');
    if (!panel) return;
    panel.querySelectorAll('.skill-bar-fill').forEach(fill => {
      fill.style.width = '0%';
      fill.classList.remove('animated');
      const w = fill.getAttribute('data-width');
      gsap.to(fill, { width: w + '%', duration: 1.2, ease: 'power3.out', delay: 0.15, onComplete: () => fill.classList.add('animated') });
    });
  }, [activeTab]);

  const tabs = [['dev','DEVELOPMENT'],['ai','AI / ML'],['tech','TECHNOLOGIES']];

  return (
    <section className="full-section expertise-section cyber-theme" id="skills" data-speed="0.95" ref={ref}>
      <div className="cyber-grid-bg" aria-hidden="true"></div>
      <div className="cyber-scanline" aria-hidden="true"></div>
      <div className="section-grain"></div>
      <div className="wrapper">
        <h2 className="mega-heading">
          <span className="mh-row" data-animation="char"><CharSplit text="EXPERTISE " /><span className="stroke-text-inline"><CharSplit text="& SKILLS" /></span></span>
        </h2>
        <div className="exp-desc">
          <p><LineReveal>My work spans building intelligent AI/ML models to deploying scalable cloud-native applications. Modern web technologies and security best practices — creating robust, data-driven systems across the full stack.</LineReveal></p>
          <a href="https://github.com/abhijaypandey14" target="_blank" rel="noopener noreferrer" className="link-arrow magnetic-wrap">
            <span className="magnetic-area" data-strength="10">SEE ALL EXPERTISE <ArrowSVG /></span>
          </a>
        </div>
        <div className="skill-tabs">
          {tabs.map(([key, label]) => (
            <button key={key} className={`skill-tab btn-ripple ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>{label}</button>
          ))}
        </div>
        <div className="skill-panels">
          {Object.entries(SKILLS).map(([key, items]) => (
            <div key={key} className={`skill-panel ${activeTab === key ? 'active' : ''}`}>
              <div className="sp-grid">
                {items.map((s, i) => (
                  <div key={i} className="sp-item">
                    <div className="sp-top"><span className="sp-name">{s.name}</span><span className="sp-pct">{s.pct}%</span></div>
                    <div className="skill-bar"><div className="skill-bar-fill" data-width={s.pct}></div></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
