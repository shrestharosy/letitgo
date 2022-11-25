import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Badge, Col, Row } from 'reactstrap';
import ActionButton from 'src/components/Button';
import Condition from 'src/components/Condition';
import DeleteModal from 'src/components/Modals/DeleteModal';
import { PAGE_URLS } from 'src/constants/route';
import { useNotify } from 'src/context/notify';
import { productService } from 'src/service/product';
import { IProduct } from 'src/service/product/product.type';

interface IProductRowProps {
    product: IProduct;
    getProducts: () => Promise<void>;
}

const ProductRow = (props: IProductRowProps) => {
    const { product, getProducts } = props;
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const { push } = useHistory();

    const { showSuccess, showError } = useNotify();

    const onDelete = async () => {
        try {
            await productService.deleteProduct(product.id);
            showSuccess('Item deleted');
            await getProducts();
        } catch (error) {
            showError('Error while deleting item. Please try again.');
        }
        console.log(product.id);
    };

    return (
        <>
            <Row
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                }}
                onClick={() => push(`${PAGE_URLS.PRODUCT.HOME}/${product.id}`)}
            >
                <Col>
                    <div className='m-3'>
                        <img
                            alt='...'
                            style={{
                                maxHeight: '100%',
                                maxWidth: '100%',
                            }}
                            src={
                                product.image ??
                                require(`src/assets/img/brand/image_not_found.jpg`)
                            }
                        />
                    </div>
                </Col>
                <Col>
                    <small>{product.title}</small>
                </Col>
                <Col>
                    <small>
                        {product.price ? `$${product.price}` : 'Free'}
                    </small>
                </Col>
                <Col>
                    <small>
                        <Badge className='text-uppercase' color='primary' pill>
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
                            push(`${PAGE_URLS.PRODUCT.HOME}/${product.id}`)
                        }
                    />

                    <ActionButton
                        icon='fa fa-edit'
                        label='Edit'
                        onClick={() =>
                            push(`${PAGE_URLS.PRODUCT.HOME}/${product.id}/edit`)
                        }
                    />

                    <ActionButton
                        icon='fa fa-trash'
                        color='danger'
                        label='Delete'
                        onClick={() => setIsDeleteModalOpen(true)}
                    />
                </Col>
            </Row>

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClick={onDelete}
                onClose={() => setIsDeleteModalOpen(false)}
            />
        </>
    );
};

export default ProductRow;
