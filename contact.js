/* ===== CONTACT — ETHEREAL / AURORA THEME ===== */
function ContactSection() {
  const ref = React.useRef(null);
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof THREE === 'undefined') return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth/canvas.clientHeight, 0.1, 100);
    camera.position.z = 6;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(2, 0.5, 200, 20, 2, 3),
      new THREE.MeshBasicMaterial({ color: 0xece7e1, wireframe: true, transparent: true, opacity: 0.04 })
    );
    scene.add(knot);

    const aCount = 600, aPos = new Float32Array(aCount * 3);
    for (let i = 0; i < aCount; i++) {
      aPos[i*3] = (Math.random()-0.5)*12;
      aPos[i*3+1] = (Math.random()-0.5)*8;
      aPos[i*3+2] = (Math.random()-0.5)*6;
    }
    const aGeo = new THREE.BufferGeometry();
    aGeo.setAttribute('position', new THREE.BufferAttribute(aPos, 3));
    const aurora = new THREE.Points(aGeo, new THREE.PointsMaterial({ size: 0.025, color: 0x66ffcc, transparent: true, opacity: 0.12, sizeAttenuation: true }));
    scene.add(aurora);

    let animId;
    function animate() {
      animId = requestAnimationFrame(animate);
      knot.rotation.x += 0.0015; knot.rotation.y += 0.002;
      aurora.rotation.y += 0.0003;
      renderer.render(scene, camera);
    }
    animate();
    const onResize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (w && h) { camera.aspect = w/h; camera.updateProjectionMatrix(); renderer.setSize(w,h); }
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); renderer.dispose(); };
  }, []);

  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    el.querySelectorAll('[data-animation="char"]').forEach(row => {
      gsap.to(row.querySelectorAll('.char'), {
        y: 0, opacity: 1, rotation: 0, stagger: 0.02, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: row, start: 'top 85%' }
      });
    });
    gsap.fromTo(el.querySelector('.contact-body'), { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.contact-body', start: 'top 85%' } });
    gsap.fromTo(el.querySelector('.contact-action'), { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.7)', scrollTrigger: { trigger: '.contact-action', start: 'top 85%' } });
    gsap.fromTo(el.querySelectorAll('.contact-links a'), { y: 25, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: '.contact-links', start: 'top 90%' } });
  }, []);

  return (
    <section className="full-section contact-section aurora-theme" id="contact" ref={ref}>
      <canvas id="contact-canvas" ref={canvasRef}></canvas>
      <div className="aurora-bg" aria-hidden="true"></div>
      <div className="section-grain"></div>
      <div className="wrapper">
        <h2 className="mega-heading">
          <span className="mh-row" data-animation="char"><CharSplit text="WORK " /><span className="stroke-text-inline"><CharSplit text="TOGETHER" /></span></span>
        </h2>
        <div className="contact-body">
          <p>How about starting to build something incredible together? If this sounds good to you, feel free to hit the button and let me know what you have in mind.</p>
        </div>
        <div className="contact-action">
          <a href="mailto:abhijaypandeygu@gmail.com" className="btn-big magnetic-wrap btn-ripple">
            <span className="magnetic-area" data-strength="20">
              <span>START A PROJECT</span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
            </span>
          </a>
        </div>
        <div className="contact-links">
          <a href="mailto:abhijaypandeygu@gmail.com" className="magnetic-wrap btn-ripple"><span className="magnetic-area" data-strength="15">E-MAIL <ArrowSVG /></span></a>
          <a href="https://github.com/abhijaypandey14" target="_blank" rel="noopener noreferrer" className="magnetic-wrap btn-ripple"><span className="magnetic-area" data-strength="15">GITHUB <ArrowSVG /></span></a>
          <a href="https://www.linkedin.com/in/abhijay-pandey-387211293" target="_blank" rel="noopener noreferrer" className="magnetic-wrap btn-ripple"><span className="magnetic-area" data-strength="15">LINKEDIN <ArrowSVG /></span></a>
        </div>
      </div>
    </section>
  );
}
