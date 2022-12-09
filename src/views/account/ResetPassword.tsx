import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Button, CardBody, Col, Form, FormGroup, Row } from 'reactstrap';
import CustomInput from 'src/components/Forms/CustomInput';
import { PAGE_URLS } from 'src/constants/route';
import { useNotify } from 'src/context/notify';
import {
    resetPasswordSchema,
    verifyTokenSchema,
} from 'src/libs/validation-schemas/resetPassword.schema';
import { authService } from 'src/service/auth';

interface IVerifyCodeFormValues {
    code: string;
}

interface IResetPasswordFormValues {
    password: string;
    confirmPassword: string;
}

const ResetPassword = () => {
    const [isValidToken, setIsValidToken] = useState(false);
    const [token, setToken] = useState(null);

    const { push } = useHistory();

    const { ...methods } = useForm({
        resolver: yupResolver(verifyTokenSchema),
    });

    const { ...resetPasswordMethods } = useForm({
        resolver: yupResolver(resetPasswordSchema),
    });

    const { showSuccess, showError } = useNotify();

    const onVerifyResetCode = async (data: IVerifyCodeFormValues) => {
        try {
            setToken(data.code);
            await authService.verifyResetCode(data.code);
            setIsValidToken(true);
        } catch (error) {
            setToken(null);
            showError('Something went wrong. Please try again.');
        }
    };

    const onResetPassword = async (data: IResetPasswordFormValues) => {
        try {
            await authService.resetPassword(token, data.password);
            showSuccess(
                'Password reset success. Sign in with your new password'
            );
            push(PAGE_URLS.SIGN_IN);
        } catch (error) {
            showError('Something went wrong. Please try again.');
        }
    };

    return (
        <Row className='justify-content-center'>
            <Col lg='5'>
                <div className='bg-secondary shadow border-0'>
                    <CardBody className='px-lg-5 py-lg-5'>
                        {!isValidToken ? (
                            <FormProvider {...methods}>
                                <Form role='form'>
                                    <FormGroup>
                                        <CustomInput
                                            name={'code'}
                                            placeholder={'Verification Code'}
                                            labelIcon={''}
                                        />
                                    </FormGroup>

                                    <div className='text-center'>
                                        <Button
                                            className='my-4'
                                            color='primary'
                                            type='submit'
                                            disabled={
                                                methods.formState.isSubmitting
                                            }
                                            onClick={methods.handleSubmit(
                                                onVerifyResetCode
                                            )}
                                        >
                                            Confirm
                                        </Button>
                                    </div>
                                </Form>
                            </FormProvider>
                        ) : (
                            <FormProvider {...resetPasswordMethods}>
                                <Form role='form'>
                                    <FormGroup>
                                        <CustomInput
                                            name={'password'}
                                            placeholder={'Password'}
                                            labelIcon={'ni-lock-circle-open'}
                                            type={'password'}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <CustomInput
                                            name={'confirmPassword'}
                                            placeholder={'Confirm Password'}
                                            labelIcon={'ni-lock-circle-open'}
                                            type={'password'}
                                        />
                                    </FormGroup>

                                    <div className='text-center'>
                                        <Button
                                            className='my-4'
                                            color='primary'
                                            type='submit'
                                            disabled={
                                                resetPasswordMethods.formState
                                                    .isSubmitting
                                            }
                                            onClick={resetPasswordMethods.handleSubmit(
                                                onResetPassword
                                            )}
                                        >
                                            Confirm
                                        </Button>
                                    </div>
                                </Form>
                            </FormProvider>
                        )}
                    </CardBody>
                </div>
            </Col>
        </Row>
    );
};

export default ResetPassword;
