import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICity } from '../domain/models/ICity';
import { IShowCity } from '../domain/models/IShowCity';
import { ICitiesRepository } from '../domain/repositories/ICitiesRepository';

@injectable()
export default class ShowCityService {
	constructor(
		@inject('CitiesRepository') private citiesRepository: ICitiesRepository,
	) {}
	async execute({ id }: IShowCity): Promise<ICity | undefined> {
		const city = await this.citiesRepository.findById(id);

		if (!city) {
			throw new AppError('City Not found');
		}

		return city;
	}
}
