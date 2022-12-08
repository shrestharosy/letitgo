import { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { PRODUCT_CONDITION } from 'src/constants/product.constant';
import { productService } from 'src/service/product';
import { IOption } from 'src/service/product/product.type';

interface ISearchFilterProductFormProps {
    onSubmit
}


const SearchFilterProductForm = (props: ISearchFilterProductFormProps) => {
    const {onSubmit} = props

    const [productCategories, setProductCategories] = useState<Array<IOption>>(
        []
    );

    useEffect(() => {
        const getProductCategories = async () => {
            try {
                const response = await productService.fetchCategories();
                setProductCategories(response.map(({name, id}) => ({label: name, value: id})));
            } catch (error) {
                console.log(error.message);
            }
        };
        getProductCategories();
    }, []);

    const { ...methods } = useForm({});

    return (
        <div className='flex flex-row'>
            <FormProvider {...methods}>
                <Form role='form'>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Controller
                                    name="category"
                                    control={methods.control}
                                    render={({ field }) => (
                                        <>
                                            <Label for='category'>
                                                Category
                                            </Label>
                                            <Select
                                            {...field}
                                            options={productCategories}
                                            value={productCategories.find((category) => methods.getValues('category') === category.value)}
                                            onChange={(e) => methods.setValue('category',e.value)}
                                            />
                                        </>
                                    )}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
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
            <Button
                block
                className='btn-round'
                color='default'
                size='lg'
                type='submit'
                onClick={methods.handleSubmit(onSubmit)}
            >
                Search
            </Button>
        </div>
    )
}

export default SearchFilterProductForm;
