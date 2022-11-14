import { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { productService } from 'src/service/product';
import { IProduct } from 'src/service/product/product.type';

const Section = () => {
    const [products, setProducts] = useState<Array<IProduct>>([]);

    useEffect(() => {
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
            <div className='pl-6 pr-6'>
                <Row className='justify-content-center'>
                    {products.map((product) => (
                        <Col lg={3} md={3} sm={4} className={'mt-5'}>
                            <div style={{ height: '350px', width: '350px' }}>
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

export default Section;
