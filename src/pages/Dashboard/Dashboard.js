import React, { useEffect } from "react";
import styles from "./Dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEmpLeaves } from "../../store/leavesSlice";
import { fetchALlEmployees } from "../../store/authSlice";

function Dashboard() {
  const today = new Date();
  const allEmployees = useSelector((state) => state.auth.allUsers);
  const allLeaves = useSelector((state) => state.leaves.allLeaves);
  const authUser = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log();
  useEffect(() => {
    dispatch(fetchAllEmpLeaves(authUser.token));
    dispatch(fetchALlEmployees(authUser.token));
  }, []);
  console.log(allLeaves);
  console.log(allEmployees);
  const birthdays = allEmployees.filter((ele) => {
    let employeeDob=new Date(ele.dob)
    console.log(employeeDob.getDate()==today.getDate())
    return (
      employeeDob.getMonth() === today.getMonth() && // compare the month
      employeeDob.getDate() === today.getDate() // compare the day
    );
  });
  console.log(birthdays);

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <div className={styles.card}>
        <h2>Birthdays</h2>
        {birthdays?birthdays.map(ele=>{
          return <h3>Today is {ele.name}'s birthday</h3>
        }):''}
      </div>
      <div className={styles.card}>
        <h2>Leaves</h2>
      </div>
    </div>
  );
}

export default Dashboard;
