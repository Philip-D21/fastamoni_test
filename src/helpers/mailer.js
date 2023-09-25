const nodemailer = require('nodemailer');


const mail = async (user) => {
  try {
   
    const transporter = nodemailer.createTransport({
      service: process.env.HOST,
      auth: {
        user: process.env.EMAIL_ADDRESS, 
        pass: process.env.EMAIL_PROCESS, 
      },
    });

    
    const mailOptions = {
      from: 'your-email@example.com', 
      to: user.email,
      subject: 'Thank You for Your Donations',
      text: `Dear ${user.username},\n\nThank you for making multiple donations. We appreciate your support!`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


module.exports = mail;
