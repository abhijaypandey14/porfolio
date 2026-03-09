/* ===== CERTIFICATIONS ===== */
function CertsSection() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    gsap.fromTo(el.querySelectorAll('.cert-card'),
      { y: 60, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, stagger: 0.15, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el.querySelector('.certs-grid'), start: 'top 85%' }
      });
    el.querySelectorAll('[data-animation="slide-up"] .line-inner').forEach(li => {
      gsap.to(li, { y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: li.closest('.split-text'), start: 'top 88%' } });
    });
  }, []);

  return (
    <section className="full-section certs-section" data-speed="0.95" ref={ref}>
      <div className="wrapper">
        <div className="certs-hero">
          <div className="certs-number">3+</div>
          <div className="certs-label">
            <h3>Certifications</h3>
            <p><LineReveal>Recognized by Amazon Web Services and IBM for expertise in Cloud, Data, and Generative AI.</LineReveal></p>
          </div>
        </div>
        <div className="certs-grid">
          {CERTS.map((c, i) => (
            <div key={i} className="cert-card" data-cursor="Explore">
              <div className="cert-badge"><img src={c.img} alt={c.alt} loading="lazy" /></div>
              <div className="cert-info">
                <span className="cert-name">{c.name}</span>
                <span className="cert-cat">{c.cat}</span>
                <span className="cert-from">{c.from}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
