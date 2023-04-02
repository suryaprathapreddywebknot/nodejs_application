import React, { useEffect } from "react";
import styles from "./Attendence.module.css";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmpLeaves, leaveRequest } from "../../store/leavesSlice";
import { fetchLeaves } from "../../store/leavesSlice";

function Attendence() {
  const authuser = useSelector((state) => state.auth);
  const userLeaves = useSelector((state) => state.leaves.leaves);

  console.log(userLeaves);

  const dispatch = useDispatch();
  const nameref = useRef();
  const startDateRef = useRef();
  const EndtDateRef = useRef();
  const reasonRef = useRef();

  useEffect(() => {
    dispatch(fetchEmpLeaves(authuser.currentUser.id, authuser.token));
  }, []);

  const documentSubmitHandler = function (e) {
    e.preventDefault();
    const formdata = {
      emp_id: authuser.currentUser.id,
      leave_type: nameref.current.value,
      start_date: startDateRef.current.value,
      end_date: EndtDateRef.current.value,
      status: "pending",
      reason: reasonRef.current.value,
    };
    dispatch(leaveRequest(formdata, authuser.token));
    dispatch(fetchEmpLeaves(authuser.currentUser.id, authuser.token));
  };
  return (
    <div className={styles.leaves}>
      <h3>Leaves Applied</h3>
      <table className={styles.userLeaves}>
        <thead>
          <tr>
            <td>Type</td>
            <td>Start Date</td>
            <td>End Date</td>
            <td>Reason</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          {userLeaves.map((ele) => {
            return (
              <tr>
                <td>{ele.leave_type}</td>
                <td>{ele.start_date}</td>
                <td>{ele.end_date}</td>
                <td>{ele.reason}</td>
                <td>{ele.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h1>Apply for Leaves</h1>
      <form onSubmit={documentSubmitHandler} className={styles.leaveForm}>
        <div className={styles.input}>
          <label htmlFor="leaveType"></label>
          <select id="leaveType" ref={nameref} required>
            <option disabled value="">
              Please pick a type
            </option>
            <option value="leave">Leave</option>
            <option value="Half day">Half day</option>
            <option value="Unpaid halfday">Unpaid halfday</option>
            <option value="Unpaid leave">Unpaid leave</option>
          </select>
        </div>
        <div className={styles.input}>
          <label>Start Date</label>
          <input type="date" ref={startDateRef} required></input>
        </div>
        <div className={styles.input}>
          <label>End Date</label>
          <input type="date" ref={EndtDateRef} required></input>
        </div>
        <div className={styles.input}>
          <label>Reason</label>
          <input type="text" ref={reasonRef} required></input>
        </div>

        <div className={styles.navigation}>
          <button type="submit">Apply For Leave</button>
        </div>
      </form>
    </div>
  );
}

export default Attendence;
