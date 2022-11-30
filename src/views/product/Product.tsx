import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Badge, Col, Row, Button } from 'reactstrap';
import ActionButton from 'src/components/Button';
import Condition from 'src/components/Condition';
import { MainLoader } from 'src/components/Loader';
import { useNotify } from 'src/context/notify';
import { productService } from 'src/service/product';
import { IProduct } from 'src/service/product/product.type';

const Product = () => {
    const [product, setProduct] = useState<IProduct>(null);
    const [isLoading, setIsLoading] = useState(false);

    const param: { productId?: string } = useParams();
    const { showInfo } = useNotify();

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
                                        src={
                                            product.image ??
                                            require(`src/assets/img/brand/image_not_found.jpg`)
                                        }
                                    />
                                </div>
                            </Col>
                            <Col lg={6} md={6} sm={4}>
                                <small className='d-block mt-4 product-title'>
                                    {product.title}
                                </small>
                                <small className='d-block mt-2 product-price'>
                                    {Math.floor(+product.price) === 0
                                        ? 'Free'
                                        : product.price && `$${product.price}`}
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

                                <>
                                    <small className='d-block mt-4'>
                                        Posted by
                                    </small>
                                    <small className='product-description text-muted'>
                                        <span className='mr-2'>
                                            {product.owner_first_name &&
                                            product.owner_last_name
                                                ? `${product.owner_first_name} ${product.owner_last_name}`
                                                : 'n/a'}
                                        </span>
                                    </small>
                                </>

                                <>
                                    <small className='d-block mt-3 mb-1'>
                                        Interested? Contact the owner of this
                                        post.
                                    </small>

                                    <Button
                                        className='btn-sm btn-icon btn-2 transform-none shadow-none'
                                        color='primary'
                                        type='button'
                                        title={
                                            'Interested? Contact the owner of this post'
                                        }
                                    >
                                        <span className=''>
                                            <i className='fa fa-envelope' />
                                        </span>
                                        <span
                                            className='btn-inner--text'
                                            style={{ fontSize: '0.6rem' }}
                                        >
                                            Contact
                                        </span>
                                    </Button>
                                </>

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
