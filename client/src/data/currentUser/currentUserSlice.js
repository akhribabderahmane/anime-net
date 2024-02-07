import { createSlice } from "@reduxjs/toolkit";

const initialState={
    data:{
        username:"Akhrib abderahmane",
        userID:"123456789",
        email:"la_akhrib@esi.dz"
    },
    status: "idle", // or "loading" or "failed"
    errors:null,
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        changeUsername:(state,action)=>{
           state.data.username=action.payload;
        }
    },
    // extraReducers:{}
})

export const {changeUsername} =userSlice.actions ;
export default userSlice.reducer;