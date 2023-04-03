import React, { useEffect } from "react";
import styles from "./Attendence.module.css";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllEmpLeaves,
  fetchEmpLeaves,
  leaveRequest,
  updateLeave,
} from "../../store/leavesSlice";
import { fetchLeaves } from "../../store/leavesSlice";

function Attendence() {
  const authuser = useSelector((state) => state.auth);
  const allEmployees = useSelector((state) => state.auth.allUsers);
  const userLeaves = useSelector((state) => state.leaves.leaves);
  const allLeaves = useSelector((state) => state.leaves.allLeaves);

  console.log(allLeaves);

  const dispatch = useDispatch();
  const nameref = useRef();
  const startDateRef = useRef();
  const EndtDateRef = useRef();
  const reasonRef = useRef();

  useEffect(() => {
    dispatch(fetchEmpLeaves(authuser.currentUser.id, authuser.token));
    dispatch(fetchAllEmpLeaves(authuser.token));
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

  const leaveApproveHandler = function (id) {
    // dispatch action to approve leave
    dispatch(updateLeave(id, authuser.token));
    dispatch(fetchAllEmpLeaves(authuser.token));
  };
  return (
    <div className={styles.leaves}>
      <h2>Leaves Applied</h2>
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
          {typeof userLeaves == "Array" ? (
            userLeaves.map((ele) => {
              return (
                <tr key={ele.id}>
                  <td>{ele.leave_type}</td>
                  <td>{`${new Date(ele.start_date).getFullYear()}/${new Date(
                    ele.start_date
                  ).getMonth()}/${new Date(ele.start_date).getDate()}`}</td>
                  <td>{`${new Date(ele.end_date).getFullYear()}/${new Date(
                    ele.end_date
                  ).getMonth()}/${new Date(ele.end_date).getDate()}`}</td>
                  <td>{ele.reason}</td>
                  <td>{ele.status}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>{userLeaves.leave_type}</td>
              <td>{`${new Date(userLeaves.start_date).getFullYear()}/${new Date(
                userLeaves.start_date
              ).getMonth()}/${new Date(userLeaves.start_date).getDate()}`}</td>
              <td>{`${new Date(userLeaves.end_date).getFullYear()}/${new Date(
                userLeaves.end_date
              ).getMonth()}/${new Date(userLeaves.end_date).getDate()}`}</td>
              <td>{userLeaves.reason}</td>
              <td>{userLeaves.status}</td>
            </tr>
          )}
        </tbody>
      </table>

      {authuser.currentUser.role_id == 2 ? (
        <div>
          <h2>Leaves To Approve</h2>
          <table>
            <thead>
              <tr>
                <td>Employee Id</td>
                <td>Start Date</td>
                <td>End Date</td>
                <td>Status</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {allLeaves?.map((ele) => {
                return (
                  <tr key={ele.id}>
                    <td>{ele.emp_id}</td>
                    <td>{`${new Date(ele.start_date).getFullYear()}/${new Date(
                      ele.start_date
                    ).getMonth()}/${new Date(ele.start_date).getDate()}`}</td>
                    <td>{`${new Date(ele.end_date).getFullYear()}/${new Date(
                      ele.end_date
                    ).getMonth()}/${new Date(ele.end_date).getDate()}`}</td>
                    <td>{ele.status}</td>
                    <td>
                      <button
                        onClick={() => {
                          leaveApproveHandler(ele.id);
                        }}
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
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
