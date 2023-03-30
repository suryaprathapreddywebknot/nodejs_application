import React from "react";
import styles from "../Login/login.module.css";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import LoginNavbar from "../../components/login/LoginNavbar";

function Signup() {
  return (
    <Fragment>
      <LoginNavbar></LoginNavbar>
      <div className={styles.signup}>
        <div className={styles.form}>
          <form className={styles.signupForm}>
            <h2 style={{ color: "#fff", textAlign: "center" }}>
              Smart payroll for smarter bussiness
            </h2>
            <div className={styles.input}>
              <label htmlFor="name">Full Name</label>
              <input type="text" id='name'placeholder="Enter your Full Name" required></input>
            </div>
            <div className={styles.input}>
              <label htmlFor="email">Email Address</label>
              <input type="email" id='email'placeholder="Enter your Email adress" required></input>
            </div>
            <div className={styles.input}>
              <label htmlFor="mobile">Mobile Number</label>
              <input type="tel" id='mobile' placeholder="Enter your mobile number" maxLength={10} required></input>
            </div>
            <div className={styles.input}>
              <label htmlFor="role">Your Title</label>
              <select id="role">
                <option value={1}>Employee</option>
                <option value={2}>Admin</option>
              </select>
            </div>
            <div className={styles.navigation}>
              <button>SIGN UP</button>
            </div>
          </form>

        </div>
      </div>
    </Fragment>
  );
}

export default Signup;
