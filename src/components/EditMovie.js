import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class EditMovie extends Component {

    state = {
        name: "",
        rating: "",
        imageURL: "",
        overview: ""
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        const response = (await axios.get(`http://localhost:3002/movies/${id}`)).data

        this.setState({
            name: response.name,
            rating: response.rating,
            imageURL: response.imageURL,
            overview: response.overview
        })
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        // const name=this.state.name
        // const rating=this.state.rating
        // const imageURL=this.state.imageURL
        // const overview=this.state.overview

        //Kısa yöntem
        const {name, rating, imageURL, overview}=this.state;

        const id=this.props.match.params.id;

        // //ES5 gösterimi
        // const updatedMovie={
        //     name:name,
        //     rating:rating,
        //     imageURL:imageURL,
        //     overview:overview
        // }
        //ES6 gösterimi
        const updatedMovie={
            name,
            rating,
            imageURL,
            overview
        }

        this.props.onEditMovie(id,updatedMovie);

        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                <Form className="my-5" onSubmit={this.handleSubmit}>
                    <Input className="text-center" disabled placeholder="Edit The Form To Update A Movie..." />
                    <Row form className="mt-2">
                        <Col md={9}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={this.state.name}
                                    onChange={this.onInputChange} />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="rating">Rating</Label>
                                <Input
                                    type="text"
                                    name="rating"
                                    id="rating"
                                    value={this.state.rating}
                                    onChange={this.onInputChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="imgUrl">Image Url</Label>
                        <Input
                            type="text"
                            name="imageURL"
                            id="imgUrl"
                            value={this.state.imageURL}
                            onChange={this.onInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="overviewTextarea">Overview</Label>
                        <Input
                            type="textarea"
                            name="overview"
                            id="overviewTextarea"
                            value={this.state.overview}
                            onChange={this.onInputChange} />
                    </FormGroup>
                    <Button color='warning'>Edit Movie</Button>
                </Form>
                <Link className="btn btn-danger" to={'/'}>Cancel</Link>
            </div>
        )
    }
}
