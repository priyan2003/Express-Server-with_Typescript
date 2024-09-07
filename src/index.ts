import express,{Express} from "express";
import bodyParser from 'body-parser';
import serverconfig from './config/server.config';
import apiRouter from "./routes";
import SampleWorker from "./worker/SampleWorker";
import bullBoardAdapter from "./config/boardConfig";
// import runPython from "./containers/runPythonDocker"
import runJava from "./containers/runJavaDocker";
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
    const code = `
    import java.util.*;
        public class Main {
        public static void main(String[] args) {
        Scanner scn = new Scanner(System.in);
        int input = scn.nextInt();
        System.out.println("input value given by user: " + input);
        for(int i = 0; i < input; i++) {
        System.out.println(i);
        }
    }
  }
    `;
    const inputCase  =`10`;
    runJava(code,inputCase);
})