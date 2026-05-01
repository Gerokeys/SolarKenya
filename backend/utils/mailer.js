const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const sendLeadNotification = async (lead) => {
  const isQuote = lead.type === 'quote';

  const subject = isQuote
    ? `New Quote Request from ${lead.name} — SolarKenya`
    : `New Contact Inquiry from ${lead.name} — SolarKenya`;

  const quoteRows = isQuote ? `
    <tr><td style="padding:8px 0;color:#7A6B5E;font-size:13px;">Monthly Bill</td><td style="padding:8px 0;font-weight:600;">KES ${lead.monthlyBill ?? '—'}</td></tr>
    <tr><td style="padding:8px 0;color:#7A6B5E;font-size:13px;">System Size</td><td style="padding:8px 0;font-weight:600;">${lead.estimatedSystemSize ?? '—'}</td></tr>
    <tr><td style="padding:8px 0;color:#7A6B5E;font-size:13px;">Estimated Cost</td><td style="padding:8px 0;font-weight:600;">${lead.estimatedCost ?? '—'}</td></tr>
  ` : '';

  const html = `
    <div style="font-family:DM Sans,Arial,sans-serif;max-width:600px;margin:0 auto;background:#F5EAD3;">
      <div style="background:#0D0A05;padding:24px 32px;">
        <span style="font-family:Georgia,serif;font-size:22px;letter-spacing:4px;color:#fff;">
          SOLAR<span style="color:#F59E0B;">KENYA</span>
        </span>
      </div>

      <div style="background:#F59E0B;padding:16px 32px;">
        <p style="margin:0;color:#fff;font-size:13px;letter-spacing:3px;text-transform:uppercase;font-weight:700;">
          ${isQuote ? 'New Quote Request' : 'New Contact Inquiry'}
        </p>
      </div>

      <div style="padding:32px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#7A6B5E;font-size:13px;">Name</td><td style="padding:8px 0;font-weight:600;">${lead.name}</td></tr>
          <tr><td style="padding:8px 0;color:#7A6B5E;font-size:13px;">Phone</td><td style="padding:8px 0;font-weight:600;">${lead.phone}</td></tr>
          <tr><td style="padding:8px 0;color:#7A6B5E;font-size:13px;">Email</td><td style="padding:8px 0;font-weight:600;">${lead.email || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#7A6B5E;font-size:13px;">Location</td><td style="padding:8px 0;font-weight:600;">${lead.location}</td></tr>
          ${quoteRows}
        </table>

        ${lead.message ? `
          <div style="margin-top:24px;padding:16px;background:#FAF6EE;border-left:3px solid #F59E0B;">
            <p style="margin:0 0 6px;color:#7A6B5E;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Message</p>
            <p style="margin:0;color:#0D0A05;line-height:1.6;">${lead.message}</p>
          </div>
        ` : ''}

        <div style="margin-top:32px;padding-top:24px;border-top:1px solid #E8D5B0;">
          <a href="${process.env.FRONTEND_URL}/admin/leads" style="display:inline-block;background:#F59E0B;color:#fff;text-decoration:none;padding:12px 24px;font-weight:700;font-size:13px;letter-spacing:2px;text-transform:uppercase;">
            View in Admin →
          </a>
        </div>
      </div>

      <div style="background:#0D0A05;padding:16px 32px;">
        <p style="margin:0;color:#ffffff40;font-size:11px;letter-spacing:2px;text-transform:uppercase;">SolarKenya Admin Notification</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"SolarKenya" <${process.env.GMAIL_USER}>`,
    to: process.env.NOTIFY_EMAIL || process.env.GMAIL_USER,
    subject,
    html,
  });
};

module.exports = { sendLeadNotification };
