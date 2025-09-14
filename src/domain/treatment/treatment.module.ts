import {Module} from "@nestjs/common";
import {TreatmentService} from "./services/treatment.service";
import {TreatmentController} from "@presentation/http/treatment.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TreatmentOrmEntity} from "@infrastructure/orm-entities/treatment-orm.entity";
import {TreatmentPostgresRepository} from "@infrastructure/repositories/treatment-postgres.repository";

export const TREATMENT_REPOSITORY = Symbol('TreatmentRepository');

@Module({
    providers: [
        { provide: TREATMENT_REPOSITORY, useClass: TreatmentPostgresRepository },
        TreatmentService
    ],
    controllers: [TreatmentController],
    imports: [TypeOrmModule.forFeature([TreatmentOrmEntity])],
    exports: [TreatmentService]
})
export class TreatmentModule {}