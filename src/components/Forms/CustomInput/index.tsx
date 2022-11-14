import React, { ReactNode } from 'react';

import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

import { useFormContext, UseControllerProps } from 'react-hook-form';

interface ICustomInputProps extends UseControllerProps {
    name: string;
    labelIcon?: string;
    placeholder?: string;
    defaultValue?: string;
    type?: string;
}

const CustomInput = (props: ICustomInputProps) => {
    const formContext = useFormContext();

    const { formState, register } = formContext;

    const {
        name,
        labelIcon,
        placeholder,
        type = 'text',
        rules,
        defaultValue,
    } = props;

    // const { field } = useController({ name, rules, defaultValue });

    const hasError = Boolean(formState?.errors[name]);

    return (
        <>
            <InputGroup className='input-group-alternative mb-3'>
                <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                        <i className={`ni ${labelIcon}`} />
                    </InputGroupText>
                </InputGroupAddon>
                <input
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
