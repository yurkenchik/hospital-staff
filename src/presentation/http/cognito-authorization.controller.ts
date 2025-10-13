import { Body, Controller, Post } from "@nestjs/common";
import { CognitoAuthorizationService } from "@domain/cognito-authorization/services/cognito-authorization.service";
import { AuthorizationRequestDto } from "@domain/cognito-authorization/dto/request/authorization-request.dto";
import { ConfirmRegistrationDto } from "@domain/cognito-authorization/dto/request/confirm-registration.dto";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller('cognito-authorization')
export class CognitoAuthorizationController {
    constructor(private readonly cognitoAuthorizationService: CognitoAuthorizationService) {}

    @ApiOperation({ summary: 'Registering via aws cognito client' })
    @ApiBody({ type: AuthorizationRequestDto })
    @Post("register")
    async register(@Body() authorizationRequestDto: AuthorizationRequestDto) {
        return this.cognitoAuthorizationService.registerUser(authorizationRequestDto);
    }

    @ApiOperation({ summary: 'Registration confirmation' })
    @ApiBody({ type: ConfirmRegistrationDto })
    @Post("confirm-registration")
    async confirm(@Body() confirmRegistrationDto: ConfirmRegistrationDto) {
        return this.cognitoAuthorizationService.confirmRegistration(confirmRegistrationDto);
    }

    @ApiOperation({ summary: 'Login via aws cognito client' })
    @ApiBody({ type: AuthorizationRequestDto })
    @Post("login")
    async login(@Body() authorizationRequestDto: AuthorizationRequestDto) {
        return this.cognitoAuthorizationService.login(authorizationRequestDto);
    }
}