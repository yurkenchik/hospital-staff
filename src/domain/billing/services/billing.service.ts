import { Inject, Injectable } from "@nestjs/common";
import { BillingRepository } from "../repositories/billing.repository";
import { UpdateBillingDto } from "../dto/request/update-billing.dto";
import { CreateBillingDto } from "../dto/request/create-billing.dto";
import { BillingNotFoundException } from "@core/exceptions/not-found/billing-not-found.exception";
import { AppointmentService } from "@domain/appointment/services/appointment.service";
import { BillingDomainEntity } from "../entities/billing-domain.entity";
import { BILLING_REPOSITORY } from "@domain/billing/billing.tokens";

@Injectable()
export class BillingService {
    constructor(
        @Inject(BILLING_REPOSITORY)
        private readonly billingRepository: BillingRepository,
        private readonly appointmentService: AppointmentService,
    ) {}

    async getBillingById(billingId: string): Promise<BillingDomainEntity> {
        const billing = await this.billingRepository.getBillingById(billingId);
        if (!billing) {
            throw new BillingNotFoundException();
        }
        return billing;
    }

    async getBillings(): Promise<Array<BillingDomainEntity>> {
        return this.billingRepository.getBillings();
    }

    async getAppointmentBillings(appointmentId: string): Promise<Array<BillingDomainEntity>> {
        const appointment = await this.appointmentService.getAppointmentById(appointmentId);

        return this.billingRepository.getAppointmentBillings(appointment.id);
    }

    async createBilling(appointmentId: string, createBillingDto: CreateBillingDto): Promise<BillingDomainEntity> {
        const appointment = await this.appointmentService.getAppointmentById(appointmentId);

        return await this.billingRepository.createBilling(appointment.id, createBillingDto);
    }

    async updateBilling(billingId: string, updateBillingDto: UpdateBillingDto): Promise<BillingDomainEntity> {
        return await this.billingRepository.updateBilling(billingId, updateBillingDto);
    }

    async deleteBilling(billingId: string): Promise<void> {
        await this.billingRepository.deleteBilling(billingId);
    }
}