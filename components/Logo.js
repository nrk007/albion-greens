export default function Logo({ size = 42, showText = true }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{
        width: size, height: size, borderRadius: '50%',
        overflow: 'hidden', flexShrink: 0,
        position: 'relative',
      }}>
        {/* Plain img tag: this renders many times across the site (every page's navbar + footer),
            so next/image's optimization overhead isn't worth it, and it avoids the
            fetchPriority dev-warning some Next 14 + React 18 combinations produce. */}
        <img
          src="/images/logo.png"
          alt="Albion Greens logo"
          width={size}
          height={size}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
      {showText && (
        <div>
          <div style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 19, fontWeight: 600, color: '#F5F2EA', lineHeight: 1,
          }}>Albion Greens</div>
          <div style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase',
            color: '#C9A84C', marginTop: 3,
          }}>Park Royal · London</div>
        </div>
      )}
    </div>
  )
}
