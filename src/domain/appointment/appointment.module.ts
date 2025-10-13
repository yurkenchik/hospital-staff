import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppointmentService } from "./services/appointment.service";
import { AppointmentController } from "@presentation/http/appointment.controller";
import { DoctorModule } from "../doctor/doctor.module";
import { PatientModule } from "../patient/patient.module";
import { AppointmentOrmEntity } from "@infrastructure/orm-entities/appointment-orm.entity";
import { AppointmentPostgresRepository } from "@infrastructure/repositories/appointment-postgres.repository";
import { APPOINTMENT_REPOSITORY } from "./appointment.tokens";


@Module({
    providers: [
        { provide: APPOINTMENT_REPOSITORY, useClass: AppointmentPostgresRepository },
        AppointmentService
    ],
    controllers: [AppointmentController],
    imports: [
        TypeOrmModule.forFeature([AppointmentOrmEntity]),
        DoctorModule,
        PatientModule,
    ],
    exports: [AppointmentService]
})
export class AppointmentModule {}