import express,{Express} from 'express';
import serverconfig from './config/server.config';

const app: Express = express();

app.listen(serverconfig.PORT,()=> {
    console.log(`Server has been started at ${serverconfig.PORT}`);
})