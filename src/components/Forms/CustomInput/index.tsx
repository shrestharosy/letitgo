import { ReactNode } from 'react';

import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

import { UseControllerProps, useFormContext } from 'react-hook-form';

interface ICustomInputProps extends UseControllerProps {
    name: string;
    labelIcon?: string;
    placeholder?: string;
    defaultValue?: string;
    type?: string;
    label?: string;
}

const CustomInput = (props: ICustomInputProps) => {
    const formContext = useFormContext();

    const { formState, register } = formContext;

    const { name, labelIcon, placeholder, type = 'text', label } = props;

    // const { field } = useController({ name, rules, defaultValue });

    const hasError = Boolean(formState?.errors[name]);

    return (
        <>
            {label && <label htmlFor={name}>{label}</label>}
            <InputGroup>
                {labelIcon && (
                    <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                            <i className={`ni ${labelIcon}`} />
                        </InputGroupText>
                    </InputGroupAddon>
                )}
                <input
                    className={`form-control ${
                        formState.errors[name] ? 'is-invalid' : ''
                    }`}
                    placeholder={placeholder}
                    type={type}
                    {...register(name)}
                />
            </InputGroup>
            {hasError && (
                <div className='invalid-feedback' style={{ display: 'block' }}>
                    {(formState.errors[name]?.message as ReactNode) ||
                        'Invalid value'}
                </div>
            )}
        </>
    );
};

export default CustomInput;
