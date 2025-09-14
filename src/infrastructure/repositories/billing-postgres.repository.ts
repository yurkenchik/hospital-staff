import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository } from "typeorm";
import { BillingOrmEntity } from "@infrastructure/orm-entities/billing-orm.entity";
import { BillingDomainEntity } from "@domain/billing/entities/billing-domain.entity";
import { BillingOrmMapper } from "@core/mappers/orm/billing-orm.mapper";
import { BillingRepository } from "@domain/billing/repositories/billing.repository";
import { CreateBillingDto } from "@domain/billing/dto/request/create-billing.dto";
import { UpdateBillingDto } from "@domain/billing/dto/request/update-billing.dto";

@Injectable()
export class BillingPostgresRepository implements BillingRepository {
    constructor(
        @InjectRepository(BillingOrmEntity)
        private readonly billingRepository: Repository<BillingOrmEntity>,
    ) {}

    async getBillingById(id: string): Promise<BillingDomainEntity | null> {
        const billingOrmEntity = await this.billingRepository
            .createQueryBuilder()
            .where("id = :id", { id })
            .getOne();

        if (!billingOrmEntity) {
            return null;
        }
        return BillingOrmMapper.toDomainEntity(billingOrmEntity);
    }

    async getBillings(): Promise<Array<BillingDomainEntity>> {
        const billingOrmEntities = await this.billingRepository
            .createQueryBuilder()
            .getMany();

        return billingOrmEntities.map(billing => BillingOrmMapper.toDomainEntity(billing));
    }

    async getAppointmentBillings(appointmentId: string): Promise<Array<BillingDomainEntity>> {
        const billingOrmEntities = await this.billingRepository
            .createQueryBuilder("billing")
            .leftJoinAndSelect("billing.appointment", "appointment")
            .where("billing.appointment.id = :appointmentId", { appointmentId })
            .getMany();

        return billingOrmEntities.map(billing => BillingOrmMapper.toDomainEntity(billing));
    }

    async createBilling(appointmentId: string, createBillingDto: CreateBillingDto): Promise<BillingDomainEntity> {
        const billingInsertResult: InsertResult = await this.billingRepository
            .createQueryBuilder()
            .insert()
            .into(BillingOrmEntity)
            .values({
                ...createBillingDto,
                appointment: { id: appointmentId } as any
            })
            .execute();

        const billingInsertedId = billingInsertResult.identifiers[billingInsertResult.identifiers.length - 1].id;
        return this.getBillingById(billingInsertedId);
    }

    async updateBilling(id: string, updateBillingDto: UpdateBillingDto): Promise<BillingDomainEntity> {
        await this.billingRepository
            .createQueryBuilder()
            .update(BillingOrmEntity)
            .set(updateBillingDto)
            .where("id = :id", { id })
            .execute();

        return this.getBillingById(id);
    }

    async deleteBilling(id: string): Promise<void> {
        await this.billingRepository
            .createQueryBuilder()
            .delete()
            .from(BillingOrmEntity)
            .where("id = :id", { id })
            .execute();
    }
}
