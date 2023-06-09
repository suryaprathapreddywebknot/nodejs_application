import { createSlice } from "@reduxjs/toolkit";
import { leavesSliceActions } from ".";
import { api } from "../CONFIG/config";

const leavesSlice=createSlice({
    name:'leaves',
    initialState:{leaves:[],allLeaves:[]},
    reducers:{
        setEmpLeaves:(state,actions)=>{
            state.leaves=actions.payload.leaves
        },
        setAllLeaves:(state,actions)=>{
            state.allLeaves=actions.payload.allLeaves
        },

    }
})

export const leaveRequest=function(leaveData,token){
    return async dispatch=>{
        try {
            const response = await fetch(`${api.url}/leaves/create`, {
                method: "POST",
                body: JSON.stringify(
                  leaveData
                ),
                headers: { "content-type": "application/json" ,
                            "Authorization":`Bearer ${token}`},
              });
              console.log(response)
              if (response.ok) {
                const data = await response.json();
                // dispatch(leavesSliceActions.setLeaves({leaves:data.data}));
              }
        } catch (error) {
            alert(error.message)
        }
    }
}

export const fetchEmpLeaves=function(id,token){
    return async dispatch=>{
        const response=await fetch(`${api.url}/leaves/empLeaves`,{
            method:'POST',
            body:JSON.stringify({
                "id":id
            }),
            headers: { "content-type": "application/json" ,
            "Authorization":`Bearer ${token}`},
        })

        if(response.ok){
            const data=await response.json()
            dispatch(leavesSliceActions.setEmpLeaves({leaves:data.data}));
        }
    }
}

export const fetchAllEmpLeaves=function(token){
    return async dispatch=>{
        const response=await fetch(`${api.url}/leaves`,{
            method:'GET',
            headers: { "content-type": "application/json" ,
            "Authorization":`Bearer ${token}`},
        })

        if(response.ok){
            const data=await response.json()
            console.log(data)
            dispatch(leavesSliceActions.setAllLeaves({allLeaves:data.data}));
        }
    }
}

export const updateLeave=function(id,token){
    return async dispatch=>{
        const response=await fetch(`${api.url}/leaves/update`,{
            method:'POST',
            body:JSON.stringify({
                "id":id,
                "status":'approved'
            }),
            headers: { "content-type": "application/json" ,
            "Authorization":`Bearer ${token}`},
        })
        if(response.ok){
            const data=await response.json()
            if(data.success){
                alert('leave approved :)')
            }
        }
    }
}





export default leavesSlice