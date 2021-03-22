import React from 'react';
import {  withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import { Button } from 'reactstrap';
import Movie from '../components/Movie'

class MovieContainer extends React.Component {
   
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
            </div>
        )
    }
}

export default withRouter(MovieContainer)