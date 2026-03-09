/* ===== ABOUT — DEEP SPACE / GALAXY THEME ===== */
function AboutSection() {
  const ref = React.useRef(null);
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof THREE === 'undefined') return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const starCount = 4000, starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i*3] = (Math.random()-0.5)*25;
      starPos[i*3+1] = (Math.random()-0.5)*25;
      starPos[i*3+2] = (Math.random()-0.5)*25;
    }
    const sGeo = new THREE.BufferGeometry();
    sGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const stars = new THREE.Points(sGeo, new THREE.PointsMaterial({ size: 0.012, color: 0xdddaff, transparent: true, opacity: 0.8, sizeAttenuation: true }));
    scene.add(stars);

    const spiralCount = 1200, spiralPos = new Float32Array(spiralCount * 3);
    for (let k = 0; k < spiralCount; k++) {
      const a = (k/spiralCount)*Math.PI*8;
      const rad = 0.2+(k/spiralCount)*3;
      const sp = (Math.random()-0.5)*0.3;
      spiralPos[k*3] = Math.cos(a)*rad+sp;
      spiralPos[k*3+1] = (Math.random()-0.5)*0.12;
      spiralPos[k*3+2] = Math.sin(a)*rad+sp;
    }
    const spGeo = new THREE.BufferGeometry();
    spGeo.setAttribute('position', new THREE.BufferAttribute(spiralPos, 3));
    const spiral = new THREE.Points(spGeo, new THREE.PointsMaterial({ size: 0.018, color: 0xaabbff, transparent: true, opacity: 0.45, sizeAttenuation: true }));
    spiral.rotation.x = Math.PI * 0.38;
    scene.add(spiral);

    const dustCount = 800, dustPos = new Float32Array(dustCount * 3);
    for (let j = 0; j < dustCount; j++) {
      const t = Math.random()*Math.PI*2, p = Math.acos(2*Math.random()-1), r = 1.5+Math.random()*4;
      dustPos[j*3] = r*Math.sin(p)*Math.cos(t);
      dustPos[j*3+1] = r*Math.sin(p)*Math.sin(t);
      dustPos[j*3+2] = r*Math.cos(p);
    }
    const dGeo = new THREE.BufferGeometry();
    dGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dust = new THREE.Points(dGeo, new THREE.PointsMaterial({ size: 0.05, color: 0x7755bb, transparent: true, opacity: 0.15, sizeAttenuation: true }));
    scene.add(dust);

    let gmx = 0, gmy = 0;
    const onMouse = (e) => { gmx = (e.clientX/window.innerWidth)*2-1; gmy = (e.clientY/window.innerHeight)*2-1; };
    document.addEventListener('mousemove', onMouse);

    let animId;
    function animate() {
      animId = requestAnimationFrame(animate);
      stars.rotation.y += 0.0002; stars.rotation.x += 0.0001;
      dust.rotation.y -= 0.0004;
      spiral.rotation.y += 0.0008;
      camera.position.x += (gmx*0.3-camera.position.x)*0.01;
      camera.position.y += (-gmy*0.2-camera.position.y)*0.01;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (w && h) { camera.aspect = w/h; camera.updateProjectionMatrix(); renderer.setSize(w,h); }
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); document.removeEventListener('mousemove', onMouse); window.removeEventListener('resize', onResize); renderer.dispose(); };
  }, []);

  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    el.querySelectorAll('[data-animation="char"]').forEach(row => {
      gsap.to(row.querySelectorAll('.char'), {
        y: 0, opacity: 1, rotation: 0, stagger: 0.02, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: row, start: 'top 82%' }
      });
    });
    gsap.fromTo(el.querySelector('.about-label'), { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: '.about-label', start: 'top 85%' } });
    gsap.fromTo(el.querySelector('.portrait-box'), { scale: 0.8, opacity: 0, rotateY: 15 }, { scale: 1, opacity: 1, rotateY: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.portrait-box', start: 'top 85%' } });
    gsap.fromTo(el.querySelector('.about-big'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, scrollTrigger: { trigger: '.about-big', start: 'top 85%' } });
    el.querySelectorAll('.about-detail .line-inner').forEach(li => {
      gsap.to(li, { y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: li.closest('.split-text'), start: 'top 88%' } });
    });
  }, []);

  return (
    <section className="full-section about-section galaxy-theme" id="about" data-speed="0.9" ref={ref}>
      <canvas id="galaxy-canvas" ref={canvasRef}></canvas>
      <div className="galaxy-nebula"></div>
      <div className="stars-layer" aria-hidden="true"></div>
      <div className="section-grain"></div>
      <div className="wrapper">
        <div className="about-top">
          <h2 className="mega-heading">
            <span className="mh-row" data-animation="char"><CharSplit text="WHO " /><span className="stroke-text-inline"><CharSplit text="AM I?" /></span></span>
          </h2>
          <div className="about-portrait">
            <div className="portrait-box cube-scene">
              <div className="cube-3d">
                <div className="cube-face cube-front"><span>&lt;/&gt;</span></div>
                <div className="cube-face cube-back"><span>AP</span></div>
                <div className="cube-face cube-right"><span>AI</span></div>
                <div className="cube-face cube-left"><span>ML</span></div>
                <div className="cube-face cube-top"><span>DEV</span></div>
                <div className="cube-face cube-bottom"><span>CS</span></div>
              </div>
              <div className="portrait-text">MY CODE MIGHT<br/>LOOK COMPLEX, BUT<br/>I'M FRIENDLY :)</div>
            </div>
          </div>
        </div>
        <div className="about-bottom">
          <div className="about-label"><span className="label-dot"></span> A BIT ABOUT ME?</div>
          <div className="about-split">
            <div className="about-big" data-animation="word">
              I am a proactive Computer Science student at <em>Galgotias University</em> specializing in the intersection of <em>Data Science, AI/ML, and Cloud Computing</em>.
            </div>
            <div className="about-detail">
              <p><LineReveal>Adept at building intelligent models and deploying them as scalable cloud-native applications. Complementing core analytical skills with a solid foundation in Full Stack Development, Networking, and Cybersecurity to build secure, data-driven systems.</LineReveal></p>
              <p><LineReveal>Currently pursuing B.Tech in Computer Science &amp; Engineering with a GPA of <strong>8.2</strong>. My passion lies in transforming complex problems into elegant, efficient solutions.</LineReveal></p>
              <a href="https://github.com/abhijaypandey14" target="_blank" rel="noopener noreferrer" className="link-arrow magnetic-wrap">
                <span className="magnetic-area" data-strength="10">MORE ABOUT ME <ArrowSVG /></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
