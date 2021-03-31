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
    posts: [],
    collections: [],
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
    .then(json => this.setState({posts: json}))

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
    fetch(`http://localhost:3000/comments`, {
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
          posts: [...this.state.posts, {
          id: json.id,
          user_name: json.user_name,
          post: json.post,
          movie_id: json.movie_id
        }]
      })
    })
  }

  updateComment = (id, post) => {
    fetch(`http://localhost:3000/comments/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(post)
    })
    .then(res => res.json())
    .then(json => {
      let posts = this.state.posts.map(post => {
        if(post.id === json.id){
            let newComment = {
                  id: json.id,
                  user_name: json.user_name, 
                  post: json.post,
                  movie_id: json.movie_id
            }
            return newComment
            }
            else{
              return post
            }
        })
        this.setState({
            posts: posts
    })})
  }

  deleteComment = (id, post) => {
    fetch(`http://localhost:3000/comments/${id}`, {
      method: 'DELETE'
    }) 
    .then(r => r.json())
    .then(json => {
      console.log('deleted')
      let posts= this.state.posts.filter(post => post.id !== id)
      this.setState({
        posts: posts
      })
    })
  }

  // Add movies
  addCollection = (newCollection) => {
    fetch(`http://localhost:3000/movie_users`, {
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
      },
      body: JSON.stringify(newCollection),
    }) 
    .then(r => r.json())
    .then(json => {
      this.setState({
          collections: [...this.state.collections, {
          id: json.id,
          movie_name: json.movie_name,
          user_id: json.user_id
        }]
      })
    })
  }

  updateCollection = (id, collection) => {
    fetch(`http://localhost:3000/movie_users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(collection)
    })
    .then(res => res.json())
    .then(json => {
      let  collections = this.state.collections.map(collection => {
        if(collection.id === json.id){
            let newCollection = {
                  id: json.id,
                  movie_name: json.movie_name, 
                  user_id: json.user_id
            }
            return newCollection
            }
            else{
              return collection
            }
        })
        this.setState({
            collections: collections
    })})
  }

  deleteCollection = (id, post) => {
    fetch(`http://localhost:3000/movie_users/${id}`, {
      method: 'DELETE'
    }) 
    .then(r => r.json())
    .then(json => {
      console.log('deleted')
      let collections = this.state.collections.filter(collection => collection.id !== id)
      this.setState({
        collections: collections
      })
    })
  }

  renderUserLogin = () => {
    return <UserLoginSignUp login={true} userLogin={this.userLogin}/>
  }

  renderUserSignUp = () => {
    return <UserLoginSignUp login={false} userSignUp={this.userSignUp}/>
  }

  renderUserMainContent = () => {
    return <UserMainContent user ={this.state.user} token={this.state.token} addMovie={this.addMovie} updateMovie={this.updateMovie} deleteMovie={this.deleteMovie}
            movies={this.state.movies} addComment={this.addComment} updateComment={this.updateComment} posts={this.state.posts} deleteComment={this.deleteComment}
            addCollection={this.addCollection} updateCollection={this.updateCollection} deleteCollection={this.deleteCollection}
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