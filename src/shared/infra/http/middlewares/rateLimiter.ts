import { Request, Response, NextFunction } from 'express';
import redis from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from '@shared/errors/AppError';

const redisClient = redis.createClient({
	port: Number(process.env.REDIS_PORT || 6379),
	url: process.env.REDIS_TLS_URL || 'redis://127.0.0.1:6379',
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
