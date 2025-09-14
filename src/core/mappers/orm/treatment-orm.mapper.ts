import { TreatmentOrmEntity } from "@infrastructure/orm-entities/treatment-orm.entity";
import { TreatmentDomainEntity } from "@domain/treatment/entities/treatment-domain.entity";

export class TreatmentOrmMapper {
    static toDomainEntity(ormEntity: TreatmentOrmEntity): TreatmentDomainEntity {
        return new TreatmentDomainEntity(
            ormEntity.id,
            ormEntity.treatmentDescription,
            ormEntity.cost,
            ormEntity.startDate,
            ormEntity.endDate,
        );
    }

    static toOrmEntity(domainEntity: TreatmentDomainEntity): TreatmentOrmEntity {
        const entity = new TreatmentOrmEntity();
        entity.id = domainEntity.id;
        entity.treatmentDescription = domainEntity.treatmentDescription;
        entity.cost = domainEntity.cost;
        entity.startDate = domainEntity.startDate;
        entity.endDate = domainEntity.endDate;
        return entity;
    }
}
