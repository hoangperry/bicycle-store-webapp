import React, {useState} from 'react';
import {
    Card,
    CardTitle,
    Row,
    Col,
    CardBody,
    Container,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Button,
    Form
} from 'reactstrap';


import loginBackround from '../assets/images/big/auth-bg.jpg';


class Login extends React.Component  {
    constructor(props) {
        super(props);
        this.username = "";
        this.password = "";
    }

    validateForm() {
        return this.username.length > 0 && this.password.length > 0;
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.history.push('localhost:8000/');
    }

    setUsername(username) {
        this.username = username;
    }

    setPassword(password) {
        this.password = password;
    }

    render() {
        return (
            <div className="page-wrapper d-block" style={{
                backgroundImage: "url(" + loginBackround + ")",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className="page-content container-fluid">
                    <Card style={{"margin": "28vh 30vh"}}>
                        <CardTitle className="bg-light border-bottom p-3 mb-0">Login page</CardTitle>
                        <CardBody className="">
                            <Container>
                                <Form onSubmit={this.handleSubmit}>
                                    <br/>
                                    <Row>
                                        <Col>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>Username</InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="username"
                                                    type="text"
                                                    name="password"
                                                    onChange={(e) => this.setUsername(e)}
                                                />
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    <br/>
                                    <Row>
                                        <Col>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>Password</InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="password"
                                                    type="password"
                                                    name="password"
                                                    onChange={(e) => this.setPassword(e)}
                                                />
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    <br/>
                                    <Button
                                        color="primary"
                                        type="submit"
                                        disabled={!this.validateForm()}
                                    >
                                        Login
                                    </Button>
                                </Form>
                            </Container>
                        </CardBody>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Login;
