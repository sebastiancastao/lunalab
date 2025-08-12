# EmailJS Setup Guide for Gmail Integration

## Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://emailjs.com)
2. Sign up for a free account
3. Verify your email address

## Step 2: Connect Gmail Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Select "Gmail" 
4. Click "Connect Account" and authorize with your Gmail
5. Copy the **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template
1. Go to "Email Templates" in EmailJS dashboard
2. Click "Create New Template"
3. Use this template:

```
Subject: 🌙 New Project Inquiry from {{from_name}} - Luna Labs

From: {{from_name}} ({{from_email}})
Company: {{company}}
Budget: {{budget}}
Project Type: {{project_type}}

Message:
{{message}}

---
Reply to: {{from_email}}
Submitted via: Luna Labs Contact Form
```

4. Save template and copy the **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key
1. Go to "Account" > "General"
2. Copy your **Public Key** (e.g., `pub_123abc456def`)

## Step 5: Add Environment Variables
Create a `.env.local` file in your project root with:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here  
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

Replace the values with your actual EmailJS credentials.

## Step 6: Test Your Setup
1. Restart your development server: `npm run dev`
2. Fill out and submit the contact form
3. Check your Gmail inbox for the email
4. Check the browser console for any errors

## Security Notes
- EmailJS Public Key is safe to expose in frontend
- Gmail integration is secure through OAuth
- Rate limiting: 200 emails/month on free plan
- For production: Consider upgrading to EmailJS paid plan

## Troubleshooting
- **No emails received**: Check Gmail spam folder
- **403 Forbidden**: Verify Public Key is correct
- **Template not found**: Check Template ID matches
- **Service not found**: Verify Service ID and Gmail connection

## Alternative Options
If you prefer other methods:
1. **Netlify Forms**: Built-in form handling
2. **Formspree**: External form service  
3. **Next.js API Route**: Custom backend solution
4. **Gmail API**: Direct integration (more complex)

---
Need help? Check the console for error messages or contact support.