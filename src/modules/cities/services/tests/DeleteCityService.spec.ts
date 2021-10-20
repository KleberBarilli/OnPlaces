import 'reflect-metadata';
import FakeCitiesRepository from '@modules/cities/domain/repositories/fakes/FakeCitiesRepository';
import DeleteCityService from '../DeleteCityService';
import AppError from '@shared/errors/AppError';

let fakeCitiesRepository: FakeCitiesRepository;
let deleteCityService: DeleteCityService;

describe('Delete City', () => {
	beforeEach(() => {
		fakeCitiesRepository = new FakeCitiesRepository();
		deleteCityService = new DeleteCityService(fakeCitiesRepository);
	});
	it('Should be able to delete a city', async () => {
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

		const response = await deleteCityService.execute({
			id: city.id,
		});

		expect(response).toEqual(undefined);
	});

	it('should not be able to a delete a inexistent city', async () => {
		expect(
			deleteCityService.execute({
				id: 'hdsajdasaaa',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
