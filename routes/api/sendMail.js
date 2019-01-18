const router = require("express").Router();
const transporter = require("../../controllers/nodeMailer");

console.log('sendMail file loaded');

router.post("/", (req, res) => {
    var emailToWho = req.body.emailToWho;
    var emailMessageContent = req.body.emailMessageContent;
    
    console.log(emailToWho)

    var mailOptions = {
        from: 'weplayapp1@gmail.com',
        to: emailToWho,
        subject: 'Message from WePlay',
        html: '<card><h1>Welcome</h1><p>' + emailMessageContent + '</p><a href="mailto:' + emailToWho + '"><button>Reply</button></a></card>'
    };

    console.log(mailOptions);

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.send(info.response);
        }
    });
})

module.exports = router;