import { Job } from "bullmq";
import { IJob } from "../types/bullMqJobDefinition";

export default class SubmissionJob implements IJob{
    name: string;
    payload: Record<string, unknown>;
    constructor(payload: Record<string, unknown>){
        this.payload = payload;
        this.name = this.constructor.name;
    }

    handle = (job?: Job) => {
        console.log("Handler of the job called");
        console.log(this.payload);
        if(job){
            console.log(Object.keys(this.payload));
        }
    };
    failed = (job?:Job) : void => {
        console.log("Job failed");
        if(job){
            console.log(job.id);
        }
    };
}