export default function IndianFlag({ className }: { className?: string }) {
  const cx = 450;
  const cy = 300;
  const r = 58;
  const spokes = Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * Math.PI * 2;
    const x2 = cx + r * Math.cos(angle);
    const y2 = cy + r * Math.sin(angle);
    return <line key={i} x1={cx} y1={cy} x2={x2} y2={y2} stroke="#0d1b52" strokeWidth={3} />;
  });

  return (
    <svg viewBox="0 0 900 600" className={className} role="img" aria-label="Flag of India">
      <rect x="0" y="0" width="900" height="200" fill="#FF9933" />
      <rect x="0" y="200" width="900" height="200" fill="#FFFFFF" />
      <rect x="0" y="400" width="900" height="200" fill="#138808" />
      {spokes}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#0d1b52" strokeWidth={5} />
      <circle cx={cx} cy={cy} r={7} fill="#0d1b52" />
    </svg>
  );
}
