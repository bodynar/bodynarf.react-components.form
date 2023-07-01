import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { Field, ValidationResult } from "@bbr.form/types";
import {
    getSetFormStatus, getSetValidationResultAction,
    ActionWithPayload, FormState,
    validateItem,
} from "@bbr.form/store";

/**
 * Get action "submit form".
 * Moves form to validating stage, validates fields.
 * If form is valid - executes user callback. Otherwise - push form to previous state
 * @param {Array<Field<any>>} source Source form items configuration
 */
export const submitFormAsync = (source: Array<Field<any>>): ThunkAction<void, FormState, unknown, ActionWithPayload> => (
    dispatch: ThunkDispatch<FormState, unknown, ActionWithPayload>,
    getState: () => FormState
): void => {
    const { items } = getState();

    dispatch(getSetFormStatus("validating"));

    const sourceNameToRequiredMap = new Map<string, boolean>(
        source.map(({ name, required }) => [name, required ?? false])
    );

    (async () => {
        const validationResults = new Map<string, ValidationResult>(
            items
                .flatMap(x => x)
                .map(formItem => [
                    formItem.name,
                    validateItem(formItem, sourceNameToRequiredMap.get(formItem.name)!, formItem.modelConfig.value)
                ]),
        );

        dispatch(getSetValidationResultAction(validationResults));
    })();
};
