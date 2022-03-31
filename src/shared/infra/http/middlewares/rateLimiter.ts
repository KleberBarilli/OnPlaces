import { Request, Response, NextFunction } from 'express';
import redis from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from '@shared/errors/AppError';

const redisClient = redis.createClient({
	url: process.env.REDIS_URL,
	tls: {
		rejectUnauthorized: false,
	},
});

const limiter = new RateLimiterRedis({
	storeClient: redisClient,
	keyPrefix: 'ratelimit',
	points: 5,
	duration: 1,
});

export default async function rateLimiter(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> {
	try {
		await limiter.consume(req.ip);

		return next();
	} catch (err) {
		throw new AppError('Too Many Requests', 429);
	}
}
