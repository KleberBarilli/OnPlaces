import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUser } from '../domain/models/IUser';

interface IRequest {
	id: string;
	avatarFilename: string;
}
@injectable()
export default class UpdateUserAvatarService {
	constructor(
		@inject('UsersRepository') private usersRepository: IUsersRepository,
	) {}

	public async execute({ id, avatarFilename }: IRequest): Promise<IUser> {
		const user = await this.usersRepository.findById(id);

		if (!user) {
			throw new AppError('User not found');
		}

		if (uploadConfig.driver === 's3') {
			const storageProvider = new S3StorageProvider();
			if (user.avatar) {
				await storageProvider.deleteFile(user.avatar);
			}
			const fileName = await storageProvider.saveFile(avatarFilename);
			user.avatar = fileName;
		} else if (uploadConfig.driver === 'disk') {
			const storageProvider = new DiskStorageProvider();
			if (user.avatar) {
				await storageProvider.deleteFile(user.avatar);
			}
			const fileName = await storageProvider.saveFile(avatarFilename);
			user.avatar = fileName;
		}

		await this.usersRepository.save(user);

		return user;
	}
}
