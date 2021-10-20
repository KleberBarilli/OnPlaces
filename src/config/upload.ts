import path from 'path';
import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';

interface IUploadConfig {
	driver: 's3' | 'disk';
	tmp: string;
	directory: string;
	multer: {
		storage: StorageEngine;
	};
	config: {
		aws: {
			bucket: string;
		};
	};
}

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
const tmpFolder = path.resolve(__dirname, '..', '..', 'temp');

export default {
	driver: process.env.STORAGE_DRIVER,
	directory: uploadFolder,
	tmp: tmpFolder,
	multer: {
		storage: multer.diskStorage({
			destination: uploadFolder,
			filename(_request, file, callback) {
				const fileHash = crypto.randomBytes(10).toString('hex');

				const fileName = `${fileHash}-${file.originalname}`;

				callback(null, fileName);
			},
		}),
	},
	config: {
		aws: {
			bucket: 'api-cities',
		},
	},
} as IUploadConfig;
