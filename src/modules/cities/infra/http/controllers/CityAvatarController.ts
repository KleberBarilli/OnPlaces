import { Request, Response } from 'express';
import UpdateCityAvatarService from '@modules/cities/services/UpdateCityAvatarService';
import { classToClass } from 'class-transformer';

export default class CityAvatarController {
	public async update(req: Request, res: Response): Promise<Response> {
		const updateAvatar = new UpdateCityAvatarService();

		const city = await updateAvatar.execute({
			id: req.city.id,
			avatarFilename: req.file?.filename as string,
		});

		return res.json(classToClass(city));
	}
}
