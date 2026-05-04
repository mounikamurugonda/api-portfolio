import { Router } from 'express';
import { supabase } from '../lib/supabase.js';
import { Resend } from 'resend';

export const contactRouter = Router();

contactRouter.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    // 1. Save to Supabase
    const { error } = await supabase.from('contacts').insert([
      { name, email, message }
    ]);

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: 'Failed to save message to database' });
    }

    // 2. Send Email Notification via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        const emailResponse = await resend.emails.send({
          from: 'Portfolio <onboarding@resend.dev>', // You can update this once you verify a domain
          to: 'mouni.murugonda@gmail.com',
          subject: `New Portfolio Message from ${name}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #8b5cf6;">New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p style="background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #8b5cf6;">
                <strong>Message:</strong><br/>
                ${message}
              </p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="font-size: 12px; color: #666;">This email was sent from your AI Portfolio backend.</p>
            </div>
          `
        });

        if (emailResponse.error) {
          console.error('Resend email error:', emailResponse.error);
        }
      } catch (emailErr) {
        console.error('Failed to send email via Resend:', emailErr);
      }
    } else {
      console.warn('RESEND_API_KEY not configured - emails will not be sent');
    }

    res.status(200).json({ success: true, message: 'Message sent and saved successfully' });
  } catch (err) {
    console.error('Contact route error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
