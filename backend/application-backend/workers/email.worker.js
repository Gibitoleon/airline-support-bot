
import { Worker } from "bullmq";

import connection from "../config/redis/bullmq.config.js";
import MailService from "../services/MailService.js";
import TemplateService from "../services/TemplateService.js";



const emailWorker = new Worker(
    "email",
    async (job) => {
        const { to, name, invitationLink } = job.data;

        const htmlContent = await TemplateService.render(
            "invitation",
            {
                name,
                invitationLink
            }
        );

        await MailService.sendMail(
            to,
            "Staff Account Invitation",
            htmlContent
        );
    },
    {
        connection
    }
);

emailWorker.on("completed", (job) => {
    console.log(`Email job ${job.id} completed`);
});

emailWorker.on("failed", (job, err) => {
    console.error(`Email job ${job?.id} failed:`, err);
});


console.log("Email worker started");

