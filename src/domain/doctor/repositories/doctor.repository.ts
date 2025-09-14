import { DoctorDomainEntity } from "../entities/doctor-domain.entity";
import { CreateDoctorDto } from "@domain/doctor/dto/request/create-doctor.dto";
import { UpdateDoctorDto } from "@domain/doctor/dto/request/update-doctor.dto";

export interface DoctorRepository {
    getDoctorById(id: string): Promise<DoctorDomainEntity | null>;
    getDoctors(): Promise<Array<DoctorDomainEntity>>;
    createDoctor(createDoctorDto: CreateDoctorDto): Promise<DoctorDomainEntity>;
    updateDoctor(id: string, updateDoctorDto: UpdateDoctorDto): Promise<DoctorDomainEntity>;
    deleteDoctor(id: string): Promise<void>;
}
