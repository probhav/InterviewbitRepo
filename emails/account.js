
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, 
        pass: process.env.PASSWORD   
    }
});
const sendInterviewMail = (email, start , end)=>{
    const day = new Date(start).toDateString()
    const startTime = new Date(start).toLocaleTimeString()
    const endTime = new Date(end).toLocaleTimeString()
    let mailOptions = {
        from: 'schedule.interview123@gmail.com', 
        to: email, 
        subject: 'Interview Scheduled',
        text: `Hey user, your interview has been scheduled on ${day} from ${startTime} to ${endTime}`,
    };
    transporter.sendMail(mailOptions);
}

const sendUpdateMail = (email, start , end)=>{
    const day = new Date(start).toDateString()
    const startTime = new Date(start).toLocaleTimeString()
    const endTime = new Date(end).toLocaleTimeString()
    let mailOptions = {
        from: 'schedule.interview123@gmail.com', 
        to: email, 
        subject: 'Interview Updated',
        text: `Hey user, your interview has been upadated to new schedule : ${day} from ${startTime} to ${endTime}`,
    };
    transporter.sendMail(mailOptions);
}

module.exports = {sendInterviewMail,sendUpdateMail}