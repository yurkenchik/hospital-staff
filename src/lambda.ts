import { createServer, proxy } from 'aws-serverless-express';
import { Context, APIGatewayProxyEvent } from 'aws-lambda';
import { createApp } from "./app/app";

let cachedServer;

async function bootstrapServer() {
    if (!cachedServer) {
        const app = await createApp();
        const expressApp = app.getHttpAdapter().getInstance();
        cachedServer = createServer(expressApp);
    }
    return cachedServer;
}

export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
    const server = await bootstrapServer();
    return proxy(server, event, context, 'PROMISE').promise;
};