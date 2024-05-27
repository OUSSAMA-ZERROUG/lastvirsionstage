

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'votre_email@hotmail.com',
    pass: 'votre_mot_de_passe'
  }
});

const sendEmail = (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: 'votre_email@hotmail.com',
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
    } else {
      console.log('E-mail envoyé avec succès:', info.response);
    }
  });
};

export default sendEmail;
