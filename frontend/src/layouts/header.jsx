import React from 'react';
import {
    Nav,
    Navbar,
    Collapse,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Table,
    CardImg, Button
} from 'reactstrap';

import profilephoto from '../assets/images/users/1.jpg';
import logodarktext from '../assets/images/logo-text.png';


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            baskets: [],
            isLoading: false,
            error: null,
            userId: 1,
            c_bicycle: null,
        };
    }


    componentDidMount() {
        this.setState({ isLoading: true });
        fetch(process.env.REACT_APP_BASKET_BICYCLE_API + '?user_id=' + this.state.userId)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => this.setState({ baskets: data, isLoading: false }))
            .catch(error => this.setState({ error, isLoading: false }));
    }

    removeBicycle(bicycleId, userId) {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"user_id": userId, "bicycle_id": bicycleId})
        };
        fetch(process.env.REACT_APP_DEL_BASKET_API, requestOptions).then(r => {});
        // fetch(process.env.REACT_APP_DEL_BASKET_API + '?user_id=' + userId + '&bicycle_id=' + bicycleId)
        //     .then(r => {});
        this.componentDidMount();
    }

    render() {
        const { baskets, isLoading, error, userId, c_bicycle } = this.state;
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
                                    onClick={() => {this.componentDidMount();}}
                                    style={{marginTop: '20px', color: '#FFFFFF'}}
                                >
                                    Basket
                                </DropdownToggle>
                                <DropdownMenu right className="user-dd">
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Preview</th>
                                                <th>Product Name</th>
                                                <th>Quantity</th>
                                                <th>Total price</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        { baskets.map(basket => {
                                            const bicycleId = basket.bicycle_id;
                                            return (
                                                <tr className="mt-4">
                                                    <td>
                                                     <CardImg top
                                                    width="100%" src={"data:image/jpeg;base64," + basket.b64image} />
                                                    </td>
                                                    <td>
                                                        {basket.name}
                                                    </td>
                                                    <td>
                                                        {basket.quantity}
                                                    </td>
                                                    <td>
                                                        {basket.price * basket.quantity} $
                                                    </td>
                                                    <td>
                                                        <Button
                                                            color="danger"
                                                            onClick={() => this.removeBicycle(bicycleId, userId)}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        </tbody>
                                    </Table>
                                </DropdownMenu>

                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret className="pro-pic">
                                    <img src={profilephoto} alt="user" className="rounded-circle" width="31"/>
                                </DropdownToggle>
                                <DropdownMenu right className="user-dd">
                                    <DropdownItem href="/pages/login">
                                        <i className="fa fa-power-off mr-1 ml-1"/> Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}
export default Header;
