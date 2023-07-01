import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Password from "@bodynarf/react.components/components/primitives/password";

import { FormState, FormStatus, getSetFieldValueAction } from "@bbr.form/store";
import { getValidationState } from "@bbr.form/utils";

import { FormItemComponentProps } from "..";

/** Password form component props */
interface PasswordFormItemComponentProps extends FormItemComponentProps<string> { }

/** Password component for password text form item */
const PasswordFormComponent = ({ item, source }: PasswordFormItemComponentProps): JSX.Element => {
    const { modelConfig, name, viewConfig } = item;

    const dispatcher = useDispatch();
    const state = useSelector<FormState, FormStatus>(x => x.state);
    const validationState = getValidationState(modelConfig);

    const onValueChange = useCallback(
        (value?: string) => { dispatcher(getSetFieldValueAction(name, source.required ?? false, value)); },
        [name]
    );

    return (
        <Password
            name={name}
            className={viewConfig.className}
            onValueChange={onValueChange}
            label={{
                caption: source.label.caption,
                horizontal: true,
                className: source.required ? "is-required" : ""
            }}
            disabled={source.readonly || state === "validating"}
            validationState={validationState}
            canShowPassword={true}
            placeholder={source.label.caption}
        />
    );
};

export default PasswordFormComponent;
