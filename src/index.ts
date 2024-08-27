import express,{Express} from "express";
import serverconfig from './config/server.config';
import apiRouter from "./routes";
//import sampleQueueProducer from "./producer/sampleQueueProducer";
import SampleWorker from "./worker/SampleWorker";
import bullBoardAdapter from "./config/boardConfig";

const app: Express = express();

app.use('/api',apiRouter);
app.use('/ui', bullBoardAdapter.getRouter());
app.listen(serverconfig.PORT,() => {
    console.log(`Server has been started at ${serverconfig.PORT}`);
    console.log(`BullBoard dashboard running on: http://localhost:${serverconfig.PORT}/ui`);
    SampleWorker('SampleQueue');
    
})