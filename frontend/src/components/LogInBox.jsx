import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LogInBox = () => {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: user,
          password: pwd,
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

      setUser('');
      setPwd('');
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
            id="username"
            ref={userRef}
            placeholder="Username"
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />

          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
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
