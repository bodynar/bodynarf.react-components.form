import { FormItemValidationState } from "./formItemValidationState";
import { FieldValidator } from "./in";

/** Model configuration for form item */
export interface FormItemModelConfig<TValue> {
    /** Data value type */
    type: string;

    /** Current value */
    value: TValue;

    /** Default value */
    defaultValue?: TValue;

    /** Is value required */
    required: boolean;

    /** Value validators */
    validators: Array<FieldValidator<TValue>>;

    /** Last validation messages */
    validationMessages: Array<string>;

    /** Validation state after last validation */
    validationState: FormItemValidationState;
}
