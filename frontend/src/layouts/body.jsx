import React from 'react';
import Header from '../layouts/header.jsx';

import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
    Row,
    Col
} from 'reactstrap';


import img1 from '../assets/images/big/img1.jpg';
import img2 from '../assets/images/big/img2.jpg';
import img3 from '../assets/images/big/img3.jpg';

const Body = () => {
    return (
        
        <div>
            <Header />
            <div className="page-wrapper d-block">
                <div className="page-content container-fluid">
                    <h5 className="mb-4">Basic Cards</h5>
                    <Row>
                        <Col xs="4" md="3">
                            <Card>
                                <CardImg top width="100%" src={img1} />
                                <CardBody>
                                    <CardTitle>Card title</CardTitle>
                                    <CardSubtitle>Card subtitle</CardSubtitle>
                                    <CardText>
                                        Some quick example text to build on the card 
                                        title and make up the bulk of the cards content.
                                    </CardText>
                                    <Button>Button</Button>
                                </CardBody>
                            </Card>
                        </Col>


                        <Col xs="4" md="3">
                            <Card>
                                <CardImg top width="100%" src={img2} />
                                <CardBody>
                                    <CardTitle>Card title</CardTitle>
                                    <CardSubtitle>Card subtitle</CardSubtitle>
                                    <CardText>
                                        Some quick example text to build on the card 
                                        title and make up the bulk of the cards content.
                                    </CardText>
                                    <Button>Button</Button>
                                </CardBody>
                            </Card>
                        </Col>


                        <Col xs="4" md="3">
                            <Card>
                                <CardImg top width="100%" src={img3} />
                                <CardBody>
                                    <CardTitle>Card title</CardTitle>
                                    <CardSubtitle>Card subtitle</CardSubtitle>
                                    <CardText>
                                        Some quick example text to build on the card 
                                        title and make up the bulk of the cards content.
                                    </CardText>
                                    <Button>Button</Button>
                                </CardBody>
                            </Card>
                        </Col>


                        <Col xs="4" md="3">
                            <Card>
                                <CardImg top width="100%" src={img3} />
                                <CardBody>
                                    <CardTitle>Card title</CardTitle>
                                    <CardSubtitle>Card subtitle</CardSubtitle>
                                    <CardText>
                                        Some quick example text to build on the card 
                                        title and make up the bulk of the cards content.
                                    </CardText>
                                    <Button>Button</Button>
                                </CardBody>
                            </Card>
                        </Col>

                    </Row>
                </div>
            </div>
        </div>
    );
}

export default Body;


