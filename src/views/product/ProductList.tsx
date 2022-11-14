import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { PAGE_URLS } from 'src/constants/route';
import { productService } from 'src/service/product';
import { IProduct } from 'src/service/product/product.type';

const ProductList = () => {
    const [products, setProducts] = useState<Array<IProduct>>([]);

    const { push } = useHistory();

    const {} = useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const response = await productService.fetchProducts();
            setProducts(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className='section section-lg'>
            <div className={'card'}>
                <Row className='justify-content-center'>
                    {products.map((product) => (
                        <Col
                            lg={3}
                            md={3}
                            sm={4}
                            className={'mt-5'}
                            onClick={() =>
                                push(`${PAGE_URLS.PRODUCT.HOME}/${product.id}`)
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
                                {product.price ? `$${product.price}` : 'Free'}
                            </small>
                        </Col>
                    ))}
                </Row>
            </div>
        </section>
    );
};

export default ProductList;
