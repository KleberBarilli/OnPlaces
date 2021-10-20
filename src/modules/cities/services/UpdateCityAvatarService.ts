import AppError from '@shared/errors/AppError';
import path from 'path';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import City from '../infra/typeorm/entities/City';
import CitiesRepository from '../infra/typeorm/repositories/CitiesRepository';
import uploadConfig from '@config/upload';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';

interface IRequest {
	id: string;
	avatarFilename: string;
}

export default class UpdateCityAvatarService {
	public async execute({ id, avatarFilename }: IRequest): Promise<City> {
		const citiesRepository = getCustomRepository(CitiesRepository);

		const city = await citiesRepository.findById(id);

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

		await citiesRepository.save(city);

		return city;
	}
}
