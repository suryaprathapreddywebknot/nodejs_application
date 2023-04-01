import { createSlice } from "@reduxjs/toolkit";
import { api } from "../CONFIG/config";
import { documentSliceAtions } from ".";

const documentSlice = createSlice({
  name: "documents",
  initialState: { documents: [] },
  reducers: {
    fetch: (state, action) => {
      state.documents=action.payload.documents;
    },
  },
});

export const fetchDocs=(id,token)=>{
    return async (dispatch)=>{
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "id":id
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        const response=await fetch(`${api.url}/documents/empdocs`, requestOptions)
        if(response.ok){
            const data=await response.json()
            if(data.success){
                dispatch(documentSliceAtions.fetch({documents:data.data}))
            }
            else{
                alert('unable to load documents')
            }
        }
        else{
            alert('failed to fetch')
        }
        
        
    }
}


export default documentSlice;
