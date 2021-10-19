import { inject, injectable } from 'tsyringe';
import CitiesRepository from '../infra/typeorm/repositories/CitiesRepository';
import RedisCache from '@shared/cache/RedisCache';
import { IPaginateCity } from '@modules/cities/domain/models/IPaginateCity';

@injectable()
export default class ListAllUserCitiesService {
	constructor(
		@inject('CitiesRepository') private citiesRepository: CitiesRepository,
	) {}

	async execute(author_id: string): Promise<IPaginateCity | null> {
		//const cities = await this.citiesRepository.findAllPaginate(user_id);

		let listcities = await RedisCache.recover<IPaginateCity>(
			`user-cities-${author_id}`,
		);

		if (!listcities) {
			listcities = await this.citiesRepository.findAll_User_Cities(
				author_id,
			);

			await RedisCache.save(`yser-cities-${author_id}`, listcities);
		}

		return listcities;
	}
}
