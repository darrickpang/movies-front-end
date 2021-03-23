import React from 'react';
import {  withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import { Button } from 'reactstrap';
import Movie from '../components/Movie'

class MovieContainer extends React.Component {

    renderTitles = () => {
        return(
            <div>
                {this.props.movies.map(movie => {
                    return(
                        <p>{movie.name}, {movie.year}, {movie.poster}</p>
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
        return(
            <div>
                movie container
                {this.renderMovie()}
                {this.renderTitles()}
            </div>
        )
    }
}

export default withRouter(MovieContainer)