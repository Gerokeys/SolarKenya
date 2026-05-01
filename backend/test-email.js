require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

console.log('Testing with:', process.env.GMAIL_USER);
console.log('App password set:', process.env.GMAIL_APP_PASSWORD !== 'your_16_char_app_password_here' && !!process.env.GMAIL_APP_PASSWORD);

transporter.sendMail({
  from: `"SolarKenya Test" <${process.env.GMAIL_USER}>`,
  to: process.env.NOTIFY_EMAIL,
  subject: 'SolarKenya — Email Test',
  text: 'If you received this, nodemailer is configured correctly.',
}).then(() => {
  console.log('SUCCESS — email sent!');
}).catch((err) => {
  console.error('FAILED:', err.message);
  if (err.message.includes('Invalid login')) {
    console.log('\nFix: Your App Password is wrong or 2FA is not enabled on your Google account.');
    console.log('Go to: myaccount.google.com → Security → App passwords');
  }
  if (err.message.includes('Username and Password not accepted')) {
    console.log('\nFix: Gmail rejected the credentials.');
    console.log('Make sure you are using an App Password (16 chars), NOT your Gmail login password.');
  }
});
