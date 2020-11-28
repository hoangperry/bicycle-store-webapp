import React from 'react';
import {
    Nav,
    NavItem,
    Navbar,
    Collapse,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

import profilephoto from '../assets/images/users/1.jpg';
import logodarktext from '../assets/images/logo-text.png';


const Header = () => {
    return (
        <header className="topbar navbarbg" data-navbarbg="skin4">
            <Navbar className="top-navbar" dark expand="md">
                <div className="navbar-header" id="logobg" data-logobg="skin4">
                    <a href="/">
                        <span className="logo-text">
                            <img
                                src={logodarktext}
                                alt="homepage"
                                className="dark-logo"
                                height={60}
                            />
                        </span>
                    </a>
                </div>

                <Collapse className="navbarbg" navbar data-navbarbg="skin4">


                    <Nav className="ml-auto float-right" navbar>


                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle
                                style={{ marginTop: '20px', color: '#FFFFFF' }}
                            >
                                Basket
                            </DropdownToggle>
                            <DropdownMenu right className="user-dd">
                                <DropdownItem href="/pages/login">
                                    Item 1
                                </DropdownItem>
                                <DropdownItem href="/pages/login">
                                    Item 1
                                </DropdownItem>
                                <DropdownItem href="/pages/login">
                                    Item 1
                                </DropdownItem>
                                <DropdownItem href="/pages/login">
                                    Item 1
                                </DropdownItem>
                                <DropdownItem href="/pages/login">
                                    Item 1
                                </DropdownItem>
                            </DropdownMenu>

                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret className="pro-pic">
                                <img src={profilephoto} alt="user" className="rounded-circle" width="31"/>
                            </DropdownToggle>
                            <DropdownMenu right className="user-dd">
                                <DropdownItem href="/pages/login">
                                    <i className="fa fa-power-off mr-1 ml-1" /> Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        </header>
    );
}
export default Header;
