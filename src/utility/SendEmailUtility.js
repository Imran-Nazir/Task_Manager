const nodemailer = require('nodemailer');
const SendEmailUtility = async (EmailTo, EmailText, EmailSubject)=>{
    let transponder = nodemailer.createTransport({
        host: 'mail.teamrabbil.com',
        port: 25,
        security: false,
        auth: {
            user: "info@teamrabbil.com",
            pass: "~sR4[bhaC[Qs"
        }, 
        tls: {rejectUnauthorized: false}
    });

    let mailOptions = {
        from : 'Task Manager MERN <info@teamrabbil.com>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    }
    return await transponder.sendMail(mailOptions);
}

module.exports = SendEmailUtility;