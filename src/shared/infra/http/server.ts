import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import '@shared/infra/typeorm';
import '@shared/container';
import '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination';
import rateLimiter from '../http/middlewares/rateLimiter';
import { types } from 'pg';

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use(pagination);
app.use(routes);
app.use(errors());

types.setTypeParser(1700, val => {
	return parseFloat(val);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	if (error instanceof AppError) {
		return res.status(error.statusCode).json({
			status: 'error',
			message: error.message,
		});
	}
	return res.status(500).json({
		status: 'error',
		message: error.message,
	});
});

app.listen(process.env.PORT, () => {
	console.log(`Rodando na porta ${process.env.PORT}`);
});
