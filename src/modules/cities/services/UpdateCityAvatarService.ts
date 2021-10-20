import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';
import { inject, injectable } from 'tsyringe';
import { ICitiesRepository } from '../domain/repositories/ICitiesRepository';
import { ICity } from '../domain/models/ICity';

interface IRequest {
	id: string;
	avatarFilename: string;
}
@injectable()
export default class UpdateCityAvatarService {
	constructor(
		@inject('CitiesRepository') private citiesRepository: ICitiesRepository,
	) {}

	public async execute({ id, avatarFilename }: IRequest): Promise<ICity> {
		const city = await this.citiesRepository.findById(id);

		if (!city) {
			throw new AppError('City not found');
		}

		if (uploadConfig.driver === 's3') {
			const storageProvider = new S3StorageProvider();
			if (city.image) {
				await storageProvider.deleteFile(city.image);
			}
			const fileName = await storageProvider.saveFile(avatarFilename);
			city.image = fileName;
		} else if (uploadConfig.driver === 'disk') {
			const storageProvider = new DiskStorageProvider();
			if (city.image) {
				await storageProvider.deleteFile(city.image);
			}
			const fileName = await storageProvider.saveFile(avatarFilename);
			city.image = fileName;
		}

		await this.citiesRepository.save(city);

		return city;
	}
}
