import { useRef, useState, useEffect } from 'react';
// import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import AuthContext from "../context/AuthProvider";
import { Link } from 'react-router-dom';

// import axios from './api/axios';
// const LOGIN_URL = '/auth';

const LogInBox = () => {
    // const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    // const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // const response = await axios.post(LOGIN_URL,
            //     JSON.stringify({ user, pwd }),
            //     {
            //         headers: { 'Content-Type': 'application/json' },
            //         withCredentials: true
            //     }
            // );
            // console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            // const accessToken = response?.data?.accessToken;
            // const roles = response?.data?.roles;
            // setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            // setSuccess(true);
            navigate('/HomePage');  // Redirect to HomePage after successful login
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
                <div className="container justify">
                  <div className="sign-in-container">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1 className="sign-top">Log In</h1>
                    <form  className="sign-inputs" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            placeholder='Username'
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <input
                            type="password"
                            id="password"
                            placeholder='Password'
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <div className="logSign">
                          <div>
                              <p>Don't have an Account?</p>
                              <Link to="/">Register</Link>
                              <Link to="/HomePage">HomePage</Link>
                          </div>
                          <button>Log In</button>                          
                        </div>
                    </form>
                  </div>
                </div>
    )
}

export default LogInBox;
