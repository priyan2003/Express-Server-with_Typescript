import { DockerStreamOutput } from "../types/dockerStreamOutput";
import { DOCKET_STREAM_HEADER_SIZE } from "../utils/constants";


function decodeDockerStream(buffer: Buffer): DockerStreamOutput{
    let offset = 0;// This variable use to track the current position in the buffer

    // The output that will store the accumulated stdout and stderr output as strings
    const output : DockerStreamOutput = { stdout: '', stderr: ''};

    // Loop until offset reaches end of the buffer
    while(offset < buffer.length){

        const channel = buffer[offset];

        const  length  =buffer.readUInt32BE(offset + 4);

        offset += DOCKET_STREAM_HEADER_SIZE;

        if(channel === 1){
            // stdout  stream
            output.stdout += buffer.toString('utf-8', offset,offset + length);
        }else if(channel === 2){
            // stderr stream
            output.stderr += buffer.toString('utf-8', offset,offset + length);
        }
        offset += length;
    }
    return output;
}
export default decodeDockerStream;