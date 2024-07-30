import nodemailer from 'nodemailer';

export async function POST(req, res) {
  const { name, email, message } = await req.json();

  // Create a Nodemailer transporter using your SMTP settings
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Set up HTML email options with a background image
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECIPIENT_EMAIL,
    subject: `Feedback from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; background: url('https://firebasestorage.googleapis.com/v0/b/melodyai-e8496.appspot.com/o/mail-bg.jpg?alt=media&token=745d7b8f-802d-478f-85b4-8ac39b4e9f55') no-repeat center center; background-size: cover; padding: 20px; color: #333;">
        <div style="background: rgba(255, 255, 255, 0.8); padding: 20px; border-radius: 10px;">
          <h2 style="color: #333;">You have received a new feedback!</h2>
          <p style="color: #555;"><strong>Name:</strong> ${name}</p>
          <p style="color: #555;"><strong>Email:</strong> ${email}</p>
          <p style="color: #555;"><strong>Message:</strong></p>
          <p style="color: #555; background: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      </div>
    `,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: 'Feedback sent successfully!' }), { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Failed to send feedback. Please try again.' }), { status: 500 });
  }
}
