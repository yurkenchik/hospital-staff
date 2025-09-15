import { ConfigService } from "@nestjs/config";
import { CognitoIdentityServiceProvider } from "aws-sdk";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CognitoIdentityProviderClient {
    private cognitoIdentityProviderClient: CognitoIdentityServiceProvider | null = null;

    constructor(private readonly configService: ConfigService) {}

    getClient(): CognitoIdentityServiceProvider {
        if (!this.cognitoIdentityProviderClient) {
            this.cognitoIdentityProviderClient = new CognitoIdentityServiceProvider({
                region: this.configService.get<string>("AWS_REGION"),
            });
        }
        return this.cognitoIdentityProviderClient;
    }
}