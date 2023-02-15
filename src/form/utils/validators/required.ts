import { isNullOrUndefined } from "@bodynarf/utils";

import { FieldValidator } from "../../types";

/**
 * Required validator function.
 * Invalid when value is null or undefined
*/
export const required: FieldValidator<any> = (value: any) => {
    return isNullOrUndefined(value) ? "Value is required" : "";
};
