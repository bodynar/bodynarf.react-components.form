import { Field } from "..";
import { ExtendedFormItem } from "../extendedFormItem";
import { getExtensionConfig } from "./getExtension";

/** Extra configuration for multiline form item */
export interface MultilineItemExtension {
    /** Initial rows number */
    rows?: number;
}

/** Extended multiline form item */
export interface MultilineFormItem extends ExtendedFormItem<string, MultilineItemExtension> { }

/** Extension model property names */
const extensionKeys = ([
    "rows",
] as Array<keyof MultilineItemExtension>);

/**
 * Get multiline extension if item has one
 * @param item Form item configuration
 * @returns Multiline custom configuration if these props are found; otherwise `undefined`
 */
export function getMultilineExt(item: Field<any>): MultilineItemExtension | undefined {
    return getExtensionConfig<MultilineItemExtension>(item, extensionKeys);
};
