import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, Col, Container, Row } from 'reactstrap';
import { PAGE_URLS } from 'src/constants/route';
import { USER } from 'src/constants/storage.constant';
import withProtectedPage from 'src/libs/hoc/withProtectedPage';
import storageUtilityInstance from 'src/libs/utils/storage.util';
import { IUserProfile } from 'src/service/user/user.type';
import MyProductList from 'src/views/product/MyProductList';

const AccountPage = () => {
    const { push } = useHistory();

    const [userProfile, setUserProfile] = useState<IUserProfile>(null);

    useEffect(() => {
        const user = storageUtilityInstance.getItem(USER);
        if (user) {
            setUserProfile(JSON.parse(user));
        }
    }, []);

    return (
        <>
            <main className='mt-9 overflow-visible'>
                <section className='section profile-page'>
                    <Container className={'p-0'}>
                        <Card className='card-profile shadow'>
                            <div>
                                <Row>
                                    <Col className='order-lg-1' lg='3'>
                                        <div className='card-profile-image'>
                                            <a
                                                href='#ola'
                                                onClick={(e) =>
                                                    e.preventDefault()
                                                }
                                            >
                                                <img
                                                    alt='...'
                                                    className='rounded-circle'
                                                    src={require('src/assets/img/theme/team-4-800x800.jpg')}
                                                />
                                            </a>
                                        </div>
                                    </Col>

                                    <Col className='order-lg-2' lg='3'>
                                        <div className='h5 mt-4'>
                                            <i className='ni business_briefcase-24 mr-2' />
                                            {userProfile.first_name}{' '}
                                            {userProfile.last_name}
                                        </div>
                                        <div>
                                            <i className='ni education_hat mr-2' />
                                            {userProfile.email}
                                        </div>
                                    </Col>
                                </Row>

                                <div className={'py-6 border-top'}>
                                    <Row>
                                        <Col>
                                            <h5>My Items</h5>
                                        </Col>
                                        <Col className={'text-right mb-4'}>
                                            <Button
                                                className='btn-sm btn-icon btn-2 transform-none shadow-none'
                                                color='primary'
                                                type='button'
                                                onClick={() =>
                                                    push(
                                                        `${PAGE_URLS.PRODUCT.ADD}`
                                                    )
                                                }
                                            >
                                                <span className=''>
                                                    <i className='ni ni-cloud-upload-96' />
                                                </span>
                                                <span className='btn-inner--text'>
                                                    Upload Item
                                                </span>
                                            </Button>
                                        </Col>
                                    </Row>
                                    <MyProductList />
                                </div>
                            </div>
                        </Card>
                    </Container>
                </section>
            </main>
        </>
    );
};

export default withProtectedPage(AccountPage);
