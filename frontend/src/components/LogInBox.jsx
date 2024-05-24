import { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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

  const handleChange = e => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: formData.user,
          password: formData.pwd,
        }),
      });

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Missing Username or Password");
        } else if (response.status === 401) {
          throw new Error("Unauthorized");
        } else {
          throw new Error("Login Failed");
        }
      }

      setFormData({ user: '', pwd: '' });
      navigate('/HomePage');
    } catch (err) {
      setErrMsg(err.message);
      errRef.current.focus();
    }
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
            <button>Log In</button>                          
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogInBox;
