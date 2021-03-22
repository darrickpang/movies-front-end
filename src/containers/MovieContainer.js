import React from 'react';
import {  withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import { Button } from 'reactstrap';


class MovieContainer extends React.Component {
   

    render(){
        return(
            <div>
                movie container
            </div>
        )
    }
}

export default withRouter(MovieContainer)