import * as React from "react";
import "./Login.css";
import { useState, useEffect  } from 'react';
import { useNavigate } from "react-router-dom";


export default function Login() {

  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [statuss, setStatuss] = useState('Welcome back!');
  const [token, setToken] = useState(localStorage.getItem('access_token'));

  const [isLoaded, setIsLoaded] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [id, setId] = useState('');

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nickname: nickname, password: password })
  };
  

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
        setIsPageLoaded(true);
        if (token != "") {
          fetch("http://localhost:3001/api/getUser?access_token="+token)
          .then((response) => console.log(response.json()))
          setId();
          navigate("/user/"+id)
        }
    }
  }, [isLoaded]);


  const handleSubmit = (event) => {
    event.preventDefault();
    if (password == "" || nickname == "") {
      setStatuss('Wrong parameters!');
    } else {
    setStatuss('Proceeding...')
    fetch("http://localhost:3001/api/login/", requestOptions)
      .then(response => response.json())
      .catch(err => {setStatuss('Please try again!'); console.log(err)})
      .then((data) => {
        if (data.statusCode == 401) {
          setStatuss('Wrong login or password!');
        } else {
          setStatuss('Success!');
          setToken(data.access_token);
          localStorage.setItem('access_token', token);
          fetch("http://localhost:3001/api/getUser?access_token="+token)
          .then((response) => console.log(response))
          setId()
          console.log()
          navigate('/user/id'+id)
        } 
      })
    }
    setPassword('');
    setNickname('');
  };
  
    return (
    <div class="signupFrm">
      <form onSubmit={handleSubmit} class="form">
        <h1 class="title">{statuss}</h1>

        <div class="inputContainer">
          <input type="text" class="input" id="nickname" placeholder="a" value={nickname} onChange={(event) => setNickname(event.target.value)}/>
          <label class="label">Your nickname</label>
        </div>

        <div class="inputContainer2">
          <input type="text" class="input" id="password" placeholder="a" value={password} onChange={(event) => setPassword(event.target.value)}/>
          <label class="label">Your password</label>
        </div>

        <div class="www">
          <a href="register">Don`t have an account?</a>
        </div>

        <input type="submit" class="submitBtn" value="Log in"/>

        <div class="www1">
          <a href="contacts">Our contacts</a>
        </div>

      </form>
    </div>
    )

}
