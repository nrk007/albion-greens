import { useState } from 'react'
import Layout from '../components/Layout'

const VARIETIES = ['Broccoli', 'Radish', 'Red Cabbage', 'Kale', 'Mustard', 'Arugula (Rocket)', 'Kohlrabi', 'Turnip', 'Watercress', 'Basil', 'Cilantro (Coriander)', 'Parsley', 'Dill', 'Fennel', 'Chervil', 'Mint']

export default function Trade() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [selectedVarieties, setSelectedVarieties] = useState([])
  const [form, setForm] = useState({ businessName: '', contactName: '', email: '', phone: '', businessType: '', weeklyVolume: '', deliveryDays: [], message: '' })

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }))
  const toggleVariety = (v) => setSelectedVarieties(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])
  const toggleDay = (d) => set('deliveryDays', form.deliveryDays.includes(d) ? form.deliveryDays.filter(x => x !== d) : [...form.deliveryDays, d])
  const formValid = form.businessName && form.contactName && form.email && form.businessType

  const submit = async () => {
    setSubmitting(true); setError('')
    try {
      const res = await fetch('/api/trade', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, varieties: selectedVarieties }) })
      if (res.ok) setSubmitted(true)
      else setError('Something went wrong. Please email albiongreens@gmail.com directly.')
    } catch { setError('Could not send. Please email albiongreens@gmail.com directly.') }
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <Layout title="Trade Enquiry Sent">
        <div className="min-h-screen bg-parchment pt-40 pb-20 flex items-center justify-center px-6">
          <div className="max-w-lg text-center">
            <div className="w-20 h-20 rounded-full bg-forest flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10 text-parchment" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <div className="section-label justify-center">Enquiry Received</div>
            <h1 className="display-heading text-4xl mb-4">We'll be in touch.</h1>
            <div className="gold-divider mx-auto" />
            <p className="font-body text-ink-light leading-relaxed mb-10">Thank you for your interest. We'll review your enquiry and get back to you within 24 hours.</p>
            <a href="/" className="btn-primary">Back to Home</a>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Trade & Wholesale" description="Wholesale microgreens for restaurants, caterers and food businesses in London.">
      <section className="relative pt-28 lg:pt-32 pb-16 lg:pb-20 overflow-hidden px-6 lg:px-12">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1600&q=85" alt="Restaurant kitchen" className="w-full h-full object-cover" style={{ filter: 'brightness(0.2)' }} />
          <div className="absolute inset-0 bg-forest/85" />
        </div>
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="section-label text-gold">Trade & Wholesale</div>
            <h1 className="display-heading text-parchment text-3xl lg:text-6xl mb-6">Supplying<br /><em className="text-gold font-light not-italic">London's Kitchens</em></h1>
            <p className="font-body text-parchment/60 leading-relaxed max-w-md">We work directly with restaurants, hotels, caterers, and food markets — providing consistent, high-quality microgreens on a schedule that works for your kitchen.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:gap-5">
            {[{ icon: '🌱', title: 'Grown to Order', desc: 'No cold-storage. Every batch is grown fresh for you.' }, { icon: '📅', title: 'Flexible Schedule', desc: 'Daily, weekly, or bi-weekly — around your menu cycles.' }, { icon: '📦', title: 'Mixed Deliveries', desc: 'Multiple varieties in a single delivery, every time.' }, { icon: '🤝', title: 'Direct Relationship', desc: 'You talk to the grower. No middlemen, no surprises.' }].map(b => (
              <div key={b.title} className="bg-parchment/10 border border-parchment/10 p-4 lg:p-5">
                <div className="text-xl lg:text-2xl mb-3">{b.icon}</div>
                <div className="font-display text-base lg:text-lg font-medium text-parchment mb-2">{b.title}</div>
                <p className="font-body text-xs text-parchment/50 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-parchment px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-label justify-center">Get Started</div>
            <h2 className="display-heading text-3xl lg:text-4xl">Trade Enquiry</h2>
            <div className="gold-divider mx-auto" />
            <p className="font-body text-ink-light">Fill in the form and we'll get back to you within 24 hours.</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="font-label text-xs tracking-widest uppercase text-ink/60 block mb-3">Business Type *</label>
              <div className="flex flex-wrap gap-3">
                {['Restaurant', 'Hotel', 'Catering Company', 'Food Market / Pop-up', 'Deli / Food Shop', 'Other'].map(t => (
                  <button key={t} type="button" onClick={() => set('businessType', t)}
                    className="py-2 px-4 border-2 font-label text-xs tracking-widest uppercase transition-all duration-300"
                    style={form.businessType === t ? { borderColor: '#1E4D35', background: '#1E4D35', color: '#F5F2EA' } : { borderColor: 'rgba(30,77,53,0.2)', color: 'rgba(26,26,26,0.6)' }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div><label className="font-label text-xs tracking-widest uppercase text-ink/60 block mb-2">Business Name *</label><input className="input-field" value={form.businessName} onChange={e => set('businessName', e.target.value)} placeholder="The Oak Kitchen" /></div>
              <div><label className="font-label text-xs tracking-widest uppercase text-ink/60 block mb-2">Contact Name *</label><input className="input-field" value={form.contactName} onChange={e => set('contactName', e.target.value)} placeholder="Head Chef / Buyer" /></div>
              <div><label className="font-label text-xs tracking-widest uppercase text-ink/60 block mb-2">Email *</label><input className="input-field" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="hello@yourbusiness.com" /></div>
              <div><label className="font-label text-xs tracking-widest uppercase text-ink/60 block mb-2">Phone</label><input className="input-field" type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="020 7000 0000" /></div>
            </div>
            <div>
              <label className="font-label text-xs tracking-widest uppercase text-ink/60 block mb-2">Estimated Weekly Volume</label>
              <select className="select-field" value={form.weeklyVolume} onChange={e => set('weeklyVolume', e.target.value)}>
                <option value="">Select approximate volume</option>
                <option>Less than 500g/week</option><option>500g – 2kg/week</option><option>2kg – 5kg/week</option><option>5kg – 10kg/week</option><option>10kg+/week</option><option>Not sure yet — happy to discuss</option>
              </select>
            </div>
            <div>
              <label className="font-label text-xs tracking-widest uppercase text-ink/60 block mb-3">Preferred Delivery Days</label>
              <div className="flex flex-wrap gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                  <button key={d} type="button" onClick={() => toggleDay(d)}
                    className="w-12 py-2 border-2 font-label text-xs tracking-wider uppercase transition-all duration-300"
                    style={form.deliveryDays.includes(d) ? { borderColor: '#C9A84C', background: '#C9A84C', color: '#fff' } : { borderColor: 'rgba(30,77,53,0.2)', color: 'rgba(26,26,26,0.6)' }}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="font-label text-xs tracking-widest uppercase text-ink/60 block mb-3">Varieties of Interest</label>
              <div className="flex flex-wrap gap-2">
                {VARIETIES.map(v => (
                  <button key={v} type="button" onClick={() => toggleVariety(v)}
                    className="py-1.5 px-3 border font-label text-[10px] tracking-widest uppercase transition-all duration-300"
                    style={selectedVarieties.includes(v) ? { borderColor: '#1E4D35', background: '#1E4D35', color: '#F5F2EA' } : { borderColor: 'rgba(30,77,53,0.2)', color: 'rgba(26,26,26,0.6)' }}>
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div><label className="font-label text-xs tracking-widest uppercase text-ink/60 block mb-2">Anything else to tell us?</label>
              <textarea className="input-field resize-none" rows={4} value={form.message} onChange={e => set('message', e.target.value)} placeholder="Tell us about your kitchen, your menu, or any requirements..." />
            </div>
            {error && <div className="p-4 bg-red-50 border border-red-200 text-red-700 font-body text-sm">{error}</div>}
            <div className="pt-2">
              <button type="button" onClick={submit} disabled={!formValid || submitting} className={`btn-primary w-full justify-center ${(!formValid || submitting) ? 'opacity-40 cursor-not-allowed' : ''}`}>
                {submitting ? 'Sending Enquiry...' : 'Send Trade Enquiry'}
              </button>
              <p className="font-body text-xs text-ink/40 text-center mt-3">We respond within 24 hours. Or call us directly on 07765 469434.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
