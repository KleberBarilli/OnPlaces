import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';

export default class DiskStorageProvider {
	public async saveFile(file: string): Promise<string> {
		await fs.promises.rename(
			path.resolve(uploadConfig.tmp, file),
			path.resolve(uploadConfig.directory, file),
		);

		return file;
	}

	public async deleteFile(file: string): Promise<void> {
		const filePath = path.resolve(uploadConfig.directory, file);

		try {
			await fs.promises.stat(filePath);
		} catch {
			return;
		}

		await fs.promises.unlink(filePath);
	}
}
