import React from 'react';
import {  withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import {CardBody, Button, Form, Input, FormGroup, Row, Col, Label} from 'reactstrap'

class Comment extends React.Component {
    
    state = {
        id: null, 
        post: null,
        movie_id: null,
        commentAdd: true,
        deleteComment: false
    }
    
    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e, addComment, updateComment, deleteComment) => {
        e.preventDefault()
        let {post, movie_id} = this.state
        if(post !== null && movie_id !== null){
            let date_info = {
                post: post,
                movie_id: parseInt(movie_id),
                user_id: parseInt(this.props.user.id)
            }
            // persist to database
            if(this.state.commentAdd){
                addComment(date_info)
            } 
            else if(!this.state.commentAdd && e.target.post === "update"){
                updateComment(this.state.id, date_info)
            }
            else {
                deleteComment(this.state.id, date_info)
            }
            // reset state
            this.setState({
                id: null,
                post: null,
                movie_id: null,
                commentAdd: true
            })
            e.target.parentElement.reset()
        }
        else{
            if(this.state.post === null){
                alert("You must type a post to.")
            }
            
        }
    }

    autoFillForm = (selectedValue, dates) => {
        if(selectedValue === "n/a"){
            this.setState({
                id: null,
                post: null,
                movie_id: null,
                commentAdd: true
            })
        }
        else{
            let find_date = dates.find(date_info => date_info.id == selectedValue)
            this.setState({
                id: find_date.id,
                post: find_date.post,
                commentAdd: false
            })
        }
    }

    generateDateDropdownOptions = (posts) => {
        return posts.map(post => {
            return <option id={post.id} key={post.id} value={post.id}>
                    {post.post}
                </option>
            }
        )
    }

    render() {
        let {addComment, updateComment, deleteComment, posts} = this.props

        return (
            <div>
                Add Comment
                <CardBody>
                    <Form onSubmit={(e) => this.handleSubmit(e, addComment)}>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="post" id="post" placeholder="Comment here" value={this.state.post} onChange={this.handleOnChange}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup onChange={(e) => this.autoFillForm(e.target.value, posts)}>
                            <Label for="edit-schedule">Change post</Label>
                            <Input type="select" post="select" id="edit-schedule">
                                <option value={"n/a"}>Select post</option>
                                {posts ? this.generateDateDropdownOptions(posts) : false}
                            </Input>
                        </FormGroup>
                        <Button className="button" post="update" onClick={(e) => this.handleSubmit(e, addComment, updateComment, deleteComment)}>Add or update Comment</Button>
                        {this.state.deleteComment ? 
                            <Button className="button"onClick={(e) => this.handleSubmit(e, addComment, updateComment, deleteComment)}>Delete Comment</Button> : false
                        }
                    </Form> 
                </CardBody>
            </div>
        )
    }
}

export default withRouter(Comment)