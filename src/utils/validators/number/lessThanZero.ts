import { FieldValidator } from "@bbr.form/types";

/**
 * Number is less than zero validator function
 * Invalid when value is less than 0
 */
export const lessThanZero: FieldValidator<number> = (value: number) => {
    return value >= 0 ? "Value must be less than 0" : "";
};
