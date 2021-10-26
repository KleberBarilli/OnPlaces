import 'reflect-metadata';
import FakeCitiesRepository from '@modules/cities/domain/repositories/fakes/FakeCitiesRepository';
import ListAllCitiesService from '../ListAllCitiesService';

let fakeCitiesRepository: FakeCitiesRepository;
let listAllCitiesService: ListAllCitiesService;

describe('List Cities', () => {
	beforeEach(() => {
		fakeCitiesRepository = new FakeCitiesRepository();
		listAllCitiesService = new ListAllCitiesService(fakeCitiesRepository);
	});
	it('Should be able to show all cities', async () => {
		const response = await listAllCitiesService.execute();
		expect(typeof response).toBe('object');
	});
});
