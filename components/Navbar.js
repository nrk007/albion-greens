import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Logo from './Logo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [router.pathname])

  const links = [
    { href: '/', label: 'Home' },
    { href: '/microgreens', label: 'Our Greens' },
    { href: '/order', label: 'Order' },
    { href: '/trade', label: 'Trade' },
    { href: '/about', label: 'Our Story' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          height: scrolled ? 72 : 88,
          background: scrolled ? 'rgba(18,47,34,0.97)' : 'rgba(18,47,34,0.9)',
          backdropFilter: scrolled ? 'blur(16px)' : 'blur(6px)',
          boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.25)' : 'none',
          transition: 'background 0.6s var(--ease-soft), height 0.5s var(--ease-cinematic), box-shadow 0.5s ease',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-full">
          <Link href="/"><Logo /></Link>

          <div className="hidden lg:flex items-center gap-10">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="font-label text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors duration-300"
                style={{ color: router.pathname === l.href ? '#C9A84C' : 'rgba(245,242,234,0.7)' }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/order" className="hidden lg:inline-flex btn-primary text-[10px] py-3 px-6">
              Place Order
            </Link>
            <button
              className={`mobile-toggle lg:hidden flex flex-col justify-center gap-[5px] w-10 h-10 ${mobileOpen ? 'open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`mobile-menu fixed inset-0 z-40 lg:hidden flex flex-col items-center justify-center gap-7 ${mobileOpen ? 'open' : ''}`}
        style={{ background: 'rgba(18,47,34,0.98)', backdropFilter: 'blur(10px)' }}
      >
        {links.map(l => (
          <Link
            key={l.href}
            href={l.href}
            className="font-display text-4xl font-light text-parchment"
            onClick={() => setMobileOpen(false)}
          >
            {l.label}
          </Link>
        ))}
        <Link href="/order" className="btn-primary mt-4" onClick={() => setMobileOpen(false)}>
          Place an Order
        </Link>
      </div>
    </>
  )
}
