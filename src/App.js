import logo from './logo.svg';
import './App.css';
import LoginNavbar from './components/login/LoginNavbar';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/signup';
import Documents from './pages/Documents/Documents';
import { Route, Router,Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

function App() {
  const [isLoggedIn,setIsloggedIn]=useState(false)
  const user=useSelector(state=>state.auth)
  const navigate=useNavigate()
  let localData=JSON.parse(localStorage.getItem('user'))
  useEffect(()=>{
    if(user.token){
      localStorage.setItem('user',JSON.stringify(user))
      setIsloggedIn(true)
      navigate('/dashboard')

    }
  },[user.token])
  
  return (
    <Routes>
      <Route path='/' exact element={<Navigate replace to='/login'></Navigate>} >
        
      </Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/signup' element={<Signup/>}></Route>
    {isLoggedIn && <Route element={<Layout/>}>
        <Route path='/dashboard' element={<h1>This is dashboard</h1>}></Route>
        <Route path='/attendence' element={<h1>This is attendence</h1>}></Route>
        <Route path='/documents' element={<Documents></Documents>}></Route>
        <Route path='/help' element={<h1>This is help</h1>}></Route>
      </Route>}

    </Routes>
  );  
}

export default App;
