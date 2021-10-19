import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
const tmpFolder = path.resolve(__dirname, '..', '..', 'temp');

export default {
	directory: uploadFolder,
	tmp: tmpFolder,
	storage: multer.diskStorage({
		destination: uploadFolder,
		filename(request, file, callback) {
			const fileHash = crypto.randomBytes(10).toString('hex');

			const fileName = `${fileHash}-${file.originalname}`;

			callback(null, fileName);
		},
	}),
};
