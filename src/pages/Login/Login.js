import React, { Fragment, useRef } from "react";
import LoginNavbar from "../../components/login/LoginNavbar";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions } from "../../store";
import { loginRequest } from "../../store/authSlice";

function Login() {
  const emailRef=useRef()
  const passwordRef=useRef()
  const dispatch=useDispatch()
  const loginData=useSelector(state=>state.auth)
  const loginSubmitHandler=function(e){
    e.preventDefault()
    let credentials={
      email:emailRef.current.value,
      password:passwordRef.current.value
    }
    dispatch(loginRequest(credentials))
  }
  return (
    <Fragment>
      <LoginNavbar></LoginNavbar>
      <div className={styles.login}>
        <div className={styles.form}>
          <form className={styles.loginForm} onSubmit={loginSubmitHandler}>
            <h2 style={{ color: "#fff", textAlign: "center" }}>
              Smart payroll for smarter bussiness
            </h2>
            <div className={styles.input}>
              <label htmlFor="email">Email Address</label>
              <input type="email" placeholder="Enter your Email adress" required ref={emailRef}></input>
            </div>
            <div className={styles.input}>
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="Enter password" required ref={passwordRef}></input>
            </div>
            <div className={styles.navigation}>
              <button type="submit">LOGIN</button>
            </div>
          </form>
          
            <div className={styles.desclaimer}>
              This site is protected by reCAPTCHA and the Google
              <a href="https://policies.google.com/privacy">
                Privacy Policy
              </a>{" "}
              and
              <a href="https://policies.google.com/terms">
                Terms of Service
              </a>{" "}
              apply
            </div>
            <div className={styles.signupBtn}>
              <h5>Not a customer yet? <Link to='/signup' style={{color:'#5a99e8',textDecoration:'none'}}>Signup</Link></h5>
            </div>
          
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
