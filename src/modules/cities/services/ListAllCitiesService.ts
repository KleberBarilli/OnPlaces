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
	): Promise<IPaginateCity | null> {
		let listCities = await RedisCache.recover<IPaginateCity>(`cities`);

		if (!listCities) {
			const cities = await this.citiesRepository.findAllPaginate(
				search,
				sortField,
			);
			await RedisCache.save(`cities`, cities);

			return cities;
		}
		return listCities as IPaginateCity;
	}
}
