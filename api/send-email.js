import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { firstName, lastName, email, company, projectDetails } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail app password
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'Pradeep.Minocha@TheTechBusiness.in',
      subject: 'New Contact Form Submission',
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Company: ${company || 'N/A'}
        Project Details: ${projectDetails}
      `,
    });

    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (err) {
    console.error('Error sending email:', err);
    return res.status(500).json({ message: 'Failed to send email.' });
  }
}
