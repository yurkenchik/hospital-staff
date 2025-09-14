import { AppointmentOrmEntity } from "@infrastructure/orm-entities/appointment-orm.entity";
import { AppointmentDomainEntity } from "@domain/appointment/entities/appointment-domain.entity";
import { PatientOrmMapper } from "@core/mappers/orm/patiner-orm.mapper";
import { DoctorOrmMapper } from "@core/mappers/orm/doctor-orm.mapper";

export class AppointmentOrmMapper {
    static toDomainEntity(ormEntity: AppointmentOrmEntity): AppointmentDomainEntity {
        return new AppointmentDomainEntity(
            ormEntity.id,
            ormEntity.appointmentDate,
            ormEntity.cost,
            ormEntity.patient?.id,
            ormEntity.doctor?.id,
        );
    }

    static toOrmEntity(domainEntity: AppointmentDomainEntity): AppointmentOrmEntity {
        const entity = new AppointmentOrmEntity();
        entity.id = domainEntity.id;
        entity.appointmentDate = domainEntity.appointmentDate;
        entity.cost = domainEntity.cost;
        if (domainEntity.patientId) entity.patient = PatientOrmMapper.toOrmEntityIdOnly(domainEntity.patientId);
        if (domainEntity.doctorId) entity.doctor = DoctorOrmMapper.toOrmEntityIdOnly(domainEntity.doctorId);
        return entity;
    }

    static toOrmEntityIdOnly(id: string): AppointmentOrmEntity {
        const appointmentOrmEntity = new AppointmentOrmEntity();
        appointmentOrmEntity.id = id;
        return appointmentOrmEntity;
    }
}
