import { Body, Controller, Post } from "@nestjs/common";
import { CognitoAuthorizationService } from "@domain/cognito-authorization/services/cognito-authorization.service";
import { AuthorizationRequestDto } from "@domain/cognito-authorization/dto/request/authorization-request.dto";
import { ConfirmRegistrationDto } from "@domain/cognito-authorization/dto/request/confirm-registration.dto";

@Controller('cognito-authorization')
export class CognitoAuthorizationController {
    constructor(private readonly cognitoAuthorizationService: CognitoAuthorizationService) {}

    @Post("register")
    async register(@Body() authorizationRequestDto: AuthorizationRequestDto) {
        return this.cognitoAuthorizationService.registerUser(authorizationRequestDto);
    }

    @Post("confirm-registration")
    async confirm(@Body() confirmRegistrationDto: ConfirmRegistrationDto) {
        return this.cognitoAuthorizationService.confirmRegistration(confirmRegistrationDto);
    }

    @Post("login")
    async login(@Body() authorizationRequestDto: AuthorizationRequestDto) {
        return this.cognitoAuthorizationService.login(authorizationRequestDto);
    }
}