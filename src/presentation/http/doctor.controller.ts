import { Body, Controller, Delete, Get, Param, Patch, Post, HttpStatus } from "@nestjs/common";
import { DoctorService } from "@domain/doctor/services/doctor.service";
import { DoctorDomainEntity } from "@domain/doctor/entities/doctor-domain.entity";
import { CreateDoctorDto } from "@domain/doctor/dto/request/create-doctor.dto";
import { UpdateDoctorDto } from "@domain/doctor/dto/request/update-doctor.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DoctorNotFoundException } from "@core/exceptions/not-found/doctor-not-found.exception";

@Controller('doctors')
export class DoctorController {
    constructor(
        private readonly doctorService: DoctorService
    ) {}

    @ApiOperation({ summary: 'Get a doctor by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The doctor record', type: DoctorDomainEntity })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: DoctorNotFoundException.prototype.message })
    @Get(":id")
    async getDoctorById(@Param("id") doctorId: string): Promise<DoctorDomainEntity> {
        return this.doctorService.getDoctorById(doctorId);
    }

    @ApiOperation({ summary: 'Get all doctors' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Array of doctor records', type: [DoctorDomainEntity] })
    @Get()
    async getDoctors(): Promise<Array<DoctorDomainEntity>> {
        return this.doctorService.getDoctors();
    }

    @ApiOperation({ summary: 'Create a new doctor' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The created doctor record', type: DoctorDomainEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input.' })
    @Post()
    async createDoctor(@Body() createDoctorDto: CreateDoctorDto): Promise<DoctorDomainEntity> {
        return this.doctorService.createDoctor(createDoctorDto);
    }

    @ApiOperation({ summary: 'Update a doctor by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The updated doctor record', type: DoctorDomainEntity })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: DoctorNotFoundException.prototype.message })
    @Patch(":id")
    async updateDoctor(
        @Param("id") doctorId: string,
        @Body() updateDoctorDto: UpdateDoctorDto
    ): Promise<DoctorDomainEntity> {
        return this.doctorService.updateDoctor(doctorId, updateDoctorDto);
    }

    @ApiOperation({ summary: 'Delete a doctor by ID' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Doctor successfully deleted.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: DoctorNotFoundException.prototype.message })
    @Delete(":id")
    async deleteDoctor(@Param("id") doctorId: string): Promise<void> {
        return this.doctorService.deleteDoctor(doctorId);
    }
}