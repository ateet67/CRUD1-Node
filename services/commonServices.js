const nodemailer = require("nodemailer");

module.exports.SendMail = async (email, subject, payload, template) => {

    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    let options = {
        from: '"Fred Foo 👻" <foo@example.com>',
        to: "ateetprajapati2425@gmail.com",
        subject: "Hiiii",
        html: `<h1>Hey</h1>`,
    };

    await transporter.sendMail(options, (error, info) => {
        if (error) {
            // console.log(error);
            return error;
        } else {
            console.log(info);
        }
    });
}