import { SelectableItem } from "@bodynarf/react.components";

import { Field } from "..";
import { ExtendedFormItem } from "../extendedFormItem";
import { getExtensionConfig } from "./getExtension";

/** Extra configuration for lookup form item */
export interface LookupItemExtension {
    /** Items which can be selected */
    items: Array<SelectableItem>;

    /** Max height of dropdown list */
    listMaxHeight?: number;
}

/** Extended lookup form item */
export interface LookupFormItem extends ExtendedFormItem<SelectableItem, LookupItemExtension> { }

/** Extension model property names */
const extensionKeys = ([
    "items",
    "listMaxHeight",
] as Array<keyof LookupItemExtension>);

/**
 * Get lookup extension if item has one
 * @param item Form item configuration
 * @returns Lookup custom configuration if these props are found; otherwise `undefined`
 */
export function getLookupExt(item: Field<any>): LookupItemExtension | undefined {
    return getExtensionConfig<LookupItemExtension>(item, extensionKeys);
};
