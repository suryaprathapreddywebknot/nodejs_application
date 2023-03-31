import { createSlice } from "@reduxjs/toolkit";
import { authSliceActions } from "./index";
import { api } from "../CONFIG/config";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: "", currentUser: [] },
  reducers: {
    login(state, actions) {
      state.token = actions.payload.token;
      state.currentUser = actions.payload.user;
    },
    logout(state, actions) {
      state.token = "";
      state.currentUser = [];
    },
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

export default authSlice;
