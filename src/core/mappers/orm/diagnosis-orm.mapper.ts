import { DiagnosisOrmEntity } from "@infrastructure/orm-entities/diagnosis-orm.entity";
import { DiagnosisDomainEntity } from "@domain/diagnosis/entities/diagnosis-domain.entity";

export class DiagnosisOrmMapper {
    static toDomainEntity(ormEntity: DiagnosisOrmEntity): DiagnosisDomainEntity {
        return new DiagnosisDomainEntity(
            ormEntity.id,
            ormEntity.diagnosisName,
            ormEntity.description,
        );
    }

    static toOrmEntity(domainEntity: DiagnosisDomainEntity): DiagnosisOrmEntity {
        const entity = new DiagnosisOrmEntity();
        entity.id = domainEntity.id;
        entity.diagnosisName = domainEntity.diagnosisName;
        entity.description = domainEntity.description;
        return entity;
    }
}
