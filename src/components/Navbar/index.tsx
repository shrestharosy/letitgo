import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import {
    Col,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar as NB,
    NavbarBrand,
    Row,
    UncontrolledCollapse,
    UncontrolledDropdown,
} from 'reactstrap';
import { PAGE_URLS } from 'src/constants/route';
import { USER } from 'src/constants/storage.constant';
import { useAppContext } from 'src/context/auth.context';
import storageUtilityInstance from 'src/libs/utils/storage.util';
import { productService } from 'src/service/product';
import { ICategory } from 'src/service/product/product.type';
import { IUserProfile } from 'src/service/user/user.type';

const Navbar = () => {
    const { isLoggedIn, setCategory } = useAppContext();

    const { push } = useHistory();

    const [productCategories, setProductCategories] = useState<
        Array<ICategory>
    >([]);
    const [userProfile, setUserProfile] = useState({} as IUserProfile);

    useEffect(() => {
        const getProductCategories = async () => {
            try {
                const response = await productService.fetchCategories();
                setProductCategories(response);
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
                        <div
                            className='mr-lg-5 text-white cursor-pointer text-sm'
                            style={{ cursor: 'pointer', fontSize: '1rem' }}
                            onClick={() => window.location.replace('/')}
                        >
                            LET IT GO
                        </div>
                        <button className='navbar-toggler' id='navbar_global'>
                            <span className='navbar-toggler-icon' />
                        </button>
                        <UncontrolledCollapse toggler='#navbar_global' navbar>
                            <div className='navbar-collapse-header'>
                                <Row>
                                    <Col className='collapse-brand' xs='6'>
                                        <span
                                            onClick={() => {
                                                setCategory('1');
                                                push(PAGE_URLS.HOME);
                                            }}
                                        >
                                            LET IT GO
                                        </span>
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
                                                tag={Link}
                                                onClick={() => {
                                                    setCategory(category.id);
                                                    push(
                                                        `${PAGE_URLS.HOME}?category=${category.id}`
                                                    );
                                                }}
                                            >
                                                {category.name}
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
                                                    {userProfile?.first_name}{' '}
                                                    {userProfile?.last_name}
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
