import express from 'express';
import routes from '../routes';
import { home, search } from '../controllers/videosController';
import { getJoin, login, logout, postJoin } from '../controllers/userController';

const globalRouter = express.Router();

globalRouter.get(routes.join, getJoin);
globalRouter.get(routes.join, postJoin);



globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.login, login);
globalRouter.get(routes.logout, logout);

export default globalRouter;
