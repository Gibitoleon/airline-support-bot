import { Queue} from "bullmq"
import connection from "../config/redis/bullmq.config.js"

const emailQueue = new Queue("email", {
    connection,
    prefix:"bull"
});

export default emailQueue