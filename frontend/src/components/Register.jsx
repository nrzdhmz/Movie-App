import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,16}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user: "",
    pwd: "",
    matchPwd: "",
  });

  const [formValidity, setFormValidity] = useState({
    validName: false,
    validPwd: false,
    validMatch: false,
  });

  const [focus, setFocus] = useState({
    userFocus: false,
    pwdFocus: false,
    matchFocus: false,
  });

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setFormValidity(prev => ({
      ...prev,
      validName: USER_REGEX.test(formData.user),
    }));
  }, [formData.user]);

  useEffect(() => {
    setFormValidity(prev => ({
      ...prev,
      validPwd: PWD_REGEX.test(formData.pwd),
      validMatch: formData.pwd === formData.matchPwd,
    }));
  }, [formData.pwd, formData.matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [formData]);

  const handleChange = e => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFocus = e => {
    const { id } = e.target;
    setFocus(prev => ({ ...prev, [`${id}Focus`]: true }));
  };

  const handleBlur = e => {
    const { id } = e.target;
    setFocus(prev => ({ ...prev, [`${id}Focus`]: false }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const v1 = USER_REGEX.test(formData.user);
    const v2 = PWD_REGEX.test(formData.pwd);
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
          username: formData.user,
          password: formData.pwd,
          confirmPassword: formData.matchPwd,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      setFormData({
        user: "",
        pwd: "",
        matchPwd: "",
      });
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
            id="user"
            ref={userRef}
            autoComplete="off"
            onChange={handleChange}
            value={formData.user}
            required
            placeholder="Username"
            aria-invalid={formValidity.validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <p
            id="uidnote"
            className={
              focus.userFocus && formData.user && !formValidity.validName
                ? "instructions"
                : "offscreen"
            }>
            4 to 24 characters. Must begin with a letter.
          </p>
          <input
            type="password"
            id="pwd"
            onChange={handleChange}
            value={formData.pwd}
            required
            placeholder="Password"
            aria-invalid={formValidity.validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <p
            id="pwdnote"
            className={
              focus.pwdFocus && !formValidity.validPwd
                ? "instructions"
                : "offscreen"
            }>
            6 to 16 characters. Must include uppercase and lowercase letters and
            a number.
          </p>
          <input
            type="password"
            id="matchPwd"
            onChange={handleChange}
            value={formData.matchPwd}
            required
            placeholder="Confirm Password"
            aria-invalid={formValidity.validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <p
            id="confirmnote"
            className={
              focus.matchFocus && !formValidity.validMatch
                ? "instructions"
                : "offscreen"
            }>
            Must match the first password input field.
          </p>
          <div className="logSign">
            <div>
              <p>Already registered?</p>
              <Link to="/LogIn">Log in</Link>
            </div>
            <button
              disabled={
                !formValidity.validName ||
                !formValidity.validPwd ||
                !formValidity.validMatch
              }>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
