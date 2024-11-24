import {Module} from "@nestjs/common";
import {BillingService} from "../infrastrcuture/services/billing.service";
import {BillingController} from "../presentation/controllers/billing.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Billing} from "../domain/entities/billing.entity";
import {AppointmentModule} from "./appointment.module";

@Module({
    providers: [BillingService],
    controllers: [BillingController],
    imports: [
        TypeOrmModule.forFeature([Billing]),
        AppointmentModule
    ],
    exports: [BillingService]
})
export class BillingModule {}