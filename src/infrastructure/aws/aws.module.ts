import { Global, Module } from "@nestjs/common";
import { CognitoIdentityProviderClient } from "@infrastructure/aws/clients/congito-identity-provider-client";

@Global()
@Module({
    providers: [CognitoIdentityProviderClient],
    exports: [CognitoIdentityProviderClient],
})
export class AwsModule {}