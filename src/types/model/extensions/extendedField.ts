import { BaseField } from "..";

/** Field with extra configuration */
export interface Field<TValue> extends BaseField<TValue> {
    /** Extra configuration */
    [key: string]: any;
}
