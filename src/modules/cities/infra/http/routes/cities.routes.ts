import { Router } from 'express';
import CitiesController from '../controllers/CitiesController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import CityAvatarController from '../controllers/CityAvatarController';
import multer from 'multer';
import uploadConfig from '@config/upload';

const citiesRouter = Router();
const citiesController = new CitiesController();
const cityAvatarController = new CityAvatarController();

const upload = multer(uploadConfig.multer);

citiesRouter.get(
	'/user/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	citiesController.userIndex,
);

citiesRouter.get('/', citiesController.index);

citiesRouter.get(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	citiesController.show,
);

citiesRouter.use(isAuthenticated);

citiesRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			state: Joi.string(),
			country: Joi.string().required(),
			population: Joi.number().required(),
			latitude: Joi.number().required(),
			longitude: Joi.number().required(),
			image: Joi.string(),
			description: Joi.string(),
			tourist_places: Joi.string(),
			author: Joi.string().uuid().required(),
		},
	}),
	citiesController.create,
);

citiesRouter.put(
	'/:id',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			state: Joi.string(),
			country: Joi.string().required(),
			population: Joi.number().required(),
			latitude: Joi.number().required(),
			longitude: Joi.number().required(),
			image: Joi.string(),
			description: Joi.string(),
			tourist_places: Joi.string(),
			author: Joi.string().uuid().required(),
		},
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	citiesController.update,
);

citiesRouter.patch(
	'/avatar',
	upload.single('avatar'),
	cityAvatarController.update,
);

citiesRouter.delete(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	citiesController.delete,
);

export default citiesRouter;
