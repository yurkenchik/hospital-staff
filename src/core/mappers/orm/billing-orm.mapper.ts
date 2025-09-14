import { BillingOrmEntity } from "@infrastructure/orm-entities/billing-orm.entity";
import { BillingDomainEntity } from "@domain/billing/entities/billing-domain.entity";
import { AppointmentOrmMapper } from "@core/mappers/orm/appointment-orm.mapper";

export class BillingOrmMapper {
    static toDomainEntity(ormEntity: BillingOrmEntity): BillingDomainEntity {
        return new BillingDomainEntity(
            ormEntity.id,
            ormEntity.amount,
            ormEntity.paymentDate,
            ormEntity.appointment?.id,
        );
    }

    static toOrmEntity(domainEntity: BillingDomainEntity): BillingOrmEntity {
        const entity = new BillingOrmEntity();
        entity.id = domainEntity.id;
        entity.amount = domainEntity.amount;
        entity.paymentDate = domainEntity.paymentDate;
        if (domainEntity.appointmentId) entity.appointment = AppointmentOrmMapper.toOrmEntityIdOnly(domainEntity.appointmentId);
        return entity;
    }
}
