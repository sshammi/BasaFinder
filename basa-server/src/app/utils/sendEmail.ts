import nodemailer from 'nodemailer';

export const sendEmail = async (from:string,to: string, html: string) => {
    //console.log("paisi::",from,to,html);
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'shammisuraiya26@gmail.com',
      pass: 'dcqa cmgf yduc zvwc',
    },
  });

  await transporter.sendMail({
    from, // sender address
    to, // list of receivers
    subject: 'Rental request', // Subject line
    text: '', // plain text body
    html, // html body
  });
};