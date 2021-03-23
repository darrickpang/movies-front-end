import React from 'react';
import './App.css';
import Welcome from './containers/Welcome';
import UserLoginSignUp from './components/UserLoginSignUp';
import UserMainContent from './containers/UserMainContent';
import { Switch, Route, withRouter} from 'react-router-dom';

class App extends React.Component {
  state = {
    user: {
      id: null,
      name: "",
    },
    movies: [], 
    comments: [],
    token: ""
  }

  componentDidMount(){
    if(localStorage.token){  
      fetch('http://localhost:3000/user_persist',{
      headers: {
        "Authorization": `Bearer ${localStorage.token}`
      }
      })
      .then(res => res.json())
      .then(json => this.userAuthResponse(json))
    }
    fetch('http://localhost:3000/comments')
    .then(res => res.json())
    .then(json => this.setState({comments: json}))

    fetch('http://localhost:3000/movies')
    .then(res => res.json())
    .then(json => this.setState({movies: json}))
  }

  userAuthResponse = (json) => {
    if (json.user){
      localStorage.token = json.token
      this.setState({
        user: {
          id: json.user.data.attributes.id,
          name: json.user.data.attributes.name,
        },
        comments: json.user.data.attributes.chemical_users, 
        token: json.token
      }, () => this.props.history.push('/user_main'))
    }
  }

  userLogin = ({name, password}) => {
    let user = {
      name: name,
      password: password
    }

    fetch('http://localhost:3000/user_login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(json => {
      if (!json.error){
        this.userAuthResponse(json)
      } else {
        alert(json.error)
      }
    })
  }

  userSignUp = ({name, password}) => {
    let newUser = {
      name: name,
      password: password,
    }
    
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(json => {
      if (!json.error) {
        this.userAuthResponse(json)
      } else {
        alert(json.error)
      }
    })
  }

  // Movies
  addMovie = (newMovie) => {
    fetch(`http://localhost:3000/movies`, {
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
      },
      body: JSON.stringify(newMovie),
  }) 
  .then(r => r.json())
  .then(json => {
      this.setState({
        movies: [...this.state.movies, {
          id: json.id,
          name: json.name,
          year: json.year,
          poster: json.poster
        }]
      })
    })
  }

  updateMovie = (id, date_info) => {
    fetch(`http://localhost:3000/movies/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(date_info)
    })
    .then(res => res.json())
    .then(json => {
      console.log('updated')
      let movies = this.state.movies.map(date_info => {
        if(date_info.id === json.id){
            let newMovie = {
                  id: json.id,
                  name: json.name,
                  year: json.year,
                  poster: json.poster
            }
            return newMovie
            }
            else{
              return date_info
            }
        })
        this.setState({
            movies: movies
    })})
  }

  deleteMovie = (id, movie) => {
    fetch(`http://localhost:3000/movies/${id}`, {
      method: 'DELETE'
    }) 
    .then(r => r.json())
    .then(json => {
      console.log('deleted')
      let movies = this.state.movies.filter(movie => movie.id !== id)
      this.setState({
        movies: movies
      })
    })
  }

  // Comments
  addComment = (newComment) => {
    fetch(`http://localhost:3000/chemical_users`, {
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
      },
      body: JSON.stringify(newComment),
    }) 
    .then(r => r.json())
    .then(json => {
      this.setState({
        comments: [...this.state.comments, {
          id: json.id,
          comment: json.comment
        }]
      })
    })
  }

  updateComment = (id, comment) => {
    fetch(`http://localhost:3000/chemcial_users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(comment)
    })
    .then(res => res.json())
    .then(json => {
      let comments = this.state.comments.map(comment => {
        if(comment.id === json.id){
            let newComment = {
                  id: json.id,
                  comment: json.comment,
            }
            return newComment
            }
            else{
              return comment
            }
        })
        this.setState({
            comments: comments
    })})
  }

  renderUserLogin = () => {
    return <UserLoginSignUp login={true} userLogin={this.userLogin}/>
  }

  renderUserSignUp = () => {
    return <UserLoginSignUp login={false} userSignUp={this.userSignUp}/>
  }

  renderUserMainContent = () => {
    return <UserMainContent user ={this.state.user} token={this.state.token} addMovie={this.addMovie} updateMovie={this.updateMovie} deleteMovie={this.deleteMovie}
            movies={this.state.movies} addComment={this.addComment} updateComment={this.updateComment}
          />
  }

  render(){
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact component={Welcome}/>
          <Route path="/user_login" render={this.renderUserLogin}/>
          <Route path="/user_signup" render={this.renderUserSignUp}/>
          <Route path="/user_main" render={this.renderUserMainContent}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);