import { Provider } from "react-redux";

import "./styles.scss";

import { FormConfig } from "@bbr.form/types";
import { FieldValue } from "@bbr.form/store";
import store from "@bbr.form/store/store";

import FormContainer from "@bbr.form/components/container";

/** Form component input props type */
export interface FormModuleProps extends FormConfig {
    /** Handler for form submit event */
    onSubmit: (values: Array<FieldValue>) => void;
}

/**
 * Form component
 * Allows to render a form by config
 */
const FormContextContainer = (formConfig: FormModuleProps): JSX.Element => {
    return (
        <Provider store={store}>
            <FormContainer {...formConfig} />
        </Provider>
    );
};

export default FormContextContainer;
