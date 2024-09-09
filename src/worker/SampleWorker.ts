import { Job,Worker } from 'bullmq';

import SampleJob from '../jobs/SampleJob';
import redisConnection from '../config/redisConfig';
// import { IJob } from '../types/bullMqJobDefinition';
export default function SampleWorker(queueName: string){
    //console.log("Setup the connection for redis", redisConnection);
    new Worker(
        queueName,
        async (job: Job) => {
            console.log("sample job worker kicking");
            if(job.name === "SampleJob"){
                const sampleJobInstance = new SampleJob(job.data);

                sampleJobInstance.handle(job);

                return true;
            }
        },
        {
            connection: redisConnection
        }
    );
}