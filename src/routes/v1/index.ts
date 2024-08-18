import express from 'express'
const v1Router  = express.Router();
import ping from '../../controllers/pingproblem'
v1Router.get('/',ping)

export default v1Router;