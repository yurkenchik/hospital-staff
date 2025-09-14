import { ScheduleOrmEntity } from "@infrastructure/orm-entities/schedule-orm.entity";
import { ScheduleDomainEntity } from "@domain/schedule/entities/schedule-domain.entity";
import { DoctorOrmMapper } from "@core/mappers/orm/doctor-orm.mapper";

export class ScheduleOrmMapper {
    static toDomainEntity(ormEntity: ScheduleOrmEntity): ScheduleDomainEntity {
        return new ScheduleDomainEntity(
            ormEntity.id,
            ormEntity.workDay,
            ormEntity.startTime,
            ormEntity.endTime,
            ormEntity.doctor?.id,
        );
    }

    static toOrmEntity(domainEntity: ScheduleDomainEntity): ScheduleOrmEntity {
        const entity = new ScheduleOrmEntity();
        entity.id = domainEntity.id;
        entity.workDay = domainEntity.workDay;
        entity.startTime = domainEntity.startTime;
        entity.endTime = domainEntity.endTime;
        if (domainEntity.doctorId) entity.doctor = DoctorOrmMapper.toOrmEntityIdOnly(domainEntity.doctorId);
        return entity;
    }
}
