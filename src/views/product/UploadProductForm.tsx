import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import {
    FormProvider,
    SubmitHandler,
    useForm,
    Controller,
} from 'react-hook-form';
import ImageUploader from 'react-images-upload';
import {
    Button,
    Card,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col,
} from 'reactstrap';
import CustomInput from 'src/components/Forms/CustomInput';
import {
    FILE_SIZE,
    PRODUCT_CONDITION,
    SUPPORTED_FILE_FORMATS,
} from 'src/constants/product.constant';
import productSchema from 'src/libs/validation-schemas/product.schema';
import { productService } from 'src/service/product';
import { IModifyProduct, IProduct } from 'src/service/product/product.type';

interface IUploadProductFormProps {
    submitButtonLabel: string;
    onSubmit: SubmitHandler<IModifyProduct>;
    product?: IProduct;
}

const UploadProductForm = (props: IUploadProductFormProps) => {
    const { submitButtonLabel, product, onSubmit } = props;

    const [localImage, setLocalImage] = useState(null);
    const [productCategories, setProductCategories] = useState<Array<string>>(
        []
    );

    const { ...methods } = useForm({
        resolver: yupResolver(productSchema),
    });

    const onDrop = (picture) => {
        const currentImage = picture[picture.length - 1];
        setLocalImage(currentImage);
        methods.setValue('image', currentImage);
    };

    useEffect(() => {
        const getProductCategories = async () => {
            try {
                const response = await productService.fetchCategories();
                setProductCategories(response.map((c) => c.name));
            } catch (error) {
                console.log(error.message);
            }
        };
        getProductCategories();
    }, []);

    useEffect(() => {
        methods.reset(product);
        setLocalImage(product?.image);
    }, [product]);

    return (
        <Card className='bg-gradient-secondary shadow'>
            <CardBody className='p-lg-5'>
                <h4 className='mb-4'>
                    Start adding details of the item that you wanna sell or give
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
                                placeholder={'Share noteworthy details'}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor={'uploadPhoto'}>
                                {'Upload Photo'}
                            </label>
                            <Controller
                                name='image'
                                control={methods.control}
                                render={({ field }) => (
                                    <ImageUploader
                                        {...field}
                                        withIcon={true}
                                        buttonText={
                                            localImage
                                                ? 'Update Image'
                                                : 'Choose image'
                                        }
                                        onChange={onDrop}
                                        imgExtension={SUPPORTED_FILE_FORMATS}
                                        maxFileSize={FILE_SIZE}
                                        label={
                                            'Max file size: 5mb, accepted: jpg|png|jpeg'
                                        }
                                    />
                                )}
                            />

                            {localImage && (
                                <div className='card'>
                                    <small className='d-block mt-4'>
                                        {localImage.name}
                                    </small>
                                    <img
                                        alt={''}
                                        src={
                                            typeof localImage === 'string'
                                                ? localImage
                                                : URL.createObjectURL(
                                                      localImage
                                                  )
                                        }
                                        className={'image'}
                                    />
                                </div>
                            )}
                        </FormGroup>

                        <Row>
                            <Col>
                                <FormGroup>
                                    <Controller
                                        name='category'
                                        control={methods.control}
                                        render={({ field }) => (
                                            <>
                                                <Label for='category'>
                                                    Category
                                                </Label>
                                                <Input
                                                    type='select'
                                                    onChange={(e) =>
                                                        methods.setValue(
                                                            'select',
                                                            e.target.value,
                                                            {
                                                                shouldValidate:
                                                                    true,
                                                            }
                                                        )
                                                    }
                                                    {...field}
                                                >
                                                    <option disabled selected>
                                                        Select Category
                                                    </option>
                                                    {productCategories.map(
                                                        (category) => (
                                                            <option>
                                                                {category}
                                                            </option>
                                                        )
                                                    )}
                                                </Input>
                                            </>
                                        )}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <CustomInput
                                        label={'Price'}
                                        name={'price'}
                                        type={'number'}
                                        placeholder={
                                            'Enter 0 if you wanna give it away for free'
                                        }
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={'6'}>
                                <FormGroup>
                                    <Controller
                                        name='condition'
                                        control={methods.control}
                                        render={({ field }) => (
                                            <>
                                                <Label for='condition'>
                                                    Condition
                                                </Label>
                                                <Input
                                                    type='select'
                                                    onChange={(e) =>
                                                        methods.setValue(
                                                            'select',
                                                            e.target.value,
                                                            {
                                                                shouldValidate:
                                                                    true,
                                                            }
                                                        )
                                                    }
                                                    {...field}
                                                >
                                                    <option disabled selected>
                                                        Select Condition
                                                    </option>
                                                    {Object.entries(
                                                        PRODUCT_CONDITION
                                                    ).map((condition) => (
                                                        <option
                                                            value={condition[1]}
                                                            label={condition[0]}
                                                        />
                                                    ))}
                                                </Input>
                                            </>
                                        )}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </FormProvider>

                <div>
                    <Button
                        block
                        className='btn-round'
                        color='default'
                        size='lg'
                        type='submit'
                        onClick={methods.handleSubmit(onSubmit)}
                    >
                        {submitButtonLabel}
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
};

export default UploadProductForm;
