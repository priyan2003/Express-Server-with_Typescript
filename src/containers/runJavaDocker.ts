import { JAVA_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";

async function runJava(code: string, inputTestCase: string){
    const rawLogBuffer: Buffer[] = [];
    console.log("Initialising a new java docker container");

    const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > Main.java && javac Main.java && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | java Main` ;
    const javaDockerContainer = await createContainer(JAVA_IMAGE, [
        '/bin/sh',
        '-c',
        runCommand
    ]);

    await javaDockerContainer.start();
    console.log('Docker container has started');

    const loggerStream = await javaDockerContainer.logs({
        stdout: true,
        stderr: true,
        timestamps: false,
        follow: true
    });
    // Attach events on the stream objects to start and stop reading
    loggerStream.on('data', (chunk) => {
        rawLogBuffer.push(chunk);
    });
    // When all logs in the code is finished
    await new Promise((res) => {
        loggerStream.on('end' ,() => {
            console.log(rawLogBuffer);
            const completeBuffer = Buffer.concat(rawLogBuffer);
            const decodedStream = decodeDockerStream(completeBuffer);
            console.log(decodedStream);
            console.log(decodedStream.stdout);
            res(decodeDockerStream);
        });
    });
    await javaDockerContainer.remove();

    return javaDockerContainer;
}
export default runJava;