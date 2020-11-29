import * as React from 'react'
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


class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hits: [],
            isLoading: false,
            error: null,
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        // process.env.REACT_APP_BICYCLE_API
        fetch('http://localhost:8000/bicycle')
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

    render() {
        const { hits, isLoading, error } = this.state;

        if (error) {
            return <p>{error.message}</p>;
        }
        if (isLoading) {
            return <p>Loading ...</p>;
        }
        return (
            <div>
                <Header/>
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
                                            <Button>Add to basket</Button>
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
