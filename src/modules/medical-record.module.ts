import {Module} from "@nestjs/common";
import {MedicalRecordService} from "../infrastrcuture/services/medical-record.service";
import {MedicalRecordController} from "../presentation/controllers/medical-record.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MedicalRecord} from "../domain/entities/medical-record.entity";
import {DoctorModule} from "./doctor.module";
import {PatientModule} from "./patient.module";

@Module({
    providers: [MedicalRecordService],
    controllers: [MedicalRecordController],
    imports: [
        TypeOrmModule.forFeature([MedicalRecord]),
        DoctorModule,
        PatientModule,
    ],
    exports: [MedicalRecordService]
})
export class MedicalRecordModule {}