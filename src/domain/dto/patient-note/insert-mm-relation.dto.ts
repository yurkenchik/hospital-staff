
export class InsertMmRelationDto {
    readonly joinTableName: string;
    readonly mainTable1: string;
    readonly mainTable2: string;
    readonly column1: string;
    readonly column2: string;
    readonly value1: string;
    readonly value2: string;
}