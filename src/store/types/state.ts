import { FormConfig, FormItems } from "@bbr.form/types";
import { FieldValue } from "./fieldValue";

/**
 * Form status
 * @description Represents form current lifecycle stage
*/
export type FormStatus =
    | "init"
    | "idle"
    | "validating"
    | "submitted"
    | "validation errors"
    ;

/**
 * Form purity state.
 * Represent form state whenever user changed any field value
 */
export enum FormPurityState {
    /** Form is pure, none fields was changed */
    Pure = 0,

    /** Form is dirty, some of fields was touched by user and value was changed */
    Dirty = 1,
};

/** Form state */
export interface FormState {
    /** Current state */
    state: FormStatus;

    /** Form items */
    items: FormItems;

    /** Form configuration */
    initialConfig?: FormConfig;

    /** Valid form values */
    valuesStorage: Array<FieldValue>;

    /** Current purity state */
    purityState: FormPurityState;
}
