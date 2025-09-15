import { Injectable } from "@nestjs/common";
import { CognitoIdentityProviderClient } from "@infrastructure/aws/clients/congito-identity-provider-client";
import { ConfigService } from "@nestjs/config";
import { AuthorizationRequestDto } from "@domain/cognito-authorization/dto/request/authorization-request.dto";
import { AuthorizationFlow } from "@domain/cognito-authorization/enums/authorization-flow.enum";
import { ConfirmRegistrationDto } from "@domain/cognito-authorization/dto/request/confirm-registration.dto";
import { Email } from "@core/value-objects/email.vo";
import { Password } from "@core/value-objects/password.vo";
import * as crypto from "crypto";

@Injectable()
export class CognitoAuthorizationService {
    private readonly COGNITO_CLIENT_ID: string;
    private readonly COGNITO_CLIENT_SECRET: string;

    constructor(
        private readonly configService: ConfigService,
        private readonly cognitoIdentityProviderClient: CognitoIdentityProviderClient,
    ) {
        this.COGNITO_CLIENT_ID = this.configService.get<string>("COGNITO_CLIENT_ID");
        this.COGNITO_CLIENT_SECRET = this.configService.get<string>("COGNITO_CLIENT_SECRET");
    }

    private calculateSecretHash(username: string): string {
        const hmac = crypto.createHmac('sha256', this.COGNITO_CLIENT_SECRET);
        hmac.update(username + this.COGNITO_CLIENT_ID);
        return hmac.digest('base64');
    }

    async registerUser(authorizationRequestDto: AuthorizationRequestDto) {
        const { email, password } = authorizationRequestDto;

        const validatedEmail = new Email(email).getValue();
        const validatedPassword = new Password(password).getValue();
        const secretHash = this.calculateSecretHash(validatedEmail);

        return this.cognitoIdentityProviderClient.getClient()
            .signUp({
                ClientId: this.COGNITO_CLIENT_ID,
                Username: validatedEmail,
                Password: validatedPassword,
                UserAttributes: [{ Name: "email", Value: email }],
                SecretHash: secretHash,
            })
            .promise();
    }

    async confirmRegistration(confirmRegistrationDto: ConfirmRegistrationDto) {
        const { email, confirmationCode } = confirmRegistrationDto;

        const validatedEmail = new Email(email).getValue();
        const secretHash = this.calculateSecretHash(validatedEmail);

        return this.cognitoIdentityProviderClient.getClient()
            .confirmSignUp({
                ClientId: this.COGNITO_CLIENT_ID,
                Username: validatedEmail,
                ConfirmationCode: confirmationCode,
                SecretHash: secretHash,
            })
            .promise();
    }

    async login(authorizationRequestDto: AuthorizationRequestDto) {
        const { email, password } = authorizationRequestDto;

        const validatedEmail = new Email(email).getValue();
        const validatedPassword = new Password(password).getValue();
        const secretHash = this.calculateSecretHash(validatedEmail);

        return this.cognitoIdentityProviderClient.getClient()
            .initiateAuth({
                AuthFlow: AuthorizationFlow.UserPasswordAuth,
                ClientId: this.COGNITO_CLIENT_ID,
                AuthParameters: {
                    USERNAME: validatedEmail,
                    PASSWORD: validatedPassword,
                    SECRET_HASH: secretHash
                },
            })
            .promise();
    }
}