import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Card, CardBody, Col, Form, FormGroup, Row } from 'reactstrap';
import CustomInput from 'src/components/Forms/CustomInput';
import signInSchema from 'src/libs/validation-schemas/signin.schema';

const Upload = () => {
    //TODO: WIP schema
    const { ...methods } = useForm({
        resolver: yupResolver(signInSchema),
    });

    return (
        <div className={'card'}>
            <Row className='justify-content-center'>
                <Col lg='8'>
                    <Card className='bg-gradient-secondary shadow'>
                        <CardBody className='p-lg-5'>
                            <h4 className='mb-4'>Start letting it go</h4>
                            <FormProvider {...methods}>
                                <Form role='form'>
                                    <FormGroup>
                                        <CustomInput
                                            label={'Title'}
                                            name={'title'}
                                            placeholder={
                                                'Share key details like dimension or size'
                                            }
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <CustomInput
                                            label={'Description'}
                                            name={'description'}
                                            type={'textarea'}
                                            placeholder={
                                                'Share noteworthy details'
                                            }
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <CustomInput
                                            label={'Category'}
                                            name={'category'}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <CustomInput
                                            label={'Price'}
                                            name={'price'}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <CustomInput
                                            label={'Upload photos'}
                                            name={'Photos'}
                                        />
                                    </FormGroup>
                                </Form>
                            </FormProvider>

                            <div>
                                <Button
                                    block
                                    className='btn-round'
                                    color='default'
                                    size='lg'
                                    type='button'
                                >
                                    Send Message
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Upload;
