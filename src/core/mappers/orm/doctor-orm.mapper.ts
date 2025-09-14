import { DoctorOrmEntity } from "@infrastructure/orm-entities/doctor-orm.entity";
import { DoctorDomainEntity } from "@domain/doctor/entities/doctor-domain.entity";

export class DoctorOrmMapper {
    static toDomainEntity(ormEntity: DoctorOrmEntity): DoctorDomainEntity {
        return new DoctorDomainEntity(
            ormEntity.id,
            ormEntity.firstName,
            ormEntity.lastName,
            ormEntity.specialization,
            ormEntity.phoneNumber,
            ormEntity.email,
        );
    }

    static toOrmEntity(domainEntity: DoctorDomainEntity): DoctorOrmEntity {
        const entity = new DoctorOrmEntity();

        entity.id = domainEntity.id;
        entity.firstName = domainEntity.firstName;
        entity.lastName = domainEntity.lastName;
        entity.specialization = domainEntity.specialization;
        entity.phoneNumber = domainEntity.phoneNumber;
        entity.email = domainEntity.email;

        return entity;
    }

    static toOrmEntityIdOnly(id: string): DoctorOrmEntity {
        const doctorOrmEntity = new DoctorOrmEntity();
        doctorOrmEntity.id = id;
        return doctorOrmEntity;
    }
}
