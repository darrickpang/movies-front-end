import React from 'react';
import {  withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import { Button } from 'reactstrap';
import MovieContainer from './MovieContainer'
import CommentContainer from './CommentContainer'
import AddMovieContainer from './AddMovieContainer'

class UserMainContent extends React.Component {
    renderUserInfo = () => {
        return (
            <div className="student-info">
                <h3>User name: {this.props.user.name}</h3>
            </div>
        )
    }

    renderLogout = () => {
        return (
            <Button className="button" onClick={() => {
                localStorage.clear()
                this.props.history.push('/')
                }}>Log Out
            </Button>
        )
    }

    renderMovieContainer = () => {
        let {addMovie, updateMovie, deleteMovie, movies} = this.props
        return(
            <MovieContainer addMovie={addMovie} updateMovie={updateMovie} deleteMovie={deleteMovie} movies={movies}/>
        )
    }

    renderCommentContainer = () => {
        let {addComment, updateComment, deleteComment, posts, user, movies} = this.props
        return(
            <CommentContainer addComment={addComment} updateComment={updateComment} deleteComment={deleteComment} posts={posts} user={user} movies={movies}/>
        )
    }

    renderCollection = () => {
        let {addCollection, updateCollection, deleteCollection, user, collections} = this.props 
        return(
            <AddMovieContainer addCollection={addCollection} updateCollection={updateCollection} deleteCollection={deleteCollection} user={user} collections={collections}/>
        )
    }

    render(){
        return(
            <div className="main-page">
                Welcome to your main page. 
                {this.renderUserInfo()}
                {this.renderLogout()}  
                {this.renderMovieContainer()}      
                {this.renderCommentContainer()}     
                {this.renderCollection()}  
            </div> 
        )
    }
}

export default withRouter(UserMainContent)