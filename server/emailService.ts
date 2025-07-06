// Try to import nodemailer, but provide fallback if not installed
let nodemailer: any = null;
try {
  nodemailer = require('nodemailer');
} catch (error) {
  console.warn('Nodemailer not installed. Email functionality will be disabled.');
}

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

interface ContactEmailData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export class EmailService {
  private transporter: any = null;

  constructor(config: EmailConfig) {
    if (nodemailer) {
      this.transporter = nodemailer.createTransport(config);
    } else {
      console.warn('Email service initialized without nodemailer. Emails will not be sent.');
    }
  }

  async sendContactEmail(contactData: ContactEmailData, recipientEmail: string): Promise<boolean> {
    if (!this.transporter) {
      console.log('Email not sent - nodemailer not configured');
      console.log('Contact form submission:', {
        from: contactData.email,
        to: recipientEmail,
        subject: contactData.subject,
        message: contactData.message
      });
      return false;
    }

    try {
      const mailOptions = {
        from: `"Portfolio Contact Form" <${contactData.email}>`,
        to: recipientEmail,
        subject: `New Contact Form Submission: ${contactData.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #00d9ff; border-bottom: 2px solid #00d9ff; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Contact Information</h3>
              <p><strong>Name:</strong> ${contactData.firstName} ${contactData.lastName}</p>
              <p><strong>Email:</strong> ${contactData.email}</p>
              <p><strong>Subject:</strong> ${contactData.subject}</p>
            </div>
            
            <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #00d9ff; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Message</h3>
              <p style="line-height: 1.6; color: #555;">${contactData.message.replace(/\n/g, '<br>')}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 14px;">
                This message was sent from your portfolio contact form at ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        `,
        replyTo: contactData.email,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  async sendAutoReply(contactData: ContactEmailData): Promise<boolean> {
    if (!this.transporter) {
      console.log('Auto-reply not sent - nodemailer not configured');
      return false;
    }

    try {
      const mailOptions = {
        from: `"Sai Kumar Portfolio" <noreply@yourdomain.com>`,
        to: contactData.email,
        subject: "Thank you for your message - Sai Kumar Portfolio",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #00d9ff; border-bottom: 2px solid #00d9ff; padding-bottom: 10px;">
              Thank you for reaching out!
            </h2>
            
            <p>Dear ${contactData.firstName},</p>
            
            <p>Thank you for contacting me through my portfolio. I have received your message and will get back to you within 24 hours.</p>
            
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #333; margin-top: 0;">Your Message Summary:</h4>
              <p><strong>Subject:</strong> ${contactData.subject}</p>
              <p><strong>Message:</strong> ${contactData.message.substring(0, 100)}${contactData.message.length > 100 ? '...' : ''}</p>
            </div>
            
            <p>In the meantime, feel free to:</p>
            <ul>
              <li>Check out my latest projects on my portfolio</li>
              <li>Connect with me on LinkedIn</li>
              <li>Follow my GitHub for code updates</li>
            </ul>
            
            <p>Best regards,<br>Sai Kumar</p>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 12px;">
                This is an automated response. Please do not reply to this email.
              </div>
            </div>
          </div>
        `,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Auto-reply sent successfully:', info.messageId);
      return true;
    } catch (error) {
      console.error('Error sending auto-reply:', error);
      return false;
    }
  }
}

// Create a default email service instance
// You'll need to configure this with your actual email credentials
export const emailService = new EmailService({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || 'your-email@gmail.com',
    pass: process.env.SMTP_PASS || 'your-app-password',
  },
}); 