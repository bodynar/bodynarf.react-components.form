import { LayoutConfig } from "./in";

/** Form item config for visual appearance */
export interface FormItemViewConfig {
    /** Html class name list */
    className: string;

    /** Is item disabled */
    disabled: boolean;

    /** Item caption */
    caption: string;

    /** Item grid layout configuration */
    layoutConfig: LayoutConfig;

    /** Form item view component */
    type: FieldType;
}
