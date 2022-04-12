const nodemailer = require('nodemailer')



exports.sendEmail = async (options) =>{
    const transporer = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "a0aeefc83017ce",
          pass: "34a88d98b35211"
        },
        
     
        
 
    })


    const mailOptions = {
        from:"smtp.mailtrap.io" ,

        to: options.email,
        subject: options.subject,
        text: options.message
        
    }

    await transporer.sendMail(mailOptions)
}