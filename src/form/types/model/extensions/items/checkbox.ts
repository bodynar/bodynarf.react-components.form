import { Field } from "..";
import { ExtendedFormItem } from "../extendedFormItem";
import { getExtensionConfig } from "./getExtension";

/** Extra configuration for checkbox form item */
export interface CheckboxItemExtension {
    /** Render checkbox without border */
    withoutBorder?: boolean;
}

/** Extended checkbox form item */
export interface CheckboxFormItem extends ExtendedFormItem<boolean, CheckboxItemExtension> { }

/** Extension model property names */
const extensionKeys = ([
    "withoutBorder",
] as Array<keyof CheckboxItemExtension>);

/**
 * Get checkbox extension if item has one
 * @param item Form item configuration
 * @returns Checkbox custom configuration if these props are found; otherwise `undefined`
 */
export function getCheckboxExt(item: Field<any>): CheckboxItemExtension | undefined {
    return getExtensionConfig<CheckboxItemExtension>(item, extensionKeys);
};
