import React from 'react';
import {  withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import { Button, Input, Form } from 'reactstrap';
import Comment from '../components/Comment'

class CommentContainer extends React.Component {

    renderComments = () => {
        let {addComment, updateComment, deleteComment, comments} = this.props
        return(
            <Comment addComment={addComment} updateComment={updateComment} deleteComment={deleteComment} comments={comments}/>
        )
    }

    render(){
        return(
            <div>
                comment container
                {this.renderComments()}
            </div>
        )
    }
}

export default withRouter(CommentContainer)