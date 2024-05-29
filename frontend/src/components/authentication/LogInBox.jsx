import { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const LogInBox = () => {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user: '',
    pwd: '',
  });

  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [formData]);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        username: formData.user,
        password: formData.pwd,
      }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      const userData = response.data;

      localStorage.setItem('userData', JSON.stringify(userData));

      setFormData({ user: '', pwd: '' });

      navigate('/Home');
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          setErrMsg("Missing Username or Password");
        } else if (err.response.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Login Failed");
        }
      } else if (err.request) {
        setErrMsg("No response from server");
      } else {
        setErrMsg("Error: " + err.message);
      }
      errRef.current.focus();
    }
  };

  const handleChange = e => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="container justify">
      <div className="sign-in-container">
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1 className="sign-top">Log In</h1>
        <form className="sign-inputs" onSubmit={handleSubmit}>
          <input
            type="text"
            id="user"
            ref={userRef}
            placeholder="Username"
            autoComplete="off"
            onChange={handleChange}
            value={formData.user}
            required
          />

          <input
            type="password"
            id="pwd"
            placeholder="Password"
            onChange={handleChange}
            value={formData.pwd}
            required
          />
          <div className="logSign">
            <div>
              <p>Don't have an Account?</p>
              <Link to="/">Register</Link>
            </div>
            <button type="submit">Log In</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogInBox;
