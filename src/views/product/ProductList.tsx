import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { MainLoader } from 'src/components/Loader';
import { PAGE_URLS } from 'src/constants/route';
import { productService } from 'src/service/product';
import { IProduct } from 'src/service/product/product.type';

const ProductList = () => {
    const [products, setProducts] = useState<Array<IProduct>>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { push } = useHistory();

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            setIsLoading(true);
            const response = await productService.fetchProducts();
            setProducts(response);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className='section section-lg'>
            <div className={'card'}>
                <Row className='justify-content-center'>
                    {isLoading && <MainLoader />}
                    {!isLoading && products.length === 0 && (
                        <div>No products found</div>
                    )}
                    {products.length > 0 &&
                        products.map((product) => (
                            <Col
                                id={product.id}
                                lg={3}
                                md={3}
                                sm={4}
                                className={'mt-5 cursor'}
                                onClick={() =>
                                    push(
                                        `${PAGE_URLS.PRODUCT.HOME}/${product.id}`
                                    )
                                }
                            >
                                <div className={'image'}>
                                    <img
                                        alt='...'
                                        className='img-fluid rounded'
                                        style={{ maxHeight: '100%' }}
                                        src={product.image}
                                    />
                                </div>
                                <small className='d-block font-weight-bold mt-4'>
                                    {product.title}
                                </small>
                                <small>
                                    {product.price
                                        ? `$${product.price}`
                                        : 'Free'}
                                </small>
                            </Col>
                        ))}
                </Row>
            </div>
        </section>
    );
};

export default ProductList;
