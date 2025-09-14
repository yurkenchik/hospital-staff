import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { DoctorService } from "@domain/doctor/services/doctor.service";
import { DoctorDomainEntity } from "@domain/doctor/entities/doctor-domain.entity";
import { CreateDoctorDto } from "@domain/doctor/dto/request/create-doctor.dto";
import { UpdateDoctorDto } from "@domain/doctor/dto/request/update-doctor.dto";

@Controller('doctors')
export class DoctorController {
    constructor(
        private readonly doctorService: DoctorService
    ) {}

    @Get(":id")
    async getDoctorById(@Param("id") doctorId: string): Promise<DoctorDomainEntity> {
        return this.doctorService.getDoctorById(doctorId);
    }

    @Get()
    async getDoctors(): Promise<Array<DoctorDomainEntity>> {
        return this.doctorService.getDoctors();
    }

    @Post()
    async createDoctor(@Body() createDoctorDto: CreateDoctorDto): Promise<DoctorDomainEntity> {
        return this.doctorService.createDoctor(createDoctorDto);
    }

    @Patch(":id")
    async updateDoctor(
        @Param("id") doctorId: string,
        @Body() updateDoctorDto: UpdateDoctorDto
    ): Promise<DoctorDomainEntity> {
        return this.doctorService.updateDoctor(doctorId, updateDoctorDto);
    }

    @Delete(":id")
    async deleteDoctor(@Param("id") doctorId: string): Promise<void> {
        return this.doctorService.deleteDoctor(doctorId);
    }
}