import {IsOptional} from "class-validator";

export class UpdateBillingDto {
    @IsOptional()
    readonly amount: number;
    @IsOptional()
    readonly paymentDate: Date;
}