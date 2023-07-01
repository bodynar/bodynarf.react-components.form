import { Provider } from "react-redux";

import "./styles.scss";

import { FormConfig } from "@bbr.form/types";
import { FieldValue } from "@bbr.form/store";
import store from "@bbr.form/store/store";
import { validate as validateConfig } from "@bbr.form/utils";

import FormContainer from "@bbr.form/components/container";

/** Form component input props type */
export interface FormModuleProps extends FormConfig {
    /** Handler for form submit event */
    onSubmit: (values: Array<FieldValue>) => void;
}

/**
 * Form component
 * Allows to render a form by config
 * @throws Will throw an error when configuration is not valid. Reason will be specified
 */
const FormContextContainer = (formConfig: FormModuleProps): JSX.Element => {
    const validationErrors = validateConfig(formConfig);

    if (validationErrors.length > 0) {
        throw new Error(`Provided form configuration is'nt valid: "${validationErrors.join("\n")}"`);
    }

    return (
        <Provider store={store}>
            <FormContainer {...formConfig} />
        </Provider>
    );
};

export default FormContextContainer;
