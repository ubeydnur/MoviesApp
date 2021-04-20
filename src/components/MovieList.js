import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Badge, Button, Row, Col
} from 'reactstrap';
import {Link} from 'react-router-dom'

const MovieList=(props)=> {

    const truncateOverview=(string,maxLength)=> {
        if(!string) return null;
        if(string.length <= maxLength) return string;
        return `${string.substring(0,maxLength)}...`
    }
    return (
            <Row >
                {props.movies.map((movie) => (
                    <Col xs="6" sm="4" className="mt-5" key={movie.id}>
                        <Card>
                            <CardImg top width="100%" src={movie.imageURL} alt="Card image cap" />
                            <CardBody>
                                <CardTitle tag="h5">{movie.name}</CardTitle>
                                <CardText>{truncateOverview(movie.overview, 100)}</CardText>
                                <div className="d-flex justify-content-between align-items-center">
                                    <Button outline color="danger" onClick={(event)=>props.deleteMovieProp(movie)}>Delete</Button>
                                    <Link type="button" className="btn btn-outline-warning" to={`edit/${movie.id}`}>Edit</Link>
                                    <h3><Badge color="info">{movie.rating}</Badge></h3>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
    )
}

export default MovieList