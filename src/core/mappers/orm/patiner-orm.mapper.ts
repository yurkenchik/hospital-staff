import { PatientOrmEntity } from "@infrastructure/orm-entities/patient-orm.entity";
import { PatientDomainEntity } from "@domain/patient/entities/patient-domain.entity";

export class PatientOrmMapper {
    static toDomainEntity(ormEntity: PatientOrmEntity): PatientDomainEntity {
        return new PatientDomainEntity(
            ormEntity.id,
            ormEntity.firstName,
            ormEntity.lastName,
            ormEntity.birthdate,
            ormEntity.phoneNumber,
        );
    }

    static toOrmEntity(domainEntity: PatientDomainEntity): PatientOrmEntity {
        const entity = new PatientOrmEntity();
        entity.id = domainEntity.id;
        entity.firstName = domainEntity.firstName;
        entity.lastName = domainEntity.lastName;
        entity.birthdate = domainEntity.birthdate;
        entity.phoneNumber = domainEntity.phoneNumber;
        return entity;
    }

    static toOrmEntityIdOnly(id: string): PatientOrmEntity {
        const patientOrmEntity = new PatientOrmEntity();
        patientOrmEntity.id = id;
        return patientOrmEntity;
    }
}
