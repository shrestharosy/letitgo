import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Form,
    FormGroup,
    Row,
} from 'reactstrap';
import CustomInput from 'src/components/Forms/CustomInput';
import BlueBGWrapper from 'src/components/Wrappers/BlueBGWrapper';
import { PAGE_URLS } from 'src/constants/route';
import signInSchema from 'src/libs/validation-schemas/signin.schema';

interface ISignInFormValues {
    username: string;
    password: string;
}

const SignIn = () => {
    const { ...methods } = useForm({
        resolver: yupResolver(signInSchema),
    });

    const onSubmit: SubmitHandler<ISignInFormValues> = async (data) => {
        console.log(data);
    };
    return (
        <BlueBGWrapper>
            <Container className='pt-lg-7'>
                <Row className='justify-content-center'>
                    <Col lg='5'>
                        <Card className='bg-secondary shadow border-0'>
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
                                        <span className='btn-inner--text'>
                                            Google
                                        </span>
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
                                                labelIcon={
                                                    'ni-lock-circle-open'
                                                }
                                            />
                                        </FormGroup>
                                        <div className='text-center'>
                                            <Button
                                                className='my-4'
                                                color='primary'
                                                type='button'
                                                onClick={methods.handleSubmit(
                                                    onSubmit
                                                )}
                                            >
                                                Sign in
                                            </Button>
                                        </div>
                                    </Form>
                                </FormProvider>
                            </CardBody>
                        </Card>
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
                                <Link
                                    to={PAGE_URLS.SIGN_UP}
                                    className='text-light'
                                >
                                    <small>Create new account</small>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </BlueBGWrapper>
    );
};

export default SignIn;
