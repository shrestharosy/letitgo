import { useEffect, useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';

import {
    UncontrolledCollapse,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Col,
    Container,
    Nav,
    Navbar as NB,
    NavbarBrand,
    Row,
} from 'reactstrap';
import { PAGE_URLS } from 'src/constants/route';
import { USER } from 'src/constants/storage.constant';
import { useAppContext } from 'src/context/auth.context';
import storageUtilityInstance from 'src/libs/utils/storage.util';
import { productService } from 'src/service/product';
import { IUserProfile } from 'src/service/user/user.type';

const Navbar = () => {
    const { isLoggedIn } = useAppContext();

    const { push } = useHistory();

    const [productCategories, setProductCategories] = useState<Array<string>>(
        []
    );
    const [userProfile, setUserProfile] = useState({} as IUserProfile);

    useEffect(() => {
        const getProductCategories = async () => {
            try {
                const response = await productService.fetchCategories();
                setProductCategories(response.map((c) => c.name));
            } catch (error) {
                console.log(error.message);
            }
        };
        getProductCategories();
    }, []);

    useEffect(() => {
        const user = storageUtilityInstance.getItem(USER);
        if (user) {
            setUserProfile(JSON.parse(user));
        }
    }, [isLoggedIn]);

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
                                        {productCategories.map((category) => (
                                            <DropdownItem
                                                to={`/${category}`}
                                                tag={Link}
                                            >
                                                {category}
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>

                            <Nav
                                className='navbar-nav-hover align-items-lg-center ml-lg-auto'
                                navbar
                            >
                                <UncontrolledDropdown>
                                    <DropdownToggle
                                        nav
                                        onClick={() => {
                                            isLoggedIn
                                                ? push(PAGE_URLS.USER.ACCOUNT)
                                                : push(PAGE_URLS.SIGN_IN);
                                        }}
                                    >
                                        <>
                                            {/* <i className='fa fa-user mr-1' /> */}
                                            <span className='nav-link-inner--text'>
                                                Account
                                            </span>
                                        </>
                                    </DropdownToggle>
                                </UncontrolledDropdown>
                            </Nav>

                            {isLoggedIn && (
                                <>
                                    <Nav
                                        className='navbar-nav-hover align-items-lg-center'
                                        navbar
                                    >
                                        <UncontrolledDropdown nav>
                                            <DropdownToggle nav>
                                                <i className='fa fa-user mr-1' />

                                                <span className='nav-link-inner--text'>
                                                    {userProfile.first_name}{' '}
                                                    {userProfile.last_name}
                                                </span>
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem
                                                    to={PAGE_URLS.SIGN_OUT}
                                                    tag={Link}
                                                >
                                                    Sign Out
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </Nav>
                                </>
                            )}
                        </UncontrolledCollapse>
                    </Container>
                </NB>
            </header>
        </>
    );
};

export default Navbar;
