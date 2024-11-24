import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {DoctorService} from "../../infrastrcuture/services/doctor.service";
import {Doctor} from "../../domain/entities/doctor.entity";
import {CreateDoctorDto} from "../../domain/dto/doctor/create-doctor.dto";
import {UpdateDoctorDto} from "../../domain/dto/doctor/update-doctor.dto";

@Controller('doctors')
export class DoctorController {
    constructor(
        private readonly doctorService: DoctorService
    ) {}

    @Get(":id")
    async getDoctorById(@Param("id") doctorId: string): Promise<Doctor> {
        return this.doctorService.getDoctorById(doctorId);
    }

    @Get()
    async getDoctors(): Promise<Array<Doctor>> {
        return this.doctorService.getDoctors();
    }

    @Post()
    async createDoctor(@Body() createDoctorDto: CreateDoctorDto): Promise<Doctor> {
        return this.doctorService.createDoctor(createDoctorDto);
    }

    @Patch(":id")
    async updateDoctor(
        @Param("id") doctorId: string,
        @Body() updateDoctorDto: UpdateDoctorDto
    ): Promise<Doctor> {
        return this.doctorService.updateDoctor(doctorId, updateDoctorDto);
    }

    @Delete(":id")
    async deleteDoctor(@Param("id") doctorId: string): Promise<void> {
        return this.doctorService.deleteDoctor(doctorId);
    }
}