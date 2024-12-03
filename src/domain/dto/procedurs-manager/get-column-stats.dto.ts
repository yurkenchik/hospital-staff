import {IsString} from "class-validator";

export class GetColumnStatsDto {
    @IsString()
    readonly tableName: string;
    @IsString()
    readonly columnName: string;
}