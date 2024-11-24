import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DatabaseService} from "../infrastrcuture/database/orm/typeorm.config";
import {DiagnosisModule} from "../modules/diagnosis.module";
import {DoctorModule} from "../modules/doctor.module";
import {PatientModule} from "../modules/patient.module";
import {AppointmentModule} from "../modules/appointment.module";
import {BillingModule} from "../modules/billing.module";
import {TreatmentModule} from "../modules/treatment.module";
import {ScheduleModule} from "../modules/schedule.module";
import {MedicalRecordModule} from "../modules/medical-record.module";
import {AppointmentDiagnosisModule} from "../modules/appointment-diagnosis.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useClass: DatabaseService
        }),
        DiagnosisModule,
        DoctorModule,
        PatientModule,
        AppointmentModule,
        BillingModule,
        TreatmentModule,
        ScheduleModule,
        MedicalRecordModule,
        AppointmentDiagnosisModule
    ],
    controllers: [AppController],
    providers: [AppService, DatabaseService],
})
export class AppModule {}
