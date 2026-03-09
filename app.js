/* ===== MAIN APP ===== */
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loaded, setLoaded] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const lenisRef = React.useRef(null);

  React.useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 1.5,
      wheelMultiplier: 1,
    });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    let lastY = 0;
    lenis.on('scroll', (e) => {
      const y = e.animatedScroll || 0;
      const nav = document.getElementById('nav');
      if (nav) {
        nav.classList.toggle('hide', y > lastY && y > 120);
        nav.classList.toggle('scrolled', y > 50);
      }
      lastY = y;
    });

    return () => lenis.destroy();
  }, []);

  React.useEffect(() => {
    if (lenisRef.current) {
      if (menuOpen) lenisRef.current.stop();
      else lenisRef.current.start();
    }
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  React.useEffect(() => {
    if (!loaded) return;

    // Magnetic
    document.querySelectorAll('.magnetic-wrap').forEach(wrap => {
      const area = wrap.querySelector('.magnetic-area');
      if (!area) return;
      const strength = parseFloat(area.dataset.strength || 20);
      wrap.addEventListener('mousemove', (e) => {
        const rect = wrap.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width/2;
        const y = e.clientY - rect.top - rect.height/2;
        gsap.to(area, { x: x/rect.width*strength, y: y/rect.height*strength, duration: 0.3, ease: 'power2.out' });
      });
      wrap.addEventListener('mouseleave', () => gsap.to(area, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.3)' }));
    });

    // Ripples
    document.querySelectorAll('.btn-ripple').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Anchor smooth
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const target = a.getAttribute('href');
        if (target && lenisRef.current) lenisRef.current.scrollTo(target, { offset: 0, duration: 1.5 });
      });
    });

    // Cinematic section reveals
    document.querySelectorAll('.full-section').forEach(section => {
      gsap.fromTo(section,
        { opacity: 0.3 },
        { opacity: 1, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 92%', end: 'top 50%', scrub: 0.6 }
        });
    });

    // Parallax
    document.querySelectorAll('[data-speed]').forEach(el => {
      const speed = parseFloat(el.dataset.speed || 1);
      gsap.to(el, { yPercent: () => (1-speed)*50, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 } });
    });

    gsap.to('.hero-bg-word', { yPercent: 30, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.5 } });

    const mc = document.querySelector('.marquee-content');
    if (mc) gsap.to(mc, { x: '-=300', ease: 'none', scrollTrigger: { trigger: '.marquee-section', start: 'top bottom', end: 'bottom top', scrub: 1 } });

    document.querySelectorAll('.shape').forEach((shape, i) => {
      gsap.to(shape, { y: i%2===0 ? -100 : 100, rotation: i%2===0 ? 25 : -25, ease: 'none', scrollTrigger: { trigger: '.trans-section', start: 'top bottom', end: 'bottom top', scrub: 1 } });
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('mouseenter', () => gsap.to(link, { y: -2, duration: 0.2 }));
      link.addEventListener('mouseleave', () => gsap.to(link, { y: 0, duration: 0.2 }));
    });

    document.querySelectorAll('.icon-bounce').forEach(el => {
      el.addEventListener('mouseenter', () => { el.style.animationPlayState='paused'; gsap.to(el,{scale:1.15,duration:0.3,ease:'back.out(2)'}); });
      el.addEventListener('mouseleave', () => { el.style.animationPlayState='running'; gsap.to(el,{scale:1,duration:0.3}); });
    });

    setTimeout(() => ScrollTrigger.refresh(), 500);

  }, [loaded]);

  return (
    <>
      <Preloader onComplete={() => setLoaded(true)} />
      <CustomCursor />
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <ProgressBar />
      <AudioPlayer />
      <HeroSection loaded={loaded} />
      <SectionDivider type="glow" />
      <EnthusiastSection />
      <SectionDivider type="cosmic" />
      <AboutSection />
      <ThemeShiftSection />
      <PortfolioSection />
      <SectionDivider type="ember" />
      <ExpertiseSection />
      <SectionDivider type="neon" />
      <MarqueeSection />
      <SectionDivider type="gradient" />
      <CertsSection />
      <SectionDivider type="gradient" />
      <ExperienceSection />
      <SectionDivider type="glow" />
      <ContactSection />
      <SiteFooter />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
