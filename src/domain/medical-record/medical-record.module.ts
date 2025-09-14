import {Module} from "@nestjs/common";
import {MedicalRecordService} from "./services/medical-record.service";
import {MedicalRecordController} from "@presentation/http/medical-record.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MedicalRecordOrmEntity} from "@infrastructure/orm-entities/medical-record-orm.entity";
import {MedicalRecordPostgresRepository} from "@infrastructure/repositories/medical-record-postgres.repository";
import {DoctorModule} from "../doctor/doctor.module";
import {PatientModule} from "../patient/patient.module";

export const MEDICAL_RECORD_REPOSITORY = Symbol('MedicalRecordRepository');

@Module({
    providers: [
        { provide: MEDICAL_RECORD_REPOSITORY, useClass: MedicalRecordPostgresRepository },
        MedicalRecordService
    ],
    controllers: [MedicalRecordController],
    imports: [
        TypeOrmModule.forFeature([MedicalRecordOrmEntity]),
        DoctorModule,
        PatientModule,
    ],
    exports: [MedicalRecordService]
})
export class MedicalRecordModule {}