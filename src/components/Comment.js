import React from 'react';
import {  withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import {CardBody, Button, Form, Input, FormGroup, Row, Col, Label} from 'reactstrap'

class Comment extends React.Component {
    
    state = {
        id: null, 
        comment: null,
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
        let {comment, movie_id} = this.state
        if(comment !== null && movie_id !== null){
            let date_info = {
                comment: comment,
                movie_id: parseInt(movie_id),
                user_id: parseInt(this.props.user.id)
            }
            // persist to database
            if(this.state.commentAdd){
                addComment(date_info)
            } 
            else if(!this.state.commentAdd && e.target.comment === "update"){
                updateComment(this.state.id, date_info)
            }
            else {
                deleteComment(this.state.id, date_info)
            }
            // reset state
            this.setState({
                id: null,
                comment: null,
                movie_id: movie_id,
                commentAdd: true
            })
            e.target.parentElement.reset()
        }
        else{
            alert("You must include a comment to comment.")
        }
    }

    autoFillForm = (selectedValue, dates) => {
        if(selectedValue === "n/a"){
            this.setState({
                id: null,
                comment: null,
                commentAdd: true
            })
        }
        else{
            let find_date = dates.find(date_info => date_info.id == selectedValue)
            this.setState({
                id: find_date.id,
                comment: find_date.comment,
                commentAdd: false
            })
        }
    }

    generateDateDropdownOptions = (movies) => {
        return movies.map(movie => {
            return <option id={movie.id} key={movie.id} value={movie.id}>
                    {movie.comment}
                </option>
            }
        )
    }

    render() {
        let {addComment, updateComment, deleteComment, movies} = this.props

        return (
            <div>
                Add Comment
                <CardBody>
                    <Form onSubmit={(e) => this.handleSubmit(e, addComment)}>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" comment="comment" id="comment" placeholder="Comment comment" value={this.state.comment} onChange={this.handleOnChange}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup onChange={(e) => this.autoFillForm(e.target.value, movies)}>
                            <Label for="edit-schedule">Change comment</Label>
                            <Input type="select" comment="select" id="edit-schedule">
                                <option value={"n/a"}>Select comment</option>
                                {movies ? this.generateDateDropdownOptions(movies) : false}
                            </Input>
                        </FormGroup>
                        <Button className="button" comment="update" onClick={(e) => this.handleSubmit(e, addComment, updateComment, deleteComment)}>Add or update Comment</Button>
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