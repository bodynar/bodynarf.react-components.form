import { useCallback, useEffect } from "react";
import { useDispatch, connect } from "react-redux";

import Button from "@bodynarf/react.components/components/button";

import Form from "@bbr.form/components/form";
import { getInitAction, getSetFormStatus, FormState, getResetAction, submitFormAsync } from "@bbr.form/store";

import { FormModuleProps } from "../../component";
import { Field } from "@bbr.form/types";

const FormContainerComponent = ({
    state, valuesStorage,
    formCfg, items,

    submitForm,
}: FormContainerComponentProps): JSX.Element => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (state === "init") {
            dispatch(getInitAction(formCfg));
        } else if (state === "submitted") {
            formCfg.onSubmit(valuesStorage);
            dispatch(getSetFormStatus("idle"));
        }
    }, [state]);

    useEffect(() => () => { dispatch(getResetAction()); }, []);

    const onSubmitClick = useCallback(() => submitForm(formCfg.items), [submitForm]);
    const buttonDisabled = formCfg.submitButtonConfiguration.disabled || state === "validating";

    return (
        <>
            <Form
                {...formCfg}
                items={items}
                source={formCfg.items}
            />
            <Button
                {...formCfg.submitButtonConfiguration}
                onClick={onSubmitClick}
                disabled={buttonDisabled}
            />
        </>
    );
};

/** Form container props type */
interface FormContainerComponentProps extends Omit<FormState, "initialConfig" | "purityState"> {
    /** Form initial configuration */
    formCfg: FormModuleProps;

    /**
     * Submit form action.
     * Callback for successful form validation
     */
    submitForm: (source: Array<Field<any>>) => void;
}

/** Form container component */
const FormContainer = connect(
    ({ state, valuesStorage, items }: FormState, props: FormModuleProps) =>
        ({ state, valuesStorage, items, formCfg: props }),
    {
        submitForm: submitFormAsync,
    }
)(FormContainerComponent);

export default FormContainer;