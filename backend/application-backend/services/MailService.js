import mailSender from "../config/mail/mail.config.js";

export default class MailService {

    static async sendMail(to, subject, htmlContent) {
        const mailOptions = {
            from: process.env.MAIL_FROM,
            to,
            subject,
            html: htmlContent
        };

        await mailSender.sendMail(mailOptions);
    }
}
