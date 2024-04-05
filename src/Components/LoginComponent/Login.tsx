import React, { useState, createContext, useEffect } from 'react';
import './Login.css';
import App from "../../App";
import logo from "../../Assets/Images/Icon152.webp"
import { Button, Container, TextField, Typography } from '@mui/material';
import { supabase } from '../../api/supabaseInterface';
import { Staff, getStaffWithId, getAllStaff } from '../../api/StaffAPI';
import { error } from 'console';
import { getAllPatients } from '../../api/PatientAPI';

const CurrentStaffUser = createContext<Staff | undefined>(undefined)

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string>(''); // error msg handler for later
  const [currentUser, setCurrentUser] = useState<Staff>();
  const [isError, setError] = useState(false);


  const usernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const Submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const authUser = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    if (authUser.error) {
      console.log("error", authUser.error.message)
      setError(true)
      setErrorMsg('Incorrect username or password. Try again.')
    } else if (authUser.data) {
      const currentStaff = await getStaffWithId(authUser.data.user.id)
      setCurrentUser(currentStaff)
    }
  };

  function handleOnChange(): void {
    setError(false);
  }

  return (
    <CurrentStaffUser.Provider value={currentUser}>
      {currentUser 
      ? ( <App/> )
      : (
      <Container maxWidth="xs" className={'login'}>
        <div>
          <img className={'image'} src={logo} alt="logo" />
          <div className={'loginBox'}>
            <Typography variant="h4" className={'loginHeader'}>
              Login
            </Typography>
            <form 
              onSubmit={Submit} 
              className={'input'}>
              <TextField
                onChangeCapture={handleOnChange}
                className={'username'}
                label="Username"
                placeholder="Enter Username"
                name='user'
                onChange={usernameChange}
                error={isError}
              />
              <TextField
                onChangeCapture={handleOnChange}
                className={'password'}
                label="Password"
                placeholder="Enter password"
                type="password"
                onChange={passwordChange}
                error={isError}
              />
              <Button type="submit" variant="contained" color="primary" className={'enter'}>
                SIGN IN
              </Button>
            </form>
            {errorMsg && <Typography variant="body1" className={'LoginError'}>{errorMsg}</Typography>}
          </div>
        </div>
      </Container>
      )}
    </CurrentStaffUser.Provider>
  );
}

export default Login;