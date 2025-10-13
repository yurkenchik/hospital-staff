import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { TreatmentService } from "@domain/treatment/services/treatment.service";
import { TreatmentDomainEntity } from "@domain/treatment/entities/treatment-domain.entity";
import { CreateTreatmentDto } from "@domain/treatment/dto/request/create-treatment.dto";
import { UpdateTreatmentDto } from "@domain/treatment/dto/request/update-treatment.dto";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TreatmentNotFoundException } from "@core/exceptions/not-found/treatment-not-found.exception";

@Controller('treatments')
export class TreatmentController {
    constructor(private readonly treatmentService: TreatmentService) {}

    @ApiOperation({ summary: 'Getting treatment by id' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: HttpStatus.OK, type: TreatmentDomainEntity })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: TreatmentNotFoundException.prototype.message })
    @Get(':id')
    async getTreatmentById(@Param('id') treatmentId: string): Promise<TreatmentDomainEntity> {
        return this.treatmentService.getTreatmentById(treatmentId);
    }

    @ApiOperation({ summary: 'Getting all treatments' })
    @ApiResponse({ status: HttpStatus.OK, type: [TreatmentDomainEntity] })
    @Get()
    async getTreatments(): Promise<Array<TreatmentDomainEntity>> {
        return this.treatmentService.getTreatments();
    }

    @ApiOperation({ summary: 'Creating treatment' })
    @ApiResponse({ status: HttpStatus.CREATED, type: TreatmentDomainEntity })
    @ApiBody({ type: CreateTreatmentDto })
    @Post()
    async createTreatment(@Body() createTreatmentDto: CreateTreatmentDto): Promise<TreatmentDomainEntity> {
        return this.treatmentService.createTreatment(createTreatmentDto);
    }

    @ApiOperation({ summary: 'Updating treatment by id' })
    @ApiParam({ name: 'id', type: String })
    @ApiBody({ type: UpdateTreatmentDto })
    @ApiResponse({ status: HttpStatus.OK, type: TreatmentDomainEntity })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: TreatmentNotFoundException.prototype.message })
    @Patch(':id')
    async updateTreatment(
        @Param('id') treatmentId: string,
        @Body() updateTreatmentDto: UpdateTreatmentDto
    ): Promise<TreatmentDomainEntity> {
        return this.treatmentService.updateTreatment(treatmentId, updateTreatmentDto);
    }

    @ApiOperation({ summary: 'Deleting treatment by id' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Treatment successfully deleted.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: TreatmentNotFoundException.prototype.message })
    @Delete(':id')
    async deleteTreatment(@Param('id') treatmentId: string): Promise<void> {
        return this.treatmentService.deleteTreatment(treatmentId);
    }
}
