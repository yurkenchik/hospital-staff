import {IsOptional} from "class-validator";

export class UpdateDoctorDto {
    @IsOptional()
    readonly firstName: string;
    @IsOptional()
    readonly lastName: string;
    @IsOptional()
    readonly specialization: string;
    @IsOptional()
    readonly email: string;
    @IsOptional()
    readonly phoneNumber: string;
}