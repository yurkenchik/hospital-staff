import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { createApp } from "./app/app";
import serverlessExpress from "@vendia/serverless-express";

let server: ReturnType<typeof serverlessExpress> | null = null;

export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
    if (!server) {
        server = await createApp();
    }
    return server(event, context);
};