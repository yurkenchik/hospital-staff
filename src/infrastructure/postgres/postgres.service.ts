import { Injectable } from "@nestjs/common";
import { DataSourceOptions } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { DiagnosisOrmEntity } from "../orm-entities/diagnosis-orm.entity";
import { AppointmentOrmEntity } from "../orm-entities/appointment-orm.entity";
import { BillingOrmEntity } from "../orm-entities/billing-orm.entity";
import { DoctorOrmEntity } from "../orm-entities/doctor-orm.entity";
import { PatientOrmEntity } from "../orm-entities/patient-orm.entity";
import { MedicalRecordOrmEntity } from "../orm-entities/medical-record-orm.entity";
import { ScheduleOrmEntity } from "../orm-entities/schedule-orm.entity";
import { TreatmentOrmEntity } from "../orm-entities/treatment-orm.entity";

@Injectable()
export class PostgresService implements TypeOrmOptionsFactory {
    constructor(
        private readonly configService: ConfigService,
    ) {}

    createTypeOrmOptions(): DataSourceOptions {
        return {
            type: 'postgres',
            host: this.configService.get<string>('POSTGRES_HOST'),
            port: this.configService.get<number>('POSTGRES_PORT'),
            username: this.configService.get<string>('POSTGRES_USER'),
            password: this.configService.get<string>('POSTGRES_PASSWORD'),
            database: this.configService.get<string>('POSTGRES_NAME'),
            entities: [
                DiagnosisOrmEntity,
                AppointmentOrmEntity,
                BillingOrmEntity,
                DoctorOrmEntity,
                PatientOrmEntity,
                MedicalRecordOrmEntity,
                ScheduleOrmEntity,
                TreatmentOrmEntity
            ],
            synchronize: true,
            ssl: { rejectUnauthorized: true },
        }
    }
}

