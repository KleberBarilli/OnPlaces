import { inject, injectable } from 'tsyringe';
import CitiesRepository from '../infra/typeorm/repositories/CitiesRepository';
import { IPaginateCity } from '../domain/models/IPaginateCity';

@injectable()
export default class ListUserCity {
	constructor(
		@inject('CitiesRepository') private citiesRepository: CitiesRepository,
	) {}

	async execute(user_id: string): Promise<IPaginateCity | null> {
		const cities = await this.citiesRepository.findAllByUserId(user_id);

		return cities;
	}
}
