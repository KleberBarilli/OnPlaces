import 'reflect-metadata';
import 'dotenv/config';
import CreateCityService from '../CreateCityService';
import FakeCitiesRepository from '@modules/cities/domain/repositories/fakes/FakeCitiesRepository';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';

let fakeCitiesRepository: FakeCitiesRepository;
let createCityService: CreateCityService;
let fakeUsersRepository: FakeUsersRepository;

describe('CreateCity', () => {
	beforeEach(() => {
		fakeCitiesRepository = new FakeCitiesRepository();
		createCityService = new CreateCityService(
			fakeCitiesRepository,
			fakeUsersRepository,
		);
	});

	it('Should be able to create a new city', async () => {
		const city = await fakeCitiesRepository.create({
			name: 'Cidade Teste',
			state: 'MA',
			country: 'US',
			population: 6555,
			latitude: -2111,
			longitude: 8777,
			image: '/image.png',
			description: 'cidade top',
			tourist_places: 'test places',
			author: 'idsadsdaadas',
		});

		expect(city).toHaveProperty('id');
	});
});
