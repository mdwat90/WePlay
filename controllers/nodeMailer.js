// Node Mailer

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'luke.karlovich@gmail.com',
    pass: 'JayPKBL5'
  }
});

var mailOptions = {
  from: 'luke.karlovich@gmail.com',
  to: 'luke.karlovich@gmail.com',
  subject: 'Sending Email using Node.js',
  html: '<card><h1>Welcome</h1><p>That was easy!</p><button>You could click here</button></card>'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});