import React from 'react';
import {  withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import {CardBody, Button, Form, Input, FormGroup, Row, Col, Label} from 'reactstrap'

class Movie extends React.Component {
    
    state = {
        id: null, 
        name: null,
        movieAdd: true,
        deleteExercise: false
    }
    
    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e, addExercise, updateExercise, deleteExercise) => {
        e.preventDefault()
        let {name} = this.state
        if(name !== null ){
            let date_info = {
                name: name
            }
            // persist to database
            if(this.state.movieAdd){
                addExercise(date_info)
            } 
            else if(!this.state.movieAdd && e.target.name === "update"){
                updateExercise(this.state.id, date_info)
            }
            else {
                deleteExercise(this.state.id, date_info)
            }
            // reset state
            this.setState({
                id: null,
                name: null,
                movieAdd: true
            })
            e.target.parentElement.reset()
        }
        else{
            alert("You must include a name to create a new exercise.")
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
                movieAdd: false
            })
        }
    }

    generateDateDropdownOptions = (exercises) => {
        return exercises.map(exercise => {
            return <option id={exercise.id} key={exercise.id} value={exercise.id}>
                    {exercise.date}, {exercise.name}
                </option>
            }
        )
    }

    render() {
        let {addExercise, updateExercise, deleteExercise, exercises} = this.props

        return (
            <div>
                Add Movie
                <CardBody>
                    <Form onSubmit={(e) => this.handleSubmit(e, addExercise)}>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="name" id="name" placeholder="Movie name" value={this.state.name} onChange={this.handleOnChange}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup onChange={(e) => this.autoFillForm(e.target.value, exercises)}>
                            <Label for="edit-schedule">Change exercise</Label>
                            <Input type="select" name="select" id="edit-schedule">
                                <option value={"n/a"}>Select exercise</option>
                                {exercises ? this.generateDateDropdownOptions(exercises) : false}
                            </Input>
                        </FormGroup>
                        <Button className="button" name="update" onClick={(e) => this.handleSubmit(e, addExercise, updateExercise, deleteExercise)}>Add or update Movie</Button>
                        {this.state.deleteExercise ? 
                            <Button className="button"onClick={(e) => this.handleSubmit(e, addExercise, updateExercise, deleteExercise)}>Delete Schedule</Button> : false
                        }
                    </Form> 
                </CardBody>
            </div>
        )
    }
}

export default withRouter(Movie)