import { isNullOrUndefined, isStringEmpty } from "@bodynarf/utils";

import { FormItem, ValidationResult, FormItemValidationState } from "@bbr.form/types";

/**
 * Validate form item by it's own validators
 * @param item Form item to validate
 * @param value Form item last value
 * @returns Instance of @see ValidationResult with result of validation
 */
export const validateItem = (item: FormItem<any>, value: any): ValidationResult => {
    if (item.modelConfig.validators.length === 0) {
        return {
            fieldName: item.name,
            messages: [],
            state: FormItemValidationState.None,
        };
    }

    const messages: Array<string> = [];

    item.modelConfig.validators.forEach(validator => {
        const error = validator(value);

        if (isNullOrUndefined(error) || isStringEmpty(error)) {
            return;
        }

        messages.push(error);
    });

    const status = messages.length > 0
        ? FormItemValidationState.Invalid
        : FormItemValidationState.Valid;

    return {
        fieldName: item.name,
        messages: messages,
        state: status
    };
};
