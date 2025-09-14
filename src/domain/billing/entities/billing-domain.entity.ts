import { ApiProperty } from "@nestjs/swagger";
import { AppointmentDomainEntity } from "@domain/appointment/entities/appointment-domain.entity";

export class BillingDomainEntity {
    @ApiProperty()
    public readonly id: string;

    @ApiProperty()
    public readonly amount: number;

    @ApiProperty()
    public readonly paymentDate: Date;

    @ApiProperty()
    public readonly appointmentId: string;

    constructor(
        id: string,
        amount: number,
        paymentDate: Date,
        appointmentId: string,
    ) {
        this.id = id;
        this.amount = amount;
        this.paymentDate = paymentDate;
        this.appointmentId = appointmentId;
    }
}
