import {Billing} from "../entities/billing.entity";
import {CreateBillingDto} from "../dto/billing/create-billing.dto";
import {UpdateBillingDto} from "../dto/billing/update-billing.dto";

export abstract class BillingRepository {
    abstract getBillingById(billingId: string): Promise<Billing>;
    abstract getBillings(): Promise<Array<Billing>>;
    abstract createBilling(appointmentId: string, createBillingDto: CreateBillingDto): Promise<Billing>;
    abstract updateBilling(billingId: string, updateBillingDto: UpdateBillingDto): Promise<Billing>;
    abstract deleteBilling(billingId: string): Promise<void>;
}