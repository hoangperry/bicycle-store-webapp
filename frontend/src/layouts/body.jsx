import * as React from 'react'
import Header from '../layouts/header.jsx';
import Login from '../layouts/login.jsx';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
    Row,
    Col, Container
} from 'reactstrap';


class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hits: [],
            isLoading: false,
            error: null,
            login: true,
            userId: 1,
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        // process.env.REACT_APP_BICYCLE_API
        fetch('http://localhost:8000/bicycles')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => this.setState({ hits: data, isLoading: false }))
            .catch(error => this.setState({ error, isLoading: false }));
    }

    addItemToBasket(userId, bicycleId) {
        fetch('http://localhost:8000/user/add_basket?user_id=' + userId + '&bicycle_id=' + bicycleId);
        this.componentDidMount();
    }

    render() {
        const { hits, isLoading, error, login, userId } = this.state;
        if (error) {
            return <p>{error.message}</p>;
        }
        if (!login) {
            return <Login />;
        }
        if (isLoading) {
            return <Container>Loading</Container>;
        }
        return (
            <div>
                <Header />
                <div className="page-wrapper d-block">
                    <div className="page-content container-fluid">
                        <h5 className="mb-4">Basic Cards</h5>
                        <Row>
                        { hits.map(bicycle => {
                            bicycle.b64image = "data:image/jpeg;base64," + bicycle.b64image;
                            return (
                                <Col xs="4" md="3">
                                    <Card height="150px">
                                        <CardImg top
                                                 style={{"min-height": "14em", "max-height": "14em"}}
                                                 width="100%" src={bicycle.b64image} />
                                        <CardBody>
                                            <CardTitle>{bicycle.name}</CardTitle>
                                            <CardSubtitle>{bicycle.price} $</CardSubtitle>
                                            <CardText>{bicycle.description}</CardText>
                                            <Button onClick={
                                                () => {
                                                        this.addItemToBasket(userId, bicycle.id);
                                                    }
                                                }>
                                                Add to basket
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                            );
                        })}
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
};

export default Body;
