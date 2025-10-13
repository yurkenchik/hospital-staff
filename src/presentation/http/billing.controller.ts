import { Body, Controller, Delete, Get, Param, Patch, Post, HttpStatus } from "@nestjs/common";
import { BillingDomainEntity } from "@domain/billing/entities/billing-domain.entity";
import { BillingService } from "@domain/billing/services/billing.service";
import { CreateBillingDto } from "@domain/billing/dto/request/create-billing.dto";
import { UpdateBillingDto } from "@domain/billing/dto/request/update-billing.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BillingNotFoundException } from "@core/exceptions/not-found/billing-not-found.exception";
import { AppointmentNotFoundException } from "@core/exceptions/not-found/appointment-not-found.exception";

@Controller('billings')
export class BillingController {
    constructor(private readonly billingService: BillingService) {}

    @ApiOperation({ summary: 'Get a billing record by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The billing record', type: BillingDomainEntity })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: BillingNotFoundException.prototype.message })
    @Get(':id')
    async getBillingById(@Param('id') billingId: string): Promise<BillingDomainEntity> {
        return this.billingService.getBillingById(billingId);
    }

    @ApiOperation({ summary: 'Get all billing records' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Array of billing records', type: [BillingDomainEntity] })
    @Get()
    async getBillings(): Promise<Array<BillingDomainEntity>> {
        return this.billingService.getBillings();
    }

    @ApiOperation({ summary: 'Get all billing records for a specific appointment' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Array of billing records for the appointment', type: [BillingDomainEntity] })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: AppointmentNotFoundException.prototype.message })
    @Get("appointment/:appointmentId")
    async getAppointmentBillings(@Param("appointmentId") appointmentId: string): Promise<Array<BillingDomainEntity>> {
        return this.billingService.getAppointmentBillings(appointmentId);
    }

    @ApiOperation({ summary: 'Create a new billing record for an appointment' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The created billing record', type: BillingDomainEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: AppointmentNotFoundException.prototype.message })
    @Post(":appointmentId")
    async createBilling(
        @Param('appointmentId') appointmentId: string,
        @Body() createBillingDto: CreateBillingDto
    ): Promise<BillingDomainEntity> {
        return this.billingService.createBilling(appointmentId, createBillingDto);
    }

    @ApiOperation({ summary: 'Update a billing record by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The updated billing record', type: BillingDomainEntity })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: BillingNotFoundException.prototype.message })
    @Patch(':id')
    async updateBilling(
        @Param('id') billingId: string,
        @Body() updateBillingDto: UpdateBillingDto
    ): Promise<BillingDomainEntity> {
        return this.billingService.updateBilling(billingId, updateBillingDto);
    }

    @ApiOperation({ summary: 'Delete a billing record by ID' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Billing record successfully deleted.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: BillingNotFoundException.prototype.message })
    @Delete(':id')
    async deleteBilling(@Param('id') billingId: string): Promise<void> {
        return this.billingService.deleteBilling(billingId);
    }
}
