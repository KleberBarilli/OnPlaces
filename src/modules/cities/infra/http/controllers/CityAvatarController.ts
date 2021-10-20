import { Request, Response } from 'express';
import UpdateCityAvatarService from '@modules/cities/services/UpdateCityAvatarService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

export default class CityAvatarController {
	public async update(req: Request, res: Response): Promise<Response> {
		const updateAvatar = container.resolve(UpdateCityAvatarService);

		const { id } = req.params;

		const city = await updateAvatar.execute({
			id,
			avatarFilename: req.file?.filename as string,
		});

		return res.json(classToClass(city));
	}
}
