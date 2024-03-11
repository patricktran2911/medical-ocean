import React, { useState } from 'react';
import './Login.css';
import App from "./App";

function Login() {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [ErrorMsg, setErrorMsg] = useState(''); // error msg handler for later
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
    } else {
      setLogin(false); // later use to send an error msg for worng username or password
    }
  };

  return (
    <div className='login'>
       {!LoginSucess? (
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
        </div>
      </form>
      ) : (
        <App/>  
      )}
    </div>
  );
}

export default Login;