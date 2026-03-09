/* ===== HERO — CINEMATIC VOID THEME ===== */
function HeroSection({ loaded }) {
  const canvasRef = React.useRef(null);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof THREE === 'undefined') return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 4);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const count = 4000, positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.6 + (Math.random() - 0.5) * 0.2;
      positions[i*3] = r*Math.sin(phi)*Math.cos(theta);
      positions[i*3+1] = r*Math.sin(phi)*Math.sin(theta);
      positions[i*3+2] = r*Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const sphere = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.008, color: 0xece7e1, transparent: true, opacity: 0.6, sizeAttenuation: true }));
    scene.add(sphere);

    const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(1.4, 1), new THREE.MeshBasicMaterial({ color: 0xece7e1, wireframe: true, transparent: true, opacity: 0.04 }));
    scene.add(ico);

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.003, 16, 128), new THREE.MeshBasicMaterial({ color: 0xece7e1, transparent: true, opacity: 0.1 }));
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.002, 16, 128), new THREE.MeshBasicMaterial({ color: 0x8888ff, transparent: true, opacity: 0.06 }));
    ring2.rotation.x = Math.PI / 2.2;
    ring2.rotation.y = Math.PI / 6;
    scene.add(ring2);

    const dustCount = 500, dustPos = new Float32Array(dustCount * 3);
    for (let d = 0; d < dustCount; d++) {
      dustPos[d*3] = (Math.random()-0.5)*8;
      dustPos[d*3+1] = (Math.random()-0.5)*8;
      dustPos[d*3+2] = (Math.random()-0.5)*8;
    }
    const dGeo = new THREE.BufferGeometry();
    dGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dust = new THREE.Points(dGeo, new THREE.PointsMaterial({ size: 0.015, color: 0xaaaaff, transparent: true, opacity: 0.15, sizeAttenuation: true }));
    scene.add(dust);

    let mouseNX = 0, mouseNY = 0;
    const onMouse = (e) => { mouseNX = (e.clientX / window.innerWidth) * 2 - 1; mouseNY = (e.clientY / window.innerHeight) * 2 - 1; };
    document.addEventListener('mousemove', onMouse);

    let animId, time = 0;
    function animate() {
      animId = requestAnimationFrame(animate);
      time += 0.01;
      sphere.rotation.y += 0.0015; sphere.rotation.x += 0.0003;
      ico.rotation.y -= 0.0008; ico.rotation.x += 0.0005;
      ring1.rotation.z += 0.0008;
      ring2.rotation.z -= 0.0006;
      dust.rotation.y += 0.0002;
      const breath = 1 + Math.sin(time * 0.5) * 0.02;
      sphere.scale.setScalar(breath);
      ico.scale.setScalar(breath * 0.98);

      camera.position.x += (mouseNX * 0.4 - camera.position.x) * 0.015;
      camera.position.y += (-mouseNY * 0.3 - camera.position.y) * 0.015;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (w && h) { camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h); }
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); document.removeEventListener('mousemove', onMouse); window.removeEventListener('resize', onResize); renderer.dispose(); };
  }, []);

  React.useEffect(() => {
    if (!loaded) return;
    const el = sectionRef.current;
    if (!el) return;
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.to(el.querySelectorAll('.hero-title .char'), { opacity: 1, y: 0, rotation: 0, stagger: 0.025, duration: 0.8 }, 0.1)
      .from(el.querySelector('.hero-greeting'), { opacity: 0, x: -40, duration: 1 }, 0)
      .from(el.querySelector('.hero-sub'), { opacity: 0, y: 40, duration: 1 }, 0.5)
      .from(el.querySelector('.hero-btn'), { opacity: 0, y: 30, duration: 0.8 }, 0.7)
      .from(el.querySelector('.hero-scroll'), { opacity: 0, duration: 0.8 }, 1)
      .from(el.querySelector('.hero-meta'), { opacity: 0, y: 20, duration: 0.8 }, 1)
      .from(el.querySelector('.hero-bg-word'), { opacity: 0, scale: 0.95, duration: 1.5 }, 0);
  }, [loaded]);

  return (
    <section className="hero" id="hero" ref={sectionRef}>
      <canvas id="hero-canvas" ref={canvasRef}></canvas>
      <div className="hero-overlay"></div>
      <div className="hero-vignette"></div>
      <div className="hero-grain"></div>
      <div className="hero-bg-word" aria-hidden="true">AP</div>
      <div className="hero-content">
        <div className="hero-greeting">
          <span className="accent-line"></span>
          <span>Welcome to my universe</span>
        </div>
        <h1 className="hero-title">
          <span className="hero-line"><span className="hero-line-inner"><CharSplit text="ABHIJAY" /></span></span>
          <span className="hero-line"><span className="hero-line-inner stroke-text"><CharSplit text="PANDEY" /></span></span>
        </h1>
        <div className="hero-sub">
          <p>More than a portfolio — a cinematic journey through code, creativity, and the relentless pursuit of engineering excellence.</p>
        </div>
        <a href="#about" className="hero-btn magnetic-wrap btn-ripple">
          <span className="magnetic-area" data-strength="15">
            <span>START EXPLORING</span>
            <span className="arrow-circle"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg></span>
          </span>
        </a>
      </div>
      <div className="hero-scroll"><div className="scroll-bar"></div><span>SCROLL</span></div>
      <div className="hero-meta"><span>Developer &amp; Engineer</span><span>Galgotias University</span></div>
    </section>
  );
}
