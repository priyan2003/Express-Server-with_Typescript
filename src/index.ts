import express,{Express} from "express";
import bodyParser from 'body-parser';
import serverconfig from './config/server.config';
import apiRouter from "./routes";
import SampleWorker from "./worker/SampleWorker";
import bullBoardAdapter from "./config/boardConfig";

const app: Express = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/api',apiRouter);
app.use('/ui', bullBoardAdapter.getRouter());
app.listen(serverconfig.PORT,() => {
    console.log(`Server has been started at ${serverconfig.PORT}`);
    console.log(`BullBoard dashboard running on: http://localhost:${serverconfig.PORT}/ui`);
    SampleWorker('SampleQueue');
    
})