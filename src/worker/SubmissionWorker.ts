import { Job, Worker } from "bullmq";
import redisConnection from "../config/redisConfig";
import SubmissionJob from "../jobs/SubmissionJob";

export default function SubmissionWorker(queueName: string) {
    console.log("Inside submission worker");
    new Worker(
        queueName,
        async (job: Job) => {
            console.log(`Received job: ${job.id} with name: ${job.name}`);
            if (job.name === "SubmissionJob") {
                try {
                    const submissionJobInstance = new SubmissionJob(job.data);
                    console.log("Calling job handler");
                    await submissionJobInstance.handle(job);
                    console.log(`Job ${job.id} processed successfully.`);
                } catch (error) {
                    console.error(`Error processing job ${job.id}:`, error);
                }
            } else {
                console.log(`Unhandled job type: ${job.name}`);
            }
            return true;
        },
        {
            connection: redisConnection
        }
    );
}
