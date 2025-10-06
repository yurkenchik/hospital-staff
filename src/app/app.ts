import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import serverlessExpress from "@vendia/serverless-express";
import express from "express";
import { ExpressAdapter } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";

export async function createApp() {
    const expressApp = express();

    const adapter = new ExpressAdapter(expressApp);
    const nestApplication = await NestFactory.create(AppModule, adapter);

    const configService = nestApplication.get(ConfigService);
    const globalPrefix = `${configService.get<string>('AWS_ENVIRONMENT')}/api`

    nestApplication.useGlobalPipes(new ValidationPipe());
    nestApplication.setGlobalPrefix(globalPrefix);

    const swaggerConfig = new DocumentBuilder()
        .setTitle('Hospital staff management API')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(nestApplication, swaggerConfig);
    SwaggerModule.setup(`${globalPrefix}/documentation`, nestApplication, document);

    await nestApplication.init();

    const application = nestApplication.getHttpAdapter().getInstance();
    return serverlessExpress({ app: application });
}