import { AnyAction } from "redux";

/** Redux action with some extra payload */
export interface ActionWithPayload extends AnyAction {
    /** Action payload data */
    payload: {
        [extraProps: string]: unknown;
    };
};