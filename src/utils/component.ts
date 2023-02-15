import { ValidationState, ValidationStatus } from "@bodynarf/react.components";

import { FormItemModelConfig, FormItemValidationState } from "../types";

/**
 * Map form item model validation state to component validation state
 * @param param0 Form item model configuration
 * @returns Component validation state
 */
export const getValidationState = ({ validationMessages, validationState }: FormItemModelConfig<any>): ValidationState => {
    const componentValidationState = validationState === FormItemValidationState.Invalid
        ? ValidationStatus.Invalid
        : ValidationStatus.None;

    return {
        messages: validationMessages || [],
        status: componentValidationState
    };
};
