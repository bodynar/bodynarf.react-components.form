import { FieldValidator } from "@bbr.form/types";

/**
 * Number is greater than zero validator
 * Invalid when value is greater than 0
 */
export const greaterThanZero: FieldValidator<number> = (value: number) => {
    return value <= 0 ? "Value must be greater than 0" : "";
};
