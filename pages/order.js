import { useState } from 'react'
import Layout from '../components/Layout'

const VARIETIES = ['Broccoli', 'Radish', 'Red Cabbage', 'Kale', 'Mustard', 'Arugula (Rocket)', 'Kohlrabi', 'Turnip', 'Watercress', 'Basil', 'Cilantro (Coriander)', 'Parsley', 'Dill', 'Fennel', 'Chervil', 'Mint']
const SIZES = ['Small tray (100g)', 'Medium tray (200g)', 'Large tray (400g)', 'Bulk (1kg+)']
const defaultItems = () => ({ variety: '', size: '', quantity: 1 })

export default function Order() {
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    customerType: 'individual', firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', postcode: '', deliveryDay: '', frequency: 'once',
    items: [defaultItems()], specialInstructions: '', howHeard: '',
  })

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }))
  const setItem = (index, field, value) => {
    const items = [...form.items]
    items[index] = { ...items[index], [field]: value }
    setForm(prev => ({ ...prev, items }))
  }
  const addItem = () => setForm(prev => ({ ...prev, items: [...prev.items, defaultItems()] }))
  const removeItem = (i) => setForm(prev => ({ ...prev, items: prev.items.filter((_, idx) => idx !== i) }))

  const step1Valid = form.firstName && form.lastName && form.email && form.phone
  const step2Valid = form.address && form.postcode && form.deliveryDay
  const step3Valid = form.items.every(i => i.variety && i.size)

  const submit = async () => {
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/order', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (res.ok) setSubmitted(true)
      else { const data = await res.json(); setError(data.message || 'Something went wrong. Please email us directly.') }
    } catch { setError('Could not send. Please email albiongreens@gmail.com directly.') }
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <Layout title="Order Confirmed">
        <div className="min-h-screen bg-parchment pt-40 pb-20 flex items-center justify-center px-6">
          <div className="max-w-lg text-center">
            <div className="w-20 h-20 rounded-full bg-forest flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10 text-parchment" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <div className="section-label justify-center">Order Received</div>
            <h1 className="display-heading text-4xl mb-4">Thank you, {form.firstName}!</h1>
            <div className="gold-divider mx-auto" />
            <p className="font-body text-ink-light leading-relaxed mb-4">We've received your order and will send a confirmation to <strong>{form.email}</strong> shortly.</p>
            <p className="font-body text-sm text-ink-light mb-10">We'll confirm availability and your delivery date within 24 hours. For urgent orders, WhatsApp us on <strong>07765 469434</strong>.</p>
            <a href="/" className="btn-primary">Back to Home</a>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Place an Order" description="Order fresh microgreens from Albion Greens. Delivered across London.">
      <section className="bg-forest pt-28 lg:pt-32 pb-14 lg:pb-16 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="section-label text-gold">Order Fresh</div>
          <h1 className="display-heading text-parchment text-3xl lg:text-5xl mb-4">Place Your Order</h1>
          <p className="font-body text-parchment/60 leading-relaxed">Fill in your details and we'll confirm your order and delivery date within 24 hours.</p>

          <div className="flex items-center gap-0 mt-10">
            {['Your Details', 'Delivery', 'Your Order'].map((label, i) => (
              <div key={label} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-label text-xs font-bold transition-all duration-500"
                    style={step > i + 1 ? { background: '#C9A84C', color: '#fff' } : step === i + 1 ? { background: '#F5F2EA', color: '#1E4D35' } : { background: 'rgba(245,242,234,0.2)', color: 'rgba(245,242,234,0.4)' }}>
                    {step > i + 1 ? '✓' : i + 1}
                  </div>
                  <span className="font-label text-[9px] tracking-widest uppercase mt-2 hidden sm:inline" style={{ color: step === i + 1 ? '#C9A84C' : 'rgba(245,242,234,0.3)' }}>{label}</span>
                </div>
                {i < 2 && <div className="flex-1 h-px mx-2 mb-4 transition-colors duration-500" style={{ background: step > i + 1 ? '#C9A84C' : 'rgba(245,242,234,0.2)' }} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-16 bg-parchment min-h-[60vh] px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          {step === 1 && (
            <div>
              <h2 className="font-display text-2xl lg:text-3xl font-medium text-forest mb-8">Your Details</h2>
              <div className="mb-8">
                <label className="font-label text-xs tracking-widest uppercase text-ink/60 block mb-3">I am ordering as</label>
                <div className="grid grid-cols-2 gap-3">
                  {[{ val: 'individual', label: 'Individual / Home' }, { val: 'restaurant', label: 'Restaurant / Chef' }, { val: 'caterer', label: 'Caterer / Vendor' }, { val: 'other', label: 'Other' }].map(opt => (
                    <button key={opt.val} type="button" onClick={() => set('customerType', opt.val)}
                      className="py-3 px-4 border-2 font-label text-xs tracking-widest uppercase transition-all duration-300"
                      style={form.customerType === opt.val ? { borderColor: '#1E4D35', background: '#1E4D35', color: '#F5F2EA' } : { borderColor: 'rgba(30,77,53,0.2)', color: 'rgba(26,26,26,0.6)' }}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div><label className="font-label text-xs tracking-widest uppercase text-ink/60 block mb-2">First Name *</label><input className="input-field" value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="Jane" /></div>
                <div><label className="font-label text-xs tracking-widest uppercase text-ink/60 block mb-2">Last Name *</label><input className="input-field" value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Smith" /></div>
                <div><label className="font-label text-xs tracking-widest uppercase text-ink/60 block mb-2">Email *</label><input className="input-field" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="jane@example.com" /></div>
                <div><label className="font-label text-xs tracking-widest uppercase text-ink/60 block mb-2">Phone / WhatsApp *</label><input className="input-field" type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="07700 000 000" /></div>
              </div>
              <div className="mt-8 flex justify-end">
                <button type="button" onClick={() => step1Valid && setStep(2)} disabled={!step1Valid} className={`btn-primary ${!step1Valid ? 'opacity-40 cursor-not-allowed' : ''}`}>Continue to Delivery →</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-display text-2xl lg:text-3xl font-medium text-forest mb-8">Delivery Details</h2>
              <div className="space-y-5">
                <div><label className="font-label text-xs tracking-widest uppercase text-ink/60 block mb-2">Street Address *</label><input className="input-field" value={form.address} onChange={e => set('address', e.target.value)} placeholder="123 Example Street" /></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div><label className="font-label text-xs tracking-widest uppercase text-ink/60 block mb-2">City</label><input className="input-field" value={form.city} onChange={e => set('city', e.target.value)} placeholder="London" /></div>
                  <div><label className="font-label text-xs tracking-widest uppercase text-ink/60 block mb-2">Postcode *</label><input className="input-field" value={form.postcode} onChange={e => set('postcode', e.target.value)} placeholder="W1A 1AA" /></div>
                </div>
                <div>
                  <label className="font-label text-xs tracking-widest uppercase text-ink/60 block mb-2">Preferred Delivery Day *</label>
                  <select className="select-field" value={form.deliveryDay} onChange={e => set('deliveryDay', e.target.value)}>
                    <option value="">Select a day</option>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-label text-xs tracking-widest uppercase text-ink/60 block mb-3">Frequency</label>
                  <div className="flex flex-wrap gap-3">
                    {[{ val: 'once', label: 'One-time order' }, { val: 'weekly', label: 'Weekly' }, { val: 'biweekly', label: 'Every 2 weeks' }].map(opt => (
                      <button key={opt.val} type="button" onClick={() => set('frequency', opt.val)}
                        className="py-2 px-5 border-2 font-label text-xs tracking-widest uppercase transition-all duration-300"
                        style={form.frequency === opt.val ? { borderColor: '#1E4D35', background: '#1E4D35', color: '#F5F2EA' } : { borderColor: 'rgba(30,77,53,0.2)', color: 'rgba(26,26,26,0.6)' }}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-between">
                <button type="button" onClick={() => setStep(1)} className="btn-secondary">← Back</button>
                <button type="button" onClick={() => step2Valid && setStep(3)} disabled={!step2Valid} className={`btn-primary ${!step2Valid ? 'opacity-40 cursor-not-allowed' : ''}`}>Choose Varieties →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-display text-2xl lg:text-3xl font-medium text-forest mb-8">Your Order</h2>
              <div className="space-y-5 mb-6">
                {form.items.map((item, i) => (
                  <div key={i} className="bg-white border border-forest/10 p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="font-label text-xs tracking-widest uppercase text-gold">Item {i + 1}</div>
                      {form.items.length > 1 && <button onClick={() => removeItem(i)} className="text-ink/30 hover:text-red-500 text-sm transition-colors">Remove</button>}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div><label className="font-label text-[10px] tracking-widest uppercase text-ink/50 block mb-2">Variety *</label>
                        <select className="select-field" value={item.variety} onChange={e => setItem(i, 'variety', e.target.value)}>
                          <option value="">Select variety</option>{VARIETIES.map(v => <option key={v} value={v}>{v}</option>)}
                        </select>
                      </div>
                      <div><label className="font-label text-[10px] tracking-widest uppercase text-ink/50 block mb-2">Size *</label>
                        <select className="select-field" value={item.size} onChange={e => setItem(i, 'size', e.target.value)}>
                          <option value="">Select size</option>{SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div><label className="font-label text-[10px] tracking-widest uppercase text-ink/50 block mb-2">Qty</label>
                        <input type="number" min="1" max="100" className="input-field" value={item.quantity} onChange={e => setItem(i, 'quantity', e.target.value)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button type="button" onClick={addItem} className="btn-secondary mb-8 text-xs">+ Add Another Variety</button>
              <div><label className="font-label text-xs tracking-widest uppercase text-ink/60 block mb-2">Special Instructions</label>
                <textarea className="input-field resize-none" rows={4} value={form.specialInstructions} onChange={e => set('specialInstructions', e.target.value)} placeholder="Any specific requirements or notes..." />
              </div>
              {error && <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 font-body text-sm">{error}</div>}
              <div className="mt-8 flex justify-between">
                <button type="button" onClick={() => setStep(2)} className="btn-secondary">← Back</button>
                <button type="button" onClick={submit} disabled={!step3Valid || submitting} className={`btn-primary ${(!step3Valid || submitting) ? 'opacity-40 cursor-not-allowed' : ''}`}>
                  {submitting ? 'Sending Order...' : 'Send Order →'}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}
