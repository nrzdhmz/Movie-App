import React, { useState } from 'react';

const SignInBox = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
    console.log(confirmPassword);

    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="container">
      <div className="sign-in-container">
        <div className="sign-in">
          <div className="sign-top">
            Sign Up
          </div>
          <form onSubmit={handleSubmit} className="sign-inputs">
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Name' type='text' className="sign-name" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' type='password' className="sign-password" />
            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' type='password' className="sign-password" />
            <div className="logSign">
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInBox;




  /*
  SIGNUP USER
  user = {
    username: "",
    password: "",
    confirmPassword: ""
  }

  LOGIN USER
  user = {
    username: "",
    password: "",
  }

  http://localhost:5000/api/auth/signup
  
  axios.post (backendURL, user, { withCredentials: true }).then(res => res.data) 
  */