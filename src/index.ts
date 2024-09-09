import express,{Express} from "express";
import bodyParser from 'body-parser';
import serverconfig from './config/server.config';
import apiRouter from "./routes";
//import SampleWorker from "./worker/SampleWorker";
import SubmissionWorker from "./worker/SubmissionWorker";
import bullBoardAdapter from "./config/boardConfig";
// import sampleQueueProducer from "./producer/sampleQueueProducer";
import submissionQueueProducer from "./producer/submissionQueueProducer";
import { submission_queue } from "./utils/constants";
// import runPython from "./containers/runPythonDocker"
//import runJava from "./containers/runJavaDocker";
// import runCpp from "./containers/runCpp";

const app: Express = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/api',apiRouter);
app.use('/ui', bullBoardAdapter.getRouter());
app.listen(serverconfig.PORT,() => {
    console.log(`Server has been started at ${serverconfig.PORT}`);
    console.log(`BullBoard dashboard running on: http://localhost:${serverconfig.PORT}/ui`);

    // sampleQueueProducer('SampleJob',{
    //   name: "Priyanshu",
    //   RollNo: 2201124,
    //   Address: "Haryana"
    // })
    //SampleWorker('SampleQueue');
   

    const userCode = `
      class Solution {
        public:
          vector<int> permute(){
            vector<int> v;
            v.push_back(10);
            return v;
          }
      };
    `;
    // // Internal code or Driver code
    const code = `
    #include <bits/stdc++.h>
    using namespace std;

    ${userCode}
    int main(){
      Solution s;
      
      vector<int> result = s.permute();
      for(int x: result){
        cout<<x<<" ";
      }
      cout<<endl;
      return 0;
    }
    `;
    
     const inputCase  =`10`;
     submissionQueueProducer({"1234": {
        language: "CPP",
        inputCase,
        code
     }});
     SubmissionWorker(submission_queue);
     
    //  runCpp(code,inputCase);
})