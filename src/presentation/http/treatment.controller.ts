import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { TreatmentService } from "@domain/treatment/services/treatment.service";
import { TreatmentDomainEntity } from "@domain/treatment/entities/treatment-domain.entity";
import { CreateTreatmentDto } from "@domain/treatment/dto/request/create-treatment.dto";
import { UpdateTreatmentDto } from "@domain/treatment/dto/request/update-treatment.dto";

@Controller('treatments')
export class TreatmentController {
    constructor(private readonly treatmentService: TreatmentService) {}

    @Get(':id')
    async getTreatmentById(@Param('id') treatmentId: string): Promise<TreatmentDomainEntity> {
        return this.treatmentService.getTreatmentById(treatmentId);
    }

    @Get()
    async getTreatments(): Promise<Array<TreatmentDomainEntity>> {
        return this.treatmentService.getTreatments();
    }

    @Post()
    async createTreatment(@Body() createTreatmentDto: CreateTreatmentDto): Promise<TreatmentDomainEntity> {
        return this.treatmentService.createTreatment(createTreatmentDto);
    }

    @Patch(':id')
    async updateTreatment(
        @Param('id') treatmentId: string,
        @Body() updateTreatmentDto: UpdateTreatmentDto
    ): Promise<TreatmentDomainEntity> {
        return this.treatmentService.updateTreatment(treatmentId, updateTreatmentDto);
    }

    @Delete(':id')
    async deleteTreatment(@Param('id') treatmentId: string): Promise<void> {
        return this.treatmentService.deleteTreatment(treatmentId);
    }
}
