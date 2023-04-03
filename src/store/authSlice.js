import { createSlice } from "@reduxjs/toolkit";
import { authSliceActions } from "./index";
import { api } from "../CONFIG/config";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: "", currentUser: [] ,allUsers:[]},
  reducers: {
    login(state, actions) {
      state.token = actions.payload.token;
      state.currentUser = actions.payload.user;
    },
    logout(state, actions) {
      state.token = "";
      state.currentUser = [];
    },
    setUsers(state,actions){
      state.allUsers=actions.payload.allusers
    }
  },
});

// creating action creator thunks
export const loginRequest = function (credentials) {
  return async (dispatch) => {
    // send request to backend with credentials
    try {
        const response = await fetch(`${api.url}/employees/login`, {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { "content-type": "application/json" },
          });
          if (response.ok) {
            const data = await response.json();
            console.log(data)
            dispatch(authSliceActions.login({ token: data.token, user: data.user }));
          }
    } catch (error) {
        alert(error.message)
    }

  };
};

export const fetchALlEmployees=function(token){
  return async dispatch=>{
    try {
      const response=await fetch(`${api.url}/employees`,{
        method:'GET',
        headers: { "content-type": "application/json" ,
          "Authorization":`Bearer ${token}`}
      })
      console.log(response)

      if(response.ok){
        const data =await response.json()
        console.log(data)
        dispatch(authSliceActions.setUsers({allusers:data.data}))
      }
    } catch (error) {
      
    }
  }

}

export default authSlice;
