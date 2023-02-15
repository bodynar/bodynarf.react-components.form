import { useMemo } from "react";

import Row from "../row";

import { FormConfig, FormItem } from "../../types";

import { getRows } from "../../utils/grid";

/** Form component props type */
interface FormProps extends Omit<FormConfig, 'items' | 'submitButtonConfiguration'> {
    /** Form caption */
    items: Array<FormItem<any>>;
}

/** Layout form group */
const Form = ({ name, caption, items }: FormProps): JSX.Element => {
    const rows = useMemo(() => getRows(items), [items]);

    return (
        <div
            className="bbr-form"
            data-form={name}
            role="form"
        >
            {caption &&
                <div className="content">
                    <h3 className="is-title">
                        {caption}
                    </h3>
                </div>
            }
            <section>
                {rows.map((x, i) =>
                    <Row key={i} items={x} />
                )}
            </section>
        </div>
    );
};

export default Form;