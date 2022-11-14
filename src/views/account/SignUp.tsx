import { Link } from 'react-router-dom';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col,
} from 'reactstrap';
import BlueBGWrapper from 'src/components/Wrappers/BlueBGWrapper';
import { PAGE_URLS } from 'src/constants/route';

const SignUp = () => {
    return (
        <BlueBGWrapper>
            <Container className='pt-lg-7'>
                <Row className='justify-content-center'>
                    <Col lg='5'>
                        <Card className='bg-secondary shadow border-0'>
                            <CardHeader className='bg-white pb-5'>
                                <div className='text-muted text-center mb-3'>
                                    <small>Sign up with</small>
                                </div>
                                <div className='text-center'>
                                    <Button
                                        className='btn-neutral btn-icon ml-1'
                                        color='default'
                                        href='#pablo'
                                        onClick={(e) => e.preventDefault()}
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
                                    <small>Or sign up with credentials</small>
                                </div>
                                <Form role='form'>
                                    <FormGroup>
                                        <InputGroup className='input-group-alternative mb-3'>
                                            <InputGroupAddon addonType='prepend'>
                                                <InputGroupText>
                                                    <i className='ni ni-hat-3' />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder='Name'
                                                type='text'
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className='input-group-alternative mb-3'>
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
                                            className='mt-4'
                                            color='primary'
                                            type='button'
                                        >
                                            Create account
                                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                        <Row className='mt-3'>
                            <Col>
                                <Link
                                    to={PAGE_URLS.SIGN_IN}
                                    className='text-light'
                                >
                                    <small>
                                        Already have an account? Sign In
                                    </small>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </BlueBGWrapper>
    );
};

export default SignUp;
