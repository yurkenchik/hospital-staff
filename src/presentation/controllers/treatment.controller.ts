import {Controller, Get, Post, Delete, Param, Body, Patch} from '@nestjs/common';
import {TreatmentService} from "../../infrastrcuture/services/treatment.service";
import {Treatment} from "../../domain/entities/treatment.entity";
import {CreateTreatmentDto} from "../../domain/dto/treatment/create-treatment.dto";
import {UpdateTreatmentDto} from "../../domain/dto/treatment/update-treatment.dto";

@Controller('treatments')
export class TreatmentController {
    constructor(
        private readonly treatmentService: TreatmentService
    ) {}

    @Get(':id')
    async getTreatmentById(@Param('id') treatmentId: string): Promise<Treatment> {
        return this.treatmentService.getTreatmentById(treatmentId);
    }

    @Get()
    async getTreatments(): Promise<Array<Treatment>> {
        return this.treatmentService.getTreatments();
    }

    @Post()
    async createTreatment(@Body() createTreatmentDto: CreateTreatmentDto): Promise<Treatment> {
        return this.treatmentService.createTreatment(createTreatmentDto);
    }

    @Patch(':id')
    async updateTreatment(
        @Param('id') treatmentId: string,
        @Body() updateTreatmentDto: UpdateTreatmentDto
    ): Promise<Treatment> {
        return this.treatmentService.updateTreatment(treatmentId, updateTreatmentDto);
    }

    @Delete(':id')
    async deleteTreatment(@Param('id') treatmentId: string): Promise<void> {
        return this.treatmentService.deleteTreatment(treatmentId);
    }
}
