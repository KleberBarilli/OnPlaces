import { container } from 'tsyringe';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';

import '@modules/users/providers';
import { ICitiesRepository } from '@modules/cities/domain/repositories/ICitiesRepository';
import CitiesRepository from '@modules/cities/infra/typeorm/repositories/CitiesRepository';

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
	'UserTokensRepository',
	UserTokensRepository,
);

container.registerSingleton<ICitiesRepository>(
	'CitiesRepository',
	CitiesRepository,
);
