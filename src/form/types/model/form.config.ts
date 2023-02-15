import { Field, SubmitButtonConfiguration } from ".";

/** Form configuration */
export interface FormConfig {
    /** Form name */
    name: string;

    /** Form caption */
    caption?: string;

    /**
     * Fields configuration.
     * Items can be configurated with default values or with extensions.
     * To use extensions just provide extra arguments in configuration.
     * To see possible extensions - see `model/extensions/items` interfaces with `..Extension` name template
    */
    items: Array<Field<any>>;

    /**
     * Configuration for submit button
     */
    submitButtonConfiguration: SubmitButtonConfiguration;
};

