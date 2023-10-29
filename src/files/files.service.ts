import { Injectable } from '@nestjs/common';
import sizeof from 'image-size';
import { FileElementResponse } from './dto/file-element.response';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { MFile } from './mfile.class';
import * as sharp from 'sharp';

@Injectable()
export class FilesService {
    async saveFiles(files: MFile[]): Promise<FileElementResponse[]> {
        const dateFolder = format(new Date(), 'yyyy-MM-dd');
        const uploadFolder = `${path}/uploads/${dateFolder}`;
        await ensureDir(uploadFolder);
        const res: FileElementResponse[] = [];
        for (const file of files) {
            await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
            res.push({ url: `/uploads/${dateFolder}/${file.originalname}`, name: file.originalname });
        }
        return res;
    }

	async resizeImagesAndConvertToWebp(files: Express.Multer.File[]) {
		return await Promise.all(
			files.map(async (file) => {
				const convertedFileBuffer = await this.resizeAndConvertToWebp(file.buffer);
				const newName = file.originalname.split('.')[0] + '.webp';
				return new MFile({ originalname: newName, buffer: convertedFileBuffer });
			}),
		);
	}

	resizeAndConvertToWebp(file: Buffer) {
		const { width, height } = sizeof(file);
		const newWidth = 500;
		const coefficient = width / newWidth;
		const newHeight = Math.round(height / coefficient);
		return sharp(file).resize(newWidth, newHeight).webp().toBuffer();
	}
}
