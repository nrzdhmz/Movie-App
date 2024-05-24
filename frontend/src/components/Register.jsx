import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,16}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async e => {
    e.preventDefault();

    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: user,
          password: pwd,
          confirmPassword: matchPwd,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      setUser("");
      setPwd("");
      setMatchPwd("");
      navigate("/LogIn");
    } catch (err) {
      if (!err.message) {
        setErrMsg("No Server Response");
      } else if (err.message.includes("Username Taken")) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="container justify">
      <div className="sign-in-container">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive">
          {errMsg}
        </p>
        <h1 className="sign-top">Register</h1>
        <form className="sign-inputs" onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={e => setUser(e.target.value)}
            value={user}
            required
            placeholder="Username"
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p
            id="uidnote"
            className={
              userFocus && user && !validName ? "instructions" : "offscreen"
            }>
            4 to 24 characters. Must begin with a letter.
          </p>
          <input
            type="password"
            id="password"
            onChange={e => setPwd(e.target.value)}
            value={pwd}
            required
            placeholder="Password"
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p
            id="pwdnote"
            className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
            6 to 16 characters. Must include uppercase and lowercase letters and
            a number.
          </p>
          <input
            type="password"
            id="confirm_pwd"
            onChange={e => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
            placeholder="Confirm Password"
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          <p
            id="confirmnote"
            className={
              matchFocus && !validMatch ? "instructions" : "offscreen"
            }>
            Must match the first password input field.
          </p>
          <div className="logSign">
            <div>
              <p>Already registered?</p>
              <Link to="/LogIn">Log in</Link>
            </div>
            <button
              disabled={!validName || !validPwd || !validMatch ? true : false}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;