import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
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
import { requestTokenSchema } from 'src/libs/validation-schemas/resetPassword.schema';
import { authService } from 'src/service/auth';

interface IForgotPasswordFormValues {
    email: string;
}

const ForgotPassword = () => {
    const { ...methods } = useForm({
        resolver: yupResolver(requestTokenSchema),
    });

    const { showInfo, showError } = useNotify();

    const { push } = useHistory();

    const onSubmit = async (data: IForgotPasswordFormValues) => {
        try {
            await authService.requestCodeForPasswordReset(data.email);
            showInfo('Please check your email for a verification code');
            push(PAGE_URLS.RESET_PASSWORD);
        } catch (error) {
            showError('Something went wrong. Please try again.');
        }
    };

    return (
        <Row className='justify-content-center'>
            <Col lg='5'>
                <div className='bg-secondary shadow border-0'>
                    <CardHeader className='bg-white pb-2'>
                        <div className='text-muted text-center'>
                            <small>
                                Forgot Password ? Enter your email address here.
                            </small>
                        </div>
                    </CardHeader>
                    <CardBody className='px-lg-5 py-lg-4'>
                        <FormProvider {...methods}>
                            <Form role='form'>
                                <FormGroup>
                                    <CustomInput
                                        name={'email'}
                                        placeholder={'Email'}
                                        labelIcon={'ni-email-83'}
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
                                        onClick={methods.handleSubmit(onSubmit)}
                                    >
                                        Send Code
                                    </Button>
                                </div>
                            </Form>
                        </FormProvider>
                    </CardBody>
                </div>
            </Col>
        </Row>
    );
};

export default ForgotPassword;
