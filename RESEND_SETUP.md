# Resend Setup

## 1. Create a Resend account

1. Go to [resend.com](https://resend.com/).
2. Create an API key in the dashboard.
3. Verify the domain you want to send from.

## 2. Configure environment variables

Add these values to `.env.local`:

```bash
RESEND_API_KEY=re_xxxxxxxxx
RESEND_FROM_EMAIL="Luna Lab <contact@your-domain.com>"
CONTACT_TO_EMAIL=hello@your-domain.com
```

Notes:

- `RESEND_FROM_EMAIL` must use a sender address from a verified domain in Resend.
- `CONTACT_TO_EMAIL` is the inbox that will receive website contact submissions.

## 3. Test locally

1. Start the app with `npm run dev`.
2. Submit the contact form.
3. Confirm the message appears in the destination inbox and in the Resend dashboard.

## 4. Route used by the form

The form posts to `POST /api/email/submit`, which sends the message through the Resend Node SDK on the server.
