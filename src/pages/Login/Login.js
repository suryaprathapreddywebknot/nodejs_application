import React, { Fragment } from "react";
import LoginNavbar from "../../components/login/LoginNavbar";
import styles from "./login.module.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <Fragment>
      <LoginNavbar></LoginNavbar>
      <div className={styles.login}>
        <div className={styles.form}>
          <form className={styles.loginForm}>
            <h2 style={{ color: "#fff", textAlign: "center" }}>
              Smart payroll for smarter bussiness
            </h2>
            <div className={styles.input}>
              <label htmlFor="email">Email Address</label>
              <input type="email" placeholder="Enter your Email adress" required></input>
            </div>
            <div className={styles.input}>
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="Enter password" required></input>
            </div>
            <div className={styles.navigation}>
              <button>LOGIN</button>
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
