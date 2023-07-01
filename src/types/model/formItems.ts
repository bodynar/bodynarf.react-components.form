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
            .flatMap(x => x)
            .filter(({ name }) => name === itemName)
            .pop();
    }

    /**
     * Update item by new values as new instance of `FormItems`
     * @param item Updated item
     * @returns New wrapper with updated items
     */
    updateItem(item: ExtendedFormItem<any, any>): FormItems {
        const items: Array<Array<ExtendedFormItem<any, any>>> = [];

        this.forEach(row => {
            items.push(
                row.map(x => x.name === item.name ? item : x)
            );
        });

        return new FormItems(...items);
    }
}
