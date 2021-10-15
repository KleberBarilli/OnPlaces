import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import CreateUserService from 'src/modules/users/services/CreateUserService';

export default class UsersController {
	public async create(req: Request, res: Response): Promise<Response> {
		const { name, email, password } = req.body;

		const createUser = container.resolve(CreateUserService);

		const user = await createUser.execute({
			name,
			email,
			password,
		});

		return res.json(classToClass(user));
	}
}