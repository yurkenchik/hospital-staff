import { ConfigService } from "@nestjs/config";
import { CognitoIdentityServiceProvider } from "aws-sdk";

const configService = new ConfigService();

export const cognitoIdentityProviderClient = new CognitoIdentityServiceProvider({
    region: configService.get<string>("AWS_REGION"),
});