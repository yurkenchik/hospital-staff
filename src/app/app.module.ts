import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostgresService } from "@infrastructure/postgres/postgres.service";
import { DiagnosisModule } from "@domain/diagnosis/diagnosis.module";
import { DoctorModule } from "@domain/doctor/doctor.module";
import { PatientModule } from "@domain/patient/patient.module";
import { AppointmentModule } from "@domain/appointment/appointment.module";
import { BillingModule } from "@domain/billing/billing.module";
import { TreatmentModule } from "@domain/treatment/treatment.module";
import { ScheduleModule } from "@domain/schedule/schedule.module";
import { MedicalRecordModule } from "@domain/medical-record/medical-record.module";
import { CognitoAuthModule } from "@nestjs-cognito/auth";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useClass: PostgresService
        }),
        DiagnosisModule,
        DoctorModule,
        PatientModule,
        AppointmentModule,
        BillingModule,
        TreatmentModule,
        ScheduleModule,
        MedicalRecordModule,
        CognitoAuthModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                jwtVerifier: {
                    userPoolId: configService.get("COGNITO_USER_POOL_ID") as string,
                    clientId: configService.get("COGNITO_CLIENT_ID"),
                    tokenUse: "id",
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AppController],
    providers: [AppService, PostgresService],
})
export class AppModule {}
