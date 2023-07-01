import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Multiline from "@bodynarf/react.components/components/primitives/multiline";

import { FormState, FormStatus, getSetFieldValueAction } from "@bbr.form/store";
import { getValidationState } from "@bbr.form/utils";

import { FormItemComponentProps } from "..";

/** Multiline form component props */
interface MultilineFormItemComponentProps extends FormItemComponentProps<string> { }

/** Multiline component for multiline text form item */
const MultilineFormComponent = ({ item, source }: MultilineFormItemComponentProps): JSX.Element => {
    const { modelConfig, name, viewConfig } = item;

    const dispatcher = useDispatch();
    const state = useSelector<FormState, FormStatus>(x => x.state);
    const validationState = getValidationState(modelConfig);

    const onValueChange = useCallback(
        (value?: string) => { dispatcher(getSetFieldValueAction(name, source.required ?? false, value)); },
        [name]
    );

    return (
        <Multiline
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

export default MultilineFormComponent;
