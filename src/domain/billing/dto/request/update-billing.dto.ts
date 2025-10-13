import {IsOptional} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateBillingDto {
    @ApiProperty()
    @IsOptional()
    readonly amount: number;

    @ApiProperty()
    @IsOptional()
    readonly paymentDate: Date;
}