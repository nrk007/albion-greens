import { useState } from 'react'
import Layout from '../components/Layout'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const set = (f, v) => setForm(prev => ({ ...prev, [f]: v }))
  const valid = form.name && form.email && form.message

  const submit = async () => {
    setSubmitting(true); setError('')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (res.ok) setSubmitted(true)
      else setError('Something went wrong. Please email us directly.')
    } catch { setError('Could not send message.') }
    setSubmitting(false)
  }

  return (
    <Layout title="Contact" description="Get in touch with Albion Greens.">
      <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-20 overflow-hidden px-6 lg:px-12">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=1600&q=85" alt="Microgreens" className="w-full h-full object-cover" style={{ filter: 'brightness(0.18)' }} />
          <div className="absolute inset-0 bg-forest/85" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="section-label text-gold">Get in Touch</div>
          <h1 className="font-display font-light text-parchment mb-4" style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)', lineHeight: 1.05 }}>
            Let's Talk<br /><em className="text-gold not-italic">Microgreens.</em>
          </h1>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-parchment px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-1">
            <div className="space-y-8 lg:space-y-10">
              {[
                { label: 'Email', icon: '✉️', content: <a href="mailto:albiongreens@gmail.com" className="font-body text-sm text-forest hover:text-gold transition-colors duration-300">albiongreens@gmail.com</a> },
                { label: 'Phone & WhatsApp', icon: '📱', content: <a href="tel:07765469434" className="font-body text-sm text-forest hover:text-gold transition-colors duration-300">07765 469434</a> },
                { label: 'Location', icon: '📍', content: <p className="font-body text-sm text-ink-light">Park Royal, London</p> },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex items-center gap-3 mb-2"><span className="text-xl">{item.icon}</span><div className="font-label text-xs tracking-widest uppercase text-gold">{item.label}</div></div>
                  <div className="ml-9">{item.content}</div>
                </div>
              ))}
              <div className="pt-6 border-t border-forest/10">
                <div className="section-label">Quick Actions</div>
                <div className="flex flex-col gap-3">
                  <a href="https://wa.me/447765469434" target="_blank" rel="noopener noreferrer" className="btn-primary text-xs py-3 justify-center">💬 WhatsApp Us</a>
                  <a href="mailto:albiongreens@gmail.com" className="btn-secondary text-xs py-3 justify-center">✉️ Send Email</a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="w-16 h-16 rounded-full bg-forest flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-parchment" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="font-display text-2xl lg:text-3xl text-forest mb-3">Message sent!</h3>
                <p className="font-body text-ink-light">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <div>
                <h2 className="font-display text-2xl lg:text-3xl font-medium text-forest mb-8">Send a Message</h2>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div><label className="font-label text-xs tracking-widest uppercase text-ink/60 block mb-2">Your Name *</label><input className="input-field" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Jane Smith" /></div>
                    <div><label className="font-label text-xs tracking-widest uppercase text-ink/60 block mb-2">Email *</label><input className="input-field" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="jane@example.com" /></div>
                  </div>
                  <div><label className="font-label text-xs tracking-widest uppercase text-ink/60 block mb-2">Subject</label>
                    <select className="select-field" value={form.subject} onChange={e => set('subject', e.target.value)}>
                      <option value="">Select a topic</option><option>General enquiry</option><option>Place an order</option><option>Trade / wholesale account</option><option>Delivery question</option><option>Other</option>
                    </select>
                  </div>
                  <div><label className="font-label text-xs tracking-widest uppercase text-ink/60 block mb-2">Message *</label>
                    <textarea className="input-field resize-none" rows={6} value={form.message} onChange={e => set('message', e.target.value)} placeholder="Tell us what you need..." />
                  </div>
                  {error && <div className="p-4 bg-red-50 border border-red-200 text-red-700 font-body text-sm">{error}</div>}
                  <button type="button" onClick={submit} disabled={!valid || submitting} className={`btn-primary w-full justify-center ${(!valid || submitting) ? 'opacity-40 cursor-not-allowed' : ''}`}>
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                  <p className="font-body text-xs text-ink/40 text-center">Or reach us directly at albiongreens@gmail.com · 07765 469434</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}
