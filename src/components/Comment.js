import React from 'react';
import {  withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import {CardBody, Button, Form, Input, FormGroup, Row, Col, Label} from 'reactstrap'

class Comment extends React.Component {
    
    state = {
        id: null, 
        name: null,
        year: null,
        poster: null,
        movieAdd: true,
        deleteMovie: false
    }
    
    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e, addMovie, updateMovie, deleteMovie) => {
        e.preventDefault()
        let {name, year, poster} = this.state
        if(name !== null && year !== null && poster !== null){
            let date_info = {
                name: name,
                year: year,
                poster: poster 
            }
            // persist to database
            if(this.state.movieAdd){
                addMovie(date_info)
            } 
            else if(!this.state.movieAdd && e.target.name === "update"){
                updateMovie(this.state.id, date_info)
            }
            else {
                deleteMovie(this.state.id, date_info)
            }
            // reset state
            this.setState({
                id: null,
                name: null,
                year: year,
                poster: poster,  
                movieAdd: true
            })
            e.target.parentElement.reset()
        }
        else{
            alert("You must include a name to create a new movie.")
        }
    }

    autoFillForm = (selectedValue, dates) => {
        if(selectedValue === "n/a"){
            this.setState({
                id: null,
                name: null,
                movieAdd: true
            })
        }
        else{
            let find_date = dates.find(date_info => date_info.id == selectedValue)
            this.setState({
                id: find_date.id,
                name: find_date.name,
                year: find_date.year,
                poster: find_date.poster,
                movieAdd: false
            })
        }
    }

    generateDateDropdownOptions = (movies) => {
        return movies.map(movie => {
            return <option id={movie.id} key={movie.id} value={movie.id}>
                    {movie.year}, {movie.name}, {movie.poster}
                </option>
            }
        )
    }

    render() {
        let {addMovie, updateMovie, deleteMovie, movies} = this.props

        return (
            <div>
                Add Comment
                <CardBody>
                    <Form onSubmit={(e) => this.handleSubmit(e, addMovie)}>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="name" id="name" placeholder="Comment name" value={this.state.name} onChange={this.handleOnChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <Input type="text" name="year" id="year" placeholder="Year" value={this.state.year} onChange={this.handleOnChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <Input type="text" name="poster" id="poster" placeholder="Poster link" value={this.state.poster} onChange={this.handleOnChange}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup onChange={(e) => this.autoFillForm(e.target.value, movies)}>
                            <Label for="edit-schedule">Change movie</Label>
                            <Input type="select" name="select" id="edit-schedule">
                                <option value={"n/a"}>Select movie</option>
                                {movies ? this.generateDateDropdownOptions(movies) : false}
                            </Input>
                        </FormGroup>
                        <Button className="button" name="update" onClick={(e) => this.handleSubmit(e, addMovie, updateMovie, deleteMovie)}>Add or update Comment</Button>
                        {this.state.deleteMovie ? 
                            <Button className="button"onClick={(e) => this.handleSubmit(e, addMovie, updateMovie, deleteMovie)}>Delete Schedule</Button> : false
                        }
                    </Form> 
                </CardBody>
            </div>
        )
    }
}

export default withRouter(Comment)