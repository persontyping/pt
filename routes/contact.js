const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Use Express's built-in body parser
router.use(express.urlencoded({ extended: false }));

// GET: Show the contact form
router.get('/', function (req, res, next) {
  res.render('contact', { title: "Contact" });
});

// POST: Handle form submission
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  // ⚠️ Replace these with environment variables in production
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,           // or 587 with secure:false
    secure: true,        // true for 465, false for 587 (STARTTLS)
    auth: { user: process.env.CONTACT_EMAIL, pass: process.env.CONTACT_PASS },
    logger: true,
    debug: true,
  });
  transporter.verify().then(() => console.log('SMTP OK')).catch(console.error);

  const mailOptions = {
    from: email,
    to: process.env.CONTACT_EMAIL,
    subject: `Contact Form from ${name}`,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    res.render('response', { message: 'Thanks for contacting us!' });
  } catch (err) {
    console.error('Email failed:', {
      code: err.code,
      command: err.command,
      responseCode: err.responseCode,
      message: err.message,
    });
    console.error('Email failed:', err);
    res.status(500).send('Something went wrong. Please try again later.');
  }
});

module.exports = router;
