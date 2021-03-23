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
                        <p> Name: {movie.name}, Year: {movie.year}, <img src={movie.poster}></img></p>
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