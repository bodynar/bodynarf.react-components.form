import { isNullOrUndefined } from "@bodynarf/utils";

import { FormConfig, FormItemValidationState, ValidationResult } from "../types";

import { ActionWithPayload, FormPurityState, FormState, FormStatus } from "./types";
import { initForm, setFieldValue, setFormStatus, setValidationResult } from "./actionTypes";
import { map as mapFormItems, validateItem } from "./utils";

/** Initial form state values */
const initialState: FormState = {
    state: "init",
    initialConfig: undefined,
    items: [],
    valuesStorage: [],
    purityState: FormPurityState.Pure,
};

/** Form reducer function */
export default function (state = initialState, action: ActionWithPayload): FormState {
    switch (action.type) {
        case setFormStatus: {
            const newStatus: FormStatus = action.payload["newState"] as FormStatus;

            if (isNullOrUndefined(newStatus)) {
                return state;
            }

            return {
                ...state,
                state: newStatus,
            }
        }
        case initForm: {
            const config: FormConfig | undefined = action.payload["initialConfig"] as FormConfig | undefined;

            if (isNullOrUndefined(config)) {
                return state;
            }

            const formConfig = mapFormItems(config!.items);

            return {
                ...state,
                state: "idle",
                initialConfig: config,
                items: formConfig.map((x, i) => ({ ...x, order: i })),
                valuesStorage: [],
            };
        }
        case setFieldValue: {
            const { name, value } = action.payload["field"] as { name: string, value: any | undefined };

            const item = state.items.find(item => item.name === name)!;

            if (isNullOrUndefined(item)) {
                return state;
            }

            item.modelConfig.value = value;

            const purityState = state.purityState === FormPurityState.Pure && value !== item.modelConfig.defaultValue
                ? state.purityState
                : FormPurityState.Dirty;

            if (state.state === "validation errors") {
                const validationResult = validateItem(item, value);

                if (validationResult.state !== FormItemValidationState.Invalid) {
                    item.modelConfig.validationState = FormItemValidationState.None;
                    item.modelConfig.validationMessages = [];
                } else {
                    item.modelConfig.validationMessages = validationResult.messages;
                    item.modelConfig.validationState = validationResult.state;
                }
            }

            const updatedItems = [
                ...state.items.filter(({ name }) => name !== item.name),
                item
            ].sort((x, y) => x.order - y.order);

            return {
                ...state,
                purityState: purityState,
                items: updatedItems
            };
        }
        case setValidationResult: {
            const validationResult: Map<string, ValidationResult> = action.payload["validationResult"] as Map<string, ValidationResult>;

            state.valuesStorage.length = 0;

            let currentState: FormItemValidationState = FormItemValidationState.Valid;

            const values = [];

            for (let [key, value] of validationResult) {
                const item = state.items.find(({ name }) => name === key)!;

                item.modelConfig.validationState = value.state;
                item.modelConfig.validationMessages.length = 0;
                item.modelConfig.validationMessages.push(...value.messages);

                if (value.state === FormItemValidationState.Invalid) {
                    currentState = FormItemValidationState.Invalid;
                }

                if (currentState !== FormItemValidationState.Invalid
                    && value.state !== FormItemValidationState.Invalid
                ) {
                    values.push({
                        key,
                        type: item.modelConfig.type,
                        value: item.modelConfig.value,
                    });
                }
            }

            return {
                ...state,
                state: currentState === FormItemValidationState.Valid ? "submited" : "validation errors",
                valuesStorage: currentState === FormItemValidationState.Valid ? values : [],
            };
        }
        default:
            return state;
    }
}

