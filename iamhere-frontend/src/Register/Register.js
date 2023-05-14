import * as React from "react";
import "./Register.css";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Register() {

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [statuss, setStatuss] = useState('Welcome back!');
  const [token, setToken] = useState(localStorage.getItem('access_token'));

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password == "" || nickname == "") {
      setStatuss('Wrong parameters!');
    } else {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': '*/*' },
      body: JSON.stringify({ nickname: nickname, password: password, name: email })
    };
    setStatuss('Proceeding...')
    fetch("http://localhost:3001/api/register/", requestOptions)
      .then(response => response.json())
      .catch(err => {setStatuss('Please try again!'); console.log(err)})
      .then((data) => {
        if (data.statusCode == 403) {
          setStatuss('Something went wrong!');
        } else {
          setStatuss('Success!');
          setToken(data.access_token);
          localStorage.setItem('access_token', token);
          fetch("http://localhost:3001/api/getUser", requestOptions)
          navigate('/user/')
        } 
      })
    }
    setPassword('');
    setEmail('');
    setNickname('');
  };

  return (
    <div class="signupFrm">
    <form onSubmit={handleSubmit} class="form">
      <h1 class="title">Welcome!</h1>

      <div class="inputContainer">
        <input type="text" class="input" placeholder="a" value={email} onChange={(event) => setEmail(event.target.value)}/>
        <label for="" class="label">Your name</label>
      </div>

      <div class="inputContainer">
        <input type="text" class="input" placeholder="a" value={nickname} onChange={(event) => setNickname(event.target.value)}/>
        <label for="" class="label">Your nickname</label>
      </div>

      <div class="inputContainer">
        <input type="text" class="input" placeholder="a" value={password} onChange={(event) => setPassword(event.target.value)}/>
        <label for="" class="label">Your password</label>
      </div>

      <div class="www">
        <a href="login">Already have an account?</a>
      </div>

      <input type="submit" class="submitBtn" value="Sign up"/>

      <div class="www1">
        <a href="contacts">Our contacts</a>
      </div>

    </form>
  </div>
  );
};
