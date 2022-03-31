import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import { classToClass } from 'class-transformer';

export default class ProfileController {
	public async show(req: Request, res: Response): Promise<Response> {
		const showProfile = container.resolve(ShowProfileService);
		const id = req.user.id;

		const user = await showProfile.execute({ id });

		return res.json(classToClass(user));
	}
}
