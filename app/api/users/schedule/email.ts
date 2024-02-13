import * as nodemailer from "nodemailer";




export const  ScheduleMail = (day:number,month:number,year:number,email:string)=>{

    const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Cycle Might Start',
    text: 'USMIESKA',
    html: `<div><h2>Cycle</h2><br><h3>Your cycle might start on ${day}/${month}/${year}, so do remember to start the cycle or  tell your bodyfriend to start it &#128521;.</h3></div>`
    };

    // Mail transport configuration
    const transporter: nodemailer.Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    },
    });


    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log(error);
        else console.log('Email sent: ' + info.response);
    });
  
}


