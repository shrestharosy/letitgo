import { useHistory } from 'react-router-dom';
import { Card, Col, Container, Row, Button } from 'reactstrap';
import { PAGE_URLS } from 'src/constants/route';
import withProtectedPage from 'src/libs/hoc/withProtectedPage';
import MyProductList from 'src/views/product/MyProductList';

const AccountPage = () => {
    const { push } = useHistory();
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
                                                href='#pablo'
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
                                            User details here
                                        </div>
                                        <div>
                                            <i className='ni education_hat mr-2' />
                                            User sub details
                                        </div>
                                    </Col>
                                    <Col className='order-lg-3' lg='4'>
                                        <div className='card-profile-stats d-flex justify-content-center'>
                                            <div>
                                                <span className='heading'>
                                                    22
                                                </span>
                                                <span className='description'>
                                                    Items
                                                </span>
                                            </div>
                                            <div>
                                                <span className='heading'>
                                                    10
                                                </span>
                                                <span className='description'>
                                                    Photos
                                                </span>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>

                                <div className={'py-5 border-top'}>
                                    <Row>
                                        <Col>
                                            <h6>My Items</h6>
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
