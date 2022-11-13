import { Link } from 'react-router-dom';

import {
    UncontrolledCollapse,
    Col,
    Container,
    Nav,
    Navbar as NB,
    NavbarBrand,
    NavLink,
    NavItem,
    Row,
} from 'reactstrap';

const Navbar = () => {
    return (
        <>
            <header className='header-global'>
                <NB
                    className='navbar-main navbar-transparent navbar-light headroom navbar navbar-expand-lg headroom--not-bottom headroom--not-top headroom--pinned'
                    expand='lg'
                    id='navbar-main'
                >
                    <Container>
                        <NavbarBrand className='mr-lg-5' to='/' tag={Link}>
                            LET IT GO
                        </NavbarBrand>
                        <button className='navbar-toggler' id='navbar_global'>
                            <span className='navbar-toggler-icon' />
                        </button>
                        <UncontrolledCollapse toggler='#navbar_global' navbar>
                            <div className='navbar-collapse-header'>
                                <Row>
                                    <Col className='collapse-brand' xs='6'>
                                        <Link to='/'>LET IT GO</Link>
                                    </Col>
                                    <Col className='collapse-close' xs='6'>
                                        <button
                                            className='navbar-toggler'
                                            id='navbar_global'
                                        >
                                            <span />
                                            <span />
                                        </button>
                                    </Col>
                                </Row>
                            </div>

                            <Nav
                                className='align-items-lg-center ml-lg-auto'
                                navbar
                            >
                                <NavItem>
                                    <NavLink className='nav-link-icon'>
                                        <i className='fa fa-user' />
                                        <span className='nav-link-inner--text ml-2'>
                                            Sign In
                                        </span>
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className='nav-link-icon'>
                                        <i className='fa fa-user' />
                                        <span className='nav-link-inner--text ml-2'>
                                            Sign Up
                                        </span>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </UncontrolledCollapse>
                    </Container>
                </NB>
            </header>
        </>
    );
};

export default Navbar;
