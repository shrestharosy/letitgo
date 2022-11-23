import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row, Badge } from 'reactstrap';
import Condition from 'src/components/Condition';
import { MainLoader } from 'src/components/Loader';
import { productService } from 'src/service/product';
import { IProduct } from 'src/service/product/product.type';

const Product = () => {
    const [product, setProduct] = useState<IProduct>(null);
    const [isLoading, setIsLoading] = useState(false);

    const param: { productId?: string } = useParams();

    useEffect(() => {
        const getProduct = async (id: string) => {
            setIsLoading(true);
            try {
                const response = await productService.fetchProduct(id);
                setProduct(response);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        if (param?.productId) {
            getProduct(param.productId);
        }
    }, [param?.productId]);

    return (
        <>
            <div className={'card'}>
                <Row
                    className='justify-content-center'
                    style={{ margin: '0 auto' }}
                >
                    {isLoading && <MainLoader />}
                    {!isLoading && product && (
                        <>
                            <Col id={product.id} className={'mt-5'}>
                                <div className={'product-image'}>
                                    <img
                                        alt='...'
                                        className='img-fluid rounded'
                                        style={{ maxHeight: '100%' }}
                                        src={product.image}
                                    />
                                </div>
                            </Col>
                            <Col lg={6} md={6} sm={4}>
                                <small className='d-block mt-4 product-title'>
                                    {product.title}
                                </small>
                                <small className='d-block mt-2 product-price'>
                                    {product.price
                                        ? `$${product.price}`
                                        : 'Free'}
                                </small>
                                <Badge
                                    className='text-uppercase'
                                    color='primary'
                                    pill
                                >
                                    {product.category}
                                </Badge>

                                <h6 className={'mt-3'}>Description</h6>
                                <small className='d-block mt-3 text-justify product-description'>
                                    {product.description}
                                </small>

                                <Condition condition={product.condition} />

                                <small className='d-block mt-4'>
                                    Posted on
                                </small>
                                <small className='product-description text-muted'>
                                    {new Date(
                                        product.created_date
                                    ).toDateString()}
                                </small>
                            </Col>
                        </>
                    )}
                </Row>
            </div>
        </>
    );
};

export default Product;
