import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
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
                                <small className='d-block mt-3 product-label'>
                                    Details
                                </small>
                                <small className='d-block mt-3 text-justify product-description'>
                                    Far quitting dwelling graceful the likewise
                                    received building. An fact so to that show
                                    am shed sold cold. Unaffected remarkably get
                                    yet introduced excellence terminated led.
                                    Result either design saw she esteem and. On
                                    ashamed no inhabit ferrars it ye besides
                                    resolve. Own judgment directly few trifling.
                                    Elderly as pursuit at regular do parlors.
                                    Rank what has into fond she.
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
