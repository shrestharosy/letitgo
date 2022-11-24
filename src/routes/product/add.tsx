import { Col, Row } from 'reactstrap';
import UploadProductForm from 'src/views/product/UploadProductForm';
import { SubmitHandler } from 'react-hook-form';
import { IModifyProduct } from 'src/service/product/product.type';
import { productService } from 'src/service/product';
import { useNotify } from 'src/context/notify';
import { useHistory } from 'react-router-dom';
import { PAGE_URLS } from 'src/constants/route';

const AddProduct = () => {
    const { showSuccess, showError } = useNotify();

    const { push } = useHistory();

    const onSubmit: SubmitHandler<IModifyProduct> = async (data) => {
        try {
            await productService.addProduct(data);
            showSuccess('Item uploaded successfully');
            push(PAGE_URLS.USER.ACCOUNT);
        } catch (error) {
            showError(error.message);
        }
    };

    return (
        <div className={'card'}>
            <Row className='justify-content-center'>
                <Col lg='8'>
                    <UploadProductForm
                        submitButtonLabel={'LET IT GO'}
                        onSubmit={onSubmit}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default AddProduct;
