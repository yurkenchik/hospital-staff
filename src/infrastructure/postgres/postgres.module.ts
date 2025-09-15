import { Module } from "@nestjs/common";
import { PostgresService } from "@infrastructure/postgres/postgres.service";

@Module({
    providers: [PostgresService],
    exports: [PostgresService],
})
export class PostgresModule {}