import { PYTHON_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";

async function runPython(code: string, inputTestCase: string){
    const rawLogBuffer: Buffer[] = [];
    console.log("Initialising a new python docker container");

    const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > test.py && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | python3 test.py` ;
    const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
        '/bin/sh',
        '-c',
        runCommand
    ]);

    await pythonDockerContainer.start();
    console.log('Docker container has started');

    const loggerStream = await pythonDockerContainer.logs({
        stdout: true,
        stderr: true,
        timestamps: false,
        follow: true
    });
    // Attach events on the stream objects to start and stop reading
    loggerStream.on('data', (chunk) =>{
        rawLogBuffer.push(chunk);
    });
    // When all logs in the code is finished
    loggerStream.on('end' ,() => {
        console.log(rawLogBuffer);
        const completeBuffer = Buffer.concat(rawLogBuffer);
        const decodedStream = decodeDockerStream(completeBuffer);
        console.log(decodedStream);
        console.log(decodedStream.stdout)
    })

    return pythonDockerContainer;
}
export default runPython;