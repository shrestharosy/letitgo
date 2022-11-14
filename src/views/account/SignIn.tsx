import { Link } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Button,
    Card,
    CardHeader,
    CardBody,
    Form,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    Input,
    InputGroupText,
} from 'reactstrap';
import BlueBGWrapper from 'src/components/Wrappers/BlueBGWrapper';
import { PAGE_URLS } from 'src/constants/route';

const Account = () => {
    return (
        <BlueBGWrapper>
            <Container className='pt-lg-7'>
                <Row className='justify-content-center'>
                    <Col lg='5'>
                        <Card className='bg-secondary shadow border-0'>
                            <CardHeader className='bg-white pb-5'>
                                <div className='text-muted text-center mb-3'>
                                    <small>Sign in with</small>
                                </div>
                                <div className='btn-wrapper text-center'>
                                    <Button
                                        className='btn-neutral btn-icon ml-1'
                                        color='default'
                                    >
                                        <span className='btn-inner--icon mr-1'>
                                            <img
                                                alt='...'
                                                src={
                                                    require('src/assets/img/icons/common/google.svg')
                                                        .default
                                                }
                                            />
                                        </span>
                                        <span className='btn-inner--text'>
                                            Google
                                        </span>
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardBody className='px-lg-5 py-lg-4'>
                                <div className='text-center text-muted mb-4'>
                                    <small>Or sign in with credentials</small>
                                </div>
                                <Form role='form'>
                                    <FormGroup className='mb-3'>
                                        <InputGroup className='input-group-alternative'>
                                            <InputGroupAddon addonType='prepend'>
                                                <InputGroupText>
                                                    <i className='ni ni-email-83' />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder='Email'
                                                type='email'
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className='input-group-alternative'>
                                            <InputGroupAddon addonType='prepend'>
                                                <InputGroupText>
                                                    <i className='ni ni-lock-circle-open' />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder='Password'
                                                type='password'
                                                autoComplete='off'
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <div className='text-center'>
                                        <Button
                                            className='my-4'
                                            color='primary'
                                            type='button'
                                        >
                                            Sign in
                                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                        <Row className='mt-3'>
                            <Col xs='6'>
                                <a
                                    className='text-light'
                                    href='#pablo'
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <small>Forgot password?</small>
                                </a>
                            </Col>
                            <Col className='text-right' xs='6'>
                                <Link
                                    to={PAGE_URLS.SIGN_UP}
                                    className='text-light'
                                >
                                    <small>Create new account</small>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </BlueBGWrapper>
    );
};

export default Account;
