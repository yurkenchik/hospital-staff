import {Module} from "@nestjs/common";
import {AppointmentDiagnosisService} from "../infrastrcuture/services/appointment-diagnosis.service";
import {AppointmentDiagnosisController} from "../presentation/controllers/appointment-diagnosis.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AppointmentDiagnosis} from "../domain/entities/appointment-diagnosis.entity";
import {AppointmentModule} from "./appointment.module";
import {DiagnosisModule} from "./diagnosis.module";
import {Appointment} from "../domain/entities/appointment.entity";

@Module({
    providers: [AppointmentDiagnosisService],
    controllers: [AppointmentDiagnosisController],
    imports: [
        TypeOrmModule.forFeature([AppointmentDiagnosis, Appointment]),
        AppointmentModule,
        DiagnosisModule
    ],
    exports: [AppointmentDiagnosisService]
})
export class AppointmentDiagnosisModule {}