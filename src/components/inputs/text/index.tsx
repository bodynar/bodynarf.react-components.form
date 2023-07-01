import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { isNullOrEmpty } from "@bodynarf/utils";
import Text from "@bodynarf/react.components/components/primitives/text";

import { FormState, FormStatus, getSetFieldValueAction } from "@bbr.form/store";
import { getValidationState } from "@bbr.form/utils";

import { FormItemComponentProps } from "..";

/** Text form component props */
interface TextFormItemComponentProps extends FormItemComponentProps<string> { }

/** Text component for single-line text form item */
const TextFormComponent = ({ item, source }: TextFormItemComponentProps): JSX.Element => {
    const { modelConfig, name, viewConfig } = item;

    const dispatcher = useDispatch();
    const state = useSelector<FormState, FormStatus>(x => x.state);
    const validationState = getValidationState(modelConfig);

    const onValueChange = useCallback((value?: string) => {
        const newValue = isNullOrEmpty(value) ? undefined : value;
        dispatcher(getSetFieldValueAction(name, source.required ?? false, newValue));
    }, [name]);

    return (
        <Text
            name={name}
            className={viewConfig.className}
            defaultValue={modelConfig.defaultValue}
            onValueChange={onValueChange}
            label={{
                caption: source.label.caption,
                horizontal: true,
                className: source.required ? "is-required" : ""
            }}
            disabled={source.readonly || state === "validating"}
            validationState={validationState}
            placeholder={source.label.caption}
        />
    );
};

export default TextFormComponent;
