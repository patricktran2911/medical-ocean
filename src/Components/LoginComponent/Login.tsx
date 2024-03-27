import React, { useState } from 'react';
import './Login.css';
import App from "../../App";
import logo from "../../Assets/Images/appLogo.png"
import { Button, Container, TextField, Typography } from '@mui/material';

function Login() {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [ErrorMsg, setErrorMsg] = useState<string>(''); // error msg handler for later
  const [LoginSucess, setLogin] = useState(false);

  const usernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const Submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (Username === 'user' && Password === 'password') {
      setLogin(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Incorrect username or password. Try again.'); // later use to send an error msg for worng username or password
    }
  };

  return (
    <div>
      {LoginSucess ? (
        <App/>
        ): (
    <Container maxWidth="xs" className={'login'}>
      <div>
        <img className={'image'} src={logo} alt="logo" />
        <div className={'loginBox'}>
          <Typography variant="h4" className={'loginHeader'}>
            Login
          </Typography>
          <form onSubmit={Submit} className={'input'}>
            <TextField
              className={'username'}
              label="Username"
              placeholder="Enter Username"
              name='user'
              onChange={usernameChange}
            />
            <TextField
              className={'password'}
              label="Password"
              placeholder="Enter password"
              type="password"
              onChange={passwordChange}
            />
            <Button type="submit" variant="contained" color="primary" className={'enter'}>
              SIGN IN
            </Button>
          </form>
          {ErrorMsg && <Typography variant="body1" className={'LoginError'}>{ErrorMsg}</Typography>}
        </div>
      </div>
    </Container>
    )}
  </div>
  );
}

export default Login;