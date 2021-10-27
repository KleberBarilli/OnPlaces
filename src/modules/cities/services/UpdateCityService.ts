import RedisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { ICity } from '../domain/models/ICity';
import { ICitiesRepository } from '../domain/repositories/ICitiesRepository';
import { IUpdateCity } from '../domain/models/IUpdateCity';

@injectable()
export default class UpdateCitieservice {
	constructor(
		@inject('CitiesRepository') private citiesRepository: ICitiesRepository,
	) {}
	async execute({
		id,
		name,
		state,
		country,
		population,
		latitude,
		longitude,
		image,
		description,
		tourist_places,
		author,
	}: IUpdateCity): Promise<ICity> {
		const city = await this.citiesRepository.findById(id);

		if (!city) {
			throw new AppError('City Not found');
		}
		city.name = name;
		city.state = state;
		city.country = country;
		city.population = population;
		city.latitude = latitude;
		city.longitude = longitude;
		city.image = image;
		city.description = description;
		city.tourist_places = tourist_places;
		city.author = author;

		await this.citiesRepository.save(city);
		console.log(city);

		await RedisCache.invalidate(`cities`);
		await RedisCache.invalidate(`user-cities${author}`);
		await RedisCache.invalidate(`user-city-name`);

		return city;
	}
}
