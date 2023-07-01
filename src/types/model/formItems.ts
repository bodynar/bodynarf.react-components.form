import { ExtendedFormItem } from ".";

/**
 * Extension class for mapped form items to define API for simple use of data container
 */
export class FormItems extends Array<Array<ExtendedFormItem<any, any>>> {

    /**
     * Find item configuration by its name
     * @param itemName Name of item
     * @returns Found item config or `undefined`
     */
    findItemByName(itemName: string): ExtendedFormItem<any, any> | undefined {
        return this
            .flatMap(
                x => x.find(({ name }) => name === itemName)
            )
            .pop();
    }
}