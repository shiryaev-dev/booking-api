import { Controller, HttpCode, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorators';
import { UserRole } from 'src/user/user.types';
import { FileElementResponse } from './dto/file-element.response';
import { FilesService } from './files.service';
import { MFile } from './mfile.class';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post('upload')
    @HttpCode(200)
    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(FileInterceptor('files'))
    async uploadFile(@UploadedFiles() files: Express.Multer.File[]): Promise<FileElementResponse[]> {
        const resizedImages = await Promise.all(
            files.map(async file => {
                const convertedFileBuffer = await this.filesService.resizeAndConvertToWebp(file.buffer);
                return new MFile({ originalname: `${file.originalname.split('.')[0]}.webp`, buffer: convertedFileBuffer });
            }),
        );
        return this.filesService.saveFiles(resizedImages);
    }
}
