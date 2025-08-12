import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export interface ContactFormData {
  name: string;
  email: string;
  budget: string;
  projectType: string;
  message: string;
  company?: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
}

export const sendContactEmail = async (formData: ContactFormData): Promise<EmailResponse> => {
  try {
    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return {
        success: false,
        message: 'Please fill in all required fields.'
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        message: 'Please enter a valid email address.'
      };
    }

    // Prepare email template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      company: formData.company || 'Not specified',
      budget: formData.budget,
      project_type: formData.projectType,
      message: formData.message,
      to_name: 'Luna Lab Team',
      reply_to: formData.email,
    };

    // Send email via EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    if (response.status === 200) {
      return {
        success: true,
        message: 'Thank you! Your message has been sent successfully. We\'ll respond within 24 hours.'
      };
          } else {
        return {
          success: false,
          message: 'Something went wrong. Please try again or contact us directly at hello@lunalabs.com'
        };
      }

  } catch (error) {
    console.error('Email sending error:', error);
    return {
      success: false,
      message: 'Failed to send message. Please try again or contact us directly at hello@lunalabs.com'
    };
  }
};

// Auto-reply email to the user
export const sendAutoReply = async (userEmail: string, userName: string): Promise<void> => {
  try {
    const autoReplyParams = {
      to_email: userEmail,
      to_name: userName,
      from_name: 'Luna Lab Team',
      message: `Hi ${userName},

Thank you for reaching out to Luna Lab! We've received your project inquiry and are excited to learn more about your vision.

What happens next:
• Our team will review your project details within 4 hours
• We'll prepare a personalized response with next steps
• You'll hear back from us within 24 hours maximum

In the meantime, feel free to check out our recent work and client testimonials on our website.

Best regards,
The Luna Lab Team

---
This is an automated response. Please don't reply to this email.
For urgent matters, contact us directly at hello@lunalabs.com`
    };

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      'template_auto_reply', // You'll need to create this template
      autoReplyParams
    );
  } catch (error) {
    console.error('Auto-reply sending error:', error);
    // Don't throw error for auto-reply failure
  }
};