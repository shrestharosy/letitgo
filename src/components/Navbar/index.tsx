import { Link, NavLink } from 'react-router-dom';

import {
    UncontrolledCollapse,
    UncontrolledDropdown,
    UncontrolledTooltip,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Col,
    Container,
    Nav,
    Navbar as NB,
    NavbarBrand,
    NavItem,
    Row,
} from 'reactstrap';
import { PAGE_URLS } from 'src/constants/route';

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
                                        <NavLink to={PAGE_URLS.HOME}>
                                            LET IT GO
                                        </NavLink>
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
                                className='navbar-nav-hover align-items-lg-center'
                                navbar
                            >
                                <UncontrolledDropdown nav>
                                    <DropdownToggle nav>
                                        <i className='ni ni-collection d-lg-none mr-1' />
                                        <span className='nav-link-inner--text'>
                                            Categories
                                        </span>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem to='/clothes' tag={Link}>
                                            Clothes
                                        </DropdownItem>
                                        <DropdownItem
                                            to='/furnitures'
                                            tag={Link}
                                        >
                                            Furnitures
                                        </DropdownItem>
                                        <DropdownItem
                                            to='/household'
                                            tag={Link}
                                        >
                                            Household
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>

                            <Nav
                                className='align-items-lg-center ml-lg-auto'
                                navbar
                            >
                                <NavItem>
                                    <NavLink
                                        className='nav-link-icon'
                                        id='tooltip333589074'
                                        to={PAGE_URLS.SIGN_IN}
                                    >
                                        <i className='fa fa-user' />
                                        <span className='nav-link-inner--text d-lg-none ml-2'>
                                            Account
                                        </span>
                                        <UncontrolledTooltip
                                            delay={0}
                                            target='tooltip333589074'
                                        >
                                            Account
                                        </UncontrolledTooltip>
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
