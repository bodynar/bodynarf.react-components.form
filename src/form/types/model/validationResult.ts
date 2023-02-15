import { FormItemValidationState } from ".";

/** Form item validation result */
export interface ValidationResult {
    /** Name of field (form item) */
    fieldName: string;

    /** Validation status */
    state: FormItemValidationState;

    /** Validation messages (errors) */
    messages: Array<string>;
};
