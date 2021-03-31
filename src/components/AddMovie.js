import React from 'react';
import {  withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import {CardBody, Button, Form, Input, FormGroup, Row, Col, Label} from 'reactstrap'

class AddMovie extends React.Component {
    
    state = {
        id: null, 
        movie_name: null,
        collectionAdd: true,
        deleteCollection: false
    }
    
    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e, addComment, updateComment, deleteComment) => {
        e.preventDefault()
        let {movie_name} = this.state
        if(movie_name !== null && movie_id !== null){
            let date_info = {
                movie_name: movie_name,
                user_id: parseInt(this.props.user.id)
            }
            // persist to database
            if(this.state.commentAdd){
                addComment(date_info)
            } 
            else if(!this.state.commentAdd && e.target.name === "update"){
                updateComment(this.state.id, date_info)
            }
            else {
                deleteComment(this.state.id, date_info)
            }
            // reset state
            this.setState({
                id: null,
                movie_name: null,
                movie_id: null,
                commentAdd: true
            })
            e.target.parentElement.reset()
        }
        else{
            if(this.state.movie_id === null){
                alert("You must include a movie to movie_name.")
            }
        }
    }

    autoFillForm = (selectedValue, dates) => {
        if(selectedValue === "n/a"){
            this.setState({
                id: null,
                movie_name: null,
                movie_id: null,
                commentAdd: true,
                deleteComment: false
            })
        }
        else{
            let find_date = dates.find(date_info => date_info.id == selectedValue)
            this.setState({
                id: find_date.id,
                movie_name: find_date.movie_name,
                commentAdd: false,
                deleteComment: true
            })
        }
    }

    handleMovieDropdownChange = (e) => {
        if(e.target.value !== "n/a"){
            this.setState({movie_id: parseInt(e.target.value)})
        }
    }

    generateDateDropdownOptions = (posts) => {
        return posts.map(movie_name => {
            if(movie_name.user_id === this.props.user.id){
                return <option id={movie_name.id} key={movie_name.id} value={movie_name.id}>
                    {movie_name.movie_name}
                </option>
            }
            }
            
        )
    }

    generateMovieDropdownOptions = (movies) => {
        return movies.map(movie => {
            if(movie.id === this.state.movie_id){
                return <option id={movie.id} key={movie.id} value={movie.id} selected>{movie.name}, {movie.year}</option>
            }
            else{
                return <option id={movie.id} key={movie.id} value={movie.id}>{movie.name}, {movie.year}</option>
            }
        })
    }

    render() {
        let {addComment, updateComment, deleteComment, posts, movies} = this.props

        return (
            <div>
                Add AddMovie
                <CardBody>
                    <Form onSubmit={(e) => this.handleSubmit(e, addComment)}>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="movie_name" id="movie_name" placeholder="AddMovie here" value={this.state.movie_name} onChange={this.handleOnChange}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup onChange={(e) => this.autoFillForm(e.target.value, posts)}>
                            <Label for="edit-schedule">Change movie_name</Label>
                            <Input type="select" name="select" id="edit-movie_name">
                                <option value={"n/a"}>Select movie_name</option>
                                {posts ? this.generateDateDropdownOptions(posts) : false}
                            </Input>
                        </FormGroup>
                        <FormGroup onChange={this.handleMovieDropdownChange}>
                            <Input type="select" name="select" id="edit-movie">
                                <option value={"n/a"}>Select movie</option>
                                {movies ? this.generateMovieDropdownOptions(movies) : false}
                            </Input>
                        </FormGroup>
                        <Button className="button" name="update" onClick={(e) => this.handleSubmit(e, addComment, updateComment)}>Add or update AddMovie</Button>
                        {this.state.deleteComment ? 
                            <Button className="button"onClick={(e) => this.handleSubmit(e, addComment, updateComment, deleteComment)}>Delete AddMovie</Button> : false
                        }
                    </Form> 
                </CardBody>
            </div>
        )
    }
}

export default withRouter(AddMovie)