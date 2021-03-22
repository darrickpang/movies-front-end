import React from "react";
import { Button, Container } from "reactstrap";
import { useHistory } from 'react-router-dom'

const Welcome = () => {
  let history = useHistory()

    return (
      <div style={{backgroundImage: "url(" + require("../image/movies.jpg") + ")",}} className="page-header">
        <Container className='welcome-page'>
            <h1>Movie Time</h1>
            <h3>Find and discuss your movies.</h3>
            <br />
            <Button className="login-button" onClick={() => history.push('/user_signup')}> User Sign Up</Button>
            <Button className="login-button" onClick={() => history.push('/user_login')}>User Login</Button>
        </Container>
      </div>
  );
}

export default Welcome