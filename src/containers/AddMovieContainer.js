import React from 'react';
import {  withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import { Button, Input, Form } from 'reactstrap';
import Comment from '../components/Comment'

class AddMovieContainer extends React.Component {

  

    render(){
        return(
            <div>
                add movie to collection
            </div>
        )
    }
}

export default withRouter(AddMovieContainer)