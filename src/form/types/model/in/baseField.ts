import { LabelConfig, FieldType, FieldValidator, ViewConfig } from "./";

/** Base field configuration */
export interface BaseField<TValue> {
    /** Name */
    name: string;

    /** Type */
    type: FieldType;

    /** View configuration for rendering */
    viewConfig: ViewConfig;

    /** Caption configuration */
    label: LabelConfig;

    /** Field validators */
    validators?: Array<FieldValidator<TValue>>;

    /** Default value on first render */
    defaultValue?: TValue;

    /** Is field should be readonly */
    readonly?: boolean;

    /** Is field value should be required*/
    required?: boolean;
}