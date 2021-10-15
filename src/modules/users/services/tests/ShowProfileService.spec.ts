import 'reflect-metadata';
import 'dotenv/config';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';
import ShowProfileService from '../ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('Show User Profile', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		showProfileService = new ShowProfileService(fakeUsersRepository);
	});
	it('Should be able to show a profile user', async () => {
		const user = await fakeUsersRepository.create({
			name: 'kleber',
			email: 'kleber@teste.com',
			password: 'teste123',
		});

		const response = await showProfileService.execute({
			id: user.id,
		});

		expect(response).toEqual(user);
	});

	it('Should not be able to show a inexistent user', async () => {
		const user = await fakeUsersRepository.create({
			name: 'kleber',
			email: 'kleber@teste.com',
			password: 'teste123',
		});

		expect(
			showProfileService.execute({
				id: 'id1234',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
