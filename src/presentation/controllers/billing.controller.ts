import {Controller, Get, Post, Delete, Param, Body, Patch} from "@nestjs/common";
import { CreateBillingDto } from "../../domain/dto/billing/create-billing.dto";
import { UpdateBillingDto } from "../../domain/dto/billing/update-billing.dto";
import { Billing } from "../../domain/entities/billing.entity";
import {BillingService} from "../../infrastrcuture/services/billing.service";
import {DeleteResult} from "typeorm";

@Controller('billings')
export class BillingController {
    constructor(
        private readonly billingService: BillingService
    ) {}

    @Get(':id')
    async getBillingById(@Param('id') billingId: string): Promise<Billing> {
        return this.billingService.getBillingById(billingId);
    }

    @Get()
    async getBillings(): Promise<Billing[]> {
        return this.billingService.getBillings();
    }

    @Get("appointment/:appointmentId")
    async getAppointmentBillings(@Param("appointmentId") appointmentId: string): Promise<Billing[]> {
        return this.billingService.getAppointmentBillings(appointmentId);
    }

    @Post(":appointmentId")
    async createBilling(
        @Param('appointmentId') appointmentId: string,
        @Body() createBillingDto: CreateBillingDto
    ): Promise<Billing> {
        return this.billingService.createBilling(appointmentId, createBillingDto);
    }

    @Patch(':id')
    async updateBilling(
        @Param('id') billingId: string,
        @Body() updateBillingDto: UpdateBillingDto
    ): Promise<Billing> {
        return this.billingService.updateBilling(billingId, updateBillingDto);
    }

    @Delete(':id')
    async deleteBilling(@Param('id') billingId: string): Promise<DeleteResult> {
        return this.billingService.deleteBilling(billingId);
    }
}
