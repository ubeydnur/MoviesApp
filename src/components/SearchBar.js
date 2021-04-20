import React, { Component } from 'react'
import { FormGroup, Input } from 'reactstrap'
import {Link} from 'react-router-dom'

export default class Search extends Component {
    render() {
        return (
            <FormGroup className="d-flex justify-content-between">
                <Input
                    onChange={this.props.searchMovieProp}
                    type="search"
                    name="search"
                    id="exampleSearch"
                    placeholder="Search a movie"
                    className="w-50"
                />
                <Link className="btn btn-outline-success" to="/add">Add movie</Link>
            </FormGroup>
        )
    }
}
