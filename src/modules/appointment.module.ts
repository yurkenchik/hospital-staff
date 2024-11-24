import {Module} from "@nestjs/common";
import {AppointmentService} from "../infrastrcuture/services/appointment.service";
import {AppointmentController} from "../presentation/controllers/appointment.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Appointment} from "../domain/entities/appointment.entity";
import {DoctorModule} from "./doctor.module";
import {PatientModule} from "./patient.module";

@Module({
    providers: [AppointmentService],
    controllers: [AppointmentController],
    imports: [
        TypeOrmModule.forFeature([Appointment]),
        DoctorModule,
        PatientModule,
    ],
    exports: [AppointmentService]
})
export class AppointmentModule {}