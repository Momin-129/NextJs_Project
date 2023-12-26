import * as schedule from "node-schedule";
import * as nodemailer from "nodemailer";




export const  ScheduleMail = (day:number,month:number,year:number,email:string)=>{

    const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Cycle Might Start',
    text: 'Some content to send',
    html: '<div><h2>Cycle</h2><br><h3>Your cycle might start today if so do start the cycle or atleast tell your bodyfriend to start it &#128521;.</h3></div>'
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


    const today = new Date();
    const executionTime = new Date(year, month-1, day, 19, 18, 0);
    console.log("Time",executionTime);
    schedule.scheduleJob(executionTime, () => {
    console.log('---------------------');
    console.log('Running Cron Process');
    // Delivering mail with sendMail method
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log(error);
        else console.log('Email sent: ' + info.response);
    });
    });
}


