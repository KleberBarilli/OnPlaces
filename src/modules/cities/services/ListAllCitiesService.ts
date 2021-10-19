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
	): Promise<IPaginateCity> {
		const cities = await this.citiesRepository.findAllPaginate(
			search,
			sortField,
		);

		return cities;
	}
}
