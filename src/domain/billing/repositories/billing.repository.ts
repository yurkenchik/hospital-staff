import { BillingDomainEntity } from "../entities/billing-domain.entity";
import { CreateBillingDto } from "@domain/billing/dto/request/create-billing.dto";
import { UpdateBillingDto } from "@domain/billing/dto/request/update-billing.dto";

export interface BillingRepository {
    getBillingById(id: string): Promise<BillingDomainEntity | null>;
    getBillings(): Promise<Array<BillingDomainEntity>>;
    getAppointmentBillings(appointmentId: string): Promise<Array<BillingDomainEntity>>;
    createBilling(appointmentId: string, createBillingDto: CreateBillingDto): Promise<BillingDomainEntity>;
    updateBilling(id: string, updateBillingDto: UpdateBillingDto): Promise<BillingDomainEntity>;
    deleteBilling(id: string): Promise<void>;
}
