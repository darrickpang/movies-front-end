import React from 'react';
import {  withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import { Button, Input, Form } from 'reactstrap';
import Comment from '../components/Comment'

class CommentContainer extends React.Component {

    renderComments = () => {
        return(
            <Comment />
        )
    }

    render(){
        return(
            <div>
                comment container
            </div>
        )
    }
}

export default withRouter(CommentContainer)