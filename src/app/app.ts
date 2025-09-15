import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

export async function createApp() {
    const nestApplication = await NestFactory.create(AppModule);
    await nestApplication.init();
    return nestApplication;
}