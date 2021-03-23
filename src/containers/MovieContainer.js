import React from 'react';
import {  withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import { Button, Input } from 'reactstrap';
import Movie from '../components/Movie'

class MovieContainer extends React.Component {

    state = {
        movie_titles: [],
        search: null
    }

    componentDidMount(){
        fetch(`http://www.omdbapi.com/?s=${this.state.search}&apikey=${process.env.REACT_APP_movie_api}`)
        .then(res => res.json())
        .then(json => this.setState({movie_titles: json}))
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    searchMovies = () => {
        return(
            <div>
                <Input type="text" search="search" id="name" placeholder="Movie name" value={this.state.search} onChange={this.handleOnChange}></Input>
                <Button className="button">Search</Button>
            </div> 
        )
        }

    renderTitles = () => {
        return(
            <div>
                {this.props.movies.map(movie => {
                    return(
                        <p> Name: {movie.name}, Year: {movie.year}</p>
                    )
                })}
            </div>
        )
    }
   
    renderMovie = () =>{
        let {addMovie, updateMovie, deleteMovie, movies} = this.props
        return(
            <Movie addMovie={addMovie} updateMovie={updateMovie} deleteMovie={deleteMovie} movies={movies}/>
        )
    }
    render(){
        console.log(this.state.movie_titles)
        return(
            <div>
                movie container
                {this.renderMovie()}
                {this.renderTitles()}
                {this.searchMovies()}
            </div>
        )
    }
}

export default withRouter(MovieContainer)