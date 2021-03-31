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

    handleSubmit = (e, addCollection, updateCollection, deleteCollection) => {
        e.preventDefault()
        let {movie_name} = this.state
        if(movie_name !== null){
            let date_info = {
                movie_name: movie_name,
                user_id: parseInt(this.props.user.id)
            }
            // persist to database
            if(this.state.collectionAdd){
                addCollection(date_info)
            } 
            else if(!this.state.collectionAdd && e.target.name === "update"){
                updateCollection(this.state.id, date_info)
            }
            else {
                deleteCollection(this.state.id, date_info)
            }
            // reset state
            this.setState({
                id: null,
                movie_name: null,
                collectionAdd: true
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
                collectionAdd: true,
                deleteCollection: false
            })
        }
        else{
            let find_date = dates.find(date_info => date_info.id == selectedValue)
            this.setState({
                id: find_date.id,
                movie_name: find_date.movie_name,
                collectionAdd: false,
                deleteCollection: true
            })
        }
    }

    generateDateDropdownOptions = (collections) => {
        return collections.map(collection => {
            if(collection.user_id === this.props.user.id){
                return <option id={collection.id} key={collection.id} value={collection.id}>
                    {collection.movie_name}
                </option>
            }
        })
    }

    render() {
        let {addCollection, updateCollection, deleteCollection, collections} = this.props

        return (
            <div>
                Add Movie to Collection
                <CardBody>
                    <Form onSubmit={(e) => this.handleSubmit(e, addCollection)}>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="movie_name" id="movie_name" placeholder="Add movie to your collection" value={this.state.movie_name} onChange={this.handleOnChange}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup onChange={(e) => this.autoFillForm(e.target.value, collections)}>
                            <Label for="edit-schedule">Change collection</Label>
                            <Input type="select" name="select" id="edit-movie_name">
                                <option value={"n/a"}>Select movie name</option>
                                {collections ? this.generateDateDropdownOptions(collections) : false}
                            </Input>
                        </FormGroup>
                        <Button className="button" name="update" onClick={(e) => this.handleSubmit(e, addCollection, updateCollection)}>Add or update your collection</Button>
                        {this.state.deleteCollection ? 
                            <Button className="button"onClick={(e) => this.handleSubmit(e, addCollection, updateCollection, deleteCollection)}>Delete from collection</Button> : false
                        }
                    </Form> 
                </CardBody>
            </div>
        )
    }
}

export default withRouter(AddMovie)