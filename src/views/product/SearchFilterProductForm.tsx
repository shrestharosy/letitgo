import { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { PRODUCT_CONDITION } from 'src/constants/product.constant';
import { productService } from 'src/service/product';
import { IOption } from 'src/service/product/product.type';

interface ISearchFilterProductFormProps {
    onSubmit;
}

const SearchFilterProductForm = (props: ISearchFilterProductFormProps) => {
    const { onSubmit } = props;

    const [productCategories, setProductCategories] = useState<Array<IOption>>(
        []
    );

    useEffect(() => {
        const getProductCategories = async () => {
            try {
                const response = await productService.fetchCategories();
                setProductCategories(
                    response.map(({ name, id }) => ({ label: name, value: id }))
                );
            } catch (error) {
                console.log(error.message);
            }
        };
        getProductCategories();
    }, []);

    const { ...methods } = useForm({});

    const mapProductconditions = Object.entries(PRODUCT_CONDITION).map(
        (condition) => ({
            value: condition[1],
            label: condition[0],
        })
    );

    return (
        <div className='flex flex-row ml-6 mr-6 mt--3'>
            <FormProvider {...methods}>
                <Form role='form'>
                    <Row>
                        <Col md='3' lg='3'>
                            <FormGroup>
                                <Controller
                                    name='category'
                                    control={methods.control}
                                    render={({ field }) => (
                                        <>
                                            <Label for='category'>
                                                Category
                                            </Label>
                                            <Select
                                                {...field}
                                                isClearable={true}
                                                isSearchable={false}
                                                options={productCategories}
                                                // value={productCategories.find(
                                                //     (category) =>
                                                //         methods.getValues(
                                                //             'category'
                                                //         ) === category.value
                                                // )}
                                                // onChange={(e) => {
                                                //     if (!e) {
                                                //     }
                                                //     methods.setValue(
                                                //         'category',
                                                //         e.value
                                                //     );
                                                // }}
                                            />
                                        </>
                                    )}
                                />
                            </FormGroup>
                        </Col>
                        <Col md='3' lg='3'>
                            <FormGroup>
                                <Controller
                                    name='condition'
                                    control={methods.control}
                                    render={({ field }) => (
                                        <>
                                            <Label for='condition'>
                                                Condition
                                            </Label>
                                            <Select
                                                {...field}
                                                isClearable={true}
                                                isSearchable={false}
                                                options={mapProductconditions}
                                            />

                                            {/* <Input
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
                                            </Input> */}
                                        </>
                                    )}
                                />
                            </FormGroup>
                        </Col>
                        <Col md='3' lg='3' style={{ marginTop: '26px' }}>
                            <Button
                                block
                                className='btn-round'
                                color='default'
                                size='md'
                                type='submit'
                                onClick={methods.handleSubmit(onSubmit)}
                            >
                                <i className={'fa fa-search mr-2'} />
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </FormProvider>
        </div>
    );
};

export default SearchFilterProductForm;
