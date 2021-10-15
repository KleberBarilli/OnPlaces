import 'reflect-metadata';
import 'dotenv/config';
import CreateSessionsService from '../CreateSessionsSevice';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let createSessionService: CreateSessionsService;
let fakeHashProvider: FakeHashProvider;

describe('CreateSession', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeHashProvider = new FakeHashProvider();
		createSessionService = new CreateSessionsService(
			fakeUsersRepository,
			fakeHashProvider,
		);
	});
	it('Should be able to authenticate', async () => {
		const user = await fakeUsersRepository.create({
			name: 'kleber',
			email: 'kleber@teste.com',
			password: 'teste123',
		});

		const response = await createSessionService.execute({
			email: 'kleber@teste.com',
			password: 'teste123',
		});

		expect(response).toHaveProperty('token');
		expect(response.user).toEqual(user);
	});
	it('should not be able to authenticate with non existent user', async () => {
		expect(
			createSessionService.execute({
				email: 'kleber@teste.com',
				password: '123456',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
	it('should not be able to authenticate with wrong password', async () => {
		const user = await fakeUsersRepository.create({
			name: 'kleber teste',
			email: 'kleber@teste.com',
			password: '123456',
		});

		expect(
			createSessionService.execute({
				email: 'kleber@teste.com',
				password: '654321',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
