import React from 'react';
import {  withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import { Button } from 'reactstrap';
import Movie from '../components/Movie'

class MovieContainer extends React.Component {
   
    renderMovie = () =>{
        let {addMovie, updateMovie, deleteMovie} = this.props
        return(
            <Movie />
        )
    }
    render(){
        return(
            <div>
                movie container
            </div>
        )
    }
}

export default withRouter(MovieContainer)