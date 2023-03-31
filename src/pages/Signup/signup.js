'use Strict';
import React, { useRef } from "react";
import styles from "../Login/login.module.css";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import LoginNavbar from "../../components/login/LoginNavbar";
import { api } from "../../CONFIG/config";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate=useNavigate()
  const nameRef=useRef()
  const emailRef=useRef()
  const passwordRef=useRef()
  const mobileRef=useRef()
  const roleRef=useRef()
  const dobRef=useRef()
  const signupFormHandler=async function(e){
    e.preventDefault()
    let userData={
      name:nameRef.current.value,
      email:emailRef.current.value,
      password:passwordRef.current.value,
      mobile:mobileRef.current.value,
      role_id:roleRef.current.value,
      dob:dobRef.current.value
    }
    try {
      const response = await fetch(`${api.url}/employees/signup`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "content-type": "application/json" },
      });
  
      if(response.ok){
        const data=await response.json()
        console.log(data)
        navigate('/login')
      }
    } catch (error) {
      alert('invalid credentials')
    }
    


  }

  return (
    <Fragment>
      <LoginNavbar></LoginNavbar>
      <div className={styles.signup}>
        <div className={styles.form}>
          <form className={styles.signupForm} onSubmit={signupFormHandler}>
            <h2 style={{ color: "#fff", textAlign: "center" }}>
              Smart payroll for smarter bussiness
            </h2>
            <div className={styles.input}>
              <label htmlFor="name">Full Name</label>
              <input type="text" id='name'placeholder="Enter your Full Name" required ref={nameRef}></input>
            </div>
            <div className={styles.input}>
              <label htmlFor="email">Email Address</label>
              <input type="email" id='email'placeholder="Enter your Email adress" required ref={emailRef}></input>
            </div>
            <div className={styles.input}>
              <label htmlFor="password">Password</label>
              <input type="password" id='password'placeholder="Enter Password" required ref={passwordRef}></input>
            </div>
            <div className={styles.input}>
              <label htmlFor="mobile">Mobile Number</label>
              <input type="tel" id='mobile' placeholder="Enter your mobile number" maxLength={10} required ref={mobileRef}></input>
            </div>
            <div className={styles.input}>
              <label htmlFor="dob">DOB</label>
              <input type="date" id='dob'  required ref={dobRef}></input>
            </div>
            <div className={styles.input}>
              <label htmlFor="role">Your Title</label>
              <select id="role" ref={roleRef}>
                <option value={1}>Employee</option>
                <option value={2}>Admin</option>
              </select>
            </div>
            <div className={styles.navigation}>
              <button type="submit">SIGN UP</button>
            </div>
          </form>

        </div>
      </div>
    </Fragment>
  );
}

export default Signup;
