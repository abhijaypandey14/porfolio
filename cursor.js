/* ===== CUSTOM CURSOR ===== */
function CustomCursor() {
  const cursorRef = React.useRef(null);
  const dotRef = React.useRef(null);
  const textRef = React.useRef(null);

  React.useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const textEl = textRef.current;
    let mx = -100, my = -100, cx = -100, cy = -100;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    };
    document.addEventListener('mousemove', onMove);

    let rafId;
    function tick() {
      cx += (mx - cx) * 0.1; cy += (my - cy) * 0.1;
      cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px';
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    const setupHovers = () => {
      document.querySelectorAll('a, button, .magnetic-wrap').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); cursor.classList.remove('text-mode'); textEl.textContent = ''; });
      });
      document.querySelectorAll('[data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', () => { cursor.classList.add('text-mode'); textEl.textContent = el.dataset.cursor; });
        el.addEventListener('mouseleave', () => { cursor.classList.remove('text-mode'); textEl.textContent = ''; });
      });
    };
    setTimeout(setupHovers, 600);

    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef}><span className="cursor-text" ref={textRef}></span></div>
      <div className="cursor-dot" ref={dotRef}></div>
    </>
  );
}
