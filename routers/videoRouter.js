import express from 'express';
import routes from '../routes';
import { getUpload, postUpload, videoDetail, editVideo, deleteVideo } from '../controllers/videosController';

const videoRouter = express.Router();

// videoRouter.get('/', videos);
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, postUpload);


videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);


export default videoRouter;