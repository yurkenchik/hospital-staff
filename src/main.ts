import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from "@nestjs/config";
import { Logger, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
    const nestApplication = await NestFactory.create(AppModule);
    const configService = nestApplication.get(ConfigService);
    const logger = new Logger('NestApplication');

    nestApplication.useGlobalPipes(new ValidationPipe());
    nestApplication.setGlobalPrefix("api");

    const PORT = configService.get<string>("PORT");
    await nestApplication.listen(PORT, () => {
        logger.verbose(`Server running on port: ${PORT}`);
    });
}
bootstrap();
