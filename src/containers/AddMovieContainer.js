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

    showCollection = () => {
        let {collections, user} = this.props
        return collections.map(collection => {
            if(collection.user_id === user.id){
                return(
                    <div>
                        {collection.movie_name}
                    </div>
                )
            }
        })
    }

    render(){
        console.log(this.props.collections)
        return(
            <div>
                {this.renderCollection()}
                {this.showCollection()}
            </div>
        )
    }
}

export default withRouter(AddMovieContainer)