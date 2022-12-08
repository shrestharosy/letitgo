import { useEffect, useState } from 'react';
import { Container, Row } from 'reactstrap';
import { MainLoader } from 'src/components/Loader';
import ProductRow from 'src/components/ProductRow';
import { USER } from 'src/constants/storage.constant';
import { useNotify } from 'src/context/notify';
import storageUtilityInstance from 'src/libs/utils/storage.util';
import { productService } from 'src/service/product';
import { IProduct } from 'src/service/product/product.type';

const MyProductList = () => {
    const [products, setProducts] = useState<Array<IProduct>>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { showError } = useNotify();

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        setIsLoading(true);
        try {
            const user = storageUtilityInstance.getItem(USER) ?? null;
            if (user) {
                const response = await productService.fetchMyProducts(
                    JSON.parse(user).id
                );
                setProducts(response);
            } else {
                showError('User id not found');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Row>
                {isLoading && (
                    <Container>
                        <MainLoader />
                    </Container>
                )}
                {!isLoading && products.length === 0 && (
                    <small>You do not have any items at the moment.</small>
                )}
                {!isLoading &&
                    products.length > 0 &&
                    products.map((product) => (
                        <ProductRow
                            key={product.id}
                            product={product}
                            getProducts={getProducts}
                        />
                    ))}
            </Row>
        </>
    );
};

export default MyProductList;
