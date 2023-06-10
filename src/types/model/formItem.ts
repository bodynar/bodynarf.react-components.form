import { FormItemModelConfig } from "./formItem.modelConfig";
import { FormItemViewConfig } from "./formItem.viewConfig";

/** Single form item */
export interface FormItem<TValue> {
    /** Name of form item (will be key in value storage) */
    name: string;

    /** Configuration for view component */
    viewConfig: FormItemViewConfig;

    /** Configuration for model data */
    modelConfig: FormItemModelConfig<TValue>;
}
