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
			host: 'ec2-3-226-160-187.compute-1.amazonaws.com',
			port: 19360,
			pass: 'p995d9de119249c11693bd09f8b1c3df090e6af8fd4afbb3de414cbda5f839b7',
		},
	},
	driver: 'redis',
} as ICacheConfig;
