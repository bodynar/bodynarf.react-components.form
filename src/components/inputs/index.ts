import { Field, FormItem } from "@bbr.form/types";

/** Custom form item view component props */
export interface FormItemComponentProps<TValue> {
    /** Item configuration */
    item: FormItem<TValue>;

    /** Item origin configuration */
    source: Field<TValue>;
}
