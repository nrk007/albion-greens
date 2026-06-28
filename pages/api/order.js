import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })

  const { customerType, firstName, lastName, email, phone, address, city, postcode, deliveryDay, frequency, items, specialInstructions, howHeard } = req.body
  if (!firstName || !lastName || !email || !items?.length) return res.status(400).json({ message: 'Missing required fields' })

  const itemsHtml = items.map((item, i) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;">${i + 1}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${item.variety}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${item.size}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${item.quantity}</td></tr>`).join('')

  try {
    await resend.emails.send({
      from: 'Albion Greens <onboarding@resend.dev>',
      to: ['albiongreens@gmail.com'],
      subject: `New Order from ${firstName} ${lastName} (${customerType})`,
      html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1A1A1A;">
        <div style="background:#1E4D35;padding:24px 32px;"><h1 style="color:#F5F2EA;font-size:24px;margin:0;font-weight:300;">New Order Received</h1></div>
        <div style="padding:32px;">
          <h2 style="font-size:16px;color:#1E4D35;border-bottom:2px solid #C9A84C;padding-bottom:8px;">Customer Details</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:6px 0;color:#999;width:140px;">Name</td><td>${firstName} ${lastName}</td></tr>
            <tr><td style="padding:6px 0;color:#999;">Type</td><td style="text-transform:capitalize;">${customerType}</td></tr>
            <tr><td style="padding:6px 0;color:#999;">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:6px 0;color:#999;">Phone</td><td><a href="tel:${phone}">${phone}</a></td></tr>
          </table>
          <h2 style="font-size:16px;color:#1E4D35;border-bottom:2px solid #C9A84C;padding-bottom:8px;margin-top:24px;">Delivery</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:6px 0;color:#999;width:140px;">Address</td><td>${address}${city ? `, ${city}` : ''}, ${postcode}</td></tr>
            <tr><td style="padding:6px 0;color:#999;">Day</td><td>${deliveryDay}</td></tr>
            <tr><td style="padding:6px 0;color:#999;">Frequency</td><td style="text-transform:capitalize;">${frequency}</td></tr>
          </table>
          <h2 style="font-size:16px;color:#1E4D35;border-bottom:2px solid #C9A84C;padding-bottom:8px;margin-top:24px;">Order Items</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <thead><tr style="background:#EAF2EC;"><th style="padding:10px 12px;text-align:left;font-size:11px;">#</th><th style="padding:10px 12px;text-align:left;font-size:11px;">Variety</th><th style="padding:10px 12px;text-align:left;font-size:11px;">Size</th><th style="padding:10px 12px;text-align:left;font-size:11px;">Qty</th></tr></thead>
            <tbody>${itemsHtml}</tbody>
          </table>
          ${specialInstructions ? `<h2 style="font-size:16px;color:#1E4D35;border-bottom:2px solid #C9A84C;padding-bottom:8px;margin-top:24px;">Notes</h2><p style="font-size:14px;background:#F5F2EA;padding:12px;border-left:3px solid #C9A84C;">${specialInstructions}</p>` : ''}
        </div></div>`,
      replyTo: email,
    })

    await resend.emails.send({
      from: 'Albion Greens <hello@albiongreens.co.uk>',
      to: [email],
      subject: `We've received your order, ${firstName}!`,
      html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1A1A1A;">
        <div style="background:#1E4D35;padding:24px 32px;"><h1 style="color:#F5F2EA;font-size:24px;margin:0;font-weight:300;">Order Received</h1></div>
        <div style="padding:32px;">
          <p style="font-size:16px;">Hi ${firstName},</p>
          <p style="font-size:14px;line-height:1.7;color:#5A5A5A;">Thank you for your order! We'll be in touch within 24 hours to confirm availability and your delivery date for <strong>${deliveryDay}</strong>.</p>
          <div style="margin-top:24px;padding:20px;background:#EAF2EC;border-left:4px solid #1E4D35;">
            <p style="margin:0;font-size:13px;color:#1E4D35;font-weight:600;">Your order</p>
            <p style="margin:4px 0 0;font-size:13px;color:#5A5A5A;">${items.map(i => `${i.variety} — ${i.size} × ${i.quantity}`).join('<br/>')}</p>
          </div>
          <p style="font-size:13px;color:#999;margin-top:32px;">Albion Greens · Park Royal, London<br/>albiongreens@gmail.com · 07765 469434</p>
        </div></div>`,
    })

    return res.status(200).json({ message: 'Order received' })
  } catch (err) {
    console.error('Order email error:', err)
    return res.status(500).json({ message: 'Failed to send email' })
  }
}
