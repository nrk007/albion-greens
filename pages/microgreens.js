import { useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import VarietyIllustration from '../components/VarietyIllustration'

const VARIETIES = [
  { name: 'Broccoli', category: 'Brassica', flavour: 'Mild, slightly earthy with a hint of sweetness', nutrition: 'Contains sulforaphane, a compound broccoli is well known for', best: 'Salads, smoothies, garnish, grain bowls', days: '8–10' },
  { name: 'Radish', category: 'Brassica', flavour: 'Bold, peppery — the most distinctive brassica', nutrition: 'Commonly valued for vitamin C; daikon radish microgreens specifically have tested high in vitamin E', best: 'Sushi, tacos, ceviche, Asian dishes', days: '6–8' },
  { name: 'Red Cabbage', category: 'Brassica', flavour: 'Mild, slightly sweet with satisfying crunch', nutrition: 'Tested highest for vitamin C among 25 microgreen varieties in a 2012 USDA study', best: 'Colourful garnish, rice bowls, slaw', days: '8–10' },
  { name: 'Kale', category: 'Brassica', flavour: 'Rich, earthy, with a faint bitterness', nutrition: 'Like mature kale, commonly associated with vitamins K, A & C', best: 'Smoothies, wraps, hearty salads', days: '10–12' },
  { name: 'Mustard', category: 'Brassica', flavour: 'Spicy, sharp — adds real heat', nutrition: 'Like other brassicas, generally a source of vitamins A, C & K', best: 'Sandwiches, curries, charcuterie boards', days: '7–9' },
  { name: 'Arugula', category: 'Brassica', flavour: 'Nutty, peppery — classic rocket intensity', nutrition: 'Mature arugula is a known source of calcium and folate; microgreens are typically more concentrated', best: 'Pasta, pizza, salads, bruschetta', days: '7–9' },
  { name: 'Kohlrabi', category: 'Brassica', flavour: 'Mild, slightly sweet, tender', nutrition: 'Commonly noted for vitamin C and potassium in its mature form', best: 'Light salads, seafood, sushi', days: '9–11' },
  { name: 'Turnip', category: 'Brassica', flavour: 'Mild, slightly peppery, clean', nutrition: 'Mature turnip greens are a known source of vitamin C', best: 'Soups, salads, light garnish', days: '8–10' },
  { name: 'Watercress', category: 'Brassica', flavour: 'Peppery, fresh, slightly tangy', nutrition: 'Mature watercress is unusually rich in vitamin K and calcium', best: 'Sandwiches, soups, fish dishes', days: '10–14' },
  { name: 'Basil', category: 'Herb', flavour: 'Sweet, intensely aromatic', nutrition: 'Mature basil is a known source of vitamin K and manganese', best: 'Italian dishes, Caprese, cocktails', days: '10–14' },
  { name: 'Cilantro', category: 'Herb', flavour: 'Fresh, citrusy — milder than mature coriander', nutrition: 'Tested highest for carotenoid content among 25 microgreen varieties in a 2012 USDA study', best: 'Mexican, Thai, Indian cuisine', days: '12–16' },
  { name: 'Parsley', category: 'Herb', flavour: 'Clean, bright, classic herb flavour', nutrition: 'Mature parsley is exceptionally high in vitamin K and a good source of vitamin C', best: 'Stocks, sauces, garnish, tabbouleh', days: '14–18' },
  { name: 'Dill', category: 'Herb', flavour: 'Anise-like, fresh, distinctly dill', nutrition: 'Mature dill is commonly noted for manganese and vitamin C', best: 'Salmon, gravlax, pickles, tzatziki', days: '12–16' },
  { name: 'Fennel', category: 'Herb', flavour: 'Sweet anise, delicate, aromatic', nutrition: 'Mature fennel is a source of vitamin C, fibre and potassium', best: 'Seafood, salads, Italian dishes', days: '12–14' },
  { name: 'Chervil', category: 'Herb', flavour: 'Delicate anise with a hint of parsley', nutrition: 'Mature chervil is noted for vitamin C and iron content', best: 'French cuisine, eggs, delicate sauces', days: '14–18' },
  { name: 'Mint', category: 'Herb', flavour: 'Fresh, cooling, unmistakably mint', nutrition: 'Mature mint contains vitamin A and various antioxidant compounds', best: 'Cocktails, desserts, Middle Eastern food', days: '14–18' },
]

export default function Microgreens() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = activeCategory === 'All' ? VARIETIES : VARIETIES.filter(v => v.category === activeCategory)

  return (
    <Layout title="Our Microgreens" description="Browse all 16 varieties of fresh microgreens grown at Albion Greens in Park Royal, London.">
      <section className="relative min-h-[55vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1611735341450-74d61e660ad2?w=1600&q=85" alt="Microgreens"
            className="w-full h-full object-cover" style={{ filter: 'brightness(0.25)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(18,47,34,0.98) 0%, rgba(18,47,34,0.4) 70%)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pb-16 lg:pb-20 pt-32 lg:pt-40 w-full">
          <div className="section-label text-gold fade-up-1">Our Catalogue</div>
          <h1 className="font-display font-light text-parchment fade-up-2 mb-4" style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)', lineHeight: 1.05 }}>
            16 Varieties.<br /><em className="text-gold not-italic">All Grown to Order.</em>
          </h1>
          <p className="font-body text-parchment/55 max-w-xl leading-relaxed fade-up-3">
            We grow what you order, when you order it. Every variety below is available fresh, typically within 7–14 days.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-parchment px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-10 lg:mb-12">
            {['All', 'Brassica', 'Herb'].map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className="font-label text-[10px] font-bold tracking-widest uppercase px-5 lg:px-6 py-3 border-2 transition-all duration-500"
                style={activeCategory === cat ? { background: '#1E4D35', borderColor: '#1E4D35', color: '#F5F2EA' } : { borderColor: 'rgba(30,77,53,0.25)', color: '#1E4D35' }}>
                {cat === 'All' ? `All (${VARIETIES.length})` : `${cat}s (${VARIETIES.filter(v => v.category === cat).length})`}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((v, i) => (
              <div key={v.name}
                className="card-mount-in bg-white overflow-hidden border border-forest/08 cursor-pointer card-hover group"
                style={{ animationDelay: `${(i % 8) * 0.06}s` }}
                onClick={() => setSelected(v)}>
                <div className="relative h-44 overflow-hidden">
                  <VarietyIllustration name={v.name} size={400} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-3 right-3 bg-forest/85 backdrop-blur-sm px-2 py-1">
                    <span className="font-label text-[8px] tracking-wider uppercase text-gold">{v.days}d</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="font-label text-[8px] tracking-[0.2em] uppercase text-gold mb-2">{v.category}</div>
                  <div className="font-display text-xl font-medium text-forest group-hover:text-gold transition-colors duration-300">{v.name}</div>
                  <div className="font-body text-xs text-ink-light mt-2 leading-relaxed">{v.flavour}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="font-body text-ink-light mb-6">Ready to order? We grow exactly what you need.</p>
            <Link href="/order" className="btn-secondary mr-4">Place an Order</Link>
            <Link href="/trade" className="btn-secondary">Trade Enquiry</Link>
          </div>
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-6"
          style={{ background: 'rgba(18,47,34,0.9)', backdropFilter: 'blur(8px)' }}
          onClick={() => setSelected(null)}>
          <div className="bg-parchment max-w-2xl w-full overflow-hidden grid grid-cols-1 md:grid-cols-2 relative"
            onClick={e => e.stopPropagation()}>
            <div className="relative h-56 md:h-auto">
              <VarietyIllustration name={selected.name} size={500} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="font-label text-[9px] tracking-widest uppercase text-gold mb-1">{selected.category}</div>
                <div className="font-display text-3xl font-medium text-parchment">{selected.name}</div>
              </div>
            </div>
            <div className="p-8">
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-ink/40 hover:text-ink text-2xl leading-none w-8 h-8 flex items-center justify-center">×</button>
              <div className="space-y-4 mt-2">
                {[
                  { label: 'Flavour', value: selected.flavour },
                  { label: 'Nutrition', value: selected.nutrition },
                  { label: 'Best in', value: selected.best },
                  { label: 'Harvest', value: `${selected.days} days` },
                ].map(row => (
                  <div key={row.label} className="border-b border-forest/10 pb-4">
                    <div className="font-label text-[9px] tracking-widest uppercase text-gold/70 mb-1">{row.label}</div>
                    <div className="font-body text-sm text-ink">{row.value}</div>
                  </div>
                ))}
              </div>
              <p className="font-body text-[11px] text-ink/40 mt-4 leading-relaxed">
                Nutrition notes are general guidance, not a guarantee — actual content varies by growing conditions and harvest timing.
              </p>
              <Link href="/order" className="btn-primary w-full justify-center mt-6 block text-center" onClick={() => setSelected(null)}>
                Order {selected.name}
              </Link>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
