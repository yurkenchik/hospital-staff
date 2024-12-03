import {Injectable} from "@nestjs/common";
import {BillingRepository} from "../../domain/repositories/billing,repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Billing} from "../../domain/entities/billing.entity";
import {DeleteResult, InsertResult, Repository} from "typeorm";
import {UpdateBillingDto} from "../../domain/dto/billing/update-billing.dto";
import {CreateBillingDto} from "../../domain/dto/billing/create-billing.dto";
import {BillingNotFoundException} from "../../common/exceptions/not-found/billing-not-found.exception";
import {AppointmentService} from "./appointment.service";

@Injectable()
export class BillingService extends BillingRepository {
    constructor(
        @InjectRepository(Billing)
        private readonly billingRepository: Repository<Billing>,
        private readonly appointmentService: AppointmentService,
    ) {
        super();
    }

    async getBillingById(billingId: string): Promise<Billing> {
        const billing = await this.billingRepository
            .createQueryBuilder()
            .where("id = :billingId", { billingId })
            .getOne();

        if (!billing) {
            throw new BillingNotFoundException();
        }
        return billing;
    }

    async getBillings(): Promise<Array<Billing>> {
        return this.billingRepository
            .createQueryBuilder()
            .getMany();
    }

    async getAppointmentBillings(appointmentId: string): Promise<Array<Billing>> {
        const appointment = await this.appointmentService.getAppointmentById(appointmentId);

        return this.billingRepository
            .createQueryBuilder("billing")
            .leftJoinAndSelect("billing.appointment", "appointment")
            .where("billing.appointment.id = :appointmentId", { appointmentId: appointment.id })
            .getMany();
    }

    async createBilling(appointmentId: string, createBillingDto: CreateBillingDto): Promise<Billing> {
        const appointment = await this.appointmentService.getAppointmentById(appointmentId);

        const billingInsertResult: InsertResult = await this.billingRepository
            .createQueryBuilder()
            .insert()
            .into(Billing)
            .values({
                ...createBillingDto,
                appointment
            })
            .execute();

        const billingInsertedId = billingInsertResult.identifiers[billingInsertResult.identifiers.length - 1].id;
        return this.getBillingById(billingInsertedId);
    }

    async updateBilling(billingId: string, updateBillingDto: UpdateBillingDto): Promise<Billing> {
        const billing = await this.billingRepository.findOne({ where: { id: billingId } });
        if (!billing) {
            throw new BillingNotFoundException();
        }

        billing.preventModifications();
        Object.assign(billing, updateBillingDto);
        return this.billingRepository.save(billing);
    }

    async deleteBilling(billingId: string): Promise<DeleteResult> {
        return this.billingRepository
            .createQueryBuilder()
            .delete()
            .from(Billing)
            .where("id = :billingId", { billingId })
            .execute();
    }
}