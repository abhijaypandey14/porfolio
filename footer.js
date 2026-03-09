/* ===== FOOTER ===== */
function SiteFooter() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    gsap.fromTo(el.querySelectorAll('.footer-grid > div'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 92%' }
      });
  }, []);
  return (
    <footer className="site-footer" ref={ref}>
      <div className="wrapper footer-grid">
        <div className="f-left">
          <span className="f-name">Abhijay Pandey</span>
          <span className="f-copy">&copy; 2026. All rights reserved.</span>
        </div>
        <div className="f-center">
          <span>QUICK LINKS</span>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="f-right">
          <span>abhijaypandeygu@gmail.com</span>
          <span>+91 8285980400</span>
        </div>
      </div>
    </footer>
  );
}
