/* ===== NAVIGATION ===== */
function Navigation({ menuOpen, setMenuOpen }) {
  return (
    <>
      <nav className="nav" id="nav">
        <a href="#hero" className="nav-logo magnetic-wrap">
          <span className="magnetic-area" data-strength="25">ABHIJAY<span className="nav-logo-light">PANDEY</span></span>
        </a>
        <div className="nav-center">
          {['about','skills','projects','experience','contact'].map(s => (
            <a key={s} href={`#${s}`} className="nav-link magnetic-wrap">
              <span className="magnetic-area" data-strength="20">{s === 'skills' ? 'Expertise' : s.charAt(0).toUpperCase() + s.slice(1)}</span>
            </a>
          ))}
        </div>
        <button className="nav-menu-btn magnetic-wrap" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span className="magnetic-area" data-strength="30">
            <div className={`hamburger ${menuOpen ? 'active' : ''}`}>
              <span></span><span></span><span></span>
            </div>
          </span>
        </button>
      </nav>
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mm-inner">
          <div className="mm-links">
            {[['#hero','Home',1],['#about','About',2],['#skills','Expertise',3],['#projects','Projects',4],['#experience','Experience',5],['#contact','Contact',6]].map(([h,t,n]) => (
              <a key={h} href={h} className="mm-link" onClick={() => setMenuOpen(false)}>
                <span className="mm-num">0{n}</span><span className="mm-text">{t}</span>
              </a>
            ))}
          </div>
          <div className="mm-footer">
            <a href="https://github.com/abhijaypandey14" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/abhijay-pandey-387211293" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:abhijaypandeygu@gmail.com">Email</a>
          </div>
        </div>
      </div>
    </>
  );
}

/* ===== PROGRESS BAR ===== */
function ProgressBar() {
  const fillRef = React.useRef(null);
  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (fillRef.current && docH > 0) fillRef.current.style.width = (y / docH * 100) + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="progress-bar"><div className="pb-fill" ref={fillRef}></div></div>;
}

/* ===== AUDIO PLAYER ===== */
function AudioPlayer() {
  const [playing, setPlaying] = React.useState(false);
  const audioRef = React.useRef(null);

  React.useEffect(() => {
    audioRef.current = new Audio('Game of Thrones.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.25;
    return () => { if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; } };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause();
    else audioRef.current.play().catch(() => {});
    setPlaying(!playing);
  };

  return (
    <button className={`audio-toggle ${playing ? 'playing' : ''}`} onClick={toggle} aria-label="Toggle GoT theme">
      <span className="audio-label">{playing ? 'PLAYING' : 'PLAY THEME'}</span>
      {playing ? (
        <div className="audio-bars"><span></span><span></span><span></span><span></span></div>
      ) : (
        <div className="audio-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" stroke="none"/>
          </svg>
        </div>
      )}
    </button>
  );
}
