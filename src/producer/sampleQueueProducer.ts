import sampleQueue from "../queues/sampleQueue";

export default async function(name: string, payload: Record<string,unknown>){
    console.log("Trying to add job in sample queue");
    await sampleQueue.add(name, payload);
    console.log("Job has been added successfully");
}