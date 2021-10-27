import { Request, Response } from 'express';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

export default class UserAvatarController {
	public async update(req: Request, res: Response): Promise<Response> {
		const updateAvatar = container.resolve(UpdateUserAvatarService);

		const { id } = req.params;

		const city = await updateAvatar.execute({
			id,
			avatarFilename: req.file?.filename as string,
		});

		return res.json(classToClass(city));
	}
}
