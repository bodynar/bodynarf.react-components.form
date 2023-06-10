import { FieldValidator } from "@bbr.form/types";

/**
 * Number is not a zero validator
 * Invalid when value is not a 0
 */
export const notZero: FieldValidator<number> = (value: number) => {
    return value === 0 ? "Value must be not a 0" : "";
};
