import { Router } from 'express';
import multer from 'multer';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';
import uploadConfig from '@config/upload';

const upload = multer(uploadConfig.multer);

const userAvatarRouter = Router();
const userAvatarController = new UserAvatarController();

userAvatarRouter.use(isAuthenticated);

userAvatarRouter.patch(
	'/:id',
	upload.single('image'),
	userAvatarController.update,
);

export default userAvatarRouter;
