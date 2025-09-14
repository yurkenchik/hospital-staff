import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { BillingDomainEntity } from "@domain/billing/entities/billing-domain.entity";
import { BillingService } from "@domain/billing/services/billing.service";
import { CreateBillingDto } from "@domain/billing/dto/request/create-billing.dto";
import { UpdateBillingDto } from "@domain/billing/dto/request/update-billing.dto";

@Controller('billings')
export class BillingController {
    constructor(private readonly billingService: BillingService) {}

    @Get(':id')
    async getBillingById(@Param('id') billingId: string): Promise<BillingDomainEntity> {
        return this.billingService.getBillingById(billingId);
    }

    @Get()
    async getBillings(): Promise<Array<BillingDomainEntity>> {
        return this.billingService.getBillings();
    }

    @Get("appointment/:appointmentId")
    async getAppointmentBillings(@Param("appointmentId") appointmentId: string): Promise<Array<BillingDomainEntity>> {
        return this.billingService.getAppointmentBillings(appointmentId);
    }

    @Post(":appointmentId")
    async createBilling(
        @Param('appointmentId') appointmentId: string,
        @Body() createBillingDto: CreateBillingDto
    ): Promise<BillingDomainEntity> {
        return this.billingService.createBilling(appointmentId, createBillingDto);
    }

    @Patch(':id')
    async updateBilling(
        @Param('id') billingId: string,
        @Body() updateBillingDto: UpdateBillingDto
    ): Promise<BillingDomainEntity> {
        return this.billingService.updateBilling(billingId, updateBillingDto);
    }

    @Delete(':id')
    async deleteBilling(@Param('id') billingId: string): Promise<void> {
        return this.billingService.deleteBilling(billingId);
    }
}
