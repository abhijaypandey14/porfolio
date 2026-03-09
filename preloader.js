/* ===== CINEMATIC PRELOADER ===== */
function Preloader({ onComplete }) {
  const ref = React.useRef(null);
  const [progress, setProgress] = React.useState(0);
  const [wordIdx, setWordIdx] = React.useState(0);
  const finishedRef = React.useRef(false);
  const words = ['Developer', 'Engineer', 'Creator', 'Visionary'];

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timer = setInterval(() => {
      setProgress(p => {
        const next = p + Math.random() * 6 + 1.5;
        return next >= 100 ? 100 : next;
      });
    }, 60);
    const wordTimer = setInterval(() => setWordIdx(i => (i + 1) % words.length), 700);
    return () => { clearInterval(timer); clearInterval(wordTimer); };
  }, []);

  React.useEffect(() => {
    if (progress >= 100 && !finishedRef.current) {
      finishedRef.current = true;
      setTimeout(() => {
        const el = ref.current;
        if (!el) return;
        gsap.to(el.querySelector('.preloader-inner'), {
          scale: 0.9, opacity: 0, duration: 0.5, ease: 'power3.in'
        });
        gsap.to(el, {
          clipPath: 'inset(0 0 100% 0)', duration: 1.4,
          ease: 'power4.inOut', delay: 0.4,
          onComplete: () => {
            if (el) el.style.display = 'none';
            document.body.style.overflow = '';
            onComplete();
          }
        });
      }, 500);
    }
  }, [progress]);

  return (
    <div className="preloader" ref={ref}>
      <div className="preloader-grain"></div>
      <div className="preloader-inner">
        <div className="preloader-logo">
          <span className="pl-letter">A</span><span className="pl-letter">B</span>
          <span className="pl-letter">H</span><span className="pl-letter">I</span>
          <span className="pl-letter">J</span><span className="pl-letter">A</span>
          <span className="pl-letter">Y</span>
        </div>
        <div className="preloader-counter">
          <span className="counter-num">{String(Math.round(progress)).padStart(3, '0')}</span>
        </div>
        <div className="preloader-bar">
          <div className="preloader-fill" style={{ width: progress + '%' }}></div>
        </div>
        <div className="preloader-words">
          {words.map((w, i) => (
            <div key={i} className={`pw-line ${i === wordIdx ? 'active' : ''} ${i === (wordIdx === 0 ? words.length - 1 : wordIdx - 1) ? 'exit' : ''}`}>
              <span>{w}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
