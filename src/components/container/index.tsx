import { useCallback, useEffect } from "react";
import { useDispatch, connect } from "react-redux";

import Button from "@bodynarf/react.components/components/button";

import Form from "@bbr.form/components/form";
import { getInitAction, getSetFormStatus, FormState, getResetAction, submitFormAsync } from "@bbr.form/store";

import { FormModuleProps } from "../../component";

const FormContainerComponent = ({
    items, state, valuesStorage,
    formCfg,

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

    useEffect(() =>
        () => {
            dispatch(getResetAction());
        }, []);

    const onSubmitClick = useCallback(submitForm, [submitForm]);

    const buttonDisabled = formCfg.submitButtonConfiguration.disabled || state === "validating";

    return (
        <>
            <Form
                items={items}
                name={formCfg.name}
                caption={formCfg.caption}
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
interface FormContainerComponentProps extends Omit<FormState, 'initialConfig' | 'purityState'> {

    /** Form initial configuration */
    formCfg: FormModuleProps;

    /**
     * Submit form action.
     * Callback for successful form validation
     */
    submitForm: () => void;
}

/** Form container component */
const FormContainer = connect(
    ({ items, state, valuesStorage }: FormState, props: FormModuleProps) =>
        ({ items, state, valuesStorage, formCfg: props }),
    {
        submitForm: submitFormAsync,
    }
)(FormContainerComponent);

export default FormContainer;