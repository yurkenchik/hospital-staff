import { ApiProperty } from "@nestjs/swagger";

export class CreateBillingDto {
    @ApiProperty()
    readonly amount: number;

    @ApiProperty()
    readonly paymentDate: Date;
}