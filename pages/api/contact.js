import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })
  const { name, email, subject, message } = req.body
  if (!name || !email || !message) return res.status(400).json({ message: 'Missing required fields' })

  try {
    await resend.emails.send({
      from: 'Albion Greens Website <hello@albiongreens.co.uk>',
      to: ['albiongreens@gmail.com'],
      subject: `Contact Form: ${subject || 'General Enquiry'} — from ${name}`,
      html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#1E4D35;padding:24px 32px;"><h1 style="color:#F5F2EA;font-size:22px;margin:0;font-weight:300;">New Contact Message</h1></div>
        <div style="padding:32px;">
          <table style="width:100%;font-size:14px;border-collapse:collapse;">
            <tr><td style="padding:6px 0;color:#999;width:100px;">From</td><td>${name}</td></tr>
            <tr><td style="padding:6px 0;color:#999;">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:6px 0;color:#999;">Subject</td><td>${subject || '—'}</td></tr>
          </table>
          <div style="margin-top:20px;padding:16px;background:#F5F2EA;border-left:3px solid #C9A84C;font-size:14px;line-height:1.7;">${message}</div>
        </div></div>`,
      replyTo: email,
    })
    return res.status(200).json({ message: 'Message sent' })
  } catch (err) {
    console.error('Contact email error:', err)
    return res.status(500).json({ message: 'Failed to send message' })
  }
}
