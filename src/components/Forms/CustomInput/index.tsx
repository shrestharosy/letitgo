import { ReactNode } from 'react';

import { InputGroup, Input, InputGroupAddon, InputGroupText } from 'reactstrap';

import { useFormContext, UseControllerProps } from 'react-hook-form';

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
            <InputGroup className='input-group-alternative mb-3'>
                {labelIcon && (
                    <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                            <i className={`ni ${labelIcon}`} />
                        </InputGroupText>
                    </InputGroupAddon>
                )}
                <Input
                    className={`form-control ${
                        formState.errors[name] ? 'is-invalid' : ''
                    }`}
                    placeholder={placeholder}
                    type={type}
                    {...register(name)}
                />
                {hasError && (
                    <div className='invalid-feedback'>
                        {(formState.errors[name]?.message as ReactNode) ||
                            'Invalid value'}
                    </div>
                )}
            </InputGroup>
        </>
    );
};

export default CustomInput;
