import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICitiesRepository } from '../domain/repositories/ICitiesRepository';
import { ICreateCity } from '../domain/models/ICreateCity';
import { ICity } from '../domain/models/ICity';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';

@injectable()
export default class CreateCityService {
	constructor(
		@inject('CitiesRepository') private citiesRepository: ICitiesRepository,
		@inject('UsersRepository') private usersRepository: IUsersRepository,
	) {}
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public async execute({
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
	}: ICreateCity): Promise<ICity> {
		const author_id = await this.usersRepository.findById(author);

		if (!author_id) {
			throw new AppError('Error with Author User');
		}

		const city = this.citiesRepository.create({
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
		});

		return city;
	}
}
