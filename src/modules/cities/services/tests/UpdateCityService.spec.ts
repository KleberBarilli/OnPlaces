import 'reflect-metadata';
import 'dotenv/config';
import UpdateCityService from '../UpdateCityService';
import FakeCitiesRepository from '@modules/cities/domain/repositories/fakes/FakeCitiesRepository';
import AppError from '@shared/errors/AppError';

let fakeCitiesRepository: FakeCitiesRepository;
let updateCityService: UpdateCityService;

describe('UpdateCity', () => {
	beforeEach(() => {
		fakeCitiesRepository = new FakeCitiesRepository();
		updateCityService = new UpdateCityService(fakeCitiesRepository);
	});

	it('Should be able to update a city', async () => {
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
			author: '1',
		});

		const response = await updateCityService.execute({
			id: city.id,
			name: 'Cidade Teste Editada',
			state: 'MA',
			country: 'US',
			population: 6555,
			latitude: -2111,
			longitude: 8777,
			image: '/image.png',
			description: 'cidade top',
			tourist_places: 'test places',
			author: city.author,
		});
		expect(response).toEqual(city);
	});

	it('Should not be able to update a inexistent city', async () => {
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
			author: '1',
		});

		expect(
			updateCityService.execute({
				id: 'aaaa',
				name: 'Cidade Teste Editada',
				state: 'MA',
				country: 'US',
				population: 6555,
				latitude: -2111,
				longitude: 8777,
				image: '/image.png',
				description: 'cidade top',
				tourist_places: 'test places',
				author: '1',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
