/* ===== ENTHUSIAST ===== */
function EnthusiastSection() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    gsap.to(el.querySelectorAll('[data-animation="char"] .char'), {
      y: 0, opacity: 1, rotation: 0, stagger: 0.02, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 80%' }
    });
    gsap.fromTo(el.querySelectorAll('.enth-card'),
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el.querySelector('.enth-grid'), start: 'top 85%' }
      });
  }, []);

  const items = [
    { t: 'Technology', l: ['AI & ML','Cloud Computing','Full Stack Dev'], icon: '{ }' },
    { t: 'Security', l: ['Cybersecurity','Cloud Security','Encryption'], icon: '🛡' },
    { t: 'Data', l: ['Data Science','Neural Networks','NLP'], icon: '◈' },
    { t: 'DevOps', l: ['Docker','AWS','MLOps'], icon: '⚙' }
  ];

  return (
    <section className="full-section enth-section" data-speed="0.95" ref={ref}>
      <div className="wrapper">
        <h2 className="mega-heading">
          <span className="mh-row" data-animation="char"><CharSplit text="The " /><span className="mh-italic-inline"><CharSplit text="Enthusiast" /></span><CharSplit text=" For" /></span>
        </h2>
        <div className="enth-grid">
          {items.map((it, i) => (
            <div key={i} className="enth-card" data-cursor="Explore">
              <span className="enth-icon">{it.icon}</span>
              <h4>{it.t}</h4>
              <ul>{it.l.map((s, j) => <li key={j}><span className="enth-bullet"></span>{s}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
