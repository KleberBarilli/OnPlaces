import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICity } from '../domain/models/ICity';
import { IListCityName } from '../domain/models/IListCityName';
import { ICitiesRepository } from '../domain/repositories/ICitiesRepository';

@injectable()
export default class ListCityByNameService {
	constructor(
		@inject('CitiesRepository') private citiesRepository: ICitiesRepository,
	) {}
	async execute({ name }: IListCityName): Promise<ICity[] | undefined> {
		const city = await this.citiesRepository.findByName(name);

		if (!city) {
			throw new AppError('City Not found');
		}

		return city;
	}
}
