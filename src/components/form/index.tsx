import Row from "../row";

import { FormItems, FormConfig, Field } from "@bbr.form/types";

/** Form component props type */
interface FormProps extends Omit<FormConfig, "items" | "submitButtonConfiguration"> {
    /** Form caption */
    items: FormItems;

    /** Source items configuration */
    source: Array<Field<any>>;
}

/** Layout form group */
const Form = ({ name, caption, items, source }: FormProps): JSX.Element => {
    const sourceMap = new Map<string, Field<any>>(
        source.map(item => [item.name, item])
    );

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
                {items.map((x, i) =>
                    <Row key={i} items={x} source={sourceMap} />
                )}
            </section>
        </div>
    );
};

export default Form;
