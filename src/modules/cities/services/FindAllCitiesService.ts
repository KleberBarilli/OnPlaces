import { inject, injectable } from 'tsyringe';
import { ICity } from '../domain/models/ICity';
import { ICitiesRepository } from '../domain/repositories/ICitiesRepository';

@injectable()
export default class FindAllCitiesService {
	constructor(
		@inject('CitiesRepository')
		private citiesRepository: ICitiesRepository,
	) {}

	public async execute(): Promise<ICity[]> {
		const cities = await this.citiesRepository.findAll();

		return cities;
	}
}
