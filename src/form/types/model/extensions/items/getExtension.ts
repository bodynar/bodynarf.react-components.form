import { Field } from "..";

/**
 * Get extended component configuration from item configuration
 * @param item Form item configuration
 * @param extensionKeys Array of keys of extend component config model
 * @returns Custom configuration if extension props are found; otherwise `undefined`
 */
export const getExtensionConfig = <TExtension>(item: Field<any>, extensionKeys: Array<keyof TExtension>): TExtension | undefined => {
    const keys = Object.keys(item);

    const definedExtraKeys = extensionKeys.filter(key => keys.includes(key as string)).map(x => x as string);

    if (definedExtraKeys.length <= 0) {
        return undefined;
    }

    const config: any = {};

    definedExtraKeys.forEach(key => {
        config[key] = item[key] as any;
    });

    return config as TExtension;
};
