import { ReactNode } from 'react';

import { InputGroupAddon, InputGroupText } from 'reactstrap';

import {
    useFormContext,
    UseControllerProps,
    useController,
} from 'react-hook-form';

import Select from 'react-select';
import { IOption } from 'src/service/product/product.type';

interface ICustomSelectProps extends UseControllerProps {
    name: string;
    labelIcon?: string;
    defaultValue?: string;
    label?: string;
    options: Array<IOption>;
}

const CustomSelect = (props: ICustomSelectProps) => {
    const formContext = useFormContext();

    const { formState, trigger, getValues, setValue, ...methods } = formContext;

    const { name, labelIcon, label, options } = props;

    const { field } = useController({ name });

    const hasError = Boolean(formState?.errors[name]);

    return (
        <>
            {label && <label htmlFor={name}>{label}</label>}
            {labelIcon && (
                <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                        <i className={`ni ${labelIcon}`} />
                    </InputGroupText>
                </InputGroupAddon>
            )}
            <Select
                {...methods}
                options={options}
                value={options.find(
                    (category) => field.value === category.value
                )}
                // value={field.value}
                onChange={async (e) => {
                    setValue(name, e.value);
                    await trigger(name);
                }}
            />
            {hasError && (
                <div className='invalid-feedback' style={{ display: 'block' }}>
                    {(formState.errors[name]?.message as ReactNode) ||
                        'Invalid value'}
                </div>
            )}
        </>
    );
};

export default CustomSelect;
