import { FormItem } from "..";

/** Form item extended with extra values for component rendering */
export interface ExtendedFormItem<TValue, TExtension> extends FormItem<TValue> {
    /** Additional configuration for specific component */
    extension?: TExtension;
};
