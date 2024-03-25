import React, { useState } from 'react';
import './Login.css';
import App from "./App";
import logo from "./Assets/Images/appLogo.png"
import { Button, Container, Grid, TextField, Typography } from '@mui/material';

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
    <Container maxWidth="xs" className={'login'}>
    {!LoginSucess ? (
      <div>
        <img className={'image'} src={logo} alt="logo" />
        <div className={'loginBox'}>
          <Typography variant="h4" className={'loginHeader'}>
            Login
          </Typography>
          <form onSubmit={Submit} className={'input'}>
            <TextField
              className={'username'}
              variant="outlined"
              label="Username"
              placeholder="Enter Username"
              name='user'
              onChange={usernameChange}
            />
            <TextField
              className={'password'}
              variant="outlined"
              label="Password"
              placeholder="Enter password"
              type="password"
              onChange={passwordChange}
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary" className={'enter'}>
              Login
            </Button>
          </form>
          {ErrorMsg && <Typography variant="body1" className={'LoginError'}>{ErrorMsg}</Typography>}
        </div>
      </div>
    ) : (
      <App /> 
    )}
  </Container>
);
}

export default Login;
/* 
 <div>
      {LoginSucess ? (
        <App/>
      ): (
        <div>
          <img className='image' src={logo} alt="logo"/>
        <div className='login'>
          <form onSubmit ={Submit}>
        <div className='loginBox'>
          <div className='loginHeader'> Login </div>
          <div className='input'>
            <input className='username' placeholder='Enter username' value={Username} onChange={usernameChange}/>
            <input className='password' placeholder='Enter Password' type='password' value={Password} onChange={passwordChange}/>
         </div>
          <div style = {{display:"flex", justifyContent: "center"}}>
            <button className='enter'> Login </button>
          </div>
          <div className ='LoginError'>{ErrorMsg}</div>
        </div>
      </form>
        </div>
        </div>
      )}
    </div>
  );
*/

