import {Module} from "@nestjs/common";
import {BillingService} from "./services/billing.service";
import {BillingController} from "@presentation/http/billing.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {BillingOrmEntity} from "@infrastructure/orm-entities/billing-orm.entity";
import {BillingPostgresRepository} from "@infrastructure/repositories/billing-postgres.repository";
import {AppointmentModule} from "../appointment/appointment.module";
import {BILLING_REPOSITORY} from "./billing.tokens";


@Module({
    providers: [
        { provide: BILLING_REPOSITORY, useClass: BillingPostgresRepository },
        BillingService
    ],
    controllers: [BillingController],
    imports: [
        TypeOrmModule.forFeature([BillingOrmEntity]),
        AppointmentModule
    ],
    exports: [BillingService]
})
export class BillingModule {}