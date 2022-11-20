import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Card, CardBody, Col, Form, FormGroup, Row } from 'reactstrap';
import CustomInput from 'src/components/Forms/CustomInput';
import signInSchema from 'src/libs/validation-schemas/signin.schema';
import ImageUploader from 'react-images-upload';
import { useState } from 'react';

const Upload = () => {
    const [localImage, setLocalImage] = useState(null);

    //TODO: WIP schema
    const { ...methods } = useForm({
        resolver: yupResolver(signInSchema),
    });

    const onDrop = (picture) => {
        setLocalImage(picture[picture.length - 1]);
    };

    return (
        <div className={'card'}>
            <Row className='justify-content-center'>
                <Col lg='8'>
                    <Card className='bg-gradient-secondary shadow'>
                        <CardBody className='p-lg-5'>
                            <h4 className='mb-4'>
                                Start adding items that you wanna sell or give
                                away
                            </h4>
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
                                        <label htmlFor={'uploadPhoto'}>
                                            {'Upload Photo'}
                                        </label>
                                        <ImageUploader
                                            withIcon={true}
                                            buttonText={
                                                localImage
                                                    ? 'Update Image'
                                                    : 'Choose image'
                                            }
                                            onChange={onDrop}
                                            imgExtension={['.jpg', '.png']}
                                            maxFileSize={5242880}
                                            label={
                                                'Max file size: 5mb, accepted: jpg|png'
                                            }
                                        />

                                        {localImage && (
                                            <div className='card'>
                                                <small className='d-block mt-4'>
                                                    {localImage.name}
                                                </small>
                                                <img
                                                    alt={''}
                                                    src={URL.createObjectURL(
                                                        localImage
                                                    )}
                                                    className={'image'}
                                                />
                                            </div>
                                        )}
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
                                    LET IT GO
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
