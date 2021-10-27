import userRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import { Router } from 'express';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import citiesRouter from '@modules/cities/infra/http/routes/cities.routes';
import userAvatarRouter from '@modules/users/infra/http/routes/user.avatar.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/useravatar', userAvatarRouter);

routes.use('/city', citiesRouter);

export default routes;
