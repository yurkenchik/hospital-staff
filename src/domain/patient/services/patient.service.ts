import {forwardRef, Inject, Injectable} from "@nestjs/common";
import {InsertResult, Repository} from "typeorm";
import {PatientOrmEntity} from "@infrastructure/orm-entities/patient-orm.entity";
import {CreatePatientDto} from "../dto/request/create-patient.dto";
import {PatientRepository} from "../repositories/patient.repository";
import {PatientNotFoundException} from "@core/exceptions/not-found/patient-not-found.exception";
import {Birthdate} from "@core/value-objects/birthdate.vo";
import {PhoneNumber} from "@core/value-objects/phone-number.vo";
import {UpdatePatientDto} from "../dto/request/update-patient.dto";
import {PatientDomainEntity} from "../entities/patient-domain.entity";
import {PATIENT_REPOSITORY} from "../patient.module";

@Injectable()
export class PatientService {
    constructor(
        @Inject(forwardRef(() => PATIENT_REPOSITORY))
        private readonly patientRepository: PatientRepository
    ) {}

    async getPatientById(patientId:string): Promise<PatientDomainEntity> {
        const patient = await this.patientRepository.getPatientById(patientId);
        if (!patient) {
            throw new PatientNotFoundException();
        }
        return patient;
    }

    async getPatients(): Promise<Array<PatientDomainEntity>> {
        return this.patientRepository.getPatients();
    }

    async createPatient(createPatientDto: CreatePatientDto): Promise<PatientDomainEntity> {
        const birthdate = new Birthdate(createPatientDto.birthdate).getValue();
        const phoneNumber = new PhoneNumber(createPatientDto.phoneNumber).getValue();

        return await this.patientRepository.createPatient({
            ...createPatientDto,
            phoneNumber,
            birthdate
        });
    }

    async updatePatient(patientId: string, updatePatientDto: UpdatePatientDto): Promise<PatientDomainEntity> {
        const patient = await this.getPatientById(patientId);
        return await this.patientRepository.updatePatient(patient.id, updatePatientDto);
    }

    async deletePatient(patientId: string): Promise<void> {
        await this.patientRepository.deletePatient(patientId);
    }
}