import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Row, Col, Button } from 'reactstrap';
import serialize from 'form-serialize';
import {Link} from 'react-router-dom'

export default class AddMovie extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        const newMovie = serialize(event.target, { hash: true });
        this.props.onAddMovie(newMovie);
    }
    render() {
        return (
            <div>
                <Form className="my-5" onSubmit={this.handleSubmit}>
                    <Input className="text-center" disabled placeholder="Fill The Form To Add A Movie..." />
                    <Row form className="mt-2">
                        <Col md={9}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text" name="name" id="name" />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="rating">Rating</Label>
                                <Input type="text" name="rating" id="rating" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="imgUrl">Image Url</Label>
                        <Input type="text" name="imageURL" id="imgUrl" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="overviewTextarea">Overview</Label>
                        <Input type="textarea" name="overview" id="overviewTextarea" />
                    </FormGroup>
                    <Button color='success'>Add Movie</Button>
                </Form>
                <Link className="btn btn-danger" to={'/'}>Cancel</Link>
            </div>
        )
    }
}
