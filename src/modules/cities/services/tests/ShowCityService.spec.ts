import 'reflect-metadata';
import FakeCitiesRepository from '@modules/cities/domain/repositories/fakes/FakeCitiesRepository';
import AppError from '@shared/errors/AppError';
import ShowCityService from '../ShowCityService';

let fakeCitiesRepository: FakeCitiesRepository;
let showCityService: ShowCityService;

describe('Show City', () => {
	beforeEach(() => {
		fakeCitiesRepository = new FakeCitiesRepository();
		showCityService = new ShowCityService(fakeCitiesRepository);
	});
	it('Should be able to show a city', async () => {
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
			author: '1e40112a-b67e-46ac-b987-ce9f7a74f683',
		});

		const response = await showCityService.execute({
			id: city.id,
		});

		expect(response).toEqual(city);
	});

	it('Should not be able to show a inexistent city', async () => {
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
			author: '1e40112a-b67e-46ac-b987-ce9f7a74f683',
		});

		expect(
			showCityService.execute({
				id: 'id1234',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
