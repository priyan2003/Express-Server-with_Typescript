import {Request, Response} from 'express';
const pingcheck = (req: Request, res: Response) => {
    console.log(req);
    return res.status(200).json({
        mess: "ping is up"
    });
}
export default pingcheck;