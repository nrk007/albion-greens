import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import useMagnetic from '../components/useMagnetic'
import VarietyIllustration from '../components/VarietyIllustration'

const VARIETY_NAMES = ['Broccoli','Radish','Red Cabbage','Kale','Mustard','Arugula','Kohlrabi','Turnip','Watercress','Basil','Cilantro','Parsley','Dill','Fennel','Chervil','Mint']

const VARIETIES = [
  { name: 'Broccoli', cat: 'Brassica' },
  { name: 'Radish', cat: 'Brassica' },
  { name: 'Basil', cat: 'Herb' },
  { name: 'Arugula', cat: 'Brassica' },
  { name: 'Kale', cat: 'Brassica' },
  { name: 'Cilantro', cat: 'Herb' },
  { name: 'Mint', cat: 'Herb' },
]

const TABS = [
  { label: 'Restaurants & Chefs', title: 'Restaurants & Chefs', desc: 'Consistent quality on standing weekly orders. We work with your menu cycles and volume — reliable, flexible, always fresh.', img: '/images/homepage/21-restaurants-tab-chef-plating-microgreens.jpg', href: '/trade' },
  { label: 'Caterers & Vendors', title: 'Caterers & Vendors', desc: 'Bulk quantities, multiple varieties in one delivery. Bespoke arrangements for events, pop-ups, and food markets.', img: '/images/homepage/22-caterers-tab-microgreens-catering-spread.jpg', href: '/trade' },
  { label: 'Home & Individuals', title: 'Individuals & Families', desc: 'Order what you need, when you need it. Small trays, mixed packs, or a weekly subscription to keep your kitchen stocked.', img: '/images/homepage/23-individuals-tab-home-salad-microgreens.jpg', href: '/order' },
]

const PROMISE_QUOTE = "We don't grow speculatively. Every seed we plant has your name on it — that's why our microgreens arrive tasting exactly the way they're supposed to."

function HeroButtons() {
  const primaryRef = useMagnetic()
  const ghostRef = useMagnetic()
  return (
    <div className="flex flex-wrap gap-4 fade-up-4 stack-mobile">
      <div ref={primaryRef} className="inline-block">
        <Link href="/order" className="btn-primary">Place an Order</Link>
      </div>
      <div ref={ghostRef} className="inline-block">
        <Link href="/microgreens" className="btn-ghost">
          Browse Varieties <span className="arrow">→</span>
        </Link>
      </div>
    </div>
  )
}

function HeroPhotoStack() {
  const stackRef = useRef(null)
  const hp1 = useRef(null)
  const hp2 = useRef(null)
  const hp3 = useRef(null)

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine) and (hover: hover)').matches
    if (!isFinePointer) return
    const hero = document.getElementById('hero-section')
    if (!hero) return

    const onMove = (e) => {
      const rect = hero.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      ;[hp1, hp2, hp3].forEach((ref, i) => {
        if (!ref.current) return
        const depth = (i + 1) * 6
        ref.current.style.setProperty('--parallax-x', `${px * depth}px`)
        ref.current.style.setProperty('--parallax-y', `${py * depth}px`)
      })
    }
    hero.addEventListener('mousemove', onMove)
    return () => hero.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className="hero-photo-stack-wrap hidden lg:block relative h-[560px] fade-up-3" ref={stackRef}>
      <div ref={hp1} className="hp absolute" style={{ top: 0, right: 60, width: 220, height: 300, transform: 'translate(var(--parallax-x), var(--parallax-y)) rotate(-4deg)', zIndex: 3 }}>
        <img src="/images/homepage/18-hero-side-harvesting-hands.jpg" alt="Harvesting microgreens" />
      </div>
      <div ref={hp2} className="hp absolute" style={{ top: 90, right: -20, width: 190, height: 240, transform: 'translate(var(--parallax-x), var(--parallax-y)) rotate(6deg)', zIndex: 2 }}>
        <img src="/images/homepage/19-hero-side-mixed-microgreens-tray.jpg" alt="Mixed microgreens tray" />
      </div>
      <div ref={hp3} className="hp absolute" style={{ bottom: 0, right: 120, width: 170, height: 210, transform: 'translate(var(--parallax-x), var(--parallax-y)) rotate(-8deg)', zIndex: 1 }}>
        <img src="/images/homepage/20-hero-side-herb-close-up.jpg" alt="Fresh herb close-up" />
      </div>
    </div>
  )
}

