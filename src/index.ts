import express,{Express} from "express";
import serverconfig from './config/server.config';
import apiRouter from "./routes";
import sampleQueueProducer from "./producer/sampleQueueProducer";
import SampleWorker from "./worker/SampleWorker";

const app: Express = express();

app.use('/api',apiRouter)
app.listen(serverconfig.PORT,() => {
    console.log(`Server has been started at ${serverconfig.PORT}`);

    SampleWorker('SampleQueue');
    sampleQueueProducer('SampleJob',{
        name: "Priyanshu",
        branch: "CSE",
        position: "SDE1",
        location: "Bangalore"
    });
})