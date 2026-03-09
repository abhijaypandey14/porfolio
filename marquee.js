/* ===== MARQUEE ===== */
function MarqueeSection() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <section className="marquee-section">
      <div className="marquee-track">
        <div className="marquee-content">
          {items.map((s, i) => (
            <React.Fragment key={i}>
              <span>{s}</span><span className="m-dot">&#9670;</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