function VarietyTicker() {
  const doubled = [...VARIETY_NAMES, ...VARIETY_NAMES]
  return (
    <div className="ticker-band bg-forest py-7 overflow-hidden border-y border-gold/20">
      <div className="ticker-track">
        {doubled.map((name, i) => (
          <span key={i}>
            {name}
            <span className="dot" style={{ margin: '0 0 0 28px' }}>•</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function VarietyList() {
  const [isFinePointer, setIsFinePointer] = useState(true)
  const [expandedIndex, setExpandedIndex] = useState(null)
  const [hoveredVariety, setHoveredVariety] = useState(null)
  const floatRef = useRef(null)
  const target = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine) and (hover: hover)').matches
    setIsFinePointer(fine)
    if (!fine) return

    let raf
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.16
      pos.current.y += (target.current.y - pos.current.y) * 0.16
      if (floatRef.current) {
        floatRef.current.style.left = pos.current.x + 'px'
        floatRef.current.style.top = pos.current.y + 'px'
      }
      raf = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(raf)
  }, [])

  const handleEnter = (v) => {
    setHoveredVariety(v)
    floatRef.current?.classList.add('active')
  }
  const handleLeave = () => floatRef.current?.classList.remove('active')
  const handleMove = (e) => {
    target.current.x = e.clientX + 30
    target.current.y = e.clientY - 180
  }

  return (
    <>
      <div className="border-t border-forest/15">
        {VARIETIES.map((v, i) => (
          <div key={v.name}>
            <div
              className={`variety-row ${expandedIndex === i ? 'expanded' : ''}`}
              onMouseEnter={isFinePointer ? () => handleEnter(v) : undefined}
              onMouseLeave={isFinePointer ? handleLeave : undefined}
              onMouseMove={isFinePointer ? handleMove : undefined}
              onClick={!isFinePointer ? () => setExpandedIndex(expandedIndex === i ? null : i) : undefined}
            >
              <div className="variety-name font-display text-[28px] sm:text-[38px] font-normal text-forest">{v.name}</div>
              <div className="flex items-baseline gap-8">
                <span className="font-label text-[9px] font-semibold tracking-[0.2em] uppercase text-forest/40">{v.cat}</span>
                <span className="variety-arrow font-label text-[11px] text-gold hidden lg:inline">View →</span>
              </div>
            </div>
            {!isFinePointer && (
              <div className={`variety-mobile-panel ${expandedIndex === i ? 'open' : ''}`}>
                <VarietyIllustration name={v.name} size={180} className="w-full h-44 object-cover" />
              </div>
            )}
          </div>
        ))}
      </div>

      {isFinePointer && (
        <div ref={floatRef} className="float-preview">
          {hoveredVariety && <VarietyIllustration name={hoveredVariety.name} size={280} className="w-full h-full" />}
          <div className="float-preview-label">{hoveredVariety?.name}</div>
        </div>
      )}
    </>
  )
}

function ServeTabs() {
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState(false)
  const navRefs = useRef([])
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })

  useEffect(() => {
    const btn = navRefs.current[active]
    if (btn) setIndicatorStyle({ left: btn.offsetLeft, width: btn.offsetWidth })
  }, [active])

  useEffect(() => {
    const interval = setInterval(() => {
      if (hovered) return
      setActive(prev => (prev + 1) % TABS.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [hovered])

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="tabs-nav-scroll flex gap-1 mb-12 border-b border-parchment/15 relative">
        {TABS.map((t, i) => (
          <button
            key={t.label}
            ref={el => navRefs.current[i] = el}
            onClick={() => setActive(i)}
            className="tab-btn font-label text-[11px] font-bold tracking-widest uppercase py-[18px] px-7 whitespace-nowrap flex-shrink-0 transition-colors duration-500"
            style={{ color: active === i ? '#C9A84C' : 'rgba(245,242,234,0.4)' }}
          >
            {t.label}
          </button>
        ))}
        <div className="tab-indicator absolute bottom-[-1px]" style={indicatorStyle} />
      </div>

      <div className="relative min-h-[380px]">
        {TABS.map((t, i) => (
          <div
            key={t.label}
            className={`tab-panel grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${active === i ? 'active relative' : 'absolute inset-0'}`}
          >
            <div className="tab-panel-img h-56 lg:h-[340px] overflow-hidden relative">
              <img src={t.img} alt={t.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-display text-3xl lg:text-[42px] font-light text-parchment mb-5">{t.title}</div>
              <p className="font-body text-sm lg:text-[15px] text-parchment/55 leading-[1.8] mb-8 max-w-sm">{t.desc}</p>
              <Link href={t.href} className="font-label text-[11px] font-bold tracking-widest uppercase text-gold inline-flex items-center gap-2 group">
                Learn more <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PromiseQuote() {
  const ref = useRef(null)
  const [lit, setLit] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setLit(true) })
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const words = PROMISE_QUOTE.split(' ')

  return (
    <div ref={ref} className="font-display italic font-light text-parchment leading-[1.5] max-w-3xl mx-auto"
      style={{ fontSize: 'clamp(1.4rem, 3.6vw, 3rem)' }}>
      {words.map((w, i) => (
        <span
          key={i}
          className={`promise-word ${lit ? 'lit' : ''}`}
          style={{ transitionDelay: lit ? `${i * 45}ms` : '0ms' }}
        >
          {w}{' '}
        </span>
      ))}
    </div>
  )
}

export default function Home() {
  const revealRef = useRef([])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    revealRef.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])
  const r = el => { if (el && !revealRef.current.includes(el)) revealRef.current.push(el) }

  const promiseBtnRef = useMagnetic()

  return (
    <Layout>
      {/* ===== HERO ===== */}
      <section id="hero-section" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#122F22' }}>
        <div className="absolute inset-0">
          <img
            src="/images/homepage/17-hero-background-microgreens-facility.jpg"
            alt="Fresh microgreens being harvested"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.32) saturate(1.1)', animation: 'heroZoom 24s cubic-bezier(0.22,0.61,0.36,1) forwards', transform: 'scale(1.18)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(115deg, rgba(18,47,34,0.96) 38%, rgba(18,47,34,0.55) 70%, rgba(18,47,34,0.15) 100%)' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[1.1fr_0.7fr] gap-10 items-center w-full pt-28">
          <div>
            <div className="section-label text-gold fade-up-1">Park Royal · London · Est. 2023</div>
            <h1 className="font-display font-light text-parchment mb-7" style={{ fontSize: 'clamp(2.8rem, 7vw, 6.4rem)', lineHeight: 1.04 }}>
              <span className="line-mask"><span style={{ animationDelay: '0.65s' }}>Grown Here.</span></span>
              <span className="line-mask"><span className="text-gold not-italic" style={{ animationDelay: '0.85s', fontStyle: 'italic' }}>Delivered Fresh.</span></span>
            </h1>
            <p className="font-body text-parchment/65 text-base lg:text-lg leading-relaxed max-w-md mb-10 fade-up-3">
              Hand-picked microgreens grown to order in Park Royal, London. Supplying restaurants, caterers, chefs, and homes that care about quality.
            </p>
            <HeroButtons />
            <div className="flex gap-8 lg:gap-12 mt-12 lg:mt-16 pt-8 border-t border-parchment/10 fade-up-5 flex-wrap">
              {[['16', 'Varieties'], ['London', 'Delivery'], ['Same Day', 'Harvest']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-2xl lg:text-3xl font-light text-gold">{n}</div>
                  <div className="font-label text-[9px] tracking-[0.22em] uppercase text-parchment/35 mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <HeroPhotoStack />
        </div>

        <div className="hidden lg:flex absolute bottom-8 left-12 items-center gap-3 text-parchment/25">
          <span className="font-label text-[9px] tracking-[0.25em] uppercase" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      <style jsx>{`
        @keyframes heroZoom { from { transform: scale(1.18); } to { transform: scale(1); } }
      `}</style>

      <VarietyTicker />

      {/* ===== TRUST BAR ===== */}
      <div className="bg-gold py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-6 lg:gap-14">
          {['Grown to Order', 'Harvested Same Morning', 'London-Wide Delivery', 'Order via WhatsApp'].map(t => (
            <span key={t} className="font-label text-[9px] lg:text-[10px] font-bold tracking-[0.18em] uppercase text-white/90">{t}</span>
          ))}
        </div>
      </div>

      {/* ===== VARIETIES — signature hover-follow interaction ===== */}
      <section className="py-24 lg:py-36 bg-parchment px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div ref={r} className="reveal mb-12 lg:mb-16">
            <div className="section-label">What We Grow</div>
            <div className="display-heading text-3xl lg:text-5xl mb-3">
              Sixteen varieties,<br /><em className="italic text-gold">all grown to order.</em>
            </div>
            <div className="gold-divider" />
          </div>
          <div ref={r} className="reveal">
            <VarietyList />
          </div>
        </div>
      </section>

      {/* ===== WHO WE SERVE — animated tabs ===== */}
      <section className="py-24 lg:py-36 bg-forest px-6 lg:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div ref={r} className="reveal mb-12 lg:mb-16">
            <div className="section-label">Who We Serve</div>
            <div className="display-heading text-3xl lg:text-5xl text-parchment mb-3">
              From kitchens to<br /><em className="italic text-gold">home tables.</em>
            </div>
            <div className="gold-divider" />
          </div>
          <div ref={r} className="reveal">
            <ServeTabs />
          </div>
        </div>
      </section>

      {/* ===== PROMISE — word-by-word reveal ===== */}
      <section className="relative py-32 lg:py-48 overflow-hidden text-center px-6">
        <div className="absolute inset-0">
          <img
            src="/images/supporting/24-our-promise-microgreens-harvest-background.jpg"
            alt="Microgreens harvest"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.22) saturate(0.7)' }}
          />
          <div className="absolute inset-0" style={{ background: 'rgba(18,47,34,0.65)' }} />
        </div>
        <div className="relative">
          <div className="section-label justify-center text-gold mb-8">Our Promise</div>
          <PromiseQuote />
          <div className="mt-10 lg:mt-12">
            <div ref={promiseBtnRef} className="inline-block">
              <Link href="/order" className="btn-primary">Order Fresh Today</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DUAL CTA ===== */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative p-10 lg:p-16 flex flex-col justify-between min-h-72 overflow-hidden">
          <img src="/images/supporting/25-dual-cta-home-cooking-fresh-greens.jpg" alt="Home cooking"
            className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(0.18)' }} />
          <div className="absolute inset-0 bg-forest/80" />
          <div className="relative">
            <div className="section-label text-gold mb-3">For Home & Individual</div>
            <h3 className="font-display text-2xl lg:text-3xl font-light text-parchment mb-4">Order your first tray</h3>
            <p className="font-body text-sm text-parchment/55 mb-8">Pick your variety, get fresh microgreens at your door.</p>
            <Link href="/order" className="btn-primary">Place an Order</Link>
          </div>
        </div>
        <div className="relative p-10 lg:p-16 flex flex-col justify-between min-h-72 overflow-hidden">
          <img src="/images/supporting/26-dual-cta-restaurant-kitchen-chefs-working.jpg" alt="Restaurant kitchen"
            className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(0.15)' }} />
          <div className="absolute inset-0" style={{ background: 'rgba(15,40,25,0.88)' }} />
          <div className="relative">
            <div className="section-label text-gold mb-3">For Restaurants & Trade</div>
            <h3 className="font-display text-2xl lg:text-3xl font-light text-parchment mb-4">Let's talk volume</h3>
            <p className="font-body text-sm text-parchment/55 mb-8">Standing orders, bespoke varieties, flexible delivery schedules.</p>
            <Link href="/trade" className="btn-primary">Trade Enquiry</Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
