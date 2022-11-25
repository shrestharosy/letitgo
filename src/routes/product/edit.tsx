import { Col, Row, Container } from 'reactstrap';
import UploadProductForm from 'src/views/product/UploadProductForm';
import { SubmitHandler } from 'react-hook-form';
import { IModifyProduct, IProduct } from 'src/service/product/product.type';
import { productService } from 'src/service/product';
import { useNotify } from 'src/context/notify';
import { useHistory, useParams } from 'react-router-dom';
import { PAGE_URLS } from 'src/constants/route';
import { useEffect, useState } from 'react';
import { MainLoader } from 'src/components/Loader';

const EditProduct = () => {
    const { showSuccess, showError } = useNotify();

    const { push } = useHistory();
    const param: { productId?: string } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState<IProduct>(null);

    useEffect(() => {
        const getProduct = async (id: string) => {
            setIsLoading(true);
            try {
                const response = await productService.fetchProduct(id);
                setProduct(response);
            } catch (error) {
                showError(error.message);
                push(PAGE_URLS.USER.ACCOUNT);
            } finally {
                setIsLoading(false);
            }
        };

        if (param?.productId) {
            getProduct(param.productId);
        }
    }, [param?.productId]);

    const onSubmit: SubmitHandler<IModifyProduct> = async (data) => {
        try {
            await productService.updateProduct(product.id, data);
            showSuccess('Item modified');
            // push(PAGE_URLS.USER.ACCOUNT);
        } catch (error) {
            showError(error.message);
        }
    };

    return (
        <div className={'card'}>
            <Row className='justify-content-center'>
                <Col lg='8'>
                    {isLoading && (
                        <Container>
                            <MainLoader />
                        </Container>
                    )}

                    {product && (
                        <UploadProductForm
                            product={product}
                            submitButtonLabel={'Update'}
                            onSubmit={onSubmit}
                        />
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default EditProduct;
