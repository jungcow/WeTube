import express from 'express';
import routes from "../routes";
import { userDetail, changePassword, getEditPorfile, postEditPorfile, postEditProfile, postChangePassword, getChangePassword } from '../controllers/userController';
import { onlyPrivate, uploadAvatar } from '../middlewares';

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditPorfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
