import {Injectable} from "@nestjs/common";
import {DataSourceOptions} from "typeorm";
import {ConfigService} from "@nestjs/config";
import {join} from "path";
import {TypeOrmOptionsFactory} from "@nestjs/typeorm";
import {Diagnosis} from "../../../domain/entities/diagnosis.entity";
import {Appointment} from "../../../domain/entities/appointment.entity";
import {AppointmentDiagnosis} from "../../../domain/entities/appointment-diagnosis.entity";
import {Billing} from "../../../domain/entities/billing.entity";
import {Doctor} from "../../../domain/entities/doctor.entity";
import {Patient} from "../../../domain/entities/patient.entity";
import {MedicalRecord} from "../../../domain/entities/medical-record.entity";
import {PatientTreatment} from "../../../domain/entities/patient-treatment";
import {Schedule} from "../../../domain/entities/schedule.entity";
import {Treatment} from "../../../domain/entities/treatment.entity";
import {PatientNote} from "../../../domain/entities/patient-note.entity";

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
    constructor(
        private readonly configService: ConfigService,
    ) {}

    createTypeOrmOptions(): DataSourceOptions {
        return {
            type: 'mysql',
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USER'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_NAME'),
            // entities: [join(__dirname, "../../domain/entities/*.entity.{js.ts}")],
            entities: [Diagnosis, Appointment, AppointmentDiagnosis, Billing, Doctor, Patient, MedicalRecord, PatientTreatment, Schedule, Treatment, PatientNote],
            synchronize: false,
            logging: true,
            migrations: [join(__dirname, 'migrations/*.{js,ts}')],
            extra: {
                ssl: false
            }
        }
    }
}

