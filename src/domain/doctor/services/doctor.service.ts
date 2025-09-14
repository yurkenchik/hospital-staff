import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { DoctorDomainEntity } from "../entities/doctor-domain.entity";
import { DoctorNotFoundException } from "@core/exceptions/not-found/doctor-not-found.exception";
import { Email } from "@core/value-objects/email.vo";
import { PhoneNumber } from "@core/value-objects/phone-number.vo";
import { DOCTOR_REPOSITORY } from "../doctor.module";
import { CreateDoctorDto } from "../dto/request/create-doctor.dto";
import { UpdateDoctorDto } from "../dto/request/update-doctor.dto";
import { DoctorRepository } from "@domain/doctor/repositories/doctor.repository";

@Injectable()
export class DoctorService {
    constructor(
        @Inject(forwardRef(() => DOCTOR_REPOSITORY))
        private readonly doctorRepository: DoctorRepository
    ) {}

    async getDoctorById(doctorId: string): Promise<DoctorDomainEntity> {
        const doctor = await this.doctorRepository.getDoctorById(doctorId);
        if (!doctor) {
            throw new DoctorNotFoundException();
        }
        return doctor;
    }

    async getDoctors(): Promise<Array<DoctorDomainEntity>> {
        return this.doctorRepository.getDoctors();
    }

    async createDoctor(createDoctorDto: CreateDoctorDto): Promise<DoctorDomainEntity> {
        const email = new Email(createDoctorDto.email).getValue();
        const phoneNumber = new PhoneNumber(createDoctorDto.phoneNumber).getValue();

        return await this.doctorRepository.createDoctor({
            ...createDoctorDto,
            email,
            phoneNumber,
        });
    }

    async updateDoctor(id: string, updateDoctorDto: UpdateDoctorDto): Promise<DoctorDomainEntity> {
        const doctor = await this.getDoctorById(id);
        return await this.doctorRepository.updateDoctor(id, updateDoctorDto);
    }

    async deleteDoctor(id: string): Promise<void> {
        await this.doctorRepository.deleteDoctor(id);
    }
}