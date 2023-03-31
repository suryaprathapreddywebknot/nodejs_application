import React from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
// import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import styles from './layout.module.css'
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { Outlet } from "react-router-dom";
function Layout(props) {
  return (
    <div className={styles.layout}>
      <div className={styles.layoutNavbar}>
        <div className={styles.logo}>
          <img src="https://webknot.in/wp-content/uploads/2021/03/wwwew-1536x448.png"></img>
        </div>
        <div className={styles.navigations}>
          <h3>We &#10084;  Gowebknot </h3>
          <NotificationsNoneIcon></NotificationsNoneIcon>
          <PersonOutlineIcon></PersonOutlineIcon>
        </div>
      </div>
      <div className={styles.layoutBody}>
        <div className={styles.layoutSidebar}>
          <NavLink to='/dashboard' className={styles.link}><ContentPasteOutlinedIcon/> &nbsp; Dashboards</NavLink>
          <NavLink to='/attendence'className={styles.link}><AssignmentTurnedInOutlinedIcon/>&nbsp; Attendence</NavLink>
          <NavLink to='/documents'className={styles.link}><ContentCopyOutlinedIcon/>&nbsp; Documents</NavLink>
          <NavLink to='/help'className={styles.link}><QuestionMarkOutlinedIcon/> &nbsp;Help</NavLink>
        </div>

        <div className={styles.layoutMain}><Outlet/></div>
        <div className={styles.layoutAside}>
          <h2>welcome,<br></br> K S SURYA PRATHAP REDDY</h2>
          <h2>ID xyz</h2>
          <p>Your Manager:</p>
          <p>Krishnan N R</p>
        </div>
      </div>
    </div>
  );
}

export default Layout;
