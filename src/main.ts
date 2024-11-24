import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {ConfigService} from "@nestjs/config";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix("api");

    const PORT = configService.get<string>("PORT");
    await app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    });
}
bootstrap();
