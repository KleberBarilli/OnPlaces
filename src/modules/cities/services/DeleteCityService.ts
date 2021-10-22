import RedisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IDeleteCity } from '../domain/models/IDeleteCity';
import { ICitiesRepository } from '../domain/repositories/ICitiesRepository';

@injectable()
export default class DeleteCityservice {
	constructor(
		@inject('CitiesRepository') private citiesRepository: ICitiesRepository,
	) {}
	async execute({ id }: IDeleteCity): Promise<void> {
		const city = await this.citiesRepository.findById(id);

		if (!city) {
			throw new AppError('City Not found');
		}

		await RedisCache.invalidate(`cities`);
		await RedisCache.invalidate(`user-cities${city.author}`);
		await RedisCache.invalidate(`user-city-name`);

		await this.citiesRepository.remove(city);
	}
}
