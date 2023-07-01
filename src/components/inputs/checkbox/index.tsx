import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ElementColor } from "@bodynarf/react.components";
import Checkbox from "@bodynarf/react.components/components/primitives/checkbox";

import { FormState, FormStatus, getSetFieldValueAction } from "@bbr.form/store";
import { CheckboxFormItem } from "@bbr.form/types";

import { FormItemComponentProps } from "..";

/** Checkbox form component props */
interface CheckboxFormItemComponentProps extends FormItemComponentProps<boolean> {
    /** Item configuration */
    item: CheckboxFormItem;
}

/** Checkbox component for boolean form item */
const CheckBoxFormComponent = ({ item, source }: CheckboxFormItemComponentProps): JSX.Element => {
    const { modelConfig, name, viewConfig, extension } = item;

    const dispatcher = useDispatch();
    const state = useSelector<FormState, FormStatus>(x => x.state);

    const onValueChange = useCallback(
        (value?: boolean) => { dispatcher(getSetFieldValueAction(name, value)); },
        [name]
    );

    return (
        <Checkbox
            className={viewConfig.className}
            defaultValue={modelConfig.defaultValue}
            onValueChange={onValueChange}
            label={{
                caption: source.label.caption,
                horizontal: true,
            }}
            disabled={source.readonly || state === "validating"}
            isFormLabel={true}
            withoutBorder={extension?.withoutBorder ?? false}
            style={ElementColor.Link}
        />
    );
};

export default CheckBoxFormComponent;
