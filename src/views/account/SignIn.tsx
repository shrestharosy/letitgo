import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import {
    Button,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Row,
} from 'reactstrap';
import CustomInput from 'src/components/Forms/CustomInput';
import { PAGE_URLS } from 'src/constants/route';
import useAuthHook from 'src/libs/hooks/auth.hook';
import signInSchema from 'src/libs/validation-schemas/signin.schema';
import { ISignIn } from 'src/service/auth/auth.type';

const SignIn = () => {
    const { isSignInLoading, onSignIn } = useAuthHook();

    const { ...methods } = useForm({
        resolver: yupResolver(signInSchema),
    });

    const onSubmit: SubmitHandler<ISignIn> = async (data) => {
        await onSignIn(data);
    };
    return (
        <Row className='justify-content-center'>
            <Col lg='5'>
                <div className='bg-secondary shadow border-0'>
                    <CardHeader className='bg-white pb-5'>
                        <div className='text-muted text-center mb-3'>
                            <small>Sign in with</small>
                        </div>
                        <div className='btn-wrapper text-center'>
                            <Button
                                className='btn-neutral btn-icon ml-1'
                                color='default'
                            >
                                <span className='btn-inner--icon mr-1'>
                                    <img
                                        alt='...'
                                        src={
                                            require('src/assets/img/icons/common/google.svg')
                                                .default
                                        }
                                    />
                                </span>
                                <span className='btn-inner--text'>Google</span>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardBody className='px-lg-5 py-lg-4'>
                        <div className='text-center text-muted mb-4'>
                            <small>Or sign in with credentials</small>
                        </div>
                        <FormProvider {...methods}>
                            <Form role='form'>
                                <FormGroup>
                                    <CustomInput
                                        name={'username'}
                                        placeholder={'Username'}
                                        labelIcon={'ni-hat-3'}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <CustomInput
                                        name={'password'}
                                        placeholder={'Password'}
                                        labelIcon={'ni-lock-circle-open'}
                                        type={'password'}
                                    />
                                </FormGroup>
                                <div className='text-center'>
                                    <Button
                                        className='my-4'
                                        color='primary'
                                        type='button'
                                        disabled={isSignInLoading}
                                        onClick={methods.handleSubmit(onSubmit)}
                                    >
                                        Sign in
                                    </Button>
                                </div>
                            </Form>
                        </FormProvider>
                    </CardBody>
                </div>
                <Row className='mt-3'>
                    <Col xs='6'>
                        <a
                            className='text-light'
                            href='#pablo'
                            onClick={(e) => e.preventDefault()}
                        >
                            <small>Forgot password?</small>
                        </a>
                    </Col>
                    <Col className='text-right' xs='6'>
                        <Link to={PAGE_URLS.SIGN_UP} className='text-light'>
                            <small>Create new account</small>
                        </Link>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default SignIn;
