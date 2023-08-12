import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const appPort = configService.get('APP_PORT');
    const appGlobalPrefix = configService.get('APP_GLOBAL_PREFIX');
    app.setGlobalPrefix(appGlobalPrefix);
    await app.listen(appPort || 3000);
}
bootstrap();
