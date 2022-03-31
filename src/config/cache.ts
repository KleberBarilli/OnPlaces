import { RedisOptions } from 'ioredis';

interface ICacheConfig {
	driver: string;
	config: {
		redis: RedisOptions;
	};
}

export default {
	config: {
		redis: {
			url: process.env.REDIS_TLS_URL,
		},
	},
	driver: 'redis',
} as ICacheConfig;
