import 'reflect-metadata';
import FakeCitiesRepository from '@modules/cities/domain/repositories/fakes/FakeCitiesRepository';
import ListCityByNameService from '../ListCityByNameService';

let fakeCitiesRepository: FakeCitiesRepository;
let listCityByNameService: ListCityByNameService;

describe('List All Name City', () => {
	beforeEach(() => {
		fakeCitiesRepository = new FakeCitiesRepository();
		listCityByNameService = new ListCityByNameService(fakeCitiesRepository);
	});
	it('Should be able to show a name cities', async () => {
		const city1 = await fakeCitiesRepository.create({
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
		const city12 = await fakeCitiesRepository.create({
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
		const city2 = await fakeCitiesRepository.create({
			name: 'Cidade Teste2',
			state: 'NY',
			country: 'US',
			population: 6555,
			latitude: -2111,
			longitude: 8777,
			image: '/image.png',
			description: 'cidade top',
			tourist_places: 'test places',
			author: '2',
		});

		const response = await listCityByNameService.execute({
			name: 'Cidade Teste',
		});
	});
});
