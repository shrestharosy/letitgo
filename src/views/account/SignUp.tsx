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
import { useNotify } from 'src/context/notify';
import signUpSchema from 'src/libs/validation-schemas/signup.schema';
import { authService } from 'src/service/auth';

interface ISignUpFormValues {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);

    const { showSuccess, showError } = useNotify();

    const { ...methods } = useForm({
        resolver: yupResolver(signUpSchema),
    });

    const onSubmit: SubmitHandler<ISignUpFormValues> = async (data) => {
        try {
            setIsLoading(true);
            await authService.signUp(data);
            showSuccess('Account created successfully');
        } catch (error) {
            showError(error);
        } finally {
            setIsLoading(false);
        }
        console.log(data);
    };

    return (
        <Row className='justify-content-center'>
            <Col lg='5'>
                <div className='bg-secondary shadow border-0'>
                    <CardHeader className='bg-white pb-5'>
                        <div className='text-muted text-center mb-3'>
                            <small>Sign up with</small>
                        </div>
                        <div className='text-center'>
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
                            <small>Or sign up with credentials</small>
                        </div>
                        <FormProvider {...methods}>
                            <Form role='form'>
                                <FormGroup>
                                    <CustomInput
                                        name={'firstName'}
                                        placeholder={'First Name'}
                                        labelIcon={'ni-hat-3'}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <CustomInput
                                        name={'lastName'}
                                        placeholder={'Last Name'}
                                        labelIcon={'ni-hat-3'}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <CustomInput
                                        name={'username'}
                                        placeholder={'Username'}
                                        labelIcon={'ni-hat-3'}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <CustomInput
                                        name={'email'}
                                        placeholder={'Email'}
                                        labelIcon={'ni-email-83'}
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
                                        className='mt-4'
                                        color='primary'
                                        type='submit'
                                        disabled={isLoading}
                                        onClick={methods.handleSubmit(onSubmit)}
                                    >
                                        Create account
                                    </Button>
                                </div>
                            </Form>
                        </FormProvider>
                    </CardBody>
                </div>
                <Row className='mt-3'>
                    <Col>
                        <Link to={PAGE_URLS.SIGN_IN} className='text-light'>
                            <small>Already have an account? Sign In</small>
                        </Link>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default SignUp;
