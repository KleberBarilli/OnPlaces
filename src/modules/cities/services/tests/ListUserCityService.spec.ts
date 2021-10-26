import 'reflect-metadata';
import FakeCitiesRepository from '@modules/cities/domain/repositories/fakes/FakeCitiesRepository';
import ListUserCityService from '../ListUserCityService';

let fakeCitiesRepository: FakeCitiesRepository;
let listUserCityService: ListUserCityService;

describe('List All User City', () => {
	beforeEach(() => {
		fakeCitiesRepository = new FakeCitiesRepository();
		listUserCityService = new ListUserCityService(fakeCitiesRepository);
	});
	it('Should be able to show a user cities', async () => {
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
			state: 'MA',
			country: 'US',
			population: 6555,
			latitude: -2111,
			longitude: 8777,
			image: '/image.png',
			description: 'cidade top',
			tourist_places: 'test places',
			author: '2',
		});

		const response = await listUserCityService.execute('2');

		const a = await fakeCitiesRepository.findAllByUserId('1');
		const b = await fakeCitiesRepository.findAllByUserId('1DSASADSDASDA');

		expect(a).toEqual(city1);
		expect(b).toBeUndefined();
	});
});
