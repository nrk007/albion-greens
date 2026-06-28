import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'

const VALUES = [
  { icon: '🌱', title: 'Grown to Order', desc: 'We plant when you order. No cold storage, no stock rotation — just live, nutrient-dense plants harvested at their peak.' },
  { icon: '🏙️', title: 'Hyper-Local', desc: 'Grown in Park Royal, delivered across London. The journey is measured in miles, not days.' },
  { icon: '🔬', title: 'Peak Nutrition', desc: 'Microgreens are harvested at 7-14 days — the point of maximum nutritional density.' },
  { icon: '♻️', title: 'Zero Waste', desc: "Because we grow to your order, we don't throw anything away. Every seed has already been sold." },
]

export default function About() {
  const revealRef = useRef([])
  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }), { threshold: 0.08 })
    revealRef.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])
  const r = el => { if (el && !revealRef.current.includes(el)) revealRef.current.push(el) }

  return (
    <Layout title="Our Story" description="Learn about Albion Greens — growing fresh microgreens in Park Royal, London.">
      <section className="relative min-h-[60vh] lg:min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/supporting/24-our-promise-microgreens-harvest-background.jpg" alt="Microgreens harvest" className="w-full h-full object-cover" style={{ filter: 'brightness(0.3)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(18,47,34,0.98) 0%, rgba(18,47,34,0.5) 60%, rgba(18,47,34,0.2) 100%)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pb-16 lg:pb-20 pt-32 lg:pt-40 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
          <div>
            <div className="section-label text-gold fade-up-1">Our Story</div>
            <h1 className="font-display font-light text-parchment fade-up-2 mb-6" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', lineHeight: 1.05 }}>
              Rooted in<br /><em className="text-gold not-italic">Park Royal.</em>
            </h1>
            <p className="font-body text-parchment/60 leading-relaxed fade-up-3 max-w-md text-base">
              Albion Greens started with a simple frustration: why was it so hard to find genuinely fresh microgreens in London?
            </p>
          </div>
          <div className="bg-parchment/8 border border-parchment/15 p-6 lg:p-8 fade-up-3">
            <p className="font-display text-xl lg:text-2xl font-light text-parchment/85 leading-relaxed italic">
              "The best ingredients don't need to travel the world. They just need to be grown with care, harvested at the right moment, and delivered with intention."
            </p>
            <div className="font-label text-[9px] tracking-[0.25em] uppercase text-gold mt-5">— Albion Greens</div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-parchment px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div ref={r} className="reveal">
            <div className="section-label">The Beginning</div>
            <h2 className="display-heading text-3xl lg:text-4xl mb-4">From a Single Tray to 16 Varieties</h2>
            <div className="gold-divider" />
            <div className="font-body text-ink-light leading-relaxed space-y-5 text-[15px]">
              <p>We began in a small corner of Park Royal with a handful of growing trays, a lot of reading, and an obsession with getting the timing right.</p>
              <p>Our first customers were people in the neighbourhood who wanted something they couldn't get from a supermarket: greens that were genuinely alive. Word spread.</p>
              <p>Today we grow 16 varieties — all to order, all from our Park Royal facility — supplying restaurants, caterers, food markets, and individuals across London.</p>
            </div>
          </div>
          <div ref={r} className="reveal grid grid-cols-2 gap-3">
            <img src="/images/supporting/27-about-seeding-microgreen-seeds-soil-tray.jpg" alt="Sowing microgreen seeds" className="w-full h-44 lg:h-52 object-cover" />
            <img src="/images/supporting/28-about-growth-stages-microgreen-trays.jpg" alt="Microgreens at different growth stages" className="w-full h-44 lg:h-52 object-cover" />
            <img src="/images/supporting/29-about-packed-microgreens-delivery-orders.jpg" alt="Packed microgreens ready for delivery" className="w-full h-36 lg:h-44 object-cover col-span-2" />
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-mint-pale px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div ref={r} className="reveal text-center mb-12 lg:mb-16">
            <div className="section-label justify-center">How We Work</div>
            <h2 className="display-heading text-3xl lg:text-4xl">What We Stand For</h2>
            <div className="gold-divider mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUES.map((v, i) => (
              <div key={v.title} ref={r} className="reveal bg-white p-6 lg:p-8 border-l-4 border-gold card-hover" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="text-3xl mb-5">{v.icon}</div>
                <h3 className="font-display text-xl lg:text-2xl font-medium text-forest mb-3">{v.title}</h3>
                <p className="font-body text-sm text-ink-light leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 lg:py-24 overflow-hidden px-6">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=1400&q=80" alt="Microgreens" className="w-full h-full object-cover" style={{ filter: 'brightness(0.2)' }} />
          <div className="absolute inset-0 bg-forest/80" />
        </div>
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl lg:text-4xl font-light text-parchment mb-6">Ready to Try Our Greens?</h2>
          <p className="font-body text-parchment/55 mb-10">Whether you're a restaurant or just cooking at home — we'd love to grow for you.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/order" className="btn-primary">Place an Order</Link>
            <Link href="/trade" className="btn-ghost">Trade Enquiry</Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
