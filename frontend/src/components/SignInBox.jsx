import React, { useState } from 'react';

const SignInBox = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    if (username.trim() === "") {
      return "Username cannot be empty.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      setError(error);
      return;
    }

    console.log(username, password, confirmPassword);

    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setError(""); 
  };

  return (
    <div className="container">
      <div className="sign-in-container">
        <div className="sign-in">
          <div className="sign-top">
            Sign Up
          </div>
          <form onSubmit={handleSubmit} className="sign-inputs">
            {error && <div className="error">{error}</div>}
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Name'
              type='text'
              className="sign-name"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              type='password'
              className="sign-password"
            />
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirm Password'
              type='password'
              className="sign-password"
            />
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