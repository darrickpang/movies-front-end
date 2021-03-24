import React from 'react';
import {  withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import { Button, Input, Form } from 'reactstrap';
import Comment from '../components/Comment'

class CommentContainer extends React.Component {

    renderComments = () => {
        let {addComment, updateComment, deleteComment, posts, user} = this.props
        return(
            <Comment addComment={addComment} updateComment={updateComment} deleteComment={deleteComment} posts={posts} user={user}/>
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