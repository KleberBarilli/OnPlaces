import { inject, injectable } from 'tsyringe';
import { IPaginateCity } from '../domain/models/IPaginateCity';
import RedisCache from '@shared/cache/RedisCache';
import { ICitiesRepository } from '../domain/repositories/ICitiesRepository';

@injectable()
export default class ListUserCityService {
	constructor(
		@inject('CitiesRepository') private citiesRepository: ICitiesRepository,
	) {}

	async execute(id: string): Promise<IPaginateCity | null> {
		let listCities = await RedisCache.recover<IPaginateCity>(`user-cities`);

		if (!listCities) {
			const cities = await this.citiesRepository.findAllByUserId(id);
			RedisCache.save(`user-cities${id}`, cities);

			return cities;
		}

		return listCities;
	}
}
