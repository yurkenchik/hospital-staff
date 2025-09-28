import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export async function createApp() {
    const nestApplication = await NestFactory.create(AppModule);

    nestApplication.useGlobalPipes(new ValidationPipe());
    nestApplication.setGlobalPrefix('api');

    const swaggerConfig = new DocumentBuilder()
        .setTitle('Hospital staff management API')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(nestApplication, swaggerConfig);
    SwaggerModule.setup('api/documentation', nestApplication, document);

    return nestApplication;
}