import React, { Component } from 'react'
import SearchBar from './SearchBar'
import MovieList from './MovieList'
import AddMovie from './AddMovie'
import EditMovie from './EditMovie'
import { Container } from 'reactstrap'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

export default class App extends Component {

    state = {
        movies: [],
        searchQuery: ""
    }

    // async componentDidMount() {
    //     const baseUrl = 'http://localhost:3000/movies'
    //     const response = await fetch(baseUrl)
    //     const data =await response.json()
    //     this.setState({movies: data})
    // }

    componentDidMount() {
        this.getMovies()
    }

    //AXIOS
    async getMovies() {
        const response = await axios.get('http://localhost:3002/movies')
        this.setState({ movies: response.data })
    }

    // deleteMovie = (movie) => {
    //     const newMovieList = this.state.movies.filter(
    //         m => m.id !== movie.id
    //     )

    //     this.setState(state => ({
    //         movies: newMovieList
    //     }))
    // }

    // //FETCH API
    // deleteMovie = async (movie) => {
    //     const baseUrl = `http://localhost:3000/movies/${movie.id}`

    //     await fetch(baseUrl, {
    //         method: 'DELETE'
    //     })

    //     const newMovieList = this.state.movies.filter(
    //         m => m.id !== movie.id
    //     )

    //     this.setState(state => ({
    //         movies: newMovieList
    //     }))
    // }

    //AXIOS - DELETE MOVIE
    deleteMovie = async (movie) => {
        axios.delete(`http://localhost:3002/movies/${movie.id}`)

        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id
        )

        this.setState(state => ({
            movies: newMovieList
        }))
    }

    //SEARCH MOVIE
    searchMovie = (event) => {
        this.setState({
            searchQuery: event.target.value
        })
    }

    //ADD MOVIE
    addMovie = async (movie) => {
        await axios.post(`http://localhost:3002/movies/`, movie)
        this.setState(state => ({
            movies: state.movies.concat([movie])
        }))
        this.getMovies()
    }

    //EDIT MOVIE
    editMovie = async (id,updatedMovie) => {
        await axios.put(`http://localhost:3002/movies/${id}`, updatedMovie)
        this.getMovies()
    }

    render() {

        let filteredMovies = this.state.movies.filter(
            (movie) => {
                return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
            }
        ).sort((a, b) => {
            return a.id < b.id ? 1 : a.id > b.id ? -1 : 0
        })

        return (
            <Router>
                <Container className="mt-5">
                    <Switch>
                        <Route path="/" exact render={() => (
                            <React.Fragment>
                                <SearchBar searchMovieProp={this.searchMovie} />
                                <MovieList
                                    movies={filteredMovies}
                                    deleteMovieProp={this.deleteMovie} />
                            </React.Fragment>
                        )} />
                        <Route path="/add" render={({ history }) => (
                            <AddMovie
                                onAddMovie={(movie) => {
                                    this.addMovie(movie)
                                    history.push('/')
                                }}
                            />
                        )}>
                        </Route>
                        <Route path="/edit/:id" render={(props) => (
                            <EditMovie
                                {...props}
                                onEditMovie={(id,movie) => {
                                    this.editMovie(id,movie)
                                }}
                            />
                        )}>
                        </Route>
                    </Switch>
                </Container>
            </Router>
        )
    }
}
