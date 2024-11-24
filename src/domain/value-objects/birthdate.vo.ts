import {ValueObject} from "../../common/common-use-classes/value-object-instance";
import {InvalidBirthdateException} from "../../common/exceptions/bad-request/invalid-birthdate.exception";

export class Birthdate extends ValueObject<string> {
    constructor(birthdate: string) {
        if (!Birthdate.validateBirthdate(birthdate)) {
            throw new InvalidBirthdateException();
        }
        super(birthdate);
    }

    private static  validateBirthdate(birthdate: string): boolean {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(birthdate)) {
            return false;
        }
        const date = new Date(birthdate);
        const timestamp = date.getTime();
        if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
            return false;
        }
        return birthdate === date.toISOString().split("T")[0];
    }

    getValue(): string {
        return this.value;
    }

    equals(other?: Birthdate): boolean {
        if (!other) {
            return false;
        }
        return other.value === this.value;
    }
}