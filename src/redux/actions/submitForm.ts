import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { ValidationResult } from "../../types";

import { getSetFormStatus, getSetValidationResultAction } from "../actionCreators";
import { ActionWithPayload, FormState } from "../types";
import { validateItem } from "../utils";

const submitFormAction = (
    dispatch: ThunkDispatch<FormState, unknown, ActionWithPayload>,
    getState: () => FormState,
): void => {
    const { items } = getState();

    dispatch(getSetFormStatus("validating"));

    (async () => {
        const validationResults = new Map<string, ValidationResult>(
            items.map(item => [item.name, validateItem(item, item.modelConfig.value)])
        );

        dispatch(getSetValidationResultAction(validationResults));
    })();
};

/**
 * Get action "submit form".
 * Moves form to validating stage, validates fields.
 * If form is valid - executes user callback. Otherwise - push form to previous state
 */
export const submitFormAsync = (): ThunkAction<void, FormState, unknown, ActionWithPayload> => submitFormAction;