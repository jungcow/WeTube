import express from 'express';
import routes from "../routes";
import { getEditPorfile } from '../controllers/userController';
import { postRegisterView } from '../controllers/videosController';


const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);

export default apiRouter;
