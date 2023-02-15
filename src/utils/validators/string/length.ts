import { isNullOrEmpty } from "@bodynarf/utils";

import { FieldValidator } from "../../../types";

/**
 * Get string length validator func
 * @param length Minimum string length
 * @returns Instance of @see FieldValidator<string>
 */
export const getLengthValidator = (length: number): FieldValidator<string> => {
    length = length > 0 ? length : 0;

    return (value: string) => {
        return isNullOrEmpty(value) || value.length < length ? `Value must be atleast ${length} characters long` : "";
    };
};
