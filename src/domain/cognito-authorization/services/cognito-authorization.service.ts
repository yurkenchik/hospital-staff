import { Injectable } from "@nestjs/common";
import { cognitoIdentityProviderClient } from "@infrastructure/aws/clients/congito-identity-provider-client";
import { ConfigService } from "@nestjs/config";
import { AuthorizationRequestDto } from "@domain/cognito-authorization/dto/request/authorization-request.dto";
import { AuthorizationFlow } from "@domain/cognito-authorization/enums/authorization-flow.enum";
import { ConfirmRegistrationDto } from "@domain/cognito-authorization/dto/request/confirm-registration.dto";
import { Email } from "@core/value-objects/email.vo";
import { Password } from "@core/value-objects/password.vo";

@Injectable()
export class CognitoAuthorizationService {
    private COGNITO_CLIENT_ID: string;

    constructor(private readonly configService: ConfigService) {
        this.COGNITO_CLIENT_ID = this.configService.get<string>("COGNITO_CLIENT_ID");
    }

    async registerUser(authorizationRequestDto: AuthorizationRequestDto) {
        const { email, password } = authorizationRequestDto;

        const validatedEmail = new Email(email).getValue();
        const validatedPassword = new Password(password).getValue();

        return cognitoIdentityProviderClient
            .signUp({
                ClientId: this.COGNITO_CLIENT_ID,
                Username: validatedEmail,
                Password: validatedPassword,
                UserAttributes: [{ Name: "email", Value: email }],
            })
            .promise();
    }

    async confirmRegistration(confirmRegistrationDto: ConfirmRegistrationDto) {
        const { email, confirmationCode } = confirmRegistrationDto;

        const validatedEmail = new Email(email).getValue();

        return cognitoIdentityProviderClient
            .confirmSignUp({
                ClientId: this.COGNITO_CLIENT_ID,
                Username: validatedEmail,
                ConfirmationCode: confirmationCode,
            })
            .promise();
    }

    async login(authorizationRequestDto: AuthorizationRequestDto) {
        const { email, password } = authorizationRequestDto;

        return cognitoIdentityProviderClient
            .initiateAuth({
                AuthFlow: AuthorizationFlow.UserPasswordAuth,
                ClientId: this.COGNITO_CLIENT_ID,
                AuthParameters: { USERNAME: email, PASSWORD: password },
            })
            .promise();
    }
}