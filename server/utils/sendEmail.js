import nodemailer from 'nodemailer';

export const sendEmail = async (to, subject, html) => {

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: `"URL Shortener" <${process.env.EMAIL_USERNAME}>`,
        to,
        subject,
        html,
    };

    await transporter.sendMail(mailOptions);
};


export const sendRegisterEmail = async (to, subject, html) => {

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: `"EasyURL" <${process.env.EMAIL_USERNAME}>`,
        to,
        subject,
        html,
    };

    await transporter.sendMail(mailOptions);
};
