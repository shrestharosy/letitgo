import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Badge, Col, Row } from 'reactstrap';
import { MainLoader } from 'src/components/Loader';
import VerifiedBadge from 'src/components/VerifiedBadge';
import { PAGE_URLS } from 'src/constants/route';
import { useAppContext } from 'src/context/auth.context';
import { useNotify } from 'src/context/notify';
import {
    getProductConditionColor,
    mapProductCondition,
} from 'src/libs/utils/product.util';
import { productService } from 'src/service/product';
import { IOption, IProduct } from 'src/service/product/product.type';
import FilterProductForm from './SearchFilterProductForm';

interface IFilterProps {
    search: string;
    category: IOption;
    condition: IOption;
    verified: IOption;
}

const ProductList = () => {
    const { showError } = useNotify();

    const [products, setProducts] = useState<Array<IProduct>>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { category } = useAppContext();

    const { push } = useHistory();

    useEffect(() => {
        // Promise.all([getProducts(), getProductCategories()]);
        getProducts();
    }, [category]);

    // const getProductCategories = async () => {
    //     try {
    //         const response = await productService.fetchCategories();
    //         setProductCategories(response.map((c) => c.name));
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // };

    const submitFilter = async (data: IFilterProps) => {
        try {
            const {
                category = null,
                condition = null,
                search = null,
                verified = null,
            } = data;
            const response = await productService.fetchProducts(
                category?.value.toString(),
                +condition?.value,
                search,
                verified?.value as string
            );
            setProducts(response);
        } catch (error) {
            showError(error.message);
        }
    };

    const getProducts = async () => {
        try {
            setIsLoading(true);
            const response = await productService.fetchProducts(category);
            setProducts(response);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {<FilterProductForm onSubmit={submitFilter} />}
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
                                            src={
                                                product.image ??
                                                require(`src/assets/img/brand/image_not_found.jpg`)
                                            }
                                        />
                                    </div>
                                    <small className='d-block font-weight-bold mt-4'>
                                        {product.title}
                                    </small>
                                    <small>
                                        {Math.floor(+product.price) === 0
                                            ? 'Free'
                                            : product.price &&
                                              `$${product.price}`}
                                    </small>

                                    <small className='d-block'>
                                        <Badge
                                            className='text-uppercase'
                                            color='primary'
                                            pill
                                        >
                                            {product.category}
                                        </Badge>
                                        <Badge
                                            className='text-uppercase ml-2'
                                            color={getProductConditionColor(
                                                product.condition
                                            )}
                                            pill
                                        >
                                            {mapProductCondition(
                                                product.condition
                                            )}
                                        </Badge>
                                        {product.verified && <VerifiedBadge />}
                                    </small>
                                </Col>
                            ))}
                    </Row>
                </div>
            </section>
        </div>
    );
};

export default ProductList;
