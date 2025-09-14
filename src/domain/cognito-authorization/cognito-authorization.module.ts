import { Module } from "@nestjs/common";
import { CognitoAuthorizationService } from "@domain/cognito-authorization/services/cognito-authorization.service";
import { CognitoAuthorizationController } from "@presentation/http/cognito-authorization.controller";

@Module({
    providers: [CognitoAuthorizationService],
    controllers: [CognitoAuthorizationController],
    exports: [CognitoAuthorizationService],
})
export class CognitoAuthorizationModule {}