import RedisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import { IPaginateCity } from '../domain/models/IPaginateCity';
import { ICitiesRepository } from '../domain/repositories/ICitiesRepository';

@injectable()
export default class ListUserService {
	constructor(
		@inject('CitiesRepository')
		private citiesRepository: ICitiesRepository,
	) {}

	public async execute(
		search = '',
		sortField = 'name',
		reqUrl
	): Promise<IPaginateCity | null> {
		let listCities = await RedisCache.recover<IPaginateCity>(`cities${reqUrl}`);

		if (!listCities) {
			const cities = await this.citiesRepository.findAllPaginate(
				search,
				sortField,
			);
			await RedisCache.save(`cities${reqUrl}`, cities);

			return cities;
		}
		return listCities as IPaginateCity;
	}
}
