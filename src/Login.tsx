import React, { useState } from 'react';
import './Login.css';
import App from "./App";
import logo from "./images/logo.png";

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
      setErrorMsg('Incorrecct username or passoword. Try again.'); // later use to send an error msg for worng username or password
    }
  };

  return (
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
}

export default Login;