import React from 'react';
import {  withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import { Button, Input, Form } from 'reactstrap';
import AddMovie from '../components/AddMovie'

class AddMovieContainer extends React.Component {

    renderCollection = () => {
        let {addCollection, updateCollection, deleteCollection, user, collections} = this.props 
        return(
            <AddMovie addCollection={addCollection} updateCollection={updateCollection} deleteCollection={deleteCollection} user={user} collections={collections}/>
        )
    }

    render(){
        return(
            <div>
                {this.renderCollection()}
            </div>
        )
    }
}

export default withRouter(AddMovieContainer)