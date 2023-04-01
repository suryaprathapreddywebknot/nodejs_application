import React, { useEffect, useRef, useState } from "react";
import styles from "./documents.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchDocs } from "../../store/documentSlice";
import { api } from "../../CONFIG/config";
import { Link } from "react-router-dom";

function Documents() {
  const date = new Date();
  const [file, setFile] = useState(null);
  const authUser = useSelector((state) => state.auth);
  const userDocuments = useSelector((state) => state.documents);
  useEffect(() => {
    dispatch(fetchDocs(authUser.currentUser.id, authUser.token));
  }, []);
  const dispatch = useDispatch();

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }
  const nameref = useRef();
  const descriptionRef = useRef();
  const fileRef = useRef();

  const documentSubmitHandler = function (e) {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authUser.token}`);

    var formData = new FormData();
    formData.append("file", file);
    formData.append("name", nameref.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("doc_emp_id", Number(authUser.currentUser.id));
    formData.append("createdDate", Date.now());

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formData,
      redirect: "follow",
    };

    fetch(`${api.url}/documents/upload`, requestOptions)
      .then((response) => response.json())
      .then((result) => {

        if (result.success) alert("Document uploaded successfully")
        dispatch(fetchDocs(authUser.currentUser.id, authUser.token));
        ;
      })
      .catch((error) => alert(error.message));

    
  };

  const viewDocumentHandler = async function (id) {
    let headersList = {
      Authorization: `Bearer ${authUser.token}`,
      "Content-Type": "application/json",
    };


    let response = await fetch(`${api.url}/documents/${id}`, {
      method: "GET",
      headers: headersList,
    });

    let data = await response.blob();
    const url = URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.innerText = "Click here to view the PDF file";

    // Add the <a> element to the DOM and trigger a click event on it
    // document.body.appendChild(link);
    link.click();
    console.log(data);
  };

  return (
    <div className={styles.documentsContainer}>
      <h1 className={styles.header}>Documents</h1>
      <div className={styles.documentsTable}>
        <table>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Description</th>
            <th>Attachments</th>
          </tr>
          {userDocuments.documents.map((ele) => {
            return (
              <tr>
                <td>{`${new Date(ele.createdDate).getDate()}/${
                  new Date(ele.createdDate).getMonth() + 1
                }/${new Date(ele.createdDate).getFullYear()}`}</td>
                <td>{ele.name}</td>
                <td>{ele.description}</td>
                <td>
                  <button
                    className={styles.viewBtn}
                    to={`${api.url}/documents/${ele.id}`}
                    onClick={() => {
                      viewDocumentHandler(ele.id);
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      <form onSubmit={documentSubmitHandler}>
        <div className={styles.input}>
          <label htmlFor="docType"></label>
          <select id="docType" ref={nameref} required>
            <option disabled value="">
              Please pick a type
            </option>
            <option value="Professional Documents">
              Professional Documents
            </option>
            <option value="Degree">Degree</option>
            <option value="Aadhar">Aadhar</option>
            <option value="Employment Contract">Employment Contract</option>
            <option value="Tax deduction supporting documents">
              Tax Deduction Supporting Documents
            </option>
            <option value="Previous Employment Contract">
              Previous Employment Documents
            </option>
            <option value="Bank account details">Bank Account Details</option>
            <option value="Othre">Other</option>
          </select>
        </div>
        <div className={styles.input}>
          <label>Description</label>
          <input type="text" ref={descriptionRef} required></input>
        </div>
        <div className={styles.input}>
          <label>Document</label>
          <input
            type="file"
            ref={fileRef}
            onChange={handleFileChange}
            required
          ></input>
        </div>
        <div className={styles.navigation}>
          <button type="submit">Upload Document</button>
        </div>
      </form>
    </div>
  );
}

export default Documents;
