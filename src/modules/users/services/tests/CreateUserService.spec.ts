import 'reflect-metadata';
import CreateUserService from '../CreateUserService';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let createUserService: CreateUserService;
let fakeHashProvider: FakeHashProvider;

describe('CreateUser', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeHashProvider = new FakeHashProvider();
		createUserService = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);
	});
	it('Should be able to create a new user', async () => {
		const user = await createUserService.execute({
			name: 'kleber teste',
			email: 'kleber@teste.com',
			password: 'teste123',
		});

		expect(user).toHaveProperty('id');
	});

	it('Should not be able to create two users with same email', async () => {
		await createUserService.execute({
			name: 'kleber teste',
			email: 'kleber@teste.com',
			password: 'teste123',
		});

		expect(
			createUserService.execute({
				name: 'joao teste',
				email: 'kleber@teste.com',
				password: 'teste123',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
