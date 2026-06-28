import { useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'

const FAQS = [
  { category: 'Ordering', questions: [
    { q: 'How do I place an order?', a: "You can order directly through our website, by emailing albiongreens@gmail.com, or via WhatsApp on 07765 469434. We'll confirm your order and delivery date within 24 hours." },
    { q: 'Is there a minimum order?', a: 'For individual customers, our minimum is a single small tray (approx. 100g). For trade customers, we ask for a minimum of 500g per order.' },
    { q: 'Can I set up a recurring weekly order?', a: 'Yes — standing orders mean we can plan our growing schedule around you. You can pause or cancel anytime.' },
  ]},
  { category: 'Delivery', questions: [
    { q: 'Where do you deliver?', a: 'We currently deliver across London, with most deliveries covering Central, West, North, and South London.' },
    { q: 'What days do you deliver?', a: 'We deliver Monday through Saturday. You can specify your preferred day when ordering.' },
  ]},
  { category: 'Freshness & Storage', questions: [
    { q: 'How long do microgreens last after delivery?', a: 'Stored correctly in the fridge, most varieties stay fresh for 5–10 days. Herbs like basil prefer room temperature.' },
    { q: 'How fresh are the greens when they arrive?', a: 'We harvest the morning of your delivery — typically less than 12 hours in soil before arriving with you.' },
  ]},
  { category: 'Trade & Wholesale', questions: [
    { q: 'Do you offer trade pricing?', a: "Yes. Trade customers ordering above a certain volume qualify for discounted pricing. Fill in our trade enquiry form and we'll put together a proposal." },
    { q: 'Can you grow bespoke varieties for our menu?', a: "We're always willing to explore growing new varieties for committed trade partners." },
  ]},
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-forest/10 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-start justify-between py-5 text-left gap-6 group">
        <span className="font-body font-medium text-ink group-hover:text-forest transition-colors duration-300">{q}</span>
        <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-gold text-gold flex items-center justify-center font-body text-sm font-bold transition-transform duration-500" style={{ transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
      </button>
      <div style={{ maxHeight: open ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.5s cubic-bezier(0.19,1,0.22,1)' }}>
        <p className="font-body text-sm text-ink-light leading-relaxed pb-5">{a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('All')
  const categories = ['All', ...FAQS.map(f => f.category)]
  const filtered = activeCategory === 'All' ? FAQS : FAQS.filter(f => f.category === activeCategory)

  return (
    <Layout title="FAQ" description="Frequently asked questions about ordering microgreens from Albion Greens.">
      <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-20 overflow-hidden px-6 lg:px-12">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1567891084517-5ea4b37a9874?w=1600&q=85" alt="Microgreens" className="w-full h-full object-cover" style={{ filter: 'brightness(0.18)' }} />
          <div className="absolute inset-0 bg-forest/85" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <div className="section-label text-gold">Help & Information</div>
          <h1 className="font-display font-light text-parchment mb-4" style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)', lineHeight: 1.1 }}>
            Frequently<br /><em className="text-gold not-italic">Asked Questions</em>
          </h1>
          <p className="font-body text-parchment/60 leading-relaxed">
            Can't find what you're looking for? <Link href="/contact" className="text-gold underline">Get in touch</Link>.
          </p>
        </div>
      </section>

      <section className="py-14 lg:py-16 bg-parchment px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className="py-2 px-4 border-2 font-label text-[10px] tracking-widest uppercase transition-all duration-300"
                style={activeCategory === cat ? { borderColor: '#1E4D35', background: '#1E4D35', color: '#F5F2EA' } : { borderColor: 'rgba(30,77,53,0.2)', color: 'rgba(26,26,26,0.6)' }}>
                {cat}
              </button>
            ))}
          </div>
          <div className="space-y-10 lg:space-y-12">
            {filtered.map(group => (
              <div key={group.category}>
                <div className="section-label">{group.category}</div>
                <div className="bg-white border border-forest/10 px-6">
                  {group.questions.map(item => <FAQItem key={item.q} q={item.q} a={item.a} />)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 bg-forest p-8 lg:p-10 text-center">
            <div className="section-label justify-center text-gold">Still have questions?</div>
            <h3 className="font-display text-2xl lg:text-3xl font-light text-parchment mb-4">We're happy to help.</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/contact" className="btn-primary">Contact Us</Link>
              <a href="https://wa.me/447765469434" target="_blank" rel="noopener noreferrer" className="btn-ghost">WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
