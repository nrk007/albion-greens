import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })
  const { businessName, contactName, email, phone, businessType, weeklyVolume, deliveryDays, varieties, message } = req.body
  if (!businessName || !contactName || !email) return res.status(400).json({ message: 'Missing required fields' })

  try {
    await resend.emails.send({
      from: 'Albion Greens Website <trade@albiongreens.co.uk>',
      to: ['albiongreens@gmail.com'],
      subject: `Trade Enquiry: ${businessName} (${businessType})`,
      html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1A1A1A;">
        <div style="background:#1E4D35;padding:24px 32px;"><h1 style="color:#F5F2EA;font-size:24px;margin:0;font-weight:300;">New Trade Enquiry</h1></div>
        <div style="padding:32px;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:8px 0;color:#999;width:160px;">Business</td><td><strong>${businessName}</strong></td></tr>
            <tr><td style="padding:8px 0;color:#999;">Contact</td><td>${contactName}</td></tr>
            <tr><td style="padding:8px 0;color:#999;">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#999;">Phone</td><td>${phone || 'N/A'}</td></tr>
            <tr><td style="padding:8px 0;color:#999;">Volume</td><td>${weeklyVolume || 'N/A'}</td></tr>
            <tr><td style="padding:8px 0;color:#999;">Days</td><td>${deliveryDays?.join(', ') || 'N/A'}</td></tr>
            <tr><td style="padding:8px 0;color:#999;">Varieties</td><td>${varieties?.length ? varieties.join(', ') : 'N/A'}</td></tr>
          </table>
          ${message ? `<div style="margin-top:24px;padding:16px;background:#F5F2EA;border-left:3px solid #C9A84C;"><p style="margin:0;font-size:14px;">${message}</p></div>` : ''}
        </div></div>`,
      replyTo: email,
    })

    await resend.emails.send({
      from: 'Albion Greens <hello@albiongreens.co.uk>',
      to: [email],
      subject: `Trade enquiry received — Albion Greens`,
      html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1A1A1A;">
        <div style="background:#1E4D35;padding:24px 32px;"><h1 style="color:#F5F2EA;font-size:22px;margin:0;font-weight:300;">Trade Enquiry Received</h1></div>
        <div style="padding:32px;">
          <p>Hi ${contactName},</p>
          <p style="line-height:1.7;color:#5A5A5A;font-size:14px;">Thank you for your interest in partnering with Albion Greens. We've received your enquiry for <strong>${businessName}</strong> and will be in touch within 24 hours.</p>
          <p style="font-size:13px;color:#999;margin-top:32px;">Albion Greens · Park Royal, London<br/>albiongreens@gmail.com · 07765 469434</p>
        </div></div>`,
    })

    return res.status(200).json({ message: 'Enquiry received' })
  } catch (err) {
    console.error('Trade email error:', err)
    return res.status(500).json({ message: 'Failed to send email' })
  }
}
