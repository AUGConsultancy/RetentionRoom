import { Router } from 'express'
import Lead from '../models/Lead.js'
import { transporter } from '../config/mailer.js'

const router = Router()

// POST /api/book-call
router.post('/book-call', async (req, res) => {
  try {
    const { name, email, channelLink, monthlyViews } = req.body

    if (!name || !email || !channelLink || !monthlyViews) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
      })
    }

    const lead = await Lead.create({ name, email, channelLink, monthlyViews })

    // Fire both emails in parallel; don't let email failure block the saved lead
    const adminMail = transporter.sendMail({
      from: `"Retention Room" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Lead from ${name}`,
      html: `
        <div style="font-family: Inter, Arial, sans-serif; background:#08080A; color:#F5F5F7; padding:32px;">
          <h2 style="color:#8B5CF6; margin-bottom:4px;">New Growth Call Request</h2>
          <p style="color:#9A9AA5; margin-top:0;">A creator just booked a call.</p>
          <table style="width:100%; border-collapse:collapse; margin-top:20px;">
            <tr><td style="padding:8px 0; color:#9A9AA5;">Name</td><td style="padding:8px 0;">${name}</td></tr>
            <tr><td style="padding:8px 0; color:#9A9AA5;">Email</td><td style="padding:8px 0;">${email}</td></tr>
            <tr><td style="padding:8px 0; color:#9A9AA5;">Channel</td><td style="padding:8px 0;"><a href="${channelLink}" style="color:#D9FF3D;">${channelLink}</a></td></tr>
            <tr><td style="padding:8px 0; color:#9A9AA5;">Monthly Views</td><td style="padding:8px 0;">${monthlyViews}</td></tr>
          </table>
        </div>
      `,
    })

    const clientMail = transporter.sendMail({
      from: `"Retention Room" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Welcome to the Retention Room',
      html: `
        <div style="font-family: Inter, Arial, sans-serif; background:#08080A; color:#F5F5F7; padding:32px;">
          <h2 style="color:#8B5CF6;">Welcome to the Retention Room, ${name}.</h2>
          <p style="color:#C9C9D1; line-height:1.6;">
            Thanks for booking a growth call. We will review your channel
            and get back to you within 24 hours with a straight answer on
            whether we're a fit.
          </p>
          <p style="color:#9A9AA5; margin-top:24px;">— The Retention Room Team</p>
        </div>
      `,
    })

    const results = await Promise.allSettled([adminMail, clientMail])
    const emailFailed = results.some((r) => r.status === 'rejected')
    if (emailFailed) {
      console.error(
        'One or more lead emails failed to send:',
        results.filter((r) => r.status === 'rejected')
      )
    }

    return res.status(201).json({
      success: true,
      message: 'Lead saved and notifications sent.',
      lead,
    })
  } catch (err) {
    console.error('Booking route error:', err)

    if (err.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: err.message })
    }

    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again shortly.',
    })
  }
})

export default router
