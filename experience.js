/* ===== EXPERIENCE — NOIR THEME ===== */
function ExperienceSection() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    el.querySelectorAll('[data-animation="char"]').forEach(row => {
      gsap.to(row.querySelectorAll('.char'), {
        y: 0, opacity: 1, rotation: 0, stagger: 0.02, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: row, start: 'top 85%' }
      });
    });
    gsap.fromTo(el.querySelectorAll('.xp-card'),
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el.querySelector('.xp-list'), start: 'top 85%' }
      });
    el.querySelectorAll('[data-animation="slide-up"] .line-inner').forEach(li => {
      gsap.to(li, { y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: li.closest('.split-text'), start: 'top 88%' } });
    });
  }, []);

  return (
    <section className="full-section xp-section noir-theme" id="experience" data-speed="0.9" ref={ref}>
      <div className="noir-overlay" aria-hidden="true"></div>
      <div className="section-grain"></div>
      <div className="wrapper">
        <h2 className="mega-heading">
          <span className="mh-row" data-animation="char"><CharSplit text="EXPERI" /><span className="stroke-text-inline"><CharSplit text="ENCE" /></span></span>
        </h2>
        <div className="xp-list">
          <div className="xp-card">
            <div className="xp-left"><span className="xp-date">12/2025 — 01/2026</span><div className="xp-timeline"><div className="xp-dot"></div><div className="xp-line-v"></div></div></div>
            <div className="xp-right">
              <h3>Campus Ambassador &amp; Leadership</h3>
              <span className="xp-company">IIT Delhi (eDC) | IIT Kanpur (E-Cell) | IIT BHU</span>
              <p><LineReveal>Spearheaded outreach for three premier IIT summits, engaging a 10,000+ student audience and driving record participation in national-level entrepreneurship and technical events.</LineReveal></p>
            </div>
          </div>
          <div className="xp-card">
            <div className="xp-left"><span className="xp-date">2023 — Present</span><div className="xp-timeline"><div className="xp-dot"></div><div className="xp-line-v"></div></div></div>
            <div className="xp-right">
              <h3>B.Tech Computer Science &amp; Engineering</h3>
              <span className="xp-company">Galgotias University — GPA 8.2</span>
              <p><LineReveal>Pursuing Bachelor of Technology with focus on Data Science, AI/ML, and Cloud Computing. Actively contributing to open-source projects and building scalable applications.</LineReveal></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
