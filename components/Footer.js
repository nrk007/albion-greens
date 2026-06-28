import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-forest-dark text-parchment/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 relative">
                <img src="/images/logo.png" alt="Albion Greens logo" width={40} height={40} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div className="font-display text-3xl font-light text-parchment">Albion Greens</div>
            </div>
            <div className="font-label text-xs tracking-widest uppercase text-gold mb-6">Grown in Park Royal · London</div>
            <p className="font-body text-sm leading-relaxed text-parchment/60 max-w-xs">
              Fresh, hand-picked microgreens grown to order and delivered across London.
              Supplying restaurants, caterers, and homes that care about what they eat.
            </p>
          </div>

          <div>
            <div className="section-label">Navigate</div>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/microgreens', label: 'Our Microgreens' },
                { href: '/order', label: 'Place an Order' },
                { href: '/trade', label: 'Trade & Wholesale' },
                { href: '/about', label: 'Our Story' },
                { href: '/faq', label: 'FAQ' },
                { href: '/contact', label: 'Contact' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-body text-sm text-parchment/60 hover:text-gold transition-colors duration-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="section-label">Get in Touch</div>
            <ul className="space-y-4">
              <li>
                <div className="font-label text-[10px] tracking-widest uppercase text-gold/60 mb-1">Email</div>
                <a href="mailto:albiongreens@gmail.com" className="font-body text-sm text-parchment/80 hover:text-gold transition-colors duration-300">albiongreens@gmail.com</a>
              </li>
              <li>
                <div className="font-label text-[10px] tracking-widest uppercase text-gold/60 mb-1">Phone / WhatsApp</div>
                <a href="tel:07765469434" className="font-body text-sm text-parchment/80 hover:text-gold transition-colors duration-300">07765 469434</a>
              </li>
              <li>
                <div className="font-label text-[10px] tracking-widest uppercase text-gold/60 mb-1">Location</div>
                <p className="font-body text-sm text-parchment/60">Park Royal, London</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-parchment/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-label text-[11px] tracking-wider uppercase text-parchment/30">
            © {new Date().getFullYear()} Albion Greens Ltd. All rights reserved.
          </p>
          <p className="font-label text-[11px] tracking-wider uppercase text-parchment/30">
            Grown with care · Park Royal, London
          </p>
        </div>
      </div>
    </footer>
  )
}
