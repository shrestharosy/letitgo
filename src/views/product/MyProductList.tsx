import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Badge, Col, Row } from 'reactstrap';
import ActionButton from 'src/components/Button';
import Condition from 'src/components/Condition';
import { MainLoader } from 'src/components/Loader';
import { PAGE_URLS } from 'src/constants/route';
import { productService } from 'src/service/product';
import { IProduct } from 'src/service/product/product.type';

const MyProductList = () => {
    const [products, setProducts] = useState<Array<IProduct>>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { push } = useHistory();

    useEffect(() => {
        const getProducts = async () => {
            setIsLoading(true);
            try {
                const response = await productService.fetchProducts();
                setProducts(response);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        getProducts();
    }, []);

    return (
        <>
            <Row>
                {isLoading && <MainLoader />}
                {!isLoading && products.length === 0 && (
                    <small>You do not have any items at the moment.</small>
                )}
                {!isLoading &&
                    products.length > 0 &&
                    products.map((product) => (
                        <Row
                            key={product.id}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onClick={() =>
                                push(`${PAGE_URLS.PRODUCT.HOME}/${product.id}`)
                            }
                        >
                            <Col>
                                <div className='m-3'>
                                    <img
                                        alt='...'
                                        style={{
                                            maxHeight: '100%',
                                            maxWidth: '100%',
                                        }}
                                        src={product.image}
                                    />
                                </div>
                            </Col>
                            <Col>
                                <small>{product.title}</small>
                            </Col>
                            <Col>
                                <small>
                                    {product.price
                                        ? `$${product.price}`
                                        : 'Free'}
                                </small>
                            </Col>
                            <Col>
                                <small>
                                    <Badge
                                        className='text-uppercase'
                                        color='primary'
                                        pill
                                    >
                                        {product.category}
                                    </Badge>
                                </small>
                            </Col>
                            <Col>
                                <small>
                                    <Condition condition={product.condition} />
                                </small>
                            </Col>
                            <Col className={'flex'}>
                                <ActionButton
                                    icon='fa fa-eye'
                                    label='View'
                                    onClick={() =>
                                        push(
                                            `${PAGE_URLS.PRODUCT.HOME}/${product.id}`
                                        )
                                    }
                                />

                                <ActionButton
                                    icon='fa fa-edit'
                                    label='Edit'
                                    onClick={() =>
                                        push(
                                            `${PAGE_URLS.PRODUCT.HOME}/${product.id}/edit`
                                        )
                                    }
                                />

                                <ActionButton
                                    icon='fa fa-trash'
                                    color='danger'
                                    label='Delete'
                                    onClick={() =>
                                        push(
                                            `${PAGE_URLS.PRODUCT.HOME}/${product.id}/edit`
                                        )
                                    }
                                />
                            </Col>
                        </Row>
                    ))}
            </Row>
        </>
    );
};

export default MyProductList;
