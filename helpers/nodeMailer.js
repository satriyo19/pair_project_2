let nodemailer = require('nodemailer');

let sendMail = (emailUser) => {
  const senderMail = "socialku69@gmail.com";
  const emailTransporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    service: 'gmail',
    secure: true,
    auth: {
      user: senderMail,
      pass: 'iubxhmlpttjzbbby'
    },
    debug: false,
    logger: true   //<---highly recommend this one here
  });


  const mailOptions = {
    from: senderMail, // sender address
    to: emailUser, // list of receivers
    subject: 'BERHASIL REGISTER -- EXTRAGAMINDER', // Subject line
    html: '<p>Succes register, feel free to post </p>'// plain text body
  };

  emailTransporter.sendMail(mailOptions, function (err, info) {
    if (err)
      console.log(err)
    else
      console.log(info);
  });
}

// sendMail('rahmathikaru03@gmail.com')
module.exports = sendMail