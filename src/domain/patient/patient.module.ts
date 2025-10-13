import { Module } from "@nestjs/common";
import { PatientService } from "./services/patient.service";
import { PatientController } from "@presentation/http/patient.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PatientOrmEntity } from "@infrastructure/orm-entities/patient-orm.entity";
import { PatientPostgresRepository } from "@infrastructure/repositories/patient-postgres.repository";
import { PATIENT_REPOSITORY } from "./patient.tokens";

@Module({
    providers: [
        { provide: PATIENT_REPOSITORY, useClass: PatientPostgresRepository },
        PatientService
    ],
    controllers: [PatientController],
    imports: [TypeOrmModule.forFeature([PatientOrmEntity])],
    exports: [PatientService],
})
export class PatientModule {}