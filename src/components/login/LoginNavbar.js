import React from 'react'
import styles from './LoginNavbar.module.css'
import logo from '../../assets/payrollLogo.svg'

function LoginNavbar() {
  return (
    <div className={styles.navbar}>
        <div className={styles.logo}>
            <h3><i>Razorpay</i>X payroll</h3>
        </div>
        <div className={styles.navigation}>
            <button>Go to razorpay.com</button>
        </div>
    </div>
  )
}

export default LoginNavbar