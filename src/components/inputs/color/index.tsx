import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Color } from "@bodynarf/utils";
import { ElementPosition } from "@bodynarf/react.components";
import ColorPicker from "@bodynarf/react.components/components/primitives/color/component";

import { FormState, FormStatus, getSetFieldValueAction } from "@bbr.form/store";
import { getValidationState } from "@bbr.form/utils";

import { FormItemComponentProps } from "..";

/** Color picker form component props */
interface ColorFormItemComponentProps extends FormItemComponentProps<Color> { }

/** Color picker component for color selecting form item */
const ColorPickerComponent = ({ item, source }: ColorFormItemComponentProps): JSX.Element => {
    const { modelConfig, name, viewConfig } = item;

    const dispatcher = useDispatch();
    const state = useSelector<FormState, FormStatus>(x => x.state);
    const validationState = getValidationState(modelConfig);

    const onValueChange = useCallback(
        (value?: Color) => {
            dispatcher(getSetFieldValueAction(name, source.required ?? false, value));
        },
        [name]
    );

    return (
        <ColorPicker
            name={name}
            preview={{ position: ElementPosition.Right }}
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
        />
    );
};

export default ColorPickerComponent;
