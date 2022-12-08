import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { MainLoader } from 'src/components/Loader';
import { PAGE_URLS } from 'src/constants/route';
import { USER } from 'src/constants/storage.constant';
import { useNotify } from 'src/context/notify';
import storageUtilityInstance from 'src/libs/utils/storage.util';
import { productService } from 'src/service/product';
import { IModifyProduct, IProduct } from 'src/service/product/product.type';
import { IUserProfile } from 'src/service/user/user.type';
import UploadProductForm from 'src/views/product/UploadProductForm';

const EditProduct = () => {
    const { showSuccess, showError } = useNotify();

    const { push, goBack } = useHistory();
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

    useEffect(() => {
        if (product?.owner_id) {
            const user = storageUtilityInstance.getItem(USER);
            if (user) {
                const parsedUser: IUserProfile = JSON.parse(user);
                if (parsedUser.id !== product.owner_id) {
                    showError('Access denied');
                    goBack();
                }
            }
        }
    }, [product?.owner_id]);

    const onSubmit: SubmitHandler<IModifyProduct> = async (data) => {
        try {
            // const { image, ...rest} = data;
            await productService.updateProduct(product.id, data);
            showSuccess('Item modified');
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

                    {!isLoading && product && (
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
